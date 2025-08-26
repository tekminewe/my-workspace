import { PermissionDto } from '@/services/api';
import { Sidebar, SidebarHeader } from '@tekminewe/mint-ui/sidebar';
import { SidebarMenu } from './sidebar-menu';
import { Dictionary } from '@/dictionaries';

export const AdminSidebar = ({
  permissions,
  language,
  dictionary,
  site,
  languages,
}: {
  permissions: PermissionDto['name'][];
  language: string;
  dictionary: Dictionary['admin'] & { navbar: Dictionary['navbar'] };
  site?: {
    id: string;
    name: string;
    logo?: { id: string; url: string } | null;
    metadatas: Array<{
      name: string;
      description?: string | null;
      logo?: { id: string; url: string } | null;
      darkLogo?: { id: string; url: string } | null;
      languageId: string;
    }>;
  };
  languages?: Array<{
    id: string;
    name: string;
    code: string;
    shortName: string;
    isSupported: boolean;
    isDefault: boolean;
  }>;
}) => {
  const menu = {
    carousel:
      permissions.includes('ManageCarousel') ||
      permissions.includes('ViewCarousel'),
    advertiser:
      permissions.includes('ManageAdvertiser') ||
      permissions.includes('ViewAdvertiser'),
    blog:
      permissions.includes('ManagePost') || permissions.includes('ViewPost'),
    campaign:
      permissions.includes('ManageAdvertiser') ||
      permissions.includes('ViewAdvertiser'),
    bonus: permissions.includes('AdminPanel'), // Show for all admin users for now
    site:
      permissions.includes('ManageSite') || permissions.includes('ViewSite'),
    'image-test': permissions.includes('AdminPanel'), // Show for all admin users
  };

  // Get the current language metadata for logo
  const currentMetadata = site?.metadatas?.find(
    (m) => m.languageId === language,
  );

  // Determine which logo to show - prioritize language-specific logo
  const logoUrl = currentMetadata?.logo?.url || site?.logo?.url;
  const siteName =
    currentMetadata?.name || site?.name || dictionary.navbar.dropdownMenu.admin;

  return (
    <Sidebar>
      <SidebarHeader>
        {logoUrl && (
          <img
            src={logoUrl}
            alt={`${siteName} Logo`}
            className="w-8 h-8 object-contain rounded-lg"
          />
        )}
        <span className="text-lg font-semibold">{siteName}</span>
      </SidebarHeader>
      <SidebarMenu menus={menu} languageId={language} dictionary={dictionary} />
    </Sidebar>
  );
};
