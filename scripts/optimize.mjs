// Converts the high-res screenshots in screens-src/<project>/*.jpg into light WebP files for the site:
//   public/screens/<project>/<name>.webp     1600 px wide  (full-size view)
//   public/screens/<project>/<name>-sm.webp   800 px wide  (slider cards)
// Usage: node scripts/optimize.mjs   (runs automatically after capture / polish)
import sharp from 'sharp'
import { readdirSync, statSync, mkdirSync, existsSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const SRC = join(process.cwd(), 'screens-src')
const OUT = join(process.cwd(), 'public', 'screens')

export async function optimize() {
  if (!existsSync(SRC)) return
  let n = 0
  let bytes = 0
  for (const slug of readdirSync(SRC)) {
    const dir = join(SRC, slug)
    if (!statSync(dir).isDirectory()) continue
    const out = join(OUT, slug)
    mkdirSync(out, { recursive: true })
    // remove old jpg/png copies so only optimised files are published
    for (const f of readdirSync(out)) if (/\.(jpe?g|png)$/i.test(f)) rmSync(join(out, f))
    for (const f of readdirSync(dir).filter((x) => /\.(jpe?g|png)$/i.test(x))) {
      const name = f.replace(/\.(jpe?g|png)$/i, '')
      const img = sharp(join(dir, f))
      const big = await img.clone().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80, effort: 5 }).toFile(join(out, `${name}.webp`))
      const sm = await img.clone().resize({ width: 800, withoutEnlargement: true }).webp({ quality: 74, effort: 5 }).toFile(join(out, `${name}-sm.webp`))
      bytes += big.size + sm.size
      n++
    }
  }
  console.log(`optimised ${n} screenshots → ${(bytes / 1024 / 1024).toFixed(1)} MB total (both sizes)`)
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) await optimize()
