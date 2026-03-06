"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import PortfolioPreview from "../../../components/PortfolioPreview";

export default function EditPortfolioPage() {

  const router = useRouter();
  const params = useParams();

  const locale = params.locale as string;
  const id = params.id as string;

  const supabase = createClient();

  const [form, setForm] = useState<any>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {

    async function fetchProject() {

      const { data, error } = await supabase
        .from("portfolio_projects")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setForm(data);

    }

    fetchProject();

  }, [id]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  }

  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault();

    let imageUrl = form.cover_image;

    if (imageFile) {

      const fileName = `${Date.now()}-${imageFile.name.replace(/\s/g, "-")}`;

      const { error: uploadError } = await supabase
        .storage
        .from("portfolio")
        .upload(fileName, imageFile);

      if (uploadError) {
        alert("Görsel yüklenemedi");
        return;
      }

      const { data } = supabase
        .storage
        .from("portfolio")
        .getPublicUrl(fileName);

      imageUrl = data.publicUrl;

    }

    const { error } = await supabase
      .from("portfolio_projects")
      .update({
        title: form.title,
        description: form.description,
        cover_image: imageUrl,
      })
      .eq("id", id);

    if (error) {

      console.error(error);
      alert("Güncelleme hatası");
      return;

    }

    router.push(`/${locale}/admin/portfolio`);
    router.refresh();

  }

  if (!form) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-2 gap-12 p-10">

      <div>

        <h1 className="text-3xl font-bold mb-10">
          Portfolio Düzenle
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="input input-bordered w-full"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {

              const file = e.target.files?.[0] || null;
              setImageFile(file);

              if (file) {
                setPreviewUrl(URL.createObjectURL(file));
              }

            }}
            className="file-input file-input-bordered w-full"
          />

          <button className="btn btn-primary w-full">
            Güncelle
          </button>

        </form>

      </div>

      <PortfolioPreview
        project={{
          ...form,
          cover_image: previewUrl || form.cover_image
        }}
      />

    </div>
  );

}