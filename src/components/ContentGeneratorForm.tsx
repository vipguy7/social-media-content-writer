
import ContentFormConfig from '@/components/ContentFormConfig';
import { ContentFormData } from '@/types/content';

interface ContentGeneratorFormProps {
  formData: ContentFormData;
  updateFormData: (updates: Partial<ContentFormData>) => void;
  onGenerate: () => void;
  isLoading: boolean;
  hasContent: boolean;
}

const ContentGeneratorForm = ({
  formData,
  updateFormData,
  onGenerate,
  isLoading,
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
      isLoading={isLoading}
      hasContent={hasContent}
    />
  );
};

export default ContentGeneratorForm;
