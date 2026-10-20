export const adminBase = 'https://adp.internshipstudio.com'

/**
 * Big modules of the admin suite, shown on the home page. Detailed write-ups live in projects.js → admin-panel.
 * `path` is only used for the link; it is never printed on the page.
 */
export const adminModules = [
  { name: 'Email & WhatsApp marketing platform', icon: 'Megaphone', path: '/netcore/behaviour', desc: 'Our own customer-engagement platform. It tracks what each student does (signed up, took the exam, paid…), groups them into segments, and sends email and WhatsApp campaigns or automatic multi-step journeys, with delivery and click reports.' },
  { name: 'Self-hosted email server (KumoMTA)', icon: 'Server', path: '/kumo', desc: 'Control panel for our own mail server with 5 sending IPs: it spreads sends across healthy IPs, warms new IPs up slowly, scores IP health and pauses a bad IP automatically.' },
  { name: 'Caller IQ', icon: 'PhoneCall', path: '/caller-iq?tab=overview', desc: 'An Android app on counsellors’ phones syncs every call. Managers see call volume, a weekday × hour heatmap, a leaderboard, missed-callback queue and which leads were called and bought.' },
  { name: 'Helpdesk & ticketing', icon: 'LifeBuoy', path: '/freshdesk', desc: 'Support emails become tickets automatically. Agents reply from the panel with SLA timers, automation rules, canned replies, live updates and team reports.' },
  { name: 'LMS', icon: 'GraduationCap', path: '/lms', desc: 'Course builder for training.internshipstudio.com: courses → sections → lessons (video, PDF, quiz, form), enrolments, learner import, reports and learner support.' },
  { name: 'Task Manager', icon: 'KanbanSquare', path: '/tasks/board', desc: 'Board, Gantt and list views for the team. Add tasks in plain English, manage them from Slack with /createtask and /mytasks, and sync deadlines to Google Calendar.' },
  { name: 'AI Agents', icon: 'Bot', path: '/ai-agents', desc: '“AI employees” that run workflows and write a daily stand-up from tasks, tickets, calls and campaigns, using OpenAI, Claude or DeepSeek with a daily ₹ budget cap.' },
  { name: 'Messaging spend control', icon: 'Gauge', path: '/netcore/spend', desc: 'Hard limits per send plus a watchdog that compares today’s spend with the last 14 days and raises an alert before a mistake becomes an expensive bill.' },
  { name: 'Meta Ads sync & reports', icon: 'BarChart3', path: '/reports/meta-new', desc: 'Sends student segments to Meta ad audiences on a schedule and reports ad spend against sign-ups, exams and purchases.' },
  { name: 'Synthetic monitoring', icon: 'Activity', path: '/monitoring', desc: 'Run history, step-by-step traces and incidents from the robot browser that tests the student journey every 15 minutes.' },
  { name: 'Students, exams & payments', icon: 'Users', path: '/students/all', desc: 'Student 360 view, exam results and versions, internship allocation, coupons, refunds and Campus Ambassador payouts.' },
  { name: 'Roles & permissions', icon: 'ShieldCheck', path: '/permissions', desc: 'Email + OTP login, per-page permissions checked on the server on every request, and instant sign-out of old sessions after a password change.' },
]
