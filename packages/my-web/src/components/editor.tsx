"use client";

import { useEffect } from "react";
import { Navbar } from "@tekminewe/mint-ui/navbar";
import { Button } from "@tekminewe/mint-ui/button";
import { Caption } from "@tekminewe/mint-ui/typography";
import { LuCircleAlert } from "react-icons/lu";
import { useSession } from "next-auth/react";
import {
  AdminPostDetailQuery,
  AdminUpdatePostMutation,
  PostStatusEnum,
} from "@/services/graphql";
import { ApolloError, gql, useMutation, useQuery } from "@apollo/client";
import { toast } from "@tekminewe/mint-ui/toast";
import { PostForm } from "./post-form";

interface EditorProps {
  id: string;
  languageId: string;
}

const QUERY = gql(/* GraphQL */ `
  query AdminPostDetail($id: String!) {
    post(id: $id) {
      id
      title
      content
      postDate
      slug
      description
      editorVersion
      status {
        id
        name
      }
      tags {
        id
        name
      }
      featuredImage {
        id
        url
      }
      createdAt
    }
  }
`);

const UPDATE_MUTATION = gql(/* GraphQL */ `
  mutation AdminUpdatePost($id: String!, $data: UpdatePostInput!) {
    updatePost(id: $id, data: $data) {
      id
      title
      content
      postDate
      slug
      description
      editorVersion
      status {
        id
        name
      }
      tags {
        id
        name
      }
      featuredImage {
        id
        url
      }
    }
  }
`);

export const Editor = ({ id, languageId }: EditorProps) => {
  const { data: session } = useSession();
  const { data, loading } = useQuery<AdminPostDetailQuery>(QUERY, {
    variables: {
      id,
    },
    context: {
      headers: {
        "Accept-Language": languageId,
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
  });
  const post = data?.post;
  const [updatePost] = useMutation<AdminUpdatePostMutation>(UPDATE_MUTATION);

  useEffect(() => {
    setTimeout(() => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }, 0);
  }, []);

  const handlePublishButtonClick = async () => {
    try {
      await updatePost({
        variables: {
          id,
          data: {
            statusId: PostStatusEnum.Published,
          },
        },
        context: {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Accept-Language": languageId,
          },
        },
      });
      toast("Update post successfully", {
        type: "success",
      });
    } catch (error) {
      toast((error as ApolloError).message, {
        type: "error",
      });
    }
  };

  return (
    <>
      <Navbar className="justify-end">
        {post?.status.id === PostStatusEnum.Draft && (
          <Caption className="flex items-center gap-1 mr-2">
            <LuCircleAlert /> Unpublished changes
          </Caption>
        )}
        <Button onClick={handlePublishButtonClick}>Publish</Button>
      </Navbar>
      <div className="mt-8 container">
        {!loading && (
          <PostForm
            defaultValues={{
              id: post?.id,
              title: post?.title ?? "",
              slug: post?.slug ?? "",
              description: post?.description ?? "",
              postDate: post?.postDate,
              statusId: post?.status.id ?? PostStatusEnum.Draft,
              content: post?.content ?? "",
              editorVersion: post?.editorVersion ?? 1,
              featuredImageId: post?.featuredImage?.id ?? "",
              featuredImage: post?.featuredImage?.url ?? "",
            }}
            languageId={languageId}
          />
        )}
      </div>
    </>
  );
};
