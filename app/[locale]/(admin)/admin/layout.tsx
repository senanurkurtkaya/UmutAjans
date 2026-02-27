export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b p-4 font-semibold">
        Admin Panel
      </div>

      <main className="p-6">
        {children}
      </main>
    </div>
  );
}