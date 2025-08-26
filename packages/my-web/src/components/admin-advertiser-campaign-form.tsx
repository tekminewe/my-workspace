"use client";

import { Dictionary } from "@/dictionaries";
import {
  AdminAdvertiserCampaignDetailPageQueryQuery,
  AdvertiserCampaignStatusEnum,
  LanguageEnum,
} from "@/services/graphql";
import { ApolloError, gql, useMutation } from "@apollo/client";
import { Card } from "@tekminewe/mint-ui/card";
import { ControlledForm } from "@tekminewe/mint-ui/form";
import { ControlledSwitch } from "@tekminewe/mint-ui/switch";
import { ControlledTextInput } from "@tekminewe/mint-ui/text-input";
import { toast } from "@tekminewe/mint-ui/toast";
import { Title } from "@tekminewe/mint-ui/typography";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { array, boolean, object, string } from "zod";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@tekminewe/mint-ui/tabs";
import { ControlledImageInput } from "./controlled-image-input";

interface AdvertiserCampaignMetadataState {
  languageId: LanguageEnum;
  name: string;
  description: string;
  bannerId?: string;
  banner?: string;
}

interface AdvertiserCampaignFormState {
  id: string;
  slug: string;
  statusId: boolean;
  metadatas: AdvertiserCampaignMetadataState[];
}

const UPDATE_MUTATION = gql(/* GraphQL */ `
  mutation AdminUpdateAdvertiserCampaign(
    $data: UpdateAdvertiserCampaignInput!
  ) {
    updateAdvertiserCampaign(data: $data) {
      id
      slug
      statusId
      metadatas {
        languageId
        name
        description
        banner {
          id
          url
        }
      }
    }
  }
`);

export const AdminAdvertiserCampaignForm = ({
  campaign,
  dictionary,
  languageId,
  languages,
}: {
  languageId: string;
  campaign: Partial<AdvertiserCampaignFormState>;
  dictionary: Dictionary["admin"]["campaign"]["manage"];
  languages: AdminAdvertiserCampaignDetailPageQueryQuery["languages"];
}) => {
  const router = useRouter();
  const session = useSession();
  const [update] = useMutation(UPDATE_MUTATION);
  const formDefaultValues = useMemo(() => {
    if (!languages.length) return campaign;

    const metadataByLang = new Map<string, AdvertiserCampaignMetadataState>();
    campaign.metadatas?.forEach((metadata: AdvertiserCampaignMetadataState) => {
      metadataByLang.set(metadata.languageId, metadata);
    });

    const metadatas = languages.map((lang) => {
      const existingMetadata = metadataByLang.get(lang.id);
      return {
        languageId: lang.id,
        name: existingMetadata?.name || "",
        description: existingMetadata?.description || "",
        bannerId: existingMetadata?.bannerId,
        banner: existingMetadata?.banner,
      };
    });

    return {
      ...campaign,
      metadatas,
    };
  }, [campaign, languages]);

  const schema = useMemo(() => {
    return object({
      id: string(),
      slug: string().min(1, dictionary.slugRequired),
      statusId: boolean(),
      metadatas: array(
        object({
          languageId: string(),
          name: string().min(1, dictionary.nameRequired),
          description: string().min(1, dictionary.descriptionRequired),
          bannerId: string().optional(),
          banner: string().optional(),
        })
      ),
    }) as z.ZodType<AdvertiserCampaignFormState>;
  }, [
    dictionary.slugRequired,
    dictionary.nameRequired,
    dictionary.descriptionRequired,
  ]);

  const handleSubmit: SubmitHandler<AdvertiserCampaignFormState> = async (
    data
  ) => {
    try {
      const metadatas = data.metadatas.map((metadata) => ({
        languageId: metadata.languageId,
        name: metadata.name,
        description: metadata.description,
        bannerId: metadata.bannerId,
      }));

      await update({
        variables: {
          data: {
            id: data.id,
            slug: data.slug,
            statusId: data.statusId
              ? AdvertiserCampaignStatusEnum.Active
              : AdvertiserCampaignStatusEnum.Inactive,
            metadatas,
          },
        },
        context: {
          headers: {
            Authorization: `Bearer ${session?.data?.accessToken}`,
            "Accept-Language": languageId,
          },
        },
      });

      toast(dictionary.updateSuccessMessage, {
        type: "success",
      });

      router.push(`/${languageId}/admin/campaign`);
    } catch (error) {
      toast((error as ApolloError).message, {
        type: "error",
      });
    }
  };

  return (
    <Card>
      <ControlledForm<AdvertiserCampaignFormState>
        submitButtonLabel={dictionary.updateCampaign}
        schema={schema}
        defaultValues={formDefaultValues}
        onSubmit={handleSubmit}
      >
        <Title>{dictionary.campaignDetails}</Title>
        <ControlledTextInput
          required
          name="slug"
          label={dictionary.slugLabel}
        />
        <ControlledSwitch label={dictionary.statusLabel} name="statusId" />

        {languages.length > 0 && (
          <>
            <Title className="mt-6">{dictionary.campaignMetadata}</Title>
            <Tabs defaultValue={languages[0]?.id}>
              <TabsList>
                {languages.map((lang) => (
                  <TabsTrigger key={lang.id} value={lang.id}>
                    {lang.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              {languages.map((lang, index: number) => (
                <TabsContent
                  key={lang.id}
                  value={lang.id}
                  className="space-y-4"
                >
                  <ControlledTextInput
                    required
                    name={`metadatas[${index}].name`}
                    label={dictionary.nameLabel}
                  />
                  <ControlledTextInput
                    required
                    name={`metadatas[${index}].description`}
                    label={dictionary.descriptionLabel}
                  />
                  <ControlledImageInput
                    name={`metadatas[${index}].banner`}
                    label={dictionary.bannerImageLabel}
                    idKey={`metadatas[${index}].bannerId`}
                  />
                  <input
                    type="hidden"
                    name={`metadatas[${index}].languageId`}
                    value={lang.id}
                    data-form-type="other"
                  />
                </TabsContent>
              ))}
            </Tabs>
          </>
        )}
      </ControlledForm>
    </Card>
  );
};
