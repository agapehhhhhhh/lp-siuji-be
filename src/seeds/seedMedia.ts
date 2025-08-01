import path from 'path'
import fs from 'fs/promises'
import mime from 'mime-types'
import type { Payload } from 'payload'

export type MediaSeedItem = {
  key: string
  file: string
  alt?: string
}

export async function seedMediaFiles(
  payload: Payload,
  items: MediaSeedItem[],
): Promise<Record<string, string>> {
  const map: Record<string, string> = {}

  for (const item of items) {
    const filename = path.basename(item.file)

    // Cek jika sudah ada (idempotent)
    try {
      const existing = await payload.find({
        collection: 'media',
        where: { filename: { equals: filename } }, // sesuaikan kalau schema media berbeda
        limit: 1,
      })
      if (existing?.docs?.[0]) {
        map[item.key] = existing.docs[0].id as unknown as string
        continue
      }
    } catch (e) {
      console.warn(`⚠️  Skip existing-check for "${filename}" (find failed). Proceed to upload.`)
    }

    // Baca file lokal
    const absPath = path.resolve(process.cwd(), item.file)
    let buffer: Buffer
    try {
      buffer = await fs.readFile(absPath)
    } catch (err) {
      console.warn(`⚠️  Media file not found: ${item.file} — skip upload for "${item.key}"`)
      continue
    }

    // Pastikan mimetype terisi dan dalam bentuk string
    const mt = mime.lookup(filename) || 'application/octet-stream'
    const mimeString = String(mt)

    // Upload — sertakan name, size, *dan* kedua properti mimetype & mimeType
    try {
      const uploaded = await payload.create({
        collection: 'media',
        file: {
          data: buffer,
          name: filename,             // ← beberapa versi akses .name
          size: buffer.length,        // ← aman untuk kompatibilitas
          mimetype: mimeString,       // ← huruf kecil (yang biasanya dipakai multer/express)
        },
        data: {
          alt: item.alt ?? filename,
        },
      })

      map[item.key] = uploaded.id as unknown as string
      console.log(`📸 Uploaded media: ${filename} (id=${map[item.key]})`)
    } catch (e) {
      console.error(`❌ Upload failed for ${filename}:`, e)
      throw e
    }
  }

  return map
}
