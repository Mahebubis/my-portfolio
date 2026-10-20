// Captures screenshots of the live platforms, then "polishes" them into framed slides.
//   raw shots  →  raw-screens/<project>/<feature>.jpg   (not published)
//   polished   →  public/screens/<project>/<feature>.jpg (used by the site)
// Usage:  node scripts/capture.mjs [project-slug ...]      (no args = all projects below)
// Read-only: it only signs in and opens pages. It never submits forms or starts a payment.
import { chromium } from 'playwright-core'
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { polish } from './polish.mjs'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const RAW = join(process.cwd(), 'raw-screens')
const VIEW = { width: 1440, height: 900 }

const STUDENT = { email: 'maheboob.istudio@gmail.com', password: '12345678' }
const KEEP_EMAILS = [STUDENT.email, 'test_account@internshipstudio.com', 'maheboobkhan18202@gmail.com', 'demo.client@avirhealthpac.in', 'demo.admin@avirhealthpac.in']

// Every list row / card that does NOT mention the demo client gets blurred on Avir admin pages.
const AVIR_ONLY_DEMO = { blurUnless: 'Sunrise|Demo|demo\\.client|AHP-', blurIn: 'tbody tr, .ahp-list li, .ahp-person, .ahp-activity li, .ahp-feed li' }

const ADMIN_LOGIN = { path: '/login', email: 'input[type=email]', password: 'input[type=password]', submit: 'button:has-text("Sign In")', creds: { email: 'demo.admin@internshipstudio.com', password: 'DemoAdmin@2026' } }
// Admin tables hold real people: blur the first columns (name / email / phone) and ticket / contact names.
const ADMIN_BLUR = { blur: 'tbody td:nth-child(-n+3), [class*="ticket" i] [class*="subject" i], [class*="ticket" i] [class*="requester" i], [class*="contact" i] [class*="name" i]' }

