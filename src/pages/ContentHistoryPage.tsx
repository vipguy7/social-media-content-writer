// src/pages/ContentHistoryPage.tsx
import React from 'react'; // Removed useState, useEffect
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { ContentHistoryItem } from '@/types/history';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast'; // Ensure this is the correct path
import { Trash2, Copy, Download } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; // Added

const ContentHistoryPage = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient(); // For cache invalidation
  const { toast } = useToast(); // Initialize toast

  // Function to fetch history
  const fetchHistory = async (userId: string | undefined): Promise<ContentHistoryItem[]> => {
    if (!userId) {
      // This case should ideally be handled by the enabled flag or component logic
      return [];
    }
    const { data, error: fetchError } = await supabase
      .from('content_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('Error fetching history:', fetchError);
      // toast is called here for immediate feedback, though react-query's onError can also be used
      toast({ title: "Error", description: "Could not fetch history.", variant: "destructive" });
      throw new Error(fetchError.message); // react-query expects an error to be thrown
    }
    return data as ContentHistoryItem[];
  };

  // useQuery for fetching data
  const { data: historyItems, isLoading, error, isError } = useQuery<ContentHistoryItem[], Error>(
    ['contentHistory', user?.id], // Query key: includes user ID to refetch if user changes
    () => fetchHistory(user?.id),
    {
      enabled: !!user, // Only run the query if the user is available
      staleTime: 5 * 60 * 1000, // Consider data stale after 5 minutes
      cacheTime: 15 * 60 * 1000, // Keep data in cache for 15 minutes
    }
  );

  const deleteMutation = useMutation(
    async (itemId: string) => {
      if (!user) throw new Error("User not authenticated for delete operation."); // Guard clause

      const { error: deleteError } = await supabase
        .from('content_history')
        .delete()
        .match({ id: itemId, user_id: user.id }); // Ensure user can only delete their own

      if (deleteError) {
        throw new Error(deleteError.message);
      }
      return itemId;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['contentHistory', user?.id]); // Invalidate and refetch
        toast({ title: "Deleted", description: "Content history item deleted." });
      },
      onError: (err: Error) => {
        console.error('Error deleting history item:', err);
        toast({ title: "Error", description: `Failed to delete item: ${err.message}`, variant: "destructive" });
      },
    }
  );

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content)
      .then(() => toast({ title: "Copied!", description: "Content copied to clipboard." }))
      .catch(err => {
        console.error('Failed to copy:', err);
        toast({ title: "Error", description: "Failed to copy content.", variant: "destructive" });
      });
  };

  const handleDownload = (item: ContentHistoryItem) => {
    // Sanitize title for filename
    const safeTitle = item.title?.replace(/[^a-z0-9_.-]/gi, '_') || 'generated_content';
    const filename = `${safeTitle}_${new Date(item.created_at).toLocaleDateString().replace(/\//g, '-')}.txt`;

    const blob = new Blob([item.generated_content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    toast({ title: "Downloaded", description: `${filename} started.`});
  };

  const handleDelete = (itemId: string) => {
    if (window.confirm("Are you sure you want to delete this history item?")) {
      deleteMutation.mutate(itemId);
    }
  };

  // Enhanced loading and error states
  if (!user && !isLoading) { // If no user and not in an initial loading state (e.g. from AuthProvider)
    return <div className="container mx-auto p-4">Please login to see your history.</div>;
  }

  if (isLoading && !!user) { // Loading state specifically when user is present (i.e., query is enabled and running)
      return <div className="container mx-auto p-4">Loading history...</div>;
  }

  if (isError && !!user) { // Error state specifically when user is present
      return <div className="container mx-auto p-4 text-red-500">Error fetching history: {error?.message}</div>;
  }


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Generated Content History</h1>
      {(!historyItems || historyItems.length === 0) && !isLoading ? ( // Also check isLoading to avoid showing "No history" during load
        <p>No history found.</p>
      ) : (
        <div className="space-y-4">
          {historyItems?.map((item) => ( // Optional chaining for historyItems
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.title || 'Generated Content'}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Generated on: {new Date(item.created_at).toLocaleString()}
                </p>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap font-sans bg-muted p-3 rounded-md max-h-60 overflow-y-auto">
                  {item.generated_content}
                </pre>
                {item.inputs && (
                <details className="mt-2 text-sm">
                  <summary className="cursor-pointer text-muted-foreground hover:text-primary">View Inputs</summary>
                  <pre className="whitespace-pre-wrap font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded-md mt-1 text-xs max-h-40 overflow-y-auto">
                    {JSON.stringify(item.inputs, null, 2)}
                  </pre>
                </details>
                )}
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(item.generated_content)}
                  disabled={deleteMutation.isLoading && deleteMutation.variables === item.id}
                >
                  <Copy className="w-4 h-4 mr-2" /> Copy
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(item)}
                  disabled={deleteMutation.isLoading && deleteMutation.variables === item.id}
                >
                  <Download className="w-4 h-4 mr-2" /> Download
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                  disabled={deleteMutation.isLoading && deleteMutation.variables === item.id}
                >
                  {deleteMutation.isLoading && deleteMutation.variables === item.id ? 'Deleting...' : <><Trash2 className="w-4 h-4 mr-2" /> Delete</>}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentHistoryPage;
