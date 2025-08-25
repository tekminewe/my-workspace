"use client";

import { Dictionary } from "@/dictionaries";
import { SearchQuery } from "@/services/graphql";
import { replaceTokens } from "@/utils/string";
import { gql, useQuery } from "@apollo/client";
import {
  SearchDialog as MintDialog,
  SearchResultList,
  SearchResultListItem,
} from "@tekminewe/mint-ui/search-input";
import { useRouter } from "next/navigation";
import { useState } from "react";

const QUERY = gql(`
  query Search($query: String!) {
    searchAdvertisers(query: $query) {
      id
      name
      categories
      slug
      logo
      calculatedCommission
    }
  }
`);

export const SearchDialog = ({
  language,
  dictionary,
}: {
  language: string;
  dictionary: Dictionary["search"];
}) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const { data, loading } = useQuery<SearchQuery>(QUERY, {
    variables: {
      query,
    },
    context: {
      headers: {
        "Accept-Language": language,
      },
    },
  });

  const handleItemClick = (slug: string) => {
    router.push(`/${language}/store/${slug}`);
  };

  return (
    <MintDialog className="z-20" onQueryChange={setQuery}>
      <SearchResultList emptyText={dictionary.noResults} isLoading={loading}>
        {data?.searchAdvertisers.map((advertiser) => {
          return (
            <SearchResultListItem
              key={advertiser.id}
              title={advertiser.name}
              subtitle={
                advertiser.calculatedCommission > 0
                  ? replaceTokens(dictionary.cashback, {
                      cashback: `${advertiser.calculatedCommission}`,
                    })
                  : undefined
              }
              imageUrl={advertiser.logo}
              dismissOnSelect
              onItemClick={() => handleItemClick(advertiser.slug)}
            />
          );
        })}
      </SearchResultList>
    </MintDialog>
  );
};
