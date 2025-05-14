'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const ContactSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Invalid email address'),
  subject: z.string().optional(),
  message: z.string().min(5, 'Message too short'),
})
type ContactData = z.infer<typeof ContactSchema>

export function ContactForm() {
  const [sent, setSent] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactData>({
    resolver: zodResolver(ContactSchema),
  })

  async function onSubmit(data: ContactData) {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      setSent(true)
      reset()
    } else {
      // you could show an error banner here
    }
  }

  if (sent) {
    return (
      <div className="p-4 bg-green-900 rounded text-green-200">
        Thanks! I’ll get back to you shortly.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          placeholder='Name'
          {...register('name')}
          className="mt-1 w-full bg-[#252526] border border-[#3c3c3c] rounded px-3 py-2 text-[#d4d4d4] focus:outline-none focus:ring-2 focus:ring-[#007acc]"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          {...register('email')}
          className="mt-1 w-full bg-[#252526] border border-[#3c3c3c] rounded px-3 py-2 text-[#d4d4d4] focus:outline-none focus:ring-2 focus:ring-[#007acc]"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Subject</label>
        <input
          {...register('subject')}
          className="mt-1 w-full bg-[#252526] border border-[#3c3c3c] rounded px-3 py-2 text-[#d4d4d4] focus:outline-none focus:ring-2 focus:ring-[#007acc]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Message</label>
        <textarea
          {...register('message')}
          rows={4}
          className="mt-1 w-full bg-[#252526] border border-[#3c3c3c] rounded px-3 py-2 text-[#d4d4d4] focus:outline-none focus:ring-2 focus:ring-[#007acc]"
        />
        {errors.message && (
          <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-block bg-[#007acc] hover:bg-[#005a9e] text-white font-medium px-6 py-2 rounded transition"
      >
        {isSubmitting ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
