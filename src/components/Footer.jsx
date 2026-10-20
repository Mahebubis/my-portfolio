import { profile } from '../data/profile.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <span>© {new Date().getFullYear()} {profile.name.toUpperCase()} · PORTFOLIO</span>
        <span>BUILT WITH REACT + VITE + FRAMER MOTION</span>
      </div>
    </footer>
  )
}
