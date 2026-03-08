'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
// import { createClient } from '@/lib/supabase/client'

export default function NewServiceCard() {
  const t = useTranslations('adminAlerts')
  const tAdmin = useTranslations('admin')
  // const supabase = createClient()

  const [title, setTitle] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!title) {
      alert(t('titleRequired'))
      return
    }

    if (!imageFile) {
      alert(t('selectImage'))
      return
    }

    const fileName = Date.now() + "-" + imageFile.name

    // const { error: uploadError } = await supabase.storage
    //   .from('service-images')
    //   .upload(fileName, imageFile, { upsert: true })
    // if (uploadError) {
    //   console.log(uploadError)
    //   alert(t('uploadError'))
    //   return
    // }

    // const { data } = supabase.storage
    //   .from('service-images')
    //   .getPublicUrl(fileName)

    // const imageUrl = data.publicUrl

    // const { error } = await supabase
    //   .from('service_cards')
    //   .insert([
    //     {
    //       title,
    //       image_url: imageUrl,
    //       published: true
    //     }
    //   ])

    // if (error) {
    //   console.log(error)
    //   alert(t('dbError'))
    //   return
    // }

    alert(t('cardAdded'))

    setTitle('')
    setImageFile(null)
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