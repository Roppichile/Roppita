"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

export default function MainMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  const menuItems = [
    {
      name: "Inicio",
      href: "/",
      submenu: null,
    },
    {
      name: "Hombre",
      href: "/categoria/hombre",
      submenu: [
        { name: "Camisas", href: "/categoria/hombre/camisas" },
        { name: "Pantalones", href: "/categoria/hombre/pantalones" },
        { name: "Abrigos", href: "/categoria/hombre/abrigos" },
        { name: "Calzado", href: "/categoria/hombre/calzado" },
        { name: "Accesorios", href: "/categoria/hombre/accesorios" },
      ],
    },
    {
      name: "Mujer",
      href: "/categoria/mujer",
      submenu: [
        { name: "Blusas", href: "/categoria/mujer/blusas" },
        { name: "Vestidos", href: "/categoria/mujer/vestidos" },
        { name: "Pantalones", href: "/categoria/mujer/pantalones" },
        { name: "Abrigos", href: "/categoria/mujer/abrigos" },
        { name: "Calzado", href: "/categoria/mujer/calzado" },
      ],
    },
    {
      name: "Niños",
      href: "/categoria/ninos",
      submenu: [
        { name: "Bebés (0-24 meses)", href: "/categoria/ninos/bebes" },
        { name: "Niños (2-8 años)", href: "/categoria/ninos/pequenos" },
        { name: "Niños (8-14 años)", href: "/categoria/ninos/grandes" },
        { name: "Calzado", href: "/categoria/ninos/calzado" },
      ],
    },
    {
      name: "Accesorios",
      href: "/categoria/accesorios",
      submenu: null,
    },
    {
      name: "Acerca de Roppita",
      href: "/acerca-de",
      submenu: null,
    },
    {
      name: "Contacto",
      href: "/contacto",
      submenu: null,
    },
  ]

  return (
    <nav className="bg-gray-100 border-b">
      <div className="container mx-auto px-4">
        <ul className="flex flex-wrap">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className="relative group"
              onMouseEnter={() => setActiveMenu(item.name)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link
                href={item.href}
                className="block px-4 py-3 text-gray-700 hover:text-green-600 font-medium flex items-center"
              >
                {item.name}
                {item.submenu && <ChevronDown className="ml-1 h-4 w-4" />}
              </Link>

              {item.submenu && activeMenu === item.name && (
                <div className="absolute left-0 top-full bg-white shadow-lg rounded-b-lg min-w-[200px] z-10">
                  <ul className="py-2">
                    {item.submenu.map((subItem) => (
                      <li key={subItem.name}>
                        <Link
                          href={subItem.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-600"
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
