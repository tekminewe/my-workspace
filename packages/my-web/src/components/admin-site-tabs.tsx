'use client';

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@tekminewe/mint-ui/tabs';
import { SiteForm } from '@/components/site-form';
import { SiteSettingsSection } from '@/components/site-settings-section';

type Language = {
  id: string;
  name: string;
  code: string;
  shortName: string;
  isSupported: boolean;
  isDefault: boolean;
};

type SiteMetadata = {
  name: string;
  description: string | null;
  logo: {
    id: string;
    url: string;
  } | null;
  darkLogo: {
    id: string;
    url: string;
  } | null;
  languageId: string;
};

type Site = {
  id: string;
  name: string;
  domain: string | null;
  description: string | null;
  logo: {
    id: string;
    url: string;
  } | null;
  metadatas: SiteMetadata[];
  createdAt: string;
  updatedAt: string;
};

interface AdminSiteTabsProps {
  site: Site;
  languages: Language[];
  currentLanguage: string;
  dictionary: any;
}

export const AdminSiteTabs = ({
  site,
  languages,
  currentLanguage,
  dictionary,
}: AdminSiteTabsProps) => {
  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="basic">{dictionary.generalInformation}</TabsTrigger>
        <TabsTrigger value="settings">
          {dictionary.settings?.title || 'Site Settings'}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="basic">
        <SiteForm
          site={site}
          languages={languages}
          currentLanguage={currentLanguage}
          dictionary={dictionary}
        />
      </TabsContent>

      <TabsContent value="settings">
        <SiteSettingsSection
          currentLanguage={currentLanguage}
          dictionary={dictionary}
        />
      </TabsContent>
    </Tabs>
  );
};
