import { ReactNode } from 'react';
import AdminSidebar from './components/AdminSidebar';
import AdminTopbar from './components/AdminTopbar';

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-neutral-950 text-white">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminTopbar />
        <main className="p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}