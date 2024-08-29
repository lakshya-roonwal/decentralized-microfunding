import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import ProfilePage from './_components/ProfilePage'
import prisma from '@/utils/db'
import { redirect } from 'next/navigation'

const Profile = async() => {
  const user = await currentUser();
    console.log(user?.id);
    const userId = user?.id;

  const userData=await prisma.user.findFirst({
    where:{id:userId}
  });
  if(!userData){
    redirect('/');
  }
  return (
    <ProfilePage user={userData}/>
  )
}

export default Profile