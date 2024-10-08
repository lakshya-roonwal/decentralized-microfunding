// import { WebhookEvent } from '@clerk/nextjs/server'
// import { NextResponse } from 'next/server'
// import prisma from '@/utils/db'

// export async function POST(request: Request) {
//   const payload: WebhookEvent = await request.json()
//   console.log("Payload Started")
//   console.log(payload)

//   if (payload.type === "user.created") {
//     console.log('user started');
    
//     // create user in prisma db
//     const user = await prisma.user.create({
//       data: {
//         id: payload.data.id,
//         firstName:payload?.data?.first_name as string,
//         lastName:payload?.data?.last_name as string,
//         email: payload.data.email_addresses[0].email_address,
//         username: payload.data.username ?? "",
//         profileImage: payload.data.image_url
//       }
//     })
//     console.log("user", user);
//   }

//   // if (payload.type === 'user.updated') {
//   //   const updatedUser = await prisma.user.update({
//   //     where: { id: payload.data.id },
//   //     data: {
//   //       firstName: payload.data.first_name as string,
//   //       lastName: payload.data.last_name as string,
//   //       email: payload.data.email_addresses[0].email_address,
//   //       username: payload.data.username ?? "",
//   //       profileImage: payload.data.image_url
//   //     }
//   //   })
//   //   console.log("Updated user:", updatedUser);
//   // }

//   // if (payload.type === 'user.deleted') {
//   //   const deletedUser = await prisma.user.delete({
//   //     where: { id: payload.data.id }
//   //   })
//   //   console.log("Deleted user:", deletedUser);
//   // }

//   return NextResponse.json({ message: 'Webhook processed successfully' },{status:200})
// }

import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
  try {

    return NextResponse.json({ msg: "Hello" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: " Error" });
  }
}