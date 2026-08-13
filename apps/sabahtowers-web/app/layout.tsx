// import type { Metadata } from "next";
// import type { ReactNode } from "react";
// import localFont from "next/font/local";
// import { getSeo } from "@/config/project";
// import "./globals.css";

// const inter = localFont({
//   src: [
//  { path: "./fonts/Inter-VariableFont_opsz,wght.ttf", style: "normal" },
// { path: "./fonts/Inter-Italic-VariableFont_opsz,wght.ttf", style: "italic" },
//   ],
//   variable: "--font-inter",
//   display: "swap",
// });

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ locale: string }>;
// }): Promise<Metadata> {
//   const { locale } = await params;
//   const seo = getSeo(locale);

//   return {
//     title: seo.projectName,
//     description: seo.projectDescription,
//     keywords: seo.keywords,
//   };
// }

// export default async function RootLayout({
//   children,
//   params,
// }: Readonly<{
//   children: ReactNode;
//   params: Promise<{ locale: string }>;
// }>) {
//   const { locale } = await params;

//   return (
//     <html lang={locale}>
//       <head>
//         <link
//           rel="stylesheet"
//           href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
//           integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
//           crossOrigin="anonymous"
//           referrerPolicy="no-referrer"
//         />
//       </head>
//       <body className={inter.variable}>{children}</body>
//     </html>
//   );
// }


import type { ReactNode } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}