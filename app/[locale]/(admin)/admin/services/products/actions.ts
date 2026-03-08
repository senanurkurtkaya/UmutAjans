'use server'

import { revalidatePath } from 'next/cache'
import { getBaseUrl } from '@/lib/api-base-url'

export async function createProduct(formData: FormData) {
  const base = await getBaseUrl()
  const title = formData.get('title') as string
  const image_url = formData.get('image_url') as string

  await fetch(`${base}/api/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, image_url }),
  })

  revalidatePath('/')
}