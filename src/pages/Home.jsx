import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, ArrowRight, ArrowUpRight, Github, Linkedin, Mail, Phone, FileText, ExternalLink, KeyRound, Rocket } from 'lucide-react'
import Gallery from '../components/Gallery.jsx'
import { projectShots } from '../data/gallery.js'
import Reveal from '../components/Reveal.jsx'
import Counter from '../components/Counter.jsx'
import Icon from '../components/Icon.jsx'
import Login, { LoginRows } from '../components/Login.jsx'
import { profile } from '../data/profile.js'
import { projects, C } from '../data/projects.js'
import { adminModules, adminBase } from '../data/admin.js'
import { stack } from '../data/stack.js'

const company = projects.filter((p) => p.category === 'company')
const freelance = projects.filter((p) => p.category === 'freelance')
const isDark = (t) => [C.white, C.cream].includes(t.fg)

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Work id="work" no="03" title="Work" count={`${company.length} platforms`} lede="Everything I build and run at Internship Studio. Each card lists what the platform does, its main features, the tech and a test login." list={company} />
      <AdminSuite />
      <Work id="freelance" no="05" title="Freelance" count={`${freelance.length} clients`} lede="Client projects I designed, built and handed over." list={freelance} startAt={company.length} />
      <Logins />
      <Stack />
      <Personal />
      <Contact />
    </>
  )
}

function SectionHead({ no, eyebrow, title, serif, lede }) {
  return (
    <div className="shead">
      <Reveal y={14}>
        <div className="shead__eyebrow"><b>{no}</b> {eyebrow}</div>
        <h2 className="shead__title big">{title}{serif && <span className="serif">{serif}</span>}</h2>
      </Reveal>
      {lede && <Reveal delay={0.08} y={14}><p className="shead__lede">{lede}</p></Reveal>}
    </div>
  )
}

/* ───────────── Hero ───────────── */
const Star = () => (
  <svg width="58" height="58" viewBox="0 0 24 24"><path d="M12 1.8l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 16.7l-6.1 3.5 1.5-6.8L2.2 8.8l6.9-.7z" fill="#C7D2FE" stroke="#0F172A" strokeWidth="1.2" strokeLinejoin="round" /></svg>
)
const Bolt = () => (
  <svg width="42" height="58" viewBox="0 0 18 26"><path d="M11 1L2 15h6l-2 10 10-15h-6l1-9z" fill="#BAE6FD" stroke="#0F172A" strokeWidth="1.2" strokeLinejoin="round" /></svg>
)
const Smile = () => (
  <svg width="54" height="54" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="#99F6E4" stroke="#0F172A" strokeWidth="2" /><circle cx="14" cy="16" r="2.2" fill="#0F172A" /><circle cx="26" cy="16" r="2.2" fill="#0F172A" /><path d="M12 23c2.5 4.5 13.5 4.5 16 0" fill="none" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" /></svg>
)

const stickers = [
  { c: <div className="sticker--tile" style={{ background: C.orange }}>JS</div>, x: '12%', y: '20%', r: -12, d: 0 },
  { c: <div className="sticker--tile" style={{ background: C.lime }}>Go</div>, x: '82%', y: '18%', r: 10, d: 0.6 },
  { c: <div className="sticker--tile" style={{ background: C.yellow }}>PHP</div>, x: '7%', y: '62%', r: 8, d: 1.1 },
  { c: <div className="sticker--pill" style={{ background: C.lime }}>&lt;/&gt; React</div>, x: '82%', y: '68%', r: -8, d: 0.3 },
  { c: <div className="sticker--pill" style={{ background: C.cream }}>SELECT *</div>, x: '16%', y: '82%', r: 6, d: 0.9 },
  { c: <Star />, x: '89%', y: '42%', r: 14, d: 0.4 },
  { c: <Bolt />, x: '18%', y: '42%', r: -10, d: 1.3 },
  { c: <Smile />, x: '72%', y: '84%', r: 0, d: 0.7 },
  { c: <div className="sticker--ball" />, x: '4%', y: '36%', r: 0, d: 1.6 },
  { c: <div className="sticker--ball" />, x: '66%', y: '12%', r: 0, d: 0.2 },
]

