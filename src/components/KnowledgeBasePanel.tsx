
import { useContentKnowledgeBase } from "@/hooks/useContentKnowledgeBase";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Book, Info } from "lucide-react";

const KnowledgeBasePanel = () => {
  const { contentFrameworks, platformBestPractices, culturalContextGuidelines } = useContentKnowledgeBase();
  return (
    <Card className="glass-card border-myanmar-red/40 animate-fade-in shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-myanmar-red">
          <Sparkles className="w-7 h-7 animate-pulse" />
          Content Frameworks & Cultural Tips
        </CardTitle>
        <CardDescription>
          <span className="font-bold text-blue-500">ကုန်ကြမ်းမဟုတ်သော</span> တောင်သူ၏အိုင်ဒီယာနှင့် AI ကျွမ်းကျင်မှုပေါင်းစပ်မှု!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Section: Frameworks */}
        <div>
          <h4 className="font-semibold flex items-center gap-2 mb-2 text-myanmar-red">
            <Book className="w-5 h-5 text-orange-600" /> Core Writing Frameworks
          </h4>
          <div className="space-y-5">
            {contentFrameworks.map((fw, i) => (
              <div key={i} className="rounded-lg border-[2px] border-myanmar-red/20 p-3 bg-orange-50 shadow hover:scale-105 transition-transform">
                <span className="font-bold text-blue-800">{fw.title}</span>
                <div className="text-sm text-muted-foreground mb-1 font-semibold">{fw.description}</div>
                <ol className="list-decimal ml-5 mb-1 font-medium">
                  {fw.steps.map((step, si) => (
                    <li key={si} className="text-sm">{step}</li>
                  ))}
                </ol>
                <div className="text-xs bg-blue-100 px-2 py-1 rounded mb-1">{fw.sample}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Platform Best Practices */}
        <div>
          <h4 className="font-semibold flex items-center gap-2 mb-2 text-blue-700">
            <Info className="w-4 h-4 text-blue-600" /> Platform Best Practices
          </h4>
          <div className="space-y-4">
            {platformBestPractices.map((pb, pIdx) => (
              <div key={pIdx} className="mb-4">
                <Badge className="bg-myanmar-red/10 text-myanmar-red border-myanmar-red mb-1">{pb.platform}</Badge>
                {pb.contentTypes.map((ct, cIdx) => (
                  <div key={cIdx} className="mb-1 pl-4">
                    <div className="font-bold text-blue-800">{ct.type}:</div>
                    <ul className="list-disc ml-5">
                      {ct.tips.map((tip, tIdx) => (
                        <li key={tIdx} className="text-sm">{tip}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* Cultural Context */}
        <div>
          <h4 className="font-semibold flex items-center gap-2 mb-2 text-green-700">
            <Sparkles className="w-4 h-4 text-green-600" /> Cultural Context Must-Knows
          </h4>
          <ul className="list-disc ml-6 space-y-1">
            {culturalContextGuidelines.map((g, idx) => (
              <li key={idx} className="text-sm font-medium">{g}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
export default KnowledgeBasePanel;
