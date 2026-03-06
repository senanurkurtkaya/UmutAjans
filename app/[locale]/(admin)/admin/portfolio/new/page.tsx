"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";

export default function NewPortfolioPage() {
  const t = useTranslations("adminAlerts");
  const tAdmin = useTranslations("admin");
  const router = useRouter();
  const params = useParams();

  const locale = params.locale as string;

  const supabase = createClient();

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    client: "",
    year: "",
    category: "",
  });

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

    let imageUrl = "";

    if (imageFile) {

const fileName = `${Date.now()}-${imageFile.name.replace(/\s/g, "-")}`;
      const { error: uploadError } = await supabase
        .storage
        .from("portfolio")
        .upload(fileName, imageFile);

      if (uploadError) {

        alert(t("imageUploadFailed"));
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
      .insert([
        {
          ...form,
          cover_image: imageUrl,
          published: true,
        },
      ]);

    if (error) {

      alert(t("projectAddError"));
      return;

    }

    router.push(`/${locale}/admin/portfolio`);

  }

  return (
    <div className="container max-w-2xl py-20">

      <h1 className="text-3xl font-bold mb-10">
        {t("newPortfolioProject")}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        <input
          name="title"
          placeholder={tAdmin("placeholderTitle")}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <input
          name="slug"
          placeholder={t("slug")}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <textarea
          name="description"
          placeholder={t("projectDescription")}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
        />

        <input
          name="client"
          placeholder={t("client")}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <input
          name="year"
          placeholder={t("year")}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <input
          name="category"
          placeholder={t("category")}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImageFile(e.target.files?.[0] || null)
          }
          className="file-input file-input-bordered w-full"
        />

        <button className="btn btn-primary w-full">
          {t("saveProject")}
        </button>

      </form>

    </div>
  );
}