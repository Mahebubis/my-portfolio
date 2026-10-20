import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export function CopyBtn({ value }) {
  const [done, setDone] = useState(false)
  return (
    <button
      className="copy"
      aria-label={`Copy ${value}`}
      onClick={(e) => {
        e.preventDefault()
        navigator.clipboard?.writeText(value).then(() => { setDone(true); setTimeout(() => setDone(false), 1400) })
      }}
    >
      {done ? <Check size={14} /> : <Copy size={14} />}
    </button>
  )
}

export function LoginRows({ c }) {
  return (
    <>
      {c.email && <div className="login__row"><span className="login__k">Login</span><span className="login__v" title={c.email}>{c.email}</span><CopyBtn value={c.email} /></div>}
      {c.password && <div className="login__row"><span className="login__k">Password</span><span className="login__v">{c.password}</span><CopyBtn value={c.password} /></div>}
    </>
  )
}

/** Credential card used on project cards and detail pages. */
export default function Login({ c, badge = 'Test login', compact = false }) {
  return (
    <div className="login">
      <div className="login__h"><span>{c.label}</span><small>{badge}</small></div>
      <LoginRows c={c} />
      {!compact && c.note && <p className="login__note">{c.note}</p>}
    </div>
  )
}
