import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { name, email, subject, message } = await request.json()

  // TODO: hook into your email provider here
  console.log('[contact]', { name, email, subject, message })

  return NextResponse.json({ ok: true })
}