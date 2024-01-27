## Node Version

The minimum Node.js version has been bumped from 16.14 to 18.17, since 16.x has reached end-of-life.
node --version
Version 10.1.24: v20.9.0 auf Mekong

## Create Next App

```sh
npx create-next-app@latest trymysql
```

## Create Pages in Next.js

- in the app folder create a folder with the page.js file
  - mysql/page.js
  - tasks/page.js
- can have .js .jsx .tsx extension
  import Link from "next/link"

const HomePage = () => {
return (

<div>
<h1 className="text-7xl">HomePage</h1>
<Link href="/about" className="text-2xl">
about page
</Link>
</div>
)
}
export default HomePage

## Nested Routes

- app/about/info/page.js
- if no page.js in a segment will result in 404

```js
const AboutInfoPage = () => {
  return <h1 className="text-7xl">AboutInfoPage</h1>
}
export default AboutInfoPage
```

## Tailwind and DaisyUI

- remove extra code in globals.css
- install daisyui
- install tailwindcss typography plugin
- configure tailwind

```sh
npm i -D daisyui@latest
npm i @tailwindcss/typography
```

Bug:
"tailwindcss": "^3.4.1" funktioniert nicht (capitalize) in package.json
stattdessen funktioniert:
"tailwindcss": "^3.3.0"

tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  ...
  plugins: [require('@tailwindcss/typography'), require('daisyui')]
};

```

## Layouts and Templates

- layout.js
- template.js

  Layout is a component which wraps other pages and layouts. Allow to share UI. Even when the route changes, layout DOES NOT re-render. Can fetch data but can't pass it down to children. Templates are the same but they re-render.

- the top-most layout is called the Root Layout. This required layout is shared across all pages in an application. Root layouts must contain html and body tags.
- any route segment can optionally define its own Layout. These layouts will be shared across all pages in that segment.
- layouts in a route are nested by default. Each parent layout wraps child layouts below it using the React children prop.

Erstelle layout.js

```js
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Next.js Tutorial",
  description: "Build awesome stuff with Next.js!",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

## Challenge - Navbar

- in the root create components folder
- create Navbar.jsx component
- import Link component
- setup a list of links (to existing pages)
- iterate over the list
- render Navbar in the app/layout.js
- setup the same layout for all pages (hint: wrap children prop)

## Setup Navbar

components/Navbar

```js
import Link from "next/link"

const links = [
  { href: "/client", label: "client" },
  { href: "/drinks", label: "drinks" },
  { href: "/tasks", label: "tasks" },
  { href: "/query", label: "react-query" },
]

const Navbar = () => {
  return (
    <nav className="bg-base-300 py-4">
      <div className="navbar px-8 max-w-6xl mx-auto flex-col sm:flex-row">
        <li>
          <Link href="/" className="btn btn-primary">
            Next.js
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
```

app/layout

```js
import { Inter } from "next/font/google"
import "./globals.css"

// alias
import Navbar from "@/components/Navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Next.js Tutorial",
  description: "Build awesome stuff with Next.js!",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-base-200">
      <body className={inter.className}>
        <Navbar />
        <main className="px-8 py-20 max-w-6xl mx-auto ">{children}</main>
      </body>
    </html>
  )
}
```

## Prisma

- install prisma vs-code extension
  [Prisma mysql](https://www.prisma.io/docs/concepts/database-connectors/mysql)

```sh
npm install prisma --save-dev
npm install @prisma/client
```

```sh
npx prisma init
```

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

- ADD .ENV TO .GITIGNORE !!!!

.env

```js
DATABASE_URL = "file:./dev.db"
```

## Beautiful Toasts und zod

[Beautiful Toasts](https://react-hot-toast.com/)

```sh
npm install react-hot-toast
```

The Zod library is a TypeScript-first schema declaration and validation library that allows developers to create complex type checks with simple syntax.

[Zod](https://zod.dev/)

```sh
npm install zod
```

## Setup Instance

In development, the command next dev clears Node.js cache on run. This in turn initializes a new PrismaClient instance each time due to hot reloading that creates a connection to the database. This can quickly exhaust the database connections as each PrismaClient instance holds its own connection pool.

(Prisma Instance)[https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#solution]

- create utils/db.ts

```js
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

## Create Model

```prisma
model Task {
  id String @id @default(uuid())
  content String
  createdAt DateTime @default(now())
  completed Boolean @default(false)
}
```

- safely applies and tracks changes to the database structure.

```sh
npx prisma migrate dev
```

- in a new terminal window
- launch Prisma Studio, which is a visual editor for your database.
- http://localhost:5555

```sh
npx prisma studio task
```

### Setup App

```sh
npx prisma db push
```

package.json

```json
 "build": "npx prisma generate && next build",
```
