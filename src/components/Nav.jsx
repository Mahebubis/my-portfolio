import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import useActiveSection from './useActiveSection.js'

export const navLinks = [
  ['about', 'About'],
  ['experience', 'Experience'],
  ['work', 'Work'],
  ['admin', 'Admin suite'],
  ['freelance', 'Freelance'],
  ['logins', 'Test logins'],
  ['stack', 'Stack'],
]
const ids = navLinks.map(([id]) => id)

/** Mobile: a right-hand section rail that appears while scrolling and fades out when scrolling stops. */
function SectionRail({ active }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    let t
    const onScroll = () => {
      setShow(window.scrollY > window.innerHeight * 0.5)
      clearTimeout(t)
      t = setTimeout(() => setShow(false), 1100)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(t) }
  }, [])
  return (
    <motion.nav
      className="rail"
      aria-label="Sections"
      initial={false}
      animate={show ? { opacity: 1, x: 0, pointerEvents: 'auto' } : { opacity: 0, x: 24, pointerEvents: 'none' }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onTouchStart={() => setShow(true)}
    >
      {navLinks.map(([id, label]) => (
        <Link key={id} to={`/#${id}`} className={`rail__link ${active === id ? 'is-active' : ''}`}>
          <span>{label}</span>
          {active === id && <motion.i layoutId="rail-underline" className="rail__line" transition={{ type: 'spring', stiffness: 500, damping: 38 }} />}
        </Link>
      ))}
    </motion.nav>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname, hash } = useLocation()
  const active = useActiveSection(ids, pathname === '/')
  useEffect(() => setOpen(false), [pathname, hash])

  return (
    <>
      <motion.nav className="nav" initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
        <Link to="/" className="nav__brand" aria-label="Home">MK</Link>
        <div className="nav__links">
          {navLinks.map(([id, l]) => (
            <Link key={id} to={`/#${id}`} className={`nav__link ${active === id ? 'is-active' : ''}`}>
              {l}
              {active === id && <motion.i layoutId="nav-underline" className="nav__line" transition={{ type: 'spring', stiffness: 500, damping: 38 }} />}
            </Link>
          ))}
        </div>
        <Link to="/#contact" className="nav__cta"><span className="dot" /> Open to work in Pune</Link>
        <button className="nav__menu" onClick={() => setOpen((o) => !o)} aria-label="Menu">{open ? <X size={20} /> : <Menu size={20} />}</button>
      </motion.nav>
      {pathname === '/' && <SectionRail active={active} />}
      <AnimatePresence>
        {open && (
          <motion.div className="sheet" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            {navLinks.map(([id, l]) => <Link key={id} to={`/#${id}`} className={active === id ? 'is-active' : ''}>{l}</Link>)}
            <Link to="/#contact">Contact</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
