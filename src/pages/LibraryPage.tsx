
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, Book } from "lucide-react";
import { useGoogleDrive } from "@/hooks/useGoogleDrive";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const LibraryPage = () => {
  const { signIn, isSignedIn, listContentFiles, downloadContent } = useGoogleDrive();
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      setLoading(true);
      listContentFiles().then(setFiles).finally(() => setLoading(false));
    }
  }, [isSignedIn]);

  return (
    <div className="min-h-screen bg-[#f1f7fb] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Book className="w-8 h-8 text-blue-700" />
          <h1 className="text-2xl font-bold text-blue-800">သင့် Personal Content Library</h1>
        </div>
        {!isSignedIn ? (
          <Button onClick={signIn} className="px-6 py-2 text-lg shadow hover-scale">
            <Save className="w-5 h-5 mr-2" /> Sign in with Google Drive
          </Button>
        ) : (
          <>
            <Button
              onClick={() => window.location.reload()}
              className="mb-4 float-right"
              variant="outline"
            >
              Refresh List
            </Button>
            <div className="grid gap-4">
              {loading ? (
                <div className="text-center">Loading...</div>
              ) : files.length === 0 ? (
                <div className="text-center text-gray-400">
                  No saved content found in your Google Drive.
                </div>
              ) : (
                files.map((file) => (
                  <Card key={file.id} className="p-4 rounded shadow border-l-4 border-myanmar-red bg-white flex justify-between">
                    <div><span className="font-bold">{file.name}</span></div>
                    <Button size="sm" variant="outline"
                      onClick={() => downloadContent(file.id)}
                    >
                      View / Download
                    </Button>
                  </Card>
                ))
              )}
            </div>
          </>
        )}
        <div className="mt-8 text-center">
          <Button variant="secondary" onClick={() => useNavigate()("/")}>
            ← မူလစာမျက်နှာသို့
          </Button>
        </div>
      </div>
    </div>
  );
};
export default LibraryPage;
