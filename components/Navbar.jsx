import Link from "next/link"

const links = [
  { href: "/mysql", label: "Mysql" },
  { href: "/tasks", label: "tasks" },
]

const Navbar = () => {
  return (
    <nav className="bg-base-300 py-4">
      <div className="navbar px-8 max-w-6xl mx-auto flex-col sm:flex-row">
        <li>
          <Link href="/" className="btn btn-primary">
            Ecki testet Prisma mit Mysql on localhost
          </Link>
        </li>
        <ul className="menu menu-horizontal md:ml-8">
          {links.map((link) => {
            return (
              <li key={link.href}>
                <Link href={link.href} className="capitalize">
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
