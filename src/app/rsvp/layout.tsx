import { PublicSiteChrome } from "@/components/layout/PublicSiteChrome";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PublicSiteChrome>{children}</PublicSiteChrome>;
}
