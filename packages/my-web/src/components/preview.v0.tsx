import { Caption, Title } from "@tekminewe/mint-ui/typography";
import { cn } from "@tekminewe/mint-ui/utils";
import dayjs from "dayjs";
import Image from "next/image";
import styles from "./css/blog.module.css";
import { PostDetailQuery } from "@/services/graphql";

interface PreviewV0Props {
  post: NonNullable<Required<PostDetailQuery>["post"]>;
}

export const PreviewV0 = ({ post }: PreviewV0Props) => {
  return (
    <div className="container mt-8">
      <Title
        as="h1"
        className="[--font-size-8:calc(42px*var(--scaling))] [--heading-line-height-8:calc(52px*var(--scaling))] [--font-weight-bold:800]"
      >
        {post.title}
      </Title>
      <Caption>Published on {dayjs(post.createdAt).fromNow()}</Caption>
      {post.featuredImage && (
        <Image
          src={post.featuredImage.url}
          width="688"
          height="344"
          className="mt-8"
          alt={post.title}
        />
      )}
      <div
        className={cn("my-8", styles.blogDeprecated)}
        dangerouslySetInnerHTML={{
          __html: post.content,
        }}
      />
    </div>
  );
};
