import { useEffect, useState } from 'react'

/** Returns the id of the section currently in the middle of the screen. */
export default function useActiveSection(ids, enabled = true) {
  const [active, setActive] = useState('')
  useEffect(() => {
    if (!enabled) { setActive(''); return }
    let raf
    const pick = () => {
      const mid = window.innerHeight * 0.4
      let cur = ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const r = el.getBoundingClientRect()
        if (r.top <= mid && r.bottom > mid) { cur = id; break }
      }
      setActive(cur)
    }
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(pick) }
    pick()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf) }
  }, [ids, enabled])
  return active
}
