import { useEffect, useRef } from 'react'

/** Small cursor dot that grows over links and buttons (desktop only). */
export default function Cursor() {
  const ref = useRef(null)
  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return
    const el = ref.current
    let x = -100, y = -100, cx = x, cy = y, raf
    const move = (e) => {
      x = e.clientX; y = e.clientY
      el.classList.toggle('is-big', !!e.target.closest?.('a, button, .sticker'))
    }
    const tick = () => {
      cx += (x - cx) * 0.25; cy += (y - cy) * 0.25
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', move)
    tick()
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf) }
  }, [])
  return <div ref={ref} className="cursor" aria-hidden />
}
