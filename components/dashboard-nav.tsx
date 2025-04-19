import Link from "next/link"
import { LayoutDashboard, FileText, Users, Settings, HelpCircle } from "lucide-react"

export function DashboardNav() {
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: FileText, label: "Proyectos", href: "/dashboard/projects" },
    { icon: Users, label: "Equipo", href: "/dashboard/team" },
    { icon: Settings, label: "Configuración", href: "/dashboard/settings" },
    { icon: HelpCircle, label: "Ayuda", href: "/dashboard/help" },
  ]

  return (
    <nav className="w-64 border-r bg-white p-6 hidden md:block">
      <div className="space-y-6">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
              index === 0 ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
