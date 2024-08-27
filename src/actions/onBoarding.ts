"use server"
import prisma from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";


// TODO : HAVE TO ADD TYPES TO THIS FUNCTION
export const onBoardUser=async(userFormData:{
    firstName:string;
  lastName:string;
  bio:string;
  socialLink:string;
  walletAddress:string;
})=>{
    const { userId } = auth();
    if (!userId) {
        return {
            sucess:false,
            message:"User not Authenticated"
        };
    };
    
    const res=await prisma.user.update({
        where:{id:userId},
        data:{
            firstName:userFormData.firstName,
            lastName:userFormData.lastName,
            bio:userFormData.bio,
            websiteOrSocial:userFormData.socialLink,
            walletAddress:userFormData.walletAddress
        }
    })
    if(!res){
        return {
            sucess:false,
            message:"Error in onboarding"
        };
    }
    revalidatePath('/',"page");
    return {
        success:true,
        message:"Onboarded Successfully"
    }
}
