import React from 'react'
import { currentUser } from '@clerk/nextjs/server';


const Profile = async () => {
  const user = await currentUser()

  if (!user) return <div>Not logged in</div>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="flex items-center space-x-4">
        <img
          src={user.imageUrl}
          alt="Profile picture"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <p className="font-semibold">{user.firstName} {user.lastName}</p>
          <p className="text-gray-600">{user.emailAddresses[0].emailAddress}</p>
        </div>
      </div>
    </div>
  )
}

export default Profile