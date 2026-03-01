import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

        <nav className="space-y-4">
          <Link href="./admin" className="block hover:text-blue-400">
            Dashboard
          </Link>

          <Link href="./admin/services" className="block hover:text-blue-400">
            Services
          </Link>

          <Link href="./admin/users" className="block hover:text-blue-400">
            Users
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}