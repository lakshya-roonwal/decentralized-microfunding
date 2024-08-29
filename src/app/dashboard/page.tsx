import React from 'react'
import Overview from './_components/Overview';
import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/utils/db';
import { redirect } from 'next/navigation';

const DashboardPage =async () => {
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
    <div className='py-24'>
      <Overview user={userData}/>
    </div>
  )
}

export default DashboardPage;