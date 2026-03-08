'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

export default function NewServiceCard() {
  const t = useTranslations('adminAlerts')
  const tAdmin = useTranslations('admin')
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title) {
      alert(t('titleRequired'))
      return
    }

    if (!imageFile) {
      alert(t('selectImage'))
      return
    }

    const formData = new FormData()
    formData.set('title', title)
    formData.set('image', imageFile)

    const res = await fetch('/api/service-cards', {
      method: 'POST',
      body: formData,
    })
    const result = await res.json()

    if (!result.success) {
      alert(result.error ?? t('uploadError'))
      return
    }

    alert(t('cardAdded'))
    setTitle('')
    setImageFile(null)
    router.refresh()
  }

  return (

    <div className="p-10 max-w-lg">

      <h1 className="text-2xl font-bold mb-6">
        {t('newServiceCard')}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          placeholder={tAdmin('placeholderTitle')}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="border p-2 w-full"
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          {tAdmin('save')}
        </button>

      </form>

    </div>
  )
}