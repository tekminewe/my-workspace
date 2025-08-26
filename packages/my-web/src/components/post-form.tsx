"use client";

import { ControlledTextInput } from "@tekminewe/mint-ui/text-input";
import { ControlledDateInput } from "@tekminewe/mint-ui/date-input";
import { ControlledForm } from "@tekminewe/mint-ui/form";
import { ControlledImageInput } from "@/components/controlled-image-input";
import { PostFormEditor0 } from "./post-form-editor0";
import { PostFormEditor } from "./post-form-editor1";
import { useDebouncedCallback } from "use-debounce";
import { useUpdatePostMutation } from "@/hooks/use-update-post-mutation";
import { toast } from "@tekminewe/mint-ui/toast";
import { ApolloError } from "@apollo/client";
import { useSession } from "next-auth/react";
import { UpdatePostInput } from "@/services/graphql";
export interface PostFormState {
  id?: string;
  title: string;
  content: string;
  postDate: string;
  slug: string;
  description: string;
  statusId: string;
  editorVersion: number;
  featuredImageId: string;
  featuredImage: string;
}

interface PostFormProps {
  languageId: string;
  defaultValues?: PostFormState;
}

export const PostForm = ({ defaultValues, languageId }: PostFormProps) => {
  const [updatePost] = useUpdatePostMutation();
  const { data: session } = useSession();

  const save = useDebouncedCallback(async (data: UpdatePostInput) => {
    try {
      await updatePost({
        variables: {
          id: defaultValues?.id,
          data,
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
  }, 1000);
  return (
    <ControlledForm<PostFormState>
      defaultValues={defaultValues}
      hideSubmitButton
    >
      <div className="flex flex-row gap-4">
        <div className="border rounded-2 mx-auto container">
          {defaultValues?.editorVersion !== 0 && (
            <PostFormEditor languageId={languageId} />
          )}
          {defaultValues?.editorVersion === 0 && <PostFormEditor0 />}
        </div>
        <div className="space-y-4 w-[375px] flex-shrink-0">
          <ControlledTextInput
            required
            label="Post Title"
            placeholder="Enter the post title"
            name="title"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => save({ title: e.target.value })}
          />
          <ControlledDateInput
            label="Post Date"
            placeholder="Enter the post date"
            showTime
            name="postDate"
            onChange={(date) => date && save({ postDate: date.toISOString() })}
          />
          <ControlledTextInput
            required
            label="Post Slug"
            placeholder="Enter the post slug"
            name="slug"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => save({ slug: e.target.value })}
          />
          <ControlledImageInput
            label="Featured Image"
            name="featuredImage"
            description="Recommended size: 1200x630"
            idKey="featuredImageId"
            onUploadSuccess={async ({ id }) => {
              await save({
                featuredImageId: id,
              });
            }}
          />
          <ControlledTextInput
            label="Meta Description"
            placeholder="Enter the description"
            name="description"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => save({ description: e.target.value })}
          />
          {/* <MultiSelect
              value={tags.map((tag) => tag.name)}
              options={tagOptions}
              onChange={handleTagsChange}
              onSearchValueChange={setTagSearch}
              allowCreate
              label="Tags"
              placeholder="Select the tags"
            /> */}
        </div>
      </div>
    </ControlledForm>
  );
};
