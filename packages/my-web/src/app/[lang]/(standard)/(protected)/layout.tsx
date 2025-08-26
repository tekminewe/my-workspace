import { getDictionary } from "@/dictionaries";
import { Sidebar } from "@/components/profile-sidebar";
import { ServerComponentProps } from "@/types";
import { getSessionServer } from "@/services/auth/next";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";

export const metadata = {
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function ProtectedLayout(
  props: ServerComponentProps<{
    children: React.ReactNode;
  }>
) {
  const params = await props.params;

  const { children } = props;

  const dictionary = await getDictionary(params.lang);
  const session = await getSessionServer();
  if (!session) {
    redirect("/");
  }
  return (
    <div className="container mx-auto flex my-6">
      <Sidebar dictionary={dictionary} />
      {children}
    </div>
  );
}
