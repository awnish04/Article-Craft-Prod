import Navbar from "@/components/public/shared/Navbar";
import Footer from "@/components/public/shared/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
