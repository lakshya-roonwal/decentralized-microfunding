import prisma from '@/utils/db'
import { User } from '@prisma/client'
import { redirect } from 'next/navigation'
import PublicPage from "./_components/PublicPage"
import React, { FC } from 'react'

export interface pageProps {
  params: {
    username: string
  }
}

const PublicUserPage: FC<pageProps> = async ({ params }) => {

  const userData: User | null = await prisma.user.findUnique({
    where: { username: params.username }
  });

  if (!userData) {
    redirect('/')
  }

  return (
    <PublicPage user={userData}/>
  )
}

export default PublicUserPage