const jobs = {
  'student-dashboard': {
    base: 'https://dashboard.internshipstudio.com',
    sessions: [{
      login: { path: '/login', email: '#email', password: '#password', submit: 'button:has-text("Sign in")', creds: STUDENT },
      shots: [
        ['cover', '/'],
        ['cit-exam', '/'],
        ['payments', '/internship-allocation'],
        ['internship-allocation', '/internship-allocation', { scroll: 700 }],
        ['training', '/training'],
        ['skills', '/skill'],
        ['projects-certificates', '/project'],
        ['hiring', '/jobs/new-listings'],
        ['campus-ambassador', '/campus-ambassador'],
        ['profile', '/profile'],
        ['career-roadmap', '/career-roadmap'],
      ],
    }],
  },
  'hire-portal': {
    base: 'https://hire.internshipstudio.com',
    sessions: [{
      login: { path: '/login', email: 'input[type=email]', password: 'input[type=password]', submit: 'button:has-text("Sign In")', creds: { email: 'test_account@internshipstudio.com', password: 'Test@123' } },
      shots: [
        ['cover', '/dashboard'],
        ['post-job', '/post-vacancy'],
        ['applications', '/applications', { blur: 'tbody td:nth-child(2), tbody td:nth-child(3), [class*="candidate" i] h3, [class*="candidate" i] h4' }],
        ['database', '/database', { blur: 'tbody td:nth-child(2)' }],
        ['chat', '/chat', { blur: '[class*="chat" i] [class*="name" i], [class*="message" i]' }],
        ['hire-top-talent', '/hire-top-talent', { blur: '[class*="card" i] h3, [class*="card" i] h4, [class*="name" i]' }],
      ],
    }],
  },
  'learning-portal': {
    base: 'https://training.internshipstudio.com',
    sessions: [{
      login: { path: '/signin', email: 'input[type=email]', password: 'input[type=password]', submit: 'button:has-text("SIGN IN")', creds: STUDENT },
      shots: [
        ['cover', '/'],
        ['player', '/enrollments', { clickFirst: 'a[href*="/course/"]' }],
        ['quizzes', '/favourites'],
        ['support', '/support'],
      ],
    }],
  },
  'avir-client-portal': {
    base: 'https://avirhealthpac.in',
    sessions: [
      {
        name: 'client',
        login: { path: '/client-login/', email: '#ahp_user', password: '#ahp_pass', submit: 'form button:has-text("Log in")', creds: { email: 'demo.client@avirhealthpac.in', password: 'AvirClient@2026' } },
        shots: [
          ['cover', '/client-portal/?view=dashboard'],
          ['client-dashboard', '/client-portal/?view=requirements'],
          ['client-dashboard-2', '/client-portal/?view=payments'],
          ['requirement', '/client-portal/?view=requirement&id=7'],
          ['requirement-2', '/client-portal/?view=documents'],
          ['requirement-3', '/client-portal/?view=updates'],
        ],
      },
      {
        name: 'admin',
        login: { path: '/client-login/', email: '#ahp_user', password: '#ahp_pass', submit: 'form button:has-text("Log in")', creds: { email: 'demo.admin@avirhealthpac.in', password: 'AvirDemo@2026' } },
        shots: [
          ['admin-dashboard', '/wp-admin/admin.php?page=ahp-dashboard', AVIR_ONLY_DEMO],
          ['admin-dashboard-2', '/wp-admin/admin.php?page=ahp-projects&action=view&id=7&tab=steps', AVIR_ONLY_DEMO],
          ['admin-dashboard-3', '/wp-admin/admin.php?page=ahp-projects&action=view&id=7&tab=payments', AVIR_ONLY_DEMO],
          ['templates', '/wp-admin/admin.php?page=ahp-templates'],
          ['templates-2', '/wp-admin/admin.php?page=ahp-projects&action=view&id=7&tab=form', AVIR_ONLY_DEMO],
          ['leads', '/wp-admin/admin.php?page=ahp-leads', { blur: 'tbody tr td:not(:first-child), .ahp-lead-card' }],
        ],
      },
    ],
  },
  'admin-panel': {
    base: 'https://adp.internshipstudio.com',
    sessions: [{
      login: ADMIN_LOGIN,
      shots: [
        ['cover', '/', ADMIN_BLUR],
        ['marketing', '/netcore/behaviour', ADMIN_BLUR],
        ['marketing-2', '/netcore/campaigns', ADMIN_BLUR],
        ['marketing-3', '/netcore/journeys', ADMIN_BLUR],
        ['marketing-4', '/netcore/segments', ADMIN_BLUR],
        ['spend', '/netcore/spend', ADMIN_BLUR],
        ['kumo', '/kumo', ADMIN_BLUR],
        ['kumo-2', '/kumo/ips', ADMIN_BLUR],
        ['caller-iq', '/caller-iq?tab=overview', ADMIN_BLUR],
        ['caller-iq-2', '/caller-iq?tab=agents', ADMIN_BLUR],
        ['helpdesk', '/freshdesk', ADMIN_BLUR],
        ['helpdesk-2', '/freshdesk/reports', ADMIN_BLUR],
        ['lms', '/lms', ADMIN_BLUR],
        ['lms-2', '/lms/courses', ADMIN_BLUR],
        ['tasks', '/tasks/board', ADMIN_BLUR],
        ['tasks-2', '/tasks/gantt', ADMIN_BLUR],
        ['ai-agents', '/ai-agents', ADMIN_BLUR],
        ['reports', '/reports/meta-new', ADMIN_BLUR],
        ['students', '/students/all', ADMIN_BLUR],
      ],
    }],
  },
  'synthetic-monitoring': {
    base: 'https://adp.internshipstudio.com',
    sessions: [{
      login: ADMIN_LOGIN,
      shots: [
        ['cover', '/monitoring', ADMIN_BLUR],
        ['history', '/monitoring', { ...ADMIN_BLUR, scroll: 800 }],
      ],
    }],
  },
  'mm-capital': {
    base: 'https://www.mmcapital.in',
    sessions: [{
      shots: [
        ['cover', '/'],
        ['home', '/', { scroll: 900 }],
        ['services', '/services'],
        ['contact', '/contact'],
      ],
    }],
  },
}

/** Hide pop-ups, tours, chat bubbles and demo ribbons; mask other people's emails and phone numbers. */
async function tidy(page) {
  await page.keyboard.press('Escape').catch(() => {})
  await page.evaluate((keep) => {
    const vw = innerWidth, vh = innerHeight
    document.querySelectorAll('.driver-overlay, .driver-popover, [class*="driver-"], [class*="joyride"], .__floater, iframe[title*="chat" i], [id*="chaty"], .chaty-widget').forEach((e) => e.remove())
    for (const el of document.querySelectorAll('body *')) {
      const cs = getComputedStyle(el)
      if (cs.position !== 'fixed') continue
      const r = el.getBoundingClientRect()
      const big = r.width * r.height > vw * vh * 0.35
      const header = r.top <= 2 && r.height < 120
      if ((big && !header && Number(cs.zIndex) > 10) || /Read-only demo/.test(el.textContent || '')) el.style.display = 'none'
    }
    window.scrollTo(0, 0)
    document.body.style.overflow = 'auto'
    const emailRe = /[\w.+-]+@[\w-]+\.[\w.-]+/g
    const phoneRe = /(\+?91[\s-]?)?\b[6-9]\d{4}[\s-]?\d{5}\b/g
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    let n
    while ((n = walker.nextNode())) {
      const t = n.nodeValue
      if (!t || t.length < 6) continue
      const masked = t
        .replace(emailRe, (m) => (keep.includes(m.toLowerCase()) ? m : m[0] + '•••@•••.com'))
        .replace(phoneRe, (m) => (/90000/.test(m) ? m : '+91 •••••• ••••'))
      if (masked !== t) n.nodeValue = masked
    }
  }, KEEP_EMAILS)
}

