import { WebhookEvent } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import prisma from '@/utils/db'

export async function POST(request: Request) {
  const payload: WebhookEvent = await request.json()
  console.log(payload)

  if (payload.type === 'user.created') {
    // create user in prisma db
    const user = await prisma.user.create({
      data: {
        id: payload.data.id,
        firstName:payload?.data?.first_name as string,
        lastName:payload?.data?.last_name as string,
        email: payload.data.email_addresses[0].email_address,
        username: payload.data.username ?? "",
        profileImage: payload.data.image_url
      }
    })
    console.log("user", user);

  }

  return NextResponse.json({ message: 'Hello World!' })
}

export async function GET() {
  return Response.json({ message: 'Hello World!' })
}