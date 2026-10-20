import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react'
import { small } from '../data/gallery.js'

/**
 * 3D layered carousel: the active screenshot sits in front (scale 1.1), the previous / next
 * ones tuck behind on each side (±40%, scale .85, blurred), the rest wait hidden.
 * Autoplays every 3.5 s, loops, swipe / drag with a 50 px threshold, glass background.
 * images: [{ src, title?, caption? }] · onOpen(src) opens a lightbox.
 */
export default function Gallery({ images, interval = 3500, onOpen, className = '', wide = false }) {
  const n = images.length
  const [cur, setCur] = useState(0)
  const [paused, setPaused] = useState(false)
  const [tick, setTick] = useState(0) // restarts autoplay after interaction
  const [onScreen, setOnScreen] = useState(false)
  const startX = useRef(null)
  const root = useRef(null)

  useEffect(() => setCur(0), [images])
  // Only animate (and load images) while the slider is near the screen.
  useEffect(() => {
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { rootMargin: '200px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    if (n < 2 || paused || !onScreen) return
    const t = setInterval(() => { if (!document.hidden) setCur((c) => (c + 1) % n) }, interval)
    return () => clearInterval(t)
  }, [n, paused, interval, tick, onScreen])

  if (!n) return null
  const go = (d) => { setCur((c) => (c + d + n) % n); setTick((t) => t + 1) }
  const stateOf = (i) => {
    if (i === cur) return 'active'
    if (n > 1 && i === (cur - 1 + n) % n) return 'left'
    if (n > 2 && i === (cur + 1) % n) return 'right'
    if (n === 2) return 'right'
    return 'hidden'
  }

  const down = (e) => { startX.current = e.clientX }
  const up = (e) => {
    if (startX.current == null) return
    const diff = e.clientX - startX.current
    startX.current = null
    if (diff < -50) go(1)
    else if (diff > 50) go(-1)
  }
  const item = images[cur]

  return (
    <div ref={root} className={`gal ${className}`} onMouseEnter={() => setPaused(true)} onMouseLeave={() => { setPaused(false); startX.current = null }}>
      <div className="gal__stage" onPointerDown={down} onPointerUp={up} onPointerCancel={() => { startX.current = null }}>
        {images.map((im, i) => {
          const s = stateOf(i)
          // distance from the active card (wrapping); load only nearby images
          const d = Math.min(Math.abs(i - cur), n - Math.abs(i - cur))
          const load = onScreen && d <= 2
          return (
            <div key={im.src} className={`gal__card is-${s}`} aria-hidden={s !== 'active'}>
              {load && (
                <img
                  src={small(im.src)}
                  srcSet={`${small(im.src)} 800w, ${im.src} 1600w`}
                  sizes={wide ? '(max-width: 900px) 90vw, 900px' : '(max-width: 960px) 80vw, 420px'}
                  alt={im.caption || im.title || ''}
                  draggable={false}
                  decoding="async"
                  onClick={() => (s === 'active' ? onOpen?.(im.src) : s === 'left' ? go(-1) : s === 'right' ? go(1) : null)}
                />
              )}
            </div>
          )
        })}
        {n > 1 && (
          <>
            <button className="gal__nav gal__nav--l" onClick={() => go(-1)} aria-label="Previous screenshot"><ChevronLeft size={18} /></button>
            <button className="gal__nav gal__nav--r" onClick={() => go(1)} aria-label="Next screenshot"><ChevronRight size={18} /></button>
          </>
        )}
        {onOpen && <button className="gal__zoom" onClick={() => onOpen(item.src)} aria-label="Open full size"><Expand size={14} /></button>}
      </div>

      <div className="gal__bar">
        <span className="gal__cap">
          <b>{item.title || item.caption}</b>
          {item.title && item.caption && <small>{item.caption}</small>}
        </span>
        {n > 1 && (
          <span className="gal__dots">
            {images.map((im, k) => (
              <button key={im.src} className={k === cur ? 'is-on' : ''} onClick={() => { setCur(k); setTick((t) => t + 1) }} aria-label={`Screenshot ${k + 1}`} />
            ))}
          </span>
        )}
        <span className="gal__count">{cur + 1}/{n}</span>
      </div>
    </div>
  )
}
