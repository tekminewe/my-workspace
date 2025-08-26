import { ApolloError } from "@apollo/client";
import { useFormContext } from "@tekminewe/mint-ui/form";
import { RichTextEditor } from "@tekminewe/mint-ui/rich-text-editor";
import { toast } from "@tekminewe/mint-ui/toast";
import { useSession } from "next-auth/react";
import { uploadMedia } from "../services/media";
import { useUpdatePostMutation } from "@/hooks/use-update-post-mutation";

interface PostFormEditorProps {
  languageId: string;
}

export const PostFormEditor = ({ languageId }: PostFormEditorProps) => {
  const { data: session } = useSession();
  const { watch } = useFormContext();
  const content = watch("content");
  const id = watch("id");
  const [updatePost] = useUpdatePostMutation();

  const handleChange = async ({ content }: { content: object }) => {
    try {
      await updatePost({
        variables: {
          id,
          data: { content: JSON.stringify(content) },
        },
        context: {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Accept-Language": languageId,
          },
        },
      });
    } catch (error) {
      toast((error as ApolloError).message, {
        type: "error",
      });
    }
  };

  const handleImageUpload = async (file: File) => {
    const result = await uploadMedia(
      { file },
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    if (!result.ok()) {
      alert(result.error.message);
      return { src: "" };
    }
    return { src: result.data.url };
  };

  return (
    <RichTextEditor
      content={content ? JSON.parse(content) : undefined}
      onChange={handleChange}
      onImageUpload={handleImageUpload}
    />
  );
};
