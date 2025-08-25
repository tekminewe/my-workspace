import { Text, Title } from "@tekminewe/mint-ui/typography";
import { PostList } from "@/components/post-list";
import { ServerComponentProps } from "@/types";

export default async function PostListPage({
  params,
}: ServerComponentProps<{ params: { lang: string } }>) {
  const { lang } = await params;

  return (
    <div>
      <div className="my-8 mx-4 sm:mx-auto max-w-[688px]">
        <Title>Welcome to the Mint Deals</Title>
        <Text className="mb-9">
          Explore and dive into the wide range of topics and stories on deals
          and sales in Malaysia.
        </Text>
        <PostList languageId={lang} />
      </div>
    </div>
  );
}
