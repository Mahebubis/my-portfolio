export const profile = {
  name: 'Maheboob Khan',
  role: 'full-stack engineer',
  location: 'Pune, India',
  status: 'Open to full-stack & backend roles',
  email: 'maheboobkhan18202@gmail.com',
  phone: '+91 99210 79337',
  linkedin: 'https://www.linkedin.com/in/maheboob-khan-b220b5246',
  github: 'https://github.com/Maheboobkhan',
  resume: '/Maheboob-Khan-Resume.pdf',

  stats: [
    { value: 3, suffix: '+', label: 'years building production software' },
    { value: 8, suffix: '', label: 'live platforms you can log in to' },
    { value: 190, suffix: '+', label: 'admin screens across 15+ modules' },
    { value: 360, suffix: '+', label: 'commits shipped since 2025' },
  ],

  about: [
    'I’m a full-stack engineer who is happiest owning a product end to end. At <b>Internship Studio</b> I work across the whole platform: the React student dashboard and its PHP APIs, a payment service I rewrote from Node to <b>Go</b>, the exam engine, the recruiter portal, a 190-screen admin suite and the Android/iOS app. I also <b>deploy and run</b> them: servers on <b>AWS</b>, services on <b>Google Cloud</b>, releases, SSL, monitoring and alerts.',
    'Most of what I’m proud of is invisible when it works: payments that settle exactly once even when a student closes the tab, a <b>self-hosted KumoMTA</b> that sends email from our own IPs, a spend watchdog that stops runaway messaging bills, and a headless-browser monitor that sits an exam every 15 minutes so we find outages before students do.',
    'Before that I built KYC/RegTech APIs and document-verification products with <b>Laravel</b> at Novacred, and MERN e-commerce at Spring S. I also take on freelance work: client portals, WordPress plugins and marketing sites.',
  ],

  facts: [
    { k: 'Based in', v: 'Pune, Maharashtra' },
    { k: 'Education', v: 'B.Tech CS · 8.43 CGPA' },
    { k: 'Focus', v: 'React · PHP · Go · Node' },
  ],

  experience: [
    {
      company: 'Internship Studio',
      role: 'Full-Stack Developer',
      period: 'May 2025 — Present',
      location: 'Pune',
      summary:
        'Ed-tech platform for internships, training, exams and hiring. I build and run most of its product and internal tooling.',
      points: [
        'Rewrote the <b>payment backend from Node to Go</b> (chi, MySQL, Razorpay + Cashfree): webhooks, signature checks and a reconciler, all settling through one idempotent transaction.',
        'Built the <b>admin suite</b> (adp.internshipstudio.com): an email & WhatsApp marketing platform, a self-hosted <b>KumoMTA</b> panel, Caller IQ, an in-house helpdesk, LMS, task manager and <b>AI agents</b>.',
        'Shipped student-facing features on <b>dashboard.internshipstudio.com</b>: Campus Ambassador program, Global Internship checkout, AI resume parsing, career roadmap and canvas-generated certificates.',
        'Rebuilt the <b>React Native / Expo</b> app as v2.0 with native payments, Pusher chat, deep links and ad attribution that matches the website.',
        'Set up <b>synthetic monitoring</b> with Playwright on EC2 (systemd): it walks register → exam → checkout every 15 minutes and alerts by email and Slack.',
        'Owned <b>deployment & infrastructure</b>: Linux servers on <b>AWS EC2</b> (Caddy with auto-HTTPS, PM2, systemd, cron workers), files on <b>AWS S3</b>, document AI on <b>Google Cloud</b>, web builds on Apache/cPanel; releases with a rollback copy, SSL/DNS, server hardening and alerts.',
      ],
    },
    {
      company: 'Novacred Pvt Ltd',
      role: 'Full-Stack Developer',
      period: 'Aug 2023 — Apr 2025',
      location: 'Pune',
      summary: 'RegTech / KYC company. Built API products and verification workflows on Laravel + React.',
      points: [
        '<b>RegTech API</b> (regtechapi.in): KYC and verification API platform with a React dashboard and Laravel + MySQL backend.',
        '<b>CollectKart</b>: collection and document-verification product built on Laravel (frontend and backend) with MySQL.',
        '<b>Docboyz</b> field-agent app: integrated <b>DigiLocker</b> for verified agent sign-in.',
      ],
    },
    {
      company: 'Spring S Pvt Ltd',
      role: 'MERN Stack Developer',
      period: 'Apr 2023 — Jul 2023',
      location: 'Pune',
      summary: 'Agency work on React / Next.js and Node.',
      points: [
        '<b>Crime Look</b>: marketing site in Next.js with AOS scroll animations.',
        'Full <b>MERN e-commerce</b> app: admin CRUD, auth, cart and checkout with Stripe; fully responsive.',
      ],
    },
  ],

  personal: [
    { name: 'Netflix Clone', desc: 'Movie and series browser with YouTube trailers on click. React, Axios, TMDB.', github: 'https://github.com/Maheboobkhan/netflixClone', live: 'https://myfirstcloneofnetflix.vercel.app' },
    { name: 'Easy Chat', desc: 'Room-based real-time chat. React, Node, Express, Socket.io.', github: 'https://github.com/Maheboobkhan/easy-chat', live: 'https://easilychat.netlify.app' },
    { name: 'Sorting Visualizer', desc: 'Animated bubble, insertion and selection sort. React.', github: 'https://github.com/Maheboobkhan/sortingWithReact', live: 'https://sortingwithreact.netlify.app' },
    { name: 'MERN E-commerce', desc: 'Admin CRUD, auth, cart and Stripe checkout.', live: 'https://test-final-afte.onrender.com/' },
    { name: 'Crime Look', desc: 'Next.js marketing site with AOS animations.', live: 'https://crimelookwithnextjs.vercel.app/' },
  ],
}
