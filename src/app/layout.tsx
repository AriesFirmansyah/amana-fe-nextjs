// Globals.css
import "@/app/_/styles/globals.css";

// Radix UI
import "@radix-ui/themes/styles.css";

// Moment
import moment from "moment";
import "moment/locale/id";

import { Fonts } from "@/core/constant/fonts";
import { ReduxProvider } from "@/app/_/layouts/provider/redux";
import { Metadata, Viewport } from "next";

import { cn } from "@/core/libraries/tailwind";
import ErrorBoundary from "./_/layouts/errors/error-boundary";
import { DefaultLayout } from "./_/layouts/default";
import { ReactQueryProvider } from "./_/layouts/provider/react-query";
import { HTTPProvider } from "./(modules)/authentication/core/HTTPProvider";
import { AccountProvider } from "./(modules)/authentication/core/AccountProvider";

moment.locale("id");

type Props = {
  children: Readonly<React.ReactNode>;
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "Amana Whistleblowing Platform",
  },
  description: "Secure Whistleblowing & Case Management Platform",
  icons: {
    icon: [
      {
        url: "/assets/favicons/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/assets/favicons/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/assets/favicons/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        url: "/assets/favicons/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/assets/favicons/apple-icon-57x57.png",
        sizes: "57x57",
        type: "image/png",
      },
      {
        url: "/assets/favicons/apple-icon-60x60.png",
        sizes: "60x60",
        type: "image/png",
      },
      {
        url: "/assets/favicons/apple-icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        url: "/assets/favicons/apple-icon-76x76.png",
        sizes: "76x76",
        type: "image/png",
      },
      {
        url: "/assets/favicons/apple-icon-114x114.png",
        sizes: "114x114",
        type: "image/png",
      },
      {
        url: "/assets/favicons/apple-icon-120x120.png",
        sizes: "120x120",
        type: "image/png",
      },
      {
        url: "/assets/favicons/apple-icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        url: "/assets/favicons/apple-icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        url: "/assets/favicons/apple-icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/assets/favicons/manifest.json",
  other: {
    "msapplication-TileColor": "#ffffff",
    "msapplication-TileImage": "/assets/favicons/ms-icon-144x144.png",
  },
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body
        className={cn(
          Fonts.className,
          "relative w-full h-screen grid items-start",
          "overflow-auto",
        )}
      >
        <ErrorBoundary>
          <ReactQueryProvider>
            <ReduxProvider>
              <HTTPProvider>
                <AccountProvider>
                  <DefaultLayout>{children}</DefaultLayout>
                </AccountProvider>
              </HTTPProvider>
            </ReduxProvider>
          </ReactQueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
