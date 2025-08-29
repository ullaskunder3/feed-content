import type { Metadata } from "next";
import "./globals.css";
import ApolloWrapper from "@/components/ApolloWrapper";

export const metadata: Metadata = {
  title: "Muze Feed",
  description: "Real-time feed with GraphQL + Apollo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
