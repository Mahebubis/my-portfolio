/** Card with a cursor-following spotlight (sets --mx / --my). */
export default function Card({ as: Tag = 'div', className = '', children, ...rest }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <Tag className={`card ${className}`} onMouseMove={onMove} {...rest}>
      {children}
    </Tag>
  )
}
