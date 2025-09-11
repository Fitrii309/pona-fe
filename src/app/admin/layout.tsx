import Sidebar from "@/components/ui/sidebar";

export default function adminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 pt-10 px-10 bg-gray-100">{children}</main>
    </div>
  );
}
