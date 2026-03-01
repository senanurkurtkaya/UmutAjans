'use client';

import { useState } from 'react';
import AddProductModal from '@/components/admin/AddProductModal';

type Product = {
  id: string;
  title: string;
  created_at: string;
};

export default function ProductsClient({ products }: { products: Product[] }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold">Products</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 px-4 py-2 rounded-lg text-white"
        >
          + Add Product
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-slate-900 p-5 rounded-xl">
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="text-sm text-gray-400 mt-2">{p.created_at}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <AddProductModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
} 