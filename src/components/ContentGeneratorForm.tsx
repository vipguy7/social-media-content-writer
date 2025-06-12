
import ContentFormConfig from '@/components/ContentFormConfig';
import { ContentFormData } from '@/types/content';

interface ContentGeneratorFormProps {
  formData: ContentFormData;
  updateFormData: (updates: Partial<ContentFormData>) => void;
  onGenerate: () => void;
  onGenerateImages: () => void;
  isLoading: boolean;
  isGeneratingImages: boolean;
  hasContent: boolean;
}

const ContentGeneratorForm = ({
  formData,
  updateFormData,
  onGenerate,
  onGenerateImages,
  isLoading,
  isGeneratingImages,
  hasContent
}: ContentGeneratorFormProps) => {
  const setFormData = (data: ContentFormData) => {
    updateFormData(data);
  };

  return (
    <ContentFormConfig
      formData={formData}
      setFormData={setFormData}
      onGenerate={onGenerate}
      onGenerateImages={onGenerateImages}
      isLoading={isLoading}
      isGeneratingImages={isGeneratingImages}
      hasContent={hasContent}
    />
  );
};

export default ContentGeneratorForm;
