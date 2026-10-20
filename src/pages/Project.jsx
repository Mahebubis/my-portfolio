import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Plus, ExternalLink, FileText, ImageOff } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import Login from '../components/Login.jsx'
import { projects, findProject } from '../data/projects.js'
import { projectShots, featureShots, small } from '../data/gallery.js'
import Gallery from '../components/Gallery.jsx'

function useExists(url, type) {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    let live = true
    fetch(url, { method: 'HEAD' })
      .then((r) => live && setOk(r.ok && (r.headers.get('content-type') || '').includes(type)))
      .catch(() => {})
    return () => { live = false }
  }, [url, type])
  return ok
}

function Feature({ f, n, slug, base, open, onToggle, onOpen }) {
  const shots = featureShots(slug, f.id, f.title)
  return (
    <div className={`feat ${open ? 'is-open' : ''}`}>
      <button className="feat__btn" onClick={onToggle} aria-expanded={open}>
        <span className="feat__no">{String(n).padStart(2, '0')}</span>
        <span><span className="feat__name">{f.title}</span><span className="feat__sum">{f.summary}</span></span>
        <span className="feat__plus"><Plus size={15} /></span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div className="feat__body" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
            <div className="feat__inner">
              {f.points?.length > 0 && <ul>{f.points.map((p) => <li key={p}>{p}</li>)}</ul>}
              {f.path && base && (
                <a className="feat__path" href={base + f.path} target="_blank" rel="noreferrer">
                  Open this page live on {base.replace(/^https?:\/\//, '')} <ExternalLink size={11} />
                </a>
              )}
              {shots.length > 0 ? (
                <div className="shots">
                  {shots.map((s) => (
                    <figure key={s.src} className="shotcap" style={{ margin: 0 }}>
                      <button className="shot" onClick={() => onOpen(s.src)} aria-label="Open screenshot"><img src={small(s.src)} alt={s.caption} loading="lazy" decoding="async" /></button>
                      <figcaption>{s.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              ) : (
                import.meta.env.DEV && <div className="shots"><div className="shot shot--empty"><div><ImageOff size={15} style={{ margin: '0 auto 4px' }} />public/screens/{slug}/{f.id}.jpg</div></div></div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Project() {
  const { slug } = useParams()
  const p = findProject(slug)
  const [open, setOpen] = useState(() => new Set([0, 1]))
  const [lightbox, setLightbox] = useState(null)
  const hasDoc = useExists(`/docs/${slug}.pdf`, 'pdf')
  const shots = useMemo(() => (p ? projectShots(p) : []), [p])

  useEffect(() => { setOpen(new Set([0, 1])) }, [slug])
  useEffect(() => {
    if (p) document.title = `${p.name} · Portfolio of Maheboob Khan`
    return () => { document.title = 'Portfolio · Maheboob Khan — Full-Stack Engineer' }
  }, [p])
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setLightbox(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!p) return <Navigate to="/" replace />

  const t = p.theme
  const idx = projects.indexOf(p)
  const next = projects[(idx + 1) % projects.length]
  const origin = p.url.match(/^https?:\/\/[^/]+/)?.[0]
  const featureBase = /play\.google/.test(p.url) ? null : origin
  const toggle = (i) => setOpen((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n })
  const allOpen = open.size === p.features.length

  return (
    <article>
      <header className="dhero" style={{ background: t.bg, color: t.fg }}>
        <div className="dhero__grid" aria-hidden />
        <div className="container">
          <Link to={p.category === 'freelance' ? '/#freelance' : '/#work'} className="back"><ArrowLeft size={15} /> All work</Link>
          <motion.h1 className="dhero__title big" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>{p.name}</motion.h1>
          <motion.p className="dhero__sub" style={{ color: t.accent }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>{p.subtitle}</motion.p>
          <motion.p className="dhero__desc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>{p.tagline}</motion.p>
          <motion.div className="dmeta" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <div><div className="dmeta__k">Type</div><div className="dmeta__v">{p.kind}</div></div>
            <div><div className="dmeta__k">Timeline</div><div className="dmeta__v">{p.period}</div></div>
            <div><div className="dmeta__k">My role</div><div className="dmeta__v">{p.role}</div></div>
            <div><div className="dmeta__k">Live</div><div className="dmeta__v"><a href={p.url} target="_blank" rel="noreferrer">{p.domain} ↗</a></div></div>
          </motion.div>
        </div>
      </header>

      <div className="dbody section--paper">
        <div className="container">
          {shots.length > 0 && <div className="dgallery"><Gallery images={shots} onOpen={setLightbox} interval={3600} wide /></div>}
          <div className="dgrid">
            <div>
              <Reveal className="dsec" y={14}>
                <div className="dsec__h"><span>01</span><h2 className="big">Overview</h2></div>
                <div className="prose">{p.overview.map((x, i) => <p key={i} dangerouslySetInnerHTML={{ __html: x }} />)}</div>
              </Reveal>
              <Reveal className="dsec" y={14}>
                <div className="dsec__h"><span>02</span><h2 className="big">How it works</h2></div>
                <div className="steps">{p.how.map((x, i) => <div className="step" key={i}><p dangerouslySetInnerHTML={{ __html: x }} /></div>)}</div>
              </Reveal>
              {p.deploy && (
                <Reveal className="dsec" y={14}>
                  <div className="dsec__h"><span>03</span><h2 className="big">Deployment & hosting</h2></div>
                  <ul className="dlist">{p.deploy.steps.map((x, i) => <li key={i}><span dangerouslySetInnerHTML={{ __html: x }} /></li>)}</ul>
                </Reveal>
              )}
              <Reveal className="dsec" y={14}>
                <div className="dsec__h">
                  <span>{p.deploy ? '04' : '03'}</span><h2 className="big">Features ({p.features.length})</h2>
                  <button className="btn btn--sm btn--white dsec__tools" onClick={() => setOpen(allOpen ? new Set() : new Set(p.features.map((_, i) => i)))}>{allOpen ? 'Collapse all' : 'Expand all'}</button>
                </div>
                <div className="feats">
                  {p.features.map((f, i) => (
                    <Feature key={f.id} f={f} n={i + 1} slug={slug} base={featureBase} open={open.has(i)} onToggle={() => toggle(i)} onOpen={setLightbox} />
                  ))}
                </div>
              </Reveal>
            </div>

            <aside>
              <div className="credbox">
                <div className="credbox__h">{p.credentials.length ? 'Try it yourself' : 'No login needed'}</div>
                {p.credentials.length ? (
                  p.credentials.map((c) => (
                    <div key={c.label} style={{ display: 'grid', gap: 8 }}>
                      <Login c={c} />
                      <a className="btn btn--sm btn--ink" href={c.url} target="_blank" rel="noreferrer">Open &amp; sign in <ArrowUpRight size={14} /></a>
                    </div>
                  ))
                ) : (
                  <a className="btn btn--sm btn--ink" href={p.url} target="_blank" rel="noreferrer">Visit {p.domain} <ArrowUpRight size={14} /></a>
                )}
              </div>
              {hasDoc && <a className="btn btn--white" href={`/docs/${slug}.pdf`} target="_blank" rel="noreferrer"><FileText size={15} /> Read the full write-up (PDF)</a>}
              <div className="side">
                <div className="side__h">Built with</div>
                <div className="chips">{p.tech.map((x) => <span className="chip" key={x}>{x}</span>)}</div>
              </div>
              <div className="side">
                <div className="side__h">Engineering highlights</div>
                <ul className="hl">{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
              </div>
            </aside>
          </div>

          <Link to={`/work/${next.slug}`} className="nextp" style={{ background: next.theme.bg, color: next.theme.fg }}>
            <div><div className="nextp__k">Next project</div><div className="nextp__t big">{next.name}</div></div>
            <span className="circle"><ArrowUpRight size={20} /></span>
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div className="lb" onClick={() => setLightbox(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <img src={lightbox} alt="" />
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}
