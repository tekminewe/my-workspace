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

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionServer();
  if (!session) {
    redirect("/");
  }
  return children;
}
