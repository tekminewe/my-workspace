import { ServerComponentProps } from "@/types";
import { Editor } from "@/components/editor";

interface AdminEditPostPageProps {
  params: Promise<{
    postId: string;
  }>;
}

export async function AdminEditPostPage({
  params,
}: ServerComponentProps<AdminEditPostPageProps>) {
  const { postId, lang } = await params;

  return <Editor id={postId} languageId={lang} />;
}
