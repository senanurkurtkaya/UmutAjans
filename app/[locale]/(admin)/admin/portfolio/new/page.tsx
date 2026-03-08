"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function NewPortfolioPage() {
  const t = useTranslations("adminAlerts");
  const tAdmin = useTranslations("admin");
  const router = useRouter();
  const params = useParams();

  const locale = params.locale as string;

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

    const formData = new FormData();
    formData.set("title", form.title);
    formData.set("slug", form.slug);
    formData.set("description", form.description);
    formData.set("client", form.client);
    formData.set("year", form.year);
    formData.set("category", form.category);
    if (imageFile) formData.set("image", imageFile);

    const res = await fetch("/api/portfolio", {
      method: "POST",
      body: formData,
    });
    const result = await res.json();

    if (!result.success) {
      alert(result.error ?? t("projectAddError"));
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