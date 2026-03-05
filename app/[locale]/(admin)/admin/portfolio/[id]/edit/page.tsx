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

        const { error } = await supabase
            .from("portfolio_projects")
            .update({
                title: form.title,
                description: form.description,
            })
            .eq("id", id);

        if (error) {

            console.error(error);
            alert("Güncelleme hatası");
            return;

        }

        // Liste sayfasına dön
        router.push(`/${locale}/admin/portfolio`);

        // Cache temizle ve yeniden fetch
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

                    <button className="btn btn-primary w-full">
                        Güncelle
                    </button>

                </form>

            </div>

            <PortfolioPreview project={form} />

        </div>
    );

}