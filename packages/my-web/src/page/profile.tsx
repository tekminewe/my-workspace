import { getDictionary } from '@/dictionaries';
import { ServerComponentProps } from '@/types';
import { Card } from '@tekminewe/mint-ui/card';
import { ProfileForm } from '@/components/profile-form';
import { getMyProfile } from '@/services/profile';
import { getSessionServer } from '@/services/auth/next';
import { ErrorMessage } from '@tekminewe/mint-ui/error-message';
import { Header } from '@tekminewe/mint-ui/typography';
import { logError } from '@/services/error';

export const ProfilePage = async ({ params }: ServerComponentProps<any>) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const session = await getSessionServer();
  const profile = await getMyProfile({
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  if (!profile.ok()) {
    logError(profile.error);
    return (
      <Card className="w-full">
        <ErrorMessage
          title={dictionary.common.error.title}
          message={dictionary.common.error.message}
        />
      </Card>
    );
  }
  return (
    <div className="mx-4 w-full">
      <Header className="mb-8">{dictionary.profile.title}</Header>
      <Card>
        <ProfileForm
          profile={profile.data}
          dictionary={dictionary.profile.profileForm}
        />
      </Card>
    </div>
  );
};
