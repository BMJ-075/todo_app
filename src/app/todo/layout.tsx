import type { Metadata } from "next";
import Navbar from "../_components/navbar";
import Footer from "../_components/footer";

export const metadata: Metadata = {
  title: "Todo App",
  description: "TODO app",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
