import manifest from './screens.json'
import { captions } from './captions.js'

const base = (f) => f.replace(/\.(png|jpe?g|webp)$/i, '')
/** Small (800 px) version used on slider cards and thumbnails. */
export const small = (src) => src.replace(/\.webp$/i, '-sm.webp')
const matches = (f, id) => base(f) === id || new RegExp(`^${id}-\\d+$`).test(base(f))
const order = (f) => Number((base(f).match(/-(\d+)$/) || [0, 1])[1])
const sortShots = (a, b) => order(a) - order(b)

/** Short description of one screenshot (falls back to the feature title). */
export const captionOf = (slug, file, fallback = '') => captions[`${slug}/${base(file)}`] || fallback

/** Screenshots of one feature: <id>.ext, <id>-2.ext, <id>-3.ext … */
export function featureShots(slug, id, title = '') {
  return (manifest[slug] || []).filter((f) => matches(f, id)).sort(sortShots).map((f) => ({ src: `/screens/${slug}/${f}`, caption: captionOf(slug, f, title) }))
}

/** Every screenshot of a project, cover first, then in feature order. */
export function projectShots(p) {
  const files = manifest[p.slug] || []
  const out = []
  const used = new Set()
  const push = (f, title) => {
    if (used.has(f)) return
    used.add(f)
    out.push({ src: `/screens/${p.slug}/${f}`, title, caption: captionOf(p.slug, f, '') })
  }
  files.filter((f) => base(f) === 'cover').forEach((f) => push(f, 'Overview'))
  p.features.forEach((ft) => files.filter((f) => matches(f, ft.id)).sort(sortShots).forEach((f) => push(f, ft.title)))
  files.forEach((f) => push(f, base(f).replace(/-/g, ' ')))
  return out
}
