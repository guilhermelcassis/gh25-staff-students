import React from 'react'
import type { Metadata, Viewport } from 'next'
import Navigation from '../components/Navigation'
import './globals.css'

export const metadata: Metadata = {
  title: 'Student Check-In',
  description: 'Mobile-first check-in system for events',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#228B22" />
      </head>
      <body className="bg-neutral-50 min-h-screen">
        <Navigation />
        {children}
      </body>
    </html>
  )
} 