import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://nextra.site"),
  title: {
    template: "%s - Project Docs Kit",
  },
  description: "Project Docs Kit: The best way to build a Project Documentation",
  applicationName: "Project Docs Kit",
  generator: "Next.js",
  appleWebApp: {
    title: "Project Docs Kit",
  },
  other: {
    "msapplication-TileImage": "/ms-icon-144x144.png",
    "msapplication-TileColor": "#fff",
  },
  twitter: {
    site: "https://docs-kit.khuong.dev",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navbar = (
    <Navbar
      logo={
        <div>
          <b>Project Docs Kit</b>{" "}
          <span style={{ opacity: "30%" }}>
            The best way to build a Project Documentation
          </span>
        </div>
      }
      projectLink="https://github.com/lamngockhuong/project-docs-kit"
    />
  );
  const pageMap = await getPageMap();
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head faviconGlyph="✦" />
      <body>
        <Layout
          navbar={navbar}
          footer={
            <Footer className="py-8">
              <div className="mx-auto px-4 sm:px-6">
                <div className="text-center">
                  <p>
                    Built with ❤️ {new Date().getFullYear()} by{" "}
                    <a href="https://khuong.dev" target="_blank">
                      Khuong Dev
                    </a>
                  </p>
                </div>
              </div>
            </Footer>
          }
          editLink="Edit this page on GitHub"
          docsRepositoryBase="https://github.com/lamngockhuong/project-docs-kit/tree/main/docs"
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          pageMap={pageMap}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