async function login(page, base, l) {
  await page.goto(base + l.path, { waitUntil: 'networkidle', timeout: 60000 })
  await page.fill(l.email, l.creds.email)
  await page.fill(l.password, l.creds.password)
  await Promise.all([page.waitForLoadState('networkidle').catch(() => {}), page.click(l.submit)])
  await page.waitForTimeout(5000)
  console.log('  signed in →', page.url())
}

const wanted = process.argv.slice(2)
const browser = await chromium.launch({ executablePath: CHROME, headless: true })
for (const [slug, job] of Object.entries(jobs)) {
  if (wanted.length && !wanted.includes(slug)) continue
  console.log(slug)
  const dir = join(RAW, slug)
  mkdirSync(dir, { recursive: true })
  const urlsFile = join(dir, 'urls.json')
  const urls = existsSync(urlsFile) ? JSON.parse(readFileSync(urlsFile, 'utf8')) : {}
  for (const s of job.sessions) {
    const ctx = await browser.newContext({ viewport: VIEW, deviceScaleFactor: 2 })
    const page = await ctx.newPage()
    try {
      if (s.login) await login(page, job.base, s.login)
    } catch (e) {
      console.log('  login failed:', e.message.split('\n')[0])
      await ctx.close()
      continue
    }
    for (const [name, path, opt = {}] of s.shots) {
      try {
        await page.goto(job.base + path, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => {})
        await page.waitForTimeout(3500)
        if (opt.clickFirst) {
          const a = page.locator(opt.clickFirst).first()
          if (await a.count()) { await a.click(); await page.waitForTimeout(5000) }
        }
        await tidy(page)
        // Neutral wording: no third-party brand names visible in screenshots.
        await page.evaluate(() => {
          const map = [[/\bNetcore\b/gi, 'Marketing'], [/\bFreshdesk\b/gi, 'Helpdesk'], [/\bKumo MTA\b/gi, 'Email Server']]
          const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
          let n
          while ((n = w.nextNode())) { let t = n.nodeValue; for (const [re, s] of map) t = t.replace(re, s); if (t !== n.nodeValue) n.nodeValue = t }
          const css = document.createElement('style')
          css.textContent = '.ncx-logo{visibility:hidden!important} body > div[data-demo-ribbon]{display:none!important}'
          document.head.appendChild(css)
          for (const el of document.body.children) if (/^\s*Read-only demo/.test(el.textContent || '')) el.setAttribute('data-demo-ribbon', '')
          // demo ribbon: the smallest fixed element whose text starts with "Read-only demo"
          document.querySelectorAll('body *').forEach((el) => {
            if (/^\s*Read-only demo/.test(el.textContent || '') && el.textContent.length < 120 && getComputedStyle(el).position === 'fixed') el.style.setProperty('display', 'none', 'important')
          })
        })
        if (opt.blur) await page.addStyleTag({ content: `${opt.blur} { filter: blur(6px) !important; }` })
        if (opt.blurUnless) {
          await page.evaluate(({ re, sel }) => {
            const ok = new RegExp(re, 'i')
            document.querySelectorAll(sel).forEach((el) => { if (!ok.test(el.textContent || '')) el.style.filter = 'blur(6px)' })
          }, { re: opt.blurUnless, sel: opt.blurIn })
        }
        if (opt.scroll) { await page.mouse.wheel(0, opt.scroll); await page.waitForTimeout(1500) }
        await page.waitForTimeout(800)
        await page.screenshot({ path: join(dir, `${name}.jpg`), type: 'jpeg', quality: 92 })
        urls[name] = page.url()
        console.log('  ✓', name, '←', page.url())
      } catch (e) {
        console.log('  ✗', name, e.message.split('\n')[0])
      }
    }
    await ctx.close()
  }
  writeFileSync(urlsFile, JSON.stringify(urls, null, 2))
}
await browser.close()
await polish(wanted)
