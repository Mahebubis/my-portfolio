/**
 * Every project shown on the site.
 *
 * Screenshots: drop images into  public/screens/<slug>/<feature-id>.png  (or .jpg / .webp).
 * Up to three per feature: <feature-id>.png, <feature-id>-2.png, <feature-id>-3.png.
 * An optional cover image goes in  public/screens/<slug>/cover.png  (also shown on the home card).
 * An optional PDF write-up goes in  public/docs/<slug>.pdf
 * Missing files are simply hidden on the live site (placeholders show only in `npm run dev`).
 *
 * theme: bg / fg / accent (numbers, highlights) / chip colours for the stacked card.
 */

const DASH = 'https://dashboard.internshipstudio.com'
const ADP = 'https://adp.internshipstudio.com'
const HIRE = 'https://hire.internshipstudio.com'
const TRAIN = 'https://training.internshipstudio.com'

/* Cool, calm palette: navy · steel blue · teal · mint · sky · ice. Names kept so themes below stay readable. */
export const C = {
  indigo: '#1E3A5F',     // steel blue
  indigoDeep: '#134E4A', // deep teal
  lime: '#99F6E4',       // mint
  orange: '#BAE6FD',     // sky
  yellow: '#C7D2FE',     // periwinkle
  ink: '#0F172A',        // navy
  ink2: '#1E293B',       // slate navy
  paper: '#EEF2F6',
  cream: '#F8FAFC',
  red: '#0E7490',        // teal accent
  white: '#FFFFFF',
}

const studentLogin = {
  label: 'Student test account',
  email: 'maheboob.istudio@gmail.com',
  password: '12345678',
}

