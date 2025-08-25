import { getSessionServer } from "@/services/auth/next";
import { notFound } from "next/navigation";
import { PostTable } from "@/components/post-table";
import { getDictionary } from "@/dictionaries";
import { Header } from "@tekminewe/mint-ui/typography";

export async function AdminPostListPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const session = await getSessionServer();
  const currentUser = session?.user;
  const dictionary = await getDictionary(lang);

  if (!currentUser) {
    return notFound();
  }

  return (
    <div>
      <Header className="mb-3">{dictionary.admin.blog.post}</Header>
      <PostTable languageId={lang} dictionary={dictionary.admin} />
    </div>
  );
}
