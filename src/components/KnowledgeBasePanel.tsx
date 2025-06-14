
import { useContentKnowledgeBase } from "@/hooks/useContentKnowledgeBase";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Book, Info } from "lucide-react";

const KnowledgeBasePanel = () => {
  const { contentFrameworks, platformBestPractices, culturalContextGuidelines } = useContentKnowledgeBase();

  return (
    <Card className="glass-card border-myanmar-red/40 animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="w-5 h-5 text-myanmar-red" />
          Content Strategy Knowledge Base
        </CardTitle>
        <CardDescription>
          Professional marketing and branding frameworks for effective Myanmar social content.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Section: Frameworks */}
        <div>
          <h4 className="font-semibold flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-yellow-500" /> Writing Frameworks
          </h4>
          <div className="space-y-4">
            {contentFrameworks.map((fw, i) => (
              <div key={i} className="rounded-lg border p-3 bg-slate-50">
                <span className="text-myanmar-red font-bold">{fw.title}</span>
                <div className="text-sm text-muted-foreground mb-1">{fw.description}</div>
                <ol className="list-decimal ml-5 mb-1">
                  {fw.steps.map((step, si) => (
                    <li key={si} className="text-sm">{step}</li>
                  ))}
                </ol>
                <div className="text-xs bg-slate-100 px-2 py-1 rounded mb-1">{fw.sample}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Platform Best Practices */}
        <div>
          <h4 className="font-semibold flex items-center gap-2 mb-2">
            <Info className="w-4 h-4 text-blue-600" /> Platform Best Practices
          </h4>
          <div className="space-y-4">
            {platformBestPractices.map((pb, pIdx) => (
              <div key={pIdx}>
                <Badge className="bg-myanmar-red/10 text-myanmar-red border-myanmar-red mb-1">{pb.platform}</Badge>
                {pb.contentTypes.map((ct, cIdx) => (
                  <div key={cIdx} className="mb-1 pl-4">
                    <div className="font-medium">{ct.type}:</div>
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

        {/* Section: Cultural Context */}
        <div>
          <h4 className="font-semibold flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-green-600" /> Cultural Context Guidelines
          </h4>
          <ul className="list-disc ml-6 space-y-1">
            {culturalContextGuidelines.map((g, idx) => (
              <li key={idx} className="text-sm">{g}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default KnowledgeBasePanel;
