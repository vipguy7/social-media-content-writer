
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Book, Trash2, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface SavedContent {
  id: string;
  title: string;
  content: string;
  platform: string | null;
  content_type: string | null;
  created_at: string;
}

const LibraryPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [savedContent, setSavedContent] = useState<SavedContent[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchSavedContent();
    }
  }, [user]);

  const fetchSavedContent = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('generated_content')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedContent(data || []);
    } catch (error) {
      console.error('Error fetching saved content:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load saved content",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteContent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('generated_content')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSavedContent(prev => prev.filter(item => item.id !== id));
      toast({
        title: "Content deleted",
        description: "The content has been removed from your library",
      });
    } catch (error) {
      console.error('Error deleting content:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete content",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f7fb] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Book className="w-8 h-8 text-blue-700" />
          <h1 className="text-2xl font-bold text-blue-800">သင့် Personal Content Library</h1>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <Button
            onClick={fetchSavedContent}
            variant="outline"
            disabled={loading}
          >
            {loading ? "Loading..." : "Refresh"}
          </Button>
          <Button asChild variant="secondary">
            <Link to="/">← မူလစာမျက်နှာသို့</Link>
          </Button>
        </div>

        <div className="grid gap-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700 mx-auto mb-4"></div>
              <p>Loading your saved content...</p>
            </div>
          ) : savedContent.length === 0 ? (
            <div className="text-center py-12">
              <Book className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No saved content yet</h3>
              <p className="text-gray-400 mb-4">
                Generate some content and save it to see it here.
              </p>
              <Button asChild>
                <Link to="/">Start Creating Content</Link>
              </Button>
            </div>
          ) : (
            savedContent.map((item) => (
              <Card key={item.id} className="p-4 rounded shadow border-l-4 border-myanmar-red bg-white">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <div className="flex gap-4 text-sm text-gray-600 mb-3">
                      {item.platform && (
                        <span className="bg-blue-100 px-2 py-1 rounded">
                          Platform: {item.platform}
                        </span>
                      )}
                      {item.content_type && (
                        <span className="bg-green-100 px-2 py-1 rounded">
                          Type: {item.content_type}
                        </span>
                      )}
                      <span className="bg-gray-100 px-2 py-1 rounded">
                        {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700 line-clamp-3">
                      {item.content.substring(0, 200)}...
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{item.title}</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded">
                            {item.content}
                          </pre>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => deleteContent(item.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;
