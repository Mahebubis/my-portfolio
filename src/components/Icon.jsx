import {
  Megaphone, Server, PhoneCall, LifeBuoy, GraduationCap, KanbanSquare, Bot, Gauge, BarChart3, Activity, Users, ShieldCheck,
  LayoutDashboard, Briefcase, PlayCircle, Smartphone, Stethoscope, Building2, Sparkles,
} from 'lucide-react'

const icons = {
  Megaphone, Server, PhoneCall, LifeBuoy, GraduationCap, KanbanSquare, Bot, Gauge, BarChart3, Activity, Users, ShieldCheck,
  LayoutDashboard, Briefcase, PlayCircle, Smartphone, Stethoscope, Building2,
}

export default function Icon({ name, size = 18, ...rest }) {
  const C = icons[name] || Sparkles
  return <C size={size} strokeWidth={1.8} {...rest} />
}
