import type { Metadata } from 'next'
import { Jost } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const jost = Jost({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={cn('dark bg-background font-sans antialiased', jost.variable)}>
                {children}
            </body>
        </html>
    )
}