export const projects = [
  /* ───────────────────────── Student dashboard (with exam + payments) ───────────────────────── */
  {
    slug: 'student-dashboard',
    name: 'Student Dashboard',
    subtitle: 'Exams, payments, training & hiring in one app',
    kind: 'Core product',
    category: 'company',
    domain: 'dashboard.internshipstudio.com',
    url: DASH,
    period: '2025 — present',
    role: 'Full-stack: React features, PHP APIs, Go payment service, exam integration',
    theme: { bg: C.indigo, fg: C.white, accent: C.lime, chipBg: 'rgba(255,255,255,.12)', chipFg: C.white },
    tagline:
      'The main student platform. Students sit the aptitude exam, pay for an internship, train, build skills, submit projects, earn certificates and get hired, all in one React app.',
    overview: [
      'Every Internship Studio student lives here. They take the <b>CIT / iCAT aptitude exam</b>, pick an internship domain and batch, <b>pay</b>, train, build skills, submit projects, download certificates and apply to jobs posted by recruiters.',
      'The dashboard is a <b>React 18 + Vite</b> app on <b>PHP + MySQL</b> APIs. Behind it run two services I worked on: a <b>Node.js exam engine</b> and a <b>Go payment service</b>. Students never see them as separate sites; everything starts from the dashboard.',
    ],
    how: [
      '<b>Sign in</b> with email + password, Google One-Tap or a QR/PIN device login. The session lives in a secure, httpOnly cookie.',
      '<b>Take the exam</b> from the home page. The dashboard gets a one-time hash and opens the exam already signed in, so there is no second login.',
      '<b>Buy an internship.</b> The Go service prices it on the server (exam score, offer window, coupon), then checkout runs on Razorpay or Cashfree.',
      '<b>Learn and build.</b> Training tracks attendance and streaks, skills have levelled tests with a code editor, and projects unlock PDF certificates.',
      '<b>Get hired.</b> Jobs, screening questions, interviews, assignments and live chat with recruiters.',
    ],
    features: [
      {
        id: 'cit-exam',
        title: 'CIT / iCAT aptitude exam',
        path: '/',
        summary: 'A 30-minute timed exam that decides which internship offers a student gets. It is launched from the dashboard home page.',
        points: [
          'Node.js + Express exam engine on MySQL',
          'Random paper with a fixed topic mix: ⅓ logical, ⅓ visual, ⅙ data interpretation, ⅙ quant',
          'Timer anchored to the server: refresh or crash and you resume where you left off',
          'Anti-cheat: tab-switch warnings, auto-submit on the 5th switch',
          'Scoring in a locked transaction (no double submits), retest for low scores',
          'Results page with score, result date and participation certificate',
        ],
      },
      {
        id: 'payments',
        title: 'Payments & checkout (Go service)',
        path: '/internship-allocation',
        summary: 'I rewrote the payment backend from Node to Go so every payment settles exactly once, even if the student closes the tab.',
        points: [
          'Go (chi router, database/sql, slog), about 14k lines; I wrote 59 of its 64 commits',
          'Price computed on the server; Razorpay and Cashfree behind one interface, switched from the database',
          'Browser confirm, signed webhooks and a 5-minute reconciler all end in one idempotent MySQL transaction',
          'Recovers UPI-intent and closed-tab payments, so no paid student is left un-enrolled',
          'Four checkouts: internships, Starter Kit, ₹99 Skill Lab store, Global Internship',
          'Referral and Campus Ambassador rewards inside a SAVEPOINT, so a reward bug can never fail a payment',
        ],
      },
      { id: 'internship-allocation', title: 'Internship allocation', path: '/internship-allocation', summary: 'Domain and batch picker with price comparison and coupons.', points: ['Every visit is logged as a funnel step for marketing reports'] },
      { id: 'training', title: 'Training & Skill Lab', path: '/training', summary: 'My internships, the ₹99 Skill Lab, attendance and daily streaks.', points: ['Streak reminders and deadline extensions', 'One click into the learning portal (signed hand-off)'] },
      { id: 'skills', title: 'Skill tests & coding problems', path: '/skill', summary: 'Levelled assessments with radar charts, company-wise practice and a code editor.', points: ['Monaco editor with code execution', 'Shareable progress cards'] },
      { id: 'projects-certificates', title: 'Projects & certificates', path: '/project', summary: 'Task runner per internship; certificates drawn on canvas and exported as A4 PDFs.', points: ['html2canvas + jsPDF'] },
      { id: 'hiring', title: 'Jobs & recruiter chat', path: '/jobs/new-listings', summary: 'Job board, screening questions, interviews and real-time chat with recruiters.', points: ['Pusher private channel per application', 'Express apply with AI resume extraction'] },
      { id: 'campus-ambassador', title: 'Campus Ambassador program', path: '/campus-ambassador', summary: 'Referral program with a poster task, offer letter, wallet, leaderboard and UPI withdrawals.', points: ['Personal poster drawn on canvas and shared to WhatsApp', 'Live wallet updates; phone OTP via WhatsApp'] },
      { id: 'profile', title: 'Profile & AI resume autofill', path: '/profile', summary: 'Upload a resume and the profile fills itself.', points: ['pdf.js text extraction with OCR fallback', 'LLM parsing into structured fields', 'Face check on profile photos'] },
      { id: 'career-roadmap', title: 'Career roadmap', path: '/career-roadmap', summary: 'Pick target domains and see companies, salary bands and AI suggestions.', points: [] },
    ],
    tech: ['React 18', 'Vite', 'Redux Toolkit', 'Tailwind', 'PHP 8', 'MySQL', 'Go', 'Node.js', 'Razorpay', 'Cashfree', 'Pusher', 'OpenAI / Gemini', 'PWA'],
    highlights: [
      'Exactly-once payments across browser, webhook and reconciler.',
      'One student identity across the exam, LMS, recruiter portal and app.',
      'A refresh or crash never resets an exam attempt.',
      'Meta Conversions API events that de-duplicate against the browser pixel.',
    ],
    credentials: [{ ...studentLogin, url: `${DASH}/login`, note: 'The exam and checkout are inside this account. Payments are live, so please don’t complete one.' }],
  },

  /* ───────────────────────── Hire portal ───────────────────────── */
  {
    slug: 'hire-portal',
    name: 'Recruiter Portal',
    subtitle: 'Hiring workspace for companies',
    kind: 'Hiring SaaS',
    category: 'company',
    domain: 'hire.internshipstudio.com',
    url: HIRE,
    period: '2025 — present',
    role: 'Features, AI job posting, candidate search performance',
    theme: { bg: C.lime, fg: C.ink, accent: C.indigo, chipBg: 'rgba(20,19,24,.08)', chipFg: C.ink },
    tagline:
      'Companies post jobs, search the student pool, shortlist, chat, send assignments and schedule interviews. It shares one database with the student app, so both sides update instantly.',
    overview: [
      'Recruiters work on the same MySQL database students use. An application, a chat message or an interview invite shows up on the student’s dashboard straight away.',
      'Job posts are drafted by <b>Gemini</b>, candidate unlocks are paid with credits, and I rebuilt the candidate search for speed.',
    ],
    how: [
      'A recruiter signs up and posts a job with a multi-step form. Gemini writes the description and pulls out the skills.',
      'Applicants move through a pipeline: shortlist → assignment → interview → hire. Each change emails the student.',
      'The <b>Database</b> page searches every student by domain, skills, education and location. Unlocking a profile spends a credit.',
      'Chat runs live over Pusher, one private channel per application.',
    ],
    features: [
      { id: 'post-job', title: 'AI-assisted job posting', path: '/post-vacancy', summary: 'Screening questions, eligibility, pay and rounds; Gemini drafts the post.', points: ['Every AI call is logged with its cost'] },
      { id: 'applications', title: 'Applications pipeline', path: '/applications', summary: 'Statuses, notes, screening answers and a timeline per candidate.', points: [] },
      { id: 'database', title: 'Candidate database & filters', path: '/database', summary: 'Search the whole student pool with saved filters and credit unlocks.', points: ['Replaced 3N+1 queries with 4 batched queries', 'Covering indexes; EXISTS instead of DISTINCT joins'] },
      { id: 'chat', title: 'Real-time chat', path: '/chat', summary: 'Pusher chat per application with unread counters and bulk messages.', points: [] },
      { id: 'hire-top-talent', title: 'Hire Top Talent', path: '/hire-top-talent', summary: 'Curated profiles and shareable links for partner companies.', points: [] },
    ],
    tech: ['React 18', 'Vite', 'Redux Toolkit', 'MUI', 'Tailwind', 'PHP', 'MySQL', 'Pusher', 'Gemini', 'AWS S3', 'PWA'],
    highlights: ['One database for students and recruiters.', 'Much faster candidate search after removing N+1 queries.', 'Installable PWA, including an iOS install prompt.'],
    credentials: [{ label: 'Recruiter test account', email: 'test_account@internshipstudio.com', password: 'Test@123', url: `${HIRE}/login`, note: 'Recruiter workspace with jobs and candidates.' }],
  },

  /* ───────────────────────── Admin suite ───────────────────────── */
  {
    slug: 'admin-panel',
    name: 'Admin Suite',
    subtitle: 'The company’s operating system',
    kind: 'Internal platform',
    category: 'company',
    domain: 'adp.internshipstudio.com',
    url: ADP,
    period: '2026',
    role: 'Built the platform and its big modules (all 51 commits)',
    theme: { bg: C.ink2, fg: C.cream, accent: C.orange, chipBg: 'rgba(255,255,255,.08)', chipFg: C.cream },
    tagline:
      'About 200 routes and 390 screens: marketing automation, our own email server panel, call analytics, a helpdesk, LMS, tasks and AI agents. It replaces several paid SaaS tools.',
    overview: [
      'This is how the company runs marketing, support, sales calls, training content, operations and reporting. Instead of paying for separate tools, every module is built in-house and connected directly to student data.',
      '<b>React 19 + Vite 8</b> on the front; <b>PHP + MySQL</b> modules behind an OTP + JWT login with per-page permissions checked on the server. Background jobs run as cron workers on a separate AWS server that I set up and deploy.',
    ],
    how: [
      'Admins log in with email, password and an email OTP. Permissions are checked again on every request, so revoking access works immediately.',
      'Each module is one API endpoint plus its own library folder; database tables create themselves on first use, so a deploy needs no manual migration.',
      'Cron workers on an AWS EC2 server send campaigns, run journeys, sync support email over IMAP, check email-server health and run AI agents.',
      'The demo login is <b>read-only</b>: you can open everything and filter, but saving, deleting, exporting and going past page 3 are blocked.',
    ],
    features: [
      {
        id: 'marketing',
        title: 'Email & WhatsApp marketing platform',
        path: '/netcore/behaviour',
        summary: 'Our own customer-engagement platform: it knows what every student did and sends the right email or WhatsApp message at the right time.',
        points: [
          'Behaviour dashboard: ~21 student events (sign-up, exam, payment, attendance…) compared with yesterday and last week',
          'Segments: build an audience with rules like “took the exam but did not pay in 3 days”',
          'Lists with CSV import, blocklist and custom attributes',
          'Email campaigns with a drag-and-drop editor; sending over Amazon SES, SendGrid or Elastic Email with automatic switch-over if one fails',
          'WhatsApp campaigns through the Meta Cloud API, template approval and a live two-way chat inbox',
          'Journeys: a visual flow builder for automatic multi-step messages with waits, conditions and quiet hours',
          'Open / click tracking, bounce handling, unsubscribe and conversion reports',
        ],
      },
      { id: 'spend', title: 'Messaging spend control', path: '/netcore/spend', summary: 'Hard caps plus a watchdog, built after a runaway job burned 200k credits in 40 minutes.', points: ['Compares spend to a 14-day median and hourly burn rate', 'Alerts before a mistake turns into a big bill; weekly bill reports'] },
      { id: 'kumo', title: 'Self-hosted email server (KumoMTA)', path: '/kumo', summary: 'Control panel for our own mail server with 5 sending IPs, so bulk email costs far less.', points: ['Spreads each batch over healthy, warmed-up IPs', 'Red / yellow / green IP health; a bad IP is paused automatically', 'Blocklist, Google Postmaster and Microsoft SNDS checks', 'Server set up on a VPS behind a secured HTTPS bridge'] },
      { id: 'caller-iq', title: 'Caller IQ', path: '/caller-iq?tab=overview', summary: 'Counsellor call analytics from an Android app (Kotlin + React Native).', points: ['Reads the call log with dual-SIM detection', 'Heatmaps, leaderboards, callback queue', 'Upload a lead list and see who was called and who bought'] },
      { id: 'helpdesk', title: 'Helpdesk & ticketing', path: '/freshdesk', summary: 'Support emails become tickets, connected to the student’s data.', points: ['IMAP mail sync, SLA timers, automation rules', 'Canned replies, live updates, team reports'] },
      { id: 'lms', title: 'LMS', path: '/lms', summary: 'Course authoring for training.internshipstudio.com.', points: ['Courses → sections → lessons (video, PDF, quiz, form)', 'Enrolments, learner import, reports and support'] },
      { id: 'tasks', title: 'Task Manager', path: '/tasks/board', summary: 'Board, Gantt and list views for the team.', points: ['Quick add in plain English: “tomorrow 5pm !high @neha”', 'Slack app with /createtask and /mytasks', 'Google Calendar sync and reminders'] },
      { id: 'ai-agents', title: 'AI Agents', path: '/ai-agents', summary: '“AI employees” that run workflows and daily stand-ups.', points: ['OpenAI, Claude or DeepSeek with a daily ₹ budget stop', 'Read-only connectors to tasks, helpdesk, calls and campaigns'] },
      { id: 'reports', title: 'Reports & Meta sync', path: '/reports/meta-new', summary: 'Meta Ads reporting and segments synced to Meta Custom Audiences.', points: [] },
      { id: 'students', title: 'Students, exams & payments', path: '/students/all', summary: 'Student 360, exam results, allocations, coupons, refunds and payouts.', points: [] },
    ],
    tech: ['React 19', 'Vite 8', 'Tailwind 4', 'PHP 8.3', 'MySQL', 'KumoMTA', 'Amazon SES', 'SendGrid', 'WhatsApp Cloud API', 'Pusher', 'Slack API', 'OpenAI / Claude', 'AWS S3', 'Kotlin'],
    highlights: [
      'Replaces several SaaS subscriptions with in-house modules.',
      'MySQL tables as job queues, with atomic claims and locks.',
      'Read-only demo mode enforced on the server and in the browser.',
    ],
    credentials: [{ label: 'Read-only super admin', email: 'demo.admin@internshipstudio.com', password: 'DemoAdmin@2026', url: `${ADP}/login`, note: 'Every module is visible. Changes, exports and pages beyond 3 are disabled.' }],
  },

  /* ───────────────────────── Learning portal ───────────────────────── */
  {
    slug: 'learning-portal',
    name: 'Learning Portal',
    subtitle: 'Where students watch their courses',
    kind: 'LMS',
    category: 'company',
    domain: 'training.internshipstudio.com',
    url: TRAIN,
    period: '2026',
    role: 'Built the learner app and its PHP APIs',
    theme: { bg: C.orange, fg: C.ink, accent: C.indigo, chipBg: 'rgba(20,19,24,.1)', chipFg: C.ink },
    tagline:
      'The learner side of our LMS: a video player for every format, quizzes, notes, support tickets and one-click sign-in from the dashboard.',
    overview: [
      'Courses created in the admin LMS are watched here. Students use the same password as the dashboard, or arrive already signed in from “Go to learning portal”.',
    ],
    how: [
      'The dashboard creates a signed (HMAC-SHA256) hand-off; the portal checks it and signs the student in.',
      'The server works out each video’s type (MP4, HLS, Vimeo, Bunny, YouTube); the HLS player only loads when needed.',
      'Watch time is batched and sent once a minute, and stops counting after 2 idle minutes.',
    ],
    features: [
      { id: 'player', title: 'Video player', summary: 'Resume where you stopped; a mini player keeps playing on other pages.', points: [] },
      { id: 'quizzes', title: 'Quizzes, notes & favourites', summary: 'Quiz attempts, bookmarks, ratings and feedback.', points: [] },
      { id: 'support', title: 'Support desk', summary: 'Ticket threads with attachments, answered from the admin LMS.', points: [] },
    ],
    tech: ['React 19', 'Vite 8', 'Tailwind 4', 'hls.js', 'PHP 8', 'MySQL', 'Google Identity'],
    highlights: ['Signed single sign-on from the dashboard.', 'Accurate watch-time tracking with very few requests.'],
    credentials: [{ ...studentLogin, url: `${TRAIN}/signin`, note: 'Same login as the student dashboard.' }],
  },

  /* ───────────────────────── Mobile app ───────────────────────── */
  {
    slug: 'mobile-app',
    name: 'Internship Studio App',
    subtitle: 'The dashboard on Android & iOS',
    kind: 'React Native',
    category: 'company',
    domain: 'Google Play · com.istudio.app',
    url: 'https://play.google.com/store/apps/details?id=com.istudio.app',
    period: '2026',
    role: 'Rebuilt the app as v2.0',
    theme: { bg: C.yellow, fg: C.ink, accent: C.indigo, chipBg: 'rgba(20,19,24,.08)', chipFg: C.ink },
    tagline:
      'Everything in the student dashboard as a native app: payments, recruiter chat, push notifications, deep links and the same ad tracking as the website.',
    overview: [
      'Version 2.0 is a full rebuild on <b>Expo SDK 55 / React Native 0.83</b>. It covers every dashboard page using the same APIs, and it shipped as an update to the existing store listing, so current users just upgraded.',
    ],
    how: [
      'Sign in with email, Google or Apple; the session is stored securely on the device.',
      'Android pays natively with Razorpay / Cashfree; iOS opens a web checkout as Apple requires.',
      'Website links like /login and /ca/&lt;code&gt; open straight in the app.',
      'Campaign tracking follows the website’s rules, so app sign-ups show in the same reports.',
    ],
    features: [
      { id: 'tabs', title: 'Six main tabs', summary: 'Dashboard, Training, Skill, Project, Hiring and Campus Ambassador.', points: [] },
      { id: 'payments', title: 'Native payments', summary: 'Razorpay and Cashfree on Android, web checkout on iOS.', points: [] },
      { id: 'chat', title: 'Recruiter chat', summary: 'Real-time chat with attachments.', points: [] },
      { id: 'push', title: 'Push notifications', summary: 'Firebase push, streak reminders and in-app updates.', points: [] },
    ],
    tech: ['Expo SDK 55', 'React Native 0.83', 'Expo Router', 'Redux Toolkit', 'Reanimated', 'Firebase', 'Pusher', 'Razorpay', 'EAS Build'],
    highlights: ['Same package and signing key, so users upgraded seamlessly.', 'Every screen also runs in the browser for quick testing.'],
    credentials: [{ ...studentLogin, url: 'https://play.google.com/store/apps/details?id=com.istudio.app', note: 'Install from Google Play and sign in with the student account.' }],
  },

  /* ───────────────────────── Monitoring ───────────────────────── */
  {
    slug: 'synthetic-monitoring',
    name: 'Synthetic Monitoring',
    subtitle: 'A robot that tests the site every 15 minutes',
    kind: 'Reliability',
    category: 'company',
    domain: 'Internal tool · AWS EC2',
    url: `${ADP}/monitoring`,
    period: '2026',
    role: 'Designed, built and deployed it',
    theme: { bg: C.indigoDeep, fg: C.white, accent: C.lime, chipBg: 'rgba(255,255,255,.12)', chipFg: C.white },
    tagline:
      'A real headless browser registers, takes the exam and opens checkout every 15 minutes. If any step breaks, the team gets an email and a Slack alert with a screenshot.',
    overview: [
      'Uptime checks said “200 OK” while students couldn’t pay. So I built a monitor that does what a student does: a <b>Playwright</b> browser goes register → login → exam → submit → checkout, then stops before paying.',
    ],
    how: [
      'Every 5 minutes: site, database and API health checks.',
      'Every 15 minutes: the full student journey on a test account that is safely reset each run.',
      'Alerts only after 2 failures in a row, hourly reminders and a “recovered” message; one outage sends one alert.',
      'Email (with screenshot) → Slack → Slack @channel. History shows up in the admin suite.',
    ],
    features: [
      { id: 'journey', title: 'Student-journey checks', summary: 'Register, exam, submit and checkout in a real browser.', points: [] },
      { id: 'alerts', title: 'Alerts & escalation', summary: 'Throttled alerts showing how far a student can get right now.', points: [] },
      { id: 'history', title: 'History & incidents', summary: 'Every run saved, even during a database outage.', points: [] },
    ],
    tech: ['Node 20', 'Playwright', 'node-cron', 'Express', 'Nodemailer', 'Slack API', 'MySQL', 'systemd', 'AWS EC2'],
    highlights: ['Hardened systemd service with a memory limit.', 'Finds outages before students report them.'],
    credentials: [{ label: 'See it in the admin suite', email: 'demo.admin@internshipstudio.com', password: 'DemoAdmin@2026', url: `${ADP}/monitoring`, note: 'Log in with the read-only admin and open Monitoring.' }],
  },

  /* ───────────────────────── Freelance: Avir ───────────────────────── */
  {
    slug: 'avir-client-portal',
    name: 'Avir Client Portal',
    subtitle: 'Client & admin portal as a WordPress plugin',
    kind: 'WordPress plugin',
    category: 'freelance',
    domain: 'avirhealthpac.in',
    url: 'https://avirhealthpac.in',
    period: '2026',
    role: 'Freelance: designed and built the whole plugin',
    theme: { bg: C.cream, fg: C.ink, accent: C.red, chipBg: 'rgba(20,19,24,.06)', chipFg: C.ink },
    tagline:
      'For a healthcare-compliance consultancy. Hospitals track every licence and accreditation live; staff manage onboarding, steps, documents and payments.',
    overview: [
      'Avir HealthPac helps hospitals get NABH, Fire NOC, KPME, biomedical-waste and pharmacy licences. Each job has forms, documents, a dozen steps and staged payments. The plugin turns that into a <b>client portal</b> and a <b>full-screen admin app</b> inside WordPress.',
    ],
    how: [
      'Staff onboard a client with a wizard that creates the login and a Client ID.',
      'Requirements come from templates: a dynamic form plus steps with due dates.',
      'Clients see progress, the current and next step, documents, amount paid vs due, and updates.',
      'Website enquiries from all the popular form plugins are captured as leads.',
    ],
    features: [
      { id: 'client-dashboard', title: 'Client dashboard', summary: 'Progress per requirement, balance due and latest updates.', points: [] },
      { id: 'requirement', title: 'Requirement detail', summary: 'Steps timeline, form answers, documents, payments and updates.', points: [] },
      { id: 'admin-dashboard', title: 'Admin dashboard', summary: 'Clients, active work, overdue steps, collected and outstanding.', points: [] },
      { id: 'templates', title: 'Form & step templates', summary: 'Drag to reorder steps, conditional fields, copy steps.', points: [] },
      { id: 'leads', title: 'Website enquiries', summary: 'Leads from every form plugin with statuses and history.', points: [] },
    ],
    tech: ['PHP', 'WordPress', 'MySQL ($wpdb)', 'jQuery UI', 'JavaScript', 'Swiper'],
    highlights: ['Private files served only to their owner.', 'Login lockout and spam protection.', 'Read-only demo accounts with sample data.'],
    credentials: [
      { label: 'Admin (read-only)', email: 'demo.admin@avirhealthpac.in', password: 'AvirDemo@2026', url: 'https://avirhealthpac.in/client-login', note: 'Opens the admin portal. Saving, deleting, uploading and exports are disabled.' },
      { label: 'Client', email: 'demo.client@avirhealthpac.in', password: 'AvirClient@2026', url: 'https://avirhealthpac.in/client-login', note: 'Sunrise Multispeciality Hospital (demo) with 5 requirements at different stages.' },
    ],
  },

  /* ───────────────────────── Freelance: MM Capital ───────────────────────── */
  {
    slug: 'mm-capital',
    name: 'MM Capital',
    subtitle: 'Website for an IPO & M&A advisory',
    kind: 'Marketing website',
    category: 'freelance',
    domain: 'mmcapital.in',
    url: 'https://mmcapital.in/',
    period: '2026',
    role: 'Freelance: design and build',
    theme: { bg: C.ink, fg: C.cream, accent: C.yellow, chipBg: 'rgba(255,255,255,.08)', chipFg: C.cream },
    tagline:
      'A fast, animated website for an IPO-advisory and M&A firm. All motion is hand-written CSS, with SEO set per page.',
    overview: [
      'MM Capital advises companies on IPOs, mergers and raising capital. The site had to feel premium and load instantly, so the animations are plain CSS with no animation library.',
    ],
    how: [
      'All content lives in one data file; menus and pages are generated from it.',
      'Each page sets its own title, description and share image.',
      'Email buttons open Gmail on desktop and the mail app on phones.',
    ],
    features: [
      { id: 'home', title: 'Home', summary: 'Hero slider, services, process and call to action.', points: [] },
      { id: 'services', title: 'Services', summary: 'IPO advisory, M&A and capital raising, with FAQs.', points: [] },
      { id: 'contact', title: 'Contact', summary: 'Form, details and map.', points: [] },
    ],
    tech: ['React 19', 'Vite 8', 'Tailwind 4', 'React Router 7', 'Vercel'],
    highlights: ['Respects reduced-motion settings.', 'Tiny bundle with long-cached vendor code.'],
    credentials: [],
  },
]

