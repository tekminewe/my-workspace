"use client";

import { AdminPostListTableQueryQuery } from "@/services/graphql";
import { gql, useQuery } from "@apollo/client";
import { Button } from "@tekminewe/mint-ui/button";
import { DataTable, IDataTableColumn } from "@tekminewe/mint-ui/data-table";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dictionary } from "@/dictionaries";

type PostListItem = AdminPostListTableQueryQuery["posts"][0];

const QUERY = gql(/* GraphQL */ `
  query AdminPostListTableQuery($page: Int!, $pageSize: Int!) {
    posts(page: $page, pageSize: $pageSize) {
      id
      title
      postDate
      slug
      status {
        id
        name
      }
    }
    postsPagination(page: $page, pageSize: $pageSize) {
      totalItems
      pageSize
      currentPage
    }
  }
`);

const createColumns = (
  dictionary: Dictionary["admin"]
): IDataTableColumn<PostListItem>[] => {
  const blogDict = dictionary.blog;

  return [
    {
      dataKey: undefined,
      label: "No.",
      renderCell: ({ rowIndex }) => rowIndex + 1,
    },
    {
      dataKey: "title",
      label: blogDict.title,
    },
    {
      dataKey: "postDate",
      label: blogDict.postDate,
      renderCell: ({ value }) =>
        new Date(value?.toString() ?? "").toLocaleString(),
    },
    {
      dataKey: "status",
      label: blogDict.status,
      renderCell: ({ value }) => {
        return <span>{value.name}</span>;
      },
    },
    {
      dataKey: undefined,
      label: blogDict.actions,
      renderCell: ({ value }) => (
        <div className="items-center gap-2 flex">
          <Link href={`/blog/${value.slug}`} target="_blank">
            <Button variant="outline">{blogDict.preview}</Button>
          </Link>
          <Link href={`/admin/blog/${value.id}`}>
            <Button>{blogDict.edit}</Button>
          </Link>
        </div>
      ),
    },
  ];
};

export const PostTable = ({
  languageId,
  dictionary,
}: {
  languageId: string;
  dictionary: Dictionary["admin"];
}) => {
  const session = useSession();
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<AdminPostListTableQueryQuery>(QUERY, {
    variables: {
      page,
      pageSize: 25,
    },
    context: {
      headers: {
        "Accept-Language": languageId,
        Authorization: `Bearer ${session?.data?.accessToken}`,
      },
    },
  });
  const router = useRouter();
  const handleClick = async () => {
    router.push(`/${languageId}/admin/blog/new`);
  };

  const posts = data?.posts ?? [];
  const pagination = data?.postsPagination;
  const columns = createColumns(dictionary);
  const blogDict = dictionary.blog || {};

  return (
    <DataTable<PostListItem, any>
      showAddButton
      onAddButtonClick={handleClick}
      isLoading={loading}
      columns={columns}
      data={posts}
      addButtonLabel={blogDict.new}
      totalCount={pagination?.totalItems ?? 0}
      pageSize={pagination?.pageSize ?? 25}
      page={pagination?.currentPage ?? 1}
      onPaginationChange={({ page }) => {
        setPage(page);
      }}
    />
  );
};
