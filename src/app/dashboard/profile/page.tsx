"use client"
import { currentUser } from '@clerk/nextjs/server';
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, Globe, Mail } from "lucide-react"
import BannerEditor from './_components/BannerEditor';


const Profile = async () => {
  const [amount, setAmount] = useState('')

  const user = {
    id: "user_2lFjp2f4VKnKUY4ECNoQYWGaHut",
    username: "lakshya_roonwal_",
    firstName: "Lakshya",
    lastName: "Roonwal",
    email: "lakshyaroonwal@gmail.com",
    bio: "Self Taught Developer",
    profileImage: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ybEZqcDQ2UGZGaERSMkZWRDdmOUF6ZDlSY0EifQ",
    bannerImage: "https://images.unsplash.com/photo-1479920252409-6e3d8e8d4866?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    websiteOrSocial: "https://lakshyaroonwal.me",
    createdAt: "2024-08-27T18:21:42.531Z"
  }

  const handlePayment = () => {
    // Implement payment logic here
    console.log(`Processing payment of ${amount} for ${user.firstName} ${user.lastName}`)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <BannerEditor initialImageUrl={user.bannerImage}/>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <Avatar className="h-24 w-24 ring-4 ring-white sm:h-32 sm:w-32">
              <AvatarImage
                src={user.profileImage}
                alt={`${user.firstName} ${user.lastName}`}
              />
              <AvatarFallback>
                {user.firstName[0]}
                {user.lastName[0]}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
              <h1 className="truncate text-2xl font-bold text-gray-900">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-sm text-gray-500">@{user.username}</p>
            </div>
          </div>
        </div>
        <div className="mt-6 sm:mt-8">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>
                About {user.firstName}
              </CardTitle>
              <CardDescription>{user.bio}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <a
                  href={user.websiteOrSocial}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  {user.websiteOrSocial}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Joined {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full"
              />
              <Button onClick={handlePayment} className="w-full">
                Support {user.firstName}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile