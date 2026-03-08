"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import PortfolioPreview from "../../../components/PortfolioPreview";

export default function EditPortfolioPage() {
  const t = useTranslations("adminAlerts");
  const tAdmin = useTranslations("admin");
  const tCommon = useTranslations("common");
  const router = useRouter();
  const params = useParams();

  const locale = params.locale as string;
  const id = params.id as string;

  const [form, setForm] = useState<any>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProject() {
      const res = await fetch(`/api/portfolio/${id}`);
      if (!res.ok) return;
      const data = await res.json();
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

    const formData = new FormData();
    formData.set("title", form.title);
    formData.set("description", form.description ?? "");
    formData.set("cover_image", form.cover_image ?? "");
    if (imageFile) formData.set("image", imageFile);

    const res = await fetch(`/api/portfolio/${id}`, {
      method: "PUT",
      body: formData,
    });
    const result = await res.json();

    if (!result.success) {
      alert(result.error ?? t("updateError"));
      return;
    }

    router.push(`/${locale}/admin/portfolio`);
    router.refresh();
  }

  if (!form) return <p>{tCommon("loading")}</p>;

  return (
    <div className="grid grid-cols-2 gap-12 p-10">

      <div>

        <h1 className="text-3xl font-bold mb-10">
          {t("editPortfolio")}
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
            {tAdmin("update")}
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