function Hero() {
  const area = useRef(null)
  return (
    <section className="hero" id="top" ref={area}>
      <div className="hero__grid" aria-hidden />
      <div className="hero__glow" aria-hidden />
      {stickers.map((s, i) => (
        <motion.div
          key={i}
          className="sticker"
          style={{ left: s.x, top: s.y }}
          drag
          dragConstraints={area}
          dragElastic={0.25}
          whileDrag={{ scale: 1.12, rotate: 0 }}
          initial={{ opacity: 0, scale: 0.4, rotate: s.r - 30 }}
          animate={{ opacity: 1, scale: 1, rotate: s.r, y: [0, -8, 0] }}
          transition={{ opacity: { delay: 0.5 + s.d * 0.4 }, scale: { delay: 0.5 + s.d * 0.4, type: 'spring', stiffness: 220, damping: 14 }, rotate: { delay: 0.5 + s.d * 0.4 }, y: { duration: 4 + s.d, repeat: Infinity, ease: 'easeInOut' } }}
        >
          {s.c}
        </motion.div>
      ))}

      <div className="container hero__inner">
        <motion.div className="tag" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          ✳ Full-stack engineer · Pune, India · 3+ years
        </motion.div>
        <h1 className="hero__title">
          <motion.span className="big" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>Portfolio</motion.span>
          <motion.span className="serif" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}>of {profile.name}</motion.span>
        </h1>
        <motion.p className="hero__sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
          I build <span className="hero__mark">production platforms</span> end to end: the student dashboard with its exam engine and Go payment service,
          a recruiter portal, a 190-screen admin suite, an LMS, a React Native app and a synthetic monitor at Internship Studio, plus freelance client work.
        </motion.p>
        <motion.div className="hero__chips" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}>
          {['React', 'PHP / Laravel', 'Go', 'Node.js', 'React Native', 'MySQL', 'AWS', 'Razorpay · Cashfree', 'KumoMTA', 'OpenAI'].map((t) => <span key={t}>{t}</span>)}
        </motion.div>
        <motion.div className="hero__actions" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
          <Link to="/#work" className="btn btn--lime">See the work <ArrowDown size={16} /></Link>
          <Link to="/#logins" className="btn btn--ghost"><KeyRound size={16} /> Test logins</Link>
          <a href={profile.resume} target="_blank" rel="noreferrer" className="btn btn--ghost"><FileText size={16} /> Résumé</a>
        </motion.div>
      </div>

      <div className="hero__foot">
        <span>Built for <b>Internship Studio</b> · <b>Avir HealthPac</b> · <b>MM Capital</b></span>
        <span>↻ Drag the stickers</span>
        <span>Scroll ↓</span>
      </div>
    </section>
  )
}

