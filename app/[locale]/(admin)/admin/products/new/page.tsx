'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function NewProductPage() {
  const t = useTranslations('adminAlerts')
  const tAdmin = useTranslations('admin')

  const [title, setTitle] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      alert(t('selectFile'))
      return
    }

    const formData = new FormData()
    formData.set('title', title)
    formData.set('image', file)

    const res = await fetch('/api/products', {
      method: 'POST',
      body: formData,
    })
    const result = await res.json()

    if (!result.success) {
      alert(result.error ?? t('productAddError'))
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