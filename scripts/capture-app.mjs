// Captures the React Native app (Expo web preview running on sample data) and builds landscape
// "three phones" slides into public/screens/mobile-app/.
// 1) In F:\istudio-mobile-app run:  EXPO_PUBLIC_MOCK=1 BROWSER=none npx expo start --web --port 8099
// 2) Here run:                      node scripts/capture-app.mjs && npm run screens
import { chromium } from 'playwright-core'
import { mkdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const APP = process.env.APP_URL || 'http://localhost:8099'
const OUT = join(process.cwd(), 'screens-src', 'mobile-app')
const RAW = join(tmpdir(), 'istudio-app-shots')
mkdirSync(OUT, { recursive: true })
mkdirSync(RAW, { recursive: true })

const screens = {
  dashboard: '/', training: '/training', skill: '/skill', project: '/project', hiring: '/hiring',
  ambassador: '/campus-ambassador', allocation: '/internship-allocation', status: '/payment-status',
  applications: '/applications', chat: '/chat', activities: '/activities', profile: '/profile', roadmap: '/career-roadmap',
}

// slide name → [three screens, caption]
const slides = {
  cover: [['dashboard', 'training', 'hiring']],
  tabs: [['skill', 'project', 'ambassador']],
  payments: [['allocation', 'status', 'dashboard']],
  chat: [['hiring', 'applications', 'chat']],
  push: [['activities', 'profile', 'roadmap']],
}

const browser = await chromium.launch({ executablePath: CHROME, headless: true })
const phone = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
// The dev preview shows warnings as a red toast (#error-toast, inside a shadow root) — hide it for clean shots.
await phone.addInitScript(() => {
  const css = document.createElement('style')
  css.textContent = '#error-toast { display: none !important; }'
  document.addEventListener('DOMContentLoaded', () => document.head.appendChild(css))
})
const page = await phone.newPage()
for (const [name, route] of Object.entries(screens)) {
  try {
    await page.goto(APP + route, { waitUntil: 'networkidle', timeout: 90000 }).catch(() => {})
    await page.waitForFunction(() => document.body && document.body.innerText.trim().length > 40, null, { timeout: 60000 }).catch(() => {})
    await page.waitForTimeout(2500)
    // Remove development-only warning toasts (LogBox) so they never appear in a screenshot.
    await page.evaluate(() => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
      const hits = []
      let n
      while ((n = walker.nextNode())) if (/cannot contain a nested|Warning:|Uncaught/i.test(n.nodeValue || '')) hits.push(n.parentElement)
      for (let el of hits) {
        // climb to the positioned toast container and drop it
        while (el && el !== document.body && !['fixed', 'absolute'].includes(getComputedStyle(el).position)) el = el.parentElement
        if (el && el !== document.body) el.style.display = 'none'
      }
    })
    await page.waitForTimeout(200)
    await page.screenshot({ path: join(RAW, `${name}.png`) })
    console.log('  ✓ screen', name)
  } catch (e) { console.log('  ✗ screen', name, e.message.split('\n')[0]) }
}
await phone.close()

const desk = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
for (const [slide, [trio]] of Object.entries(slides)) {
  const imgs = trio.map((s) => {
    try { return 'data:image/png;base64,' + readFileSync(join(RAW, `${s}.png`)).toString('base64') } catch { return null }
  }).filter(Boolean)
  if (!imgs.length) continue
  await desk.setContent(`<!doctype html><html><body style="margin:0;width:1440px;height:900px;display:flex;align-items:center;justify-content:center;gap:56px;
    background:radial-gradient(90% 90% at 50% 0%,#24476f,#1e3a5f 50%,#0f2340);font-family:sans-serif">
    ${imgs.map((src, i) => `<div style="width:340px;height:736px;border-radius:44px;background:#0f172a;padding:12px;box-shadow:0 30px 60px rgba(0,0,0,.45);transform:translateY(${i === 1 ? -14 : 14}px)">
      <img src="${src}" style="width:100%;height:100%;object-fit:cover;object-position:top;border-radius:34px;display:block"></div>`).join('')}
  </body></html>`)
  await desk.waitForTimeout(400)
  await desk.screenshot({ path: join(OUT, `${slide}.jpg`), type: 'jpeg', quality: 88 })
  console.log('  ✓ slide', slide)
}
await browser.close()

import('./optimize.mjs').then((m) => m.optimize())
