// Turns raw screenshots (raw-screens/<project>/*.jpg) into framed slides:
// a browser window with the real URL, rounded corners and a soft shadow on a cool gradient.
// Usage: node scripts/polish.mjs [project-slug ...]
import { chromium } from 'playwright-core'
import { readdirSync, readFileSync, mkdirSync, existsSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { optimize } from './optimize.mjs'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const RAW = join(process.cwd(), 'raw-screens')
const OUT = join(process.cwd(), 'screens-src')

// Background per project (cool palette, matches the site).
const BG = {
  'student-dashboard': ['#24476f', '#1e3a5f', '#0f2340'],
  'hire-portal': ['#1f6f68', '#134e4a', '#0b2f2c'],
  'admin-panel': ['#334155', '#1e293b', '#0f172a'],
  'learning-portal': ['#2b6c8f', '#1e4f6e', '#0f2d40'],
  'synthetic-monitoring': ['#3b4a6b', '#26324d', '#141c30'],
  'avir-client-portal': ['#1d6b6b', '#0e4f55', '#082d33'],
  'mm-capital': ['#2a3550', '#1b2338', '#0e1424'],
}

const page = (src, url, [a, b, c]) => `<!doctype html><html><body style="margin:0;width:1440px;height:900px;display:grid;place-items:center;
  background:radial-gradient(110% 90% at 50% 0%, ${a} 0%, ${b} 50%, ${c} 100%);font-family:'Segoe UI',system-ui,sans-serif;overflow:hidden">
  <div style="position:absolute;inset:0;opacity:.07;background-image:linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px);background-size:56px 56px"></div>
  <div id="win" style="position:relative;width:1440px;overflow:hidden;background:#fff">
    <div style="height:42px;display:flex;align-items:center;gap:8px;padding:0 16px;background:#f1f5f9;border-bottom:1px solid #e2e8f0">
      <i style="width:12px;height:12px;border-radius:50%;background:#f87171"></i><i style="width:12px;height:12px;border-radius:50%;background:#fbbf24"></i><i style="width:12px;height:12px;border-radius:50%;background:#34d399"></i>
      <div style="margin-left:14px;flex:1;height:26px;border-radius:999px;background:#fff;border:1px solid #e2e8f0;display:flex;align-items:center;padding:0 14px;font-size:13px;color:#475569;font-family:Consolas,monospace;white-space:nowrap;overflow:hidden">🔒&nbsp; ${url}</div>
    </div>
    <img src="${src}" style="display:block;width:1440px;height:900px;object-fit:cover;object-position:top">
  </div>
</body></html>`

export async function polish(only = []) {
  if (!existsSync(RAW)) return
  const browser = await chromium.launch({ executablePath: CHROME, headless: true })
  const tab = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
  let count = 0
  for (const slug of readdirSync(RAW)) {
    const dir = join(RAW, slug)
    if (!statSync(dir).isDirectory() || (only.length && !only.includes(slug))) continue
    const urls = existsSync(join(dir, 'urls.json')) ? JSON.parse(readFileSync(join(dir, 'urls.json'), 'utf8')) : {}
    mkdirSync(join(OUT, slug), { recursive: true })
    for (const f of readdirSync(dir).filter((x) => /\.(jpe?g|png)$/i.test(x))) {
      const name = f.replace(/\.(jpe?g|png)$/i, '')
      const url = (urls[name] || '').replace(/^https?:\/\//, '').replace(/\/$/, '')
        .replace(/\/netcore\//, '/marketing/').replace(/\/freshdesk/, '/helpdesk').replace(/\?.*$/, '') || slug
      const data = `data:image/${/png$/i.test(f) ? 'png' : 'jpeg'};base64,${readFileSync(join(dir, f)).toString('base64')}`
      await tab.setContent(page(data, url, BG[slug] || BG['admin-panel']))
      await tab.waitForTimeout(150)
      await tab.locator('#win').screenshot({ path: join(OUT, slug, `${name}.jpg`), type: 'jpeg', quality: 90 })
      count++
    }
  }
  await browser.close()
  console.log(`polished ${count} screenshots`)
  await optimize()
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) await polish(process.argv.slice(2))