/**
 * Deployment & hosting — I set up and deploy these myself.
 * short: one line on the home card · steps: plain-English list on the project page.
 */
const deployments = {
  'student-dashboard': {
    short: 'AWS EC2 · S3 · Google Cloud · Apache',
    steps: [
      'The React app is built with Vite and served from the web server (Apache) together with the PHP APIs and the MySQL database.',
      'The <b>Go payment service</b> and the <b>Node exam API</b> run on an <b>AWS EC2</b> Linux server, kept alive by PM2, behind <b>Caddy</b> which issues HTTPS certificates automatically.',
      'The Go service ships as one compiled binary. Every release keeps the previous binary, so a rollback takes seconds.',
      'Uploads and certificates are stored on <b>AWS S3</b>; resume parsing uses <b>Google Cloud</b> Document AI / Vision.',
      'Payment webhooks, cron jobs and the 5-minute reconciler run in production, watched by the synthetic monitor.',
    ],
  },
  'hire-portal': {
    short: 'Apache · PHP · MySQL · AWS S3',
    steps: [
      'Vite build of the React app plus PHP APIs on the web server, sharing the production MySQL database with the student dashboard.',
      'Company logos and assignment files go to <b>AWS S3</b>.',
      'Database indexes added and verified on production to speed up candidate search.',
    ],
  },
  'admin-panel': {
    short: 'Apache · AWS EC2 workers · KumoMTA VPS',
    steps: [
      'The React admin and the PHP modules are deployed on the web server.',
      'Background workers (campaign and WhatsApp senders, journeys, helpdesk mail sync, AI agents, spend watch) run every minute from cron on a separate <b>AWS EC2</b> (ARM / Graviton) server with daily log rotation.',
      'The self-hosted email server (KumoMTA) runs on its own VPS with 5 IPs, reachable only through an IP-restricted, token-protected HTTPS bridge.',
      'Every deploy takes a timestamped backup first, so a release can be undone quickly.',
    ],
  },
  'learning-portal': {
    short: 'Apache · PHP · S3 / CDN video',
    steps: [
      'Static Vite build plus PHP endpoints on Apache, with an .htaccess fallback for client-side routes.',
      'Videos stream from S3 / CDN; the HLS player is only downloaded when a lesson needs it.',
    ],
  },
  'mobile-app': {
    short: 'EAS Build · Google Play · TestFlight',
    steps: [
      'Android and iOS builds with Expo EAS (and a local Gradle release build signed with our own upload key).',
      'Released through Google Play internal testing → production, and TestFlight → App Store for iOS.',
      'Same package name and signing key as the old app, so existing users simply received an update.',
    ],
  },
  'synthetic-monitoring': {
    short: 'AWS EC2 Graviton · systemd',
    steps: [
      'Runs on an <b>AWS EC2</b> ARM (Graviton) Ubuntu server that I provisioned with a setup script (Node, Chromium libraries, swap, firewall).',
      'Installed as a hardened <b>systemd</b> service with automatic restart and a memory limit.',
      'Exposes a health URL for an external uptime check, so the monitor itself is monitored.',
    ],
  },
  'avir-client-portal': {
    short: 'WordPress plugin · client hosting',
    steps: [
      'Packaged as a WordPress plugin zip and installed on the client’s WordPress hosting.',
      'Database tables and pages are created on activation, and upgrades run automatically on update.',
    ],
  },
  'mm-capital': {
    short: 'Vercel / Netlify',
    steps: ['Static build deployed on Vercel / Netlify with SPA rewrites and long-cached assets.'],
  },
}
projects.forEach((p) => { p.deploy = deployments[p.slug] })

export const findProject = (slug) => projects.find((p) => p.slug === slug)
