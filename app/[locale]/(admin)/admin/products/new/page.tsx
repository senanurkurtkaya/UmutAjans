'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { createClient } from '@/lib/supabase/client'

export default function NewProductPage() {
  const t = useTranslations('adminAlerts')
  const tAdmin = useTranslations('admin')
  const supabase = createClient()

  const [title, setTitle] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      alert(t('selectFile'))
      return
    }

    const fileName = `${Date.now()}-${file.name}`

    const { data: uploadData, error: uploadError } =
      await supabase.storage
        .from('products')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

    if (uploadError) {
      console.error(uploadError)
      console.log(uploadError)
      return
    }

    const { data: publicUrlData } = supabase.storage
      .from('products')
      .getPublicUrl(fileName)

    const image_url = publicUrlData.publicUrl

    const { error: insertError } = await supabase
      .from('products')
      .insert([
        {
          title: title,
          description: "",
          image_url: image_url,
          published: true
        }
      ])

    if (insertError) {
      console.error(insertError)
      alert(insertError.message)
      return
    }

    alert(t('productAdded'))

    setTitle('')
    setFile(null)
  }

  return (
    <div className="p-10">

      <h1 className="text-2xl font-bold mb-6">
        {t('newProduct')}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          className="border p-2 w-full"
          placeholder={tAdmin('placeholderTitle')}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {tAdmin('save')}
        </button>

      </form>

    </div>
  )
}