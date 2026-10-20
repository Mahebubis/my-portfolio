// Scans public/screens/<project>/ and writes src/data/screens.json
// { "<project>": ["cover.jpg", "cit-exam.jpg", "cit-exam-2.png", ...] }
// Runs automatically before `npm run dev` and `npm run build`.
import { readdirSync, statSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const root = join(process.cwd(), 'public', 'screens')
const out = {}
if (existsSync(root)) {
  for (const slug of readdirSync(root)) {
    const dir = join(root, slug)
    if (!statSync(dir).isDirectory()) continue
    // full-size WebP only; the matching "-sm.webp" is used automatically for slider cards
    const files = readdirSync(dir).filter((f) => /\.webp$/i.test(f) && !/-sm\.webp$/i.test(f)).sort()
    if (files.length) out[slug] = files
  }
}
writeFileSync(join(process.cwd(), 'src', 'data', 'screens.json'), JSON.stringify(out, null, 2) + '\n')
console.log('screens.json:', Object.entries(out).map(([k, v]) => `${k}=${v.length}`).join(' '))
