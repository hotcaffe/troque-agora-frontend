import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ConfigComponent } from './ConfigComponent'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Troque Agora',
  description: 'Marketplace focados em trocas para usuários de todo o Brasil',
  icons: {
    icon: '/ta-ico-dark.svg'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ConfigComponent>
          {children}
        </ConfigComponent>
      </body>
    </html>
  )
}