/* ───────────── 01 About ───────────── */
function About() {
  const tiles = [
    { s: profile.stats[0], bg: '#ffffff', fg: C.ink },
    { s: profile.stats[1], bg: C.lime, fg: C.ink },
    { s: profile.stats[2], bg: C.orange, fg: C.ink },
    { s: profile.stats[3], bg: C.indigo, fg: C.white },
  ]
  return (
    <section className="section section--paper" id="about">
      <div className="container">
        <SectionHead no="01" eyebrow="About me" title="About" serif="the short version" />
        <div className="about">
          <Reveal y={14}>
            <div className="note">
              <h3>Hi, I’m Maheboob. I build the whole thing, from the database to the button.</h3>
              {profile.about.map((p, i) => <p key={i} dangerouslySetInnerHTML={{ __html: p }} />)}
              <div className="note__sign">— Maheboob Khan</div>
            </div>
          </Reveal>
          <div className="stats">
            {tiles.map(({ s, bg, fg }, i) => (
              <Reveal key={s.label} delay={i * 0.05} y={14}>
                <div className="stat" style={{ background: bg, color: fg }}>
                  <div className="stat__n big"><Counter to={s.value} />{s.suffix}</div>
                  <div className="stat__l">{s.label}</div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.2} className="stat stat--wide" y={14}>
              <div className="stat__n big">JS · PHP · Go</div>
              <div className="stat__l">React, Node, Laravel and React Native every day. MySQL, AWS, Razorpay, Pusher and OpenAI in production.</div>
            </Reveal>
            <div className="facts">
              {profile.facts.map((f) => (
                <div className="fact" key={f.k}><div className="fact__k">{f.k}</div><div className="fact__v">{f.v}</div></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────── 02 Experience ───────────── */
function Experience() {
  return (
    <section className="section section--cream" id="experience">
      <div className="container">
        <SectionHead no="02" eyebrow="Where I’ve worked" title="Experience" serif="3+ years" lede="Three companies, one habit: take the hard parts (payments, email delivery, data) and make them reliable." />
        <div className="jobs">
          {profile.experience.map((j, i) => (
            <Reveal className="job" key={j.company} delay={i * 0.05} y={14}>
              <div>
                <div className="job__when">{j.period}</div>
                <div className="job__num big">{String(i + 1).padStart(2, '0')}</div>
              </div>
              <div>
                <h3 className="job__role">{j.role} <span className="job__co">· {j.company}</span></h3>
                <p className="job__desc">{j.summary}</p>
                <ul className="job__list">{j.points.map((p) => <li key={p} dangerouslySetInnerHTML={{ __html: p }} />)}</ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────── 03 / 05 Work (stacked cards) ───────────── */
function Work({ id, no, title, count, lede, list, startAt = 0 }) {
  const [lb, setLb] = useState(null)
  return (
    <section className="section section--ink" id={id}>
      <div className="container">
        <SectionHead no={no} eyebrow={id === 'work' ? 'Internship Studio · 2025 to now' : 'Client work'} title={title} serif={count} lede={lede} />
        <div>{list.map((p, i) => <ProjectCard key={p.slug} p={p} n={startAt + i + 1} onOpen={setLb} />)}</div>
      </div>
      <Lightbox src={lb} onClose={() => setLb(null)} />
    </section>
  )
}

function Preview({ p, onOpen }) {
  const shots = useMemo(() => projectShots(p), [p])
  if (shots.length) return <div className="pshow"><Gallery images={shots} onOpen={onOpen} /></div>
  return (
    <div className="browser">
      <div className="browser__bar"><i /><i /><i /><span className="browser__url">{p.domain}</span></div>
      <div className="browser__body">
        {shots.length ? (
          <Gallery images={shots} onOpen={onOpen} />
        ) : (
          <div className="browser__fallback">
            <div className="browser__cap">All features ({p.features.length})</div>
            {p.features.map((f, i) => (
              <div className="ft" key={f.id}><span>{String(i + 1).padStart(2, '0')}</span>{f.title}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function Lightbox({ src, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <AnimatePresence>
      {src && (
        <motion.div className="lb" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <img src={src} alt="" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ProjectCard({ p, n, onOpen }) {
  const t = p.theme
  const dark = isDark(t)
  return (
    <motion.article
      className="pcard"
      id={`p-${p.slug}`}
      style={{ background: t.bg, color: t.fg, zIndex: n }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pcard__left">
        <div className="pcard__meta"><span>{p.period}</span><span>{p.kind}</span></div>
        <div className="pcard__title">
          <span className="pcard__num big" style={{ color: t.accent }}>{String(n).padStart(2, '0')}</span>
          <h3 className="pcard__name">{p.name}</h3>
        </div>
        <p className="pcard__sub" style={{ color: t.accent }}>{p.subtitle}</p>
        <p className="pcard__desc">{p.tagline}</p>
        <ul className="pcard__list">
          {p.features.slice(0, 4).map((f) => <li key={f.id}><span><b>{f.title}</b> <span>— {f.summary}</span></span></li>)}
        </ul>
        {p.deploy && <p className="deploy"><Rocket size={14} /> <b>Deployed by me:</b> {p.deploy.short}</p>}
        <div className="chips pcard__chips">
          {p.tech.slice(0, 9).map((x) => <span className="chip" key={x} style={{ background: t.chipBg, color: t.chipFg }}>{x}</span>)}
        </div>
        <div className="pcard__actions">
          <Link to={`/work/${p.slug}`} className={`btn btn--sm ${dark ? 'btn--lime' : 'btn--ink'}`}>Case study & screenshots <ArrowRight size={15} /></Link>
          <a href={p.url} target="_blank" rel="noreferrer" className="btn btn--sm btn--ghost">{p.slug === 'mobile-app' ? 'Google Play' : 'Visit live'} <ArrowUpRight size={15} /></a>
        </div>
      </div>
      <div className="pcard__right">
        <Preview p={p} onOpen={onOpen} />
        {p.credentials.length ? (
          p.credentials.map((c) => <Login key={c.label} c={c} compact={p.credentials.length > 1} />)
        ) : (
          <div className="login"><div className="login__h"><span>Public website</span><small>No login</small></div><p className="login__note">Open {p.domain} directly.</p></div>
        )}
      </div>
    </motion.article>
  )
}

/* ───────────── 04 Admin suite ───────────── */
const modulePalette = [
  { bg: C.lime, fg: C.ink },
  { bg: C.orange, fg: C.ink },
  { bg: C.yellow, fg: C.ink },
  { bg: C.indigo, fg: C.white },
  { bg: '#ffffff', fg: C.ink },
  { bg: C.indigoDeep, fg: C.white },
]

function AdminSuite() {
  const admin = projects.find((p) => p.slug === 'admin-panel')
  return (
    <section className="section section--paper" id="admin">
      <div className="container">
        <SectionHead no="04" eyebrow="adp.internshipstudio.com" title="Admin suite" serif={`${adminModules.length} big modules`} lede="The largest modules of the admin panel. Each card opens that module live; use the read-only login below." />
        <Reveal className="banner" y={14}>
          <div>
            <div className="banner__t">Read-only <span>super admin</span>. Open every module and use the filters. Saving, deleting, exports and pages beyond 3 are blocked.</div>
            <div className="banner__s">The same login works on every link below.</div>
          </div>
          <Login c={admin.credentials[0]} badge="Read-only" compact />
        </Reveal>
        <div className="modules">
          {adminModules.map((m, i) => {
            const c = modulePalette[i % modulePalette.length]
            return (
              <Reveal key={m.name} delay={(i % 4) * 0.04} y={14}>
                <a className="module" href={adminBase + m.path} target="_blank" rel="noreferrer" style={{ background: c.bg, color: c.fg, height: '100%' }}>
                  <div className="module__top"><span className="module__icon"><Icon name={m.icon} size={18} /></span><span className="module__no">{String(i + 1).padStart(2, '0')}</span></div>
                  <h3 className="module__name">{m.name}</h3>
                  <p className="module__desc">{m.desc}</p>
                  <span className="module__link">Open live module <ExternalLink size={11} /></span>
                </a>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ───────────── 06 Test logins ───────────── */
function Logins() {
  const groups = [['Internship Studio', company], ['Freelance', freelance]]
  return (
    <section className="section section--lime" id="logins">
      <div className="container">
        <SectionHead no="06" eyebrow="For interviewers & HR" title="Test logins" serif="all in one place" lede="Every platform you can sign in to, with copy buttons. The exam and payment flows are inside the student dashboard account." />
        <div className="logins">
          {groups.map(([g, list]) => (
            <div key={g}>
              <div className="logins__h">{g}</div>
              <div className="logins__grid">
                {list.flatMap((p) =>
                  p.credentials.map((c) => (
                    <Reveal key={p.slug + c.label} className="lcard" y={14}>
                      <div className="lcard__head" style={{ background: p.theme.bg, color: p.theme.fg }}>
                        <div className="lcard__name">{p.name}</div>
                        <div className="lcard__url">{p.domain}</div>
                      </div>
                      <div className="lcard__body">
                        <div className="lcard__label">{c.label}</div>
                        <LoginRows c={c} />
                        {c.note && <p className="login__note">{c.note}</p>}
                      </div>
                      <div className="lcard__foot">
                        <a className="btn btn--sm btn--ink" href={c.url} target="_blank" rel="noreferrer">Open &amp; sign in <ArrowUpRight size={14} /></a>
                      </div>
                    </Reveal>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────── 07 Stack ───────────── */
function Stack() {
  const total = stack.reduce((n, g) => n + g.items.length, 0)
  return (
    <section className="section section--paper" id="stack">
      <div className="container">
        <SectionHead no="07" eyebrow="Toolbox" title="Tech stack" serif={`${total} tools`} lede="Everything here runs in at least one of the projects above." />
        <div className="stack">
          {stack.map((g, i) => (
            <Reveal key={g.group} delay={(i % 3) * 0.04} className="sgroup" y={14}>
              <div className="sgroup__h"><span>{g.group}</span><span>{String(g.items.length).padStart(2, '0')}</span></div>
              <div className="sgroup__items">{g.items.map((t) => <span key={t}>{t}</span>)}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────── 08 Personal ───────────── */
function Personal() {
  return (
    <section className="section section--cream">
      <div className="container">
        <SectionHead no="08" eyebrow="Where I started" title="Side projects" serif="learning days" />
        <div className="plist">
          {profile.personal.map((p, i) => (
            <Reveal className="prow" key={p.name} delay={i * 0.03} y={12}>
              <span className="prow__i">{String(i + 1).padStart(2, '0')}</span>
              <span className="prow__n">{p.name}</span>
              <span className="prow__d">{p.desc}</span>
              <span className="prow__links">
                {p.github && <a className="btn btn--sm btn--ghost" href={p.github} target="_blank" rel="noreferrer"><Github size={14} /> Code</a>}
                {p.live && <a className="btn btn--sm btn--ink" href={p.live} target="_blank" rel="noreferrer">Live <ArrowUpRight size={14} /></a>}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────── Contact ───────────── */
function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="hero__grid" aria-hidden />
      <div className="container">
        <Reveal y={14}><h2 className="contact__title big">Let’s talk<span className="serif">about your next platform</span></h2></Reveal>
        <Reveal delay={0.08} y={14}><a className="contact__mail" href={`mailto:${profile.email}`}>{profile.email}</a></Reveal>
        <Reveal delay={0.12} y={14}>
          <div className="socials">
            <a className="btn btn--sm btn--ghost" href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={14} /> LinkedIn</a>
            <a className="btn btn--sm btn--ghost" href={profile.github} target="_blank" rel="noreferrer"><Github size={14} /> GitHub</a>
            <a className="btn btn--sm btn--ghost" href={`tel:${profile.phone.replace(/\s/g, '')}`}><Phone size={14} /> {profile.phone}</a>
            <a className="btn btn--sm btn--ghost" href={profile.resume} target="_blank" rel="noreferrer"><FileText size={14} /> Résumé</a>
            <a className="btn btn--sm btn--ghost" href={`mailto:${profile.email}`}><Mail size={14} /> Email</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
