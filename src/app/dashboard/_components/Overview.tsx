'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Copy, Check, Share2, Link2 } from 'lucide-react'
import { User } from '@prisma/client'
import Link from 'next/link'

// Custom hook for clipboard functionality
function useClipboard(duration = 3000) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), duration)
      return () => clearTimeout(timer)
    }
  }, [copied, duration])

  const copy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => setCopied(true))
  }

  return { copied, copy }
}

export default function Overview({user}:{user:User}) {
  const { copied: codeCopied, copy: copyCode } = useClipboard()
  const { copied: linkCopied, copy: copyLink } = useClipboard()
  
  const shareLink = `${process.env.NEXT_PUBLIC_URL}${user.username}`;
  const shareText = `${shareLink}`;
  const codeSnippet = `
  <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: '1000' }}>
      <a
        href="${process.env.NEXT_PUBLIC_URL}${user.username}"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '64px',
          height: '64px',
          backgroundColor: '#ffffff',
          borderRadius: '50%',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: '#3B82F6' }} // Adjust the color as needed
        >
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      </a>
    </div>
  `;

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <Image
              src={user.profileImage || ""}
              alt={`${user.firstName} ${user.lastName}'s profile picture`}
              width={64}
              height={64}
              className="rounded-full"
            />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Hi, {user.firstName} {user.lastName}</h2>
              <Link href={`${process.env.NEXT_PUBLIC_URL}${user.username}`} className="font-normal flex items-center gap-2 text-sm sm:text-base break-all">
                <Link2 size={"16px"}/>
                <span className="hidden sm:inline">{`${process.env.NEXT_PUBLIC_URL}${user.username}`}</span>
                <span className="sm:hidden">{user.username}</span>
              </Link>
            </div>
          </div>
          <Button
            onClick={() => copyLink(shareText)}
            className="w-full sm:w-auto"
          >
            {linkCopied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Copied
              </>
            ) : (
              <>
                <Share2 className="mr-2 h-4 w-4" />
                Share my page
              </>
            )}
          </Button>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Integrate in your website</h3>
          <div className="relative">
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{codeSnippet}</code>
            </pre>
            <Button
              variant="outline"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => copyCode(codeSnippet)}
            >
              {codeCopied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}