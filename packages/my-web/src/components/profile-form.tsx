"use client";

import { Dictionary } from "@/dictionaries";
import { ProfileDto } from "@/services/api";
import { client } from "@/services/client";
import { logError } from "@/services/error";
import { ControlledForm } from "@tekminewe/mint-ui/form";
import { ControlledSelect } from "@tekminewe/mint-ui/select";
import { ControlledTextInput } from "@tekminewe/mint-ui/text-input";
import { toast } from "@tekminewe/mint-ui/toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import { object, string, enum as enum_ } from "zod";

interface ProfileFormState {
  firstName: string;
  lastName: string;
  languageId: ProfileDto["languageId"];
}

export const ProfileForm = ({
  dictionary,
  profile,
}: {
  dictionary: Dictionary["profile"]["profileForm"];
  profile: ProfileDto;
}) => {
  const session = useSession();
  const router = useRouter();
  const handleSubmit: SubmitHandler<ProfileFormState> = async (data) => {
    try {
      const res = await client.profiles.updateMyProfile(data, {
        headers: {
          Authorization: `Bearer ${session.data?.accessToken}`,
        },
      });
      if (!res.ok) {
        throw res.error;
      }
      router.refresh();

      toast(dictionary.updateProfileSuccess, {
        type: "success",
      });
    } catch (e) {
      logError(e as Error);
      toast(dictionary.updateProfileError, {
        type: "error",
      });
    }
  };

  return (
    <ControlledForm<ProfileFormState>
      keepValuesOnSubmit
      defaultValues={profile}
      submitButtonLabel={dictionary.updateProfileButton}
      schema={object({
        firstName: string({
          required_error: dictionary.firstNameEmptyError,
        })
          .min(1, dictionary.firstNameEmptyError)
          .max(35, dictionary.firstNameTooLongError),
        lastName: string({
          required_error: dictionary.lastNameEmptyError,
        })
          .min(1, dictionary.lastNameEmptyError)
          .max(35, dictionary.lastNameTooLongError),
        languageId: enum_(["EN_MY", "ZH_MY"]),
      })}
      onSubmit={handleSubmit}
    >
      <ControlledTextInput
        label={dictionary.firstNameLabel}
        placeholder={dictionary.firstNamePlaceholder}
        name="firstName"
      />
      <ControlledTextInput
        label={dictionary.lastNameLabel}
        placeholder={dictionary.lastNamePlaceholder}
        name="lastName"
      />
      <ControlledSelect
        label={dictionary.languageLabel}
        placeholder={dictionary.languagePlaceholder}
        name="languageId"
        options={[
          { label: "English", value: "EN_MY" },
          { label: "中文", value: "ZH_MY" },
        ]}
      />
    </ControlledForm>
  );
};
