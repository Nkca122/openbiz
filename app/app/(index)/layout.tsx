import Header from "@/components/header";
import Footer from "@/components/footer";
export default function IndexLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="px-8 lg:px-32 pt-40 min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
