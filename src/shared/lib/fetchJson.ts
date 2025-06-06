// src/shared/lib/fetchJson.ts
export async function fetchJson<T>(url: string): Promise<T> {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Fetch failed (${res.status})`)
    return res.json() as Promise<T>
  }
  