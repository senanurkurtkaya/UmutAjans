export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-10">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-slate-800 p-6 rounded-xl">
          <h3 className="text-lg">Total Services</h3>
          <p className="text-3xl font-bold mt-4">5</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <h3 className="text-lg">Active Users</h3>
          <p className="text-3xl font-bold mt-4">12</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <h3 className="text-lg">Published Services</h3>
          <p className="text-3xl font-bold mt-4">4</p>
        </div>

      </div>
    </div>
  );
}