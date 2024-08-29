"use server"

import prisma from "@/utils/db"
import { currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from "next/cache";

export const changeBackgroundBanner = async (url: string) => {
    const user = await currentUser();
    console.log(user?.id);
    const userId = user?.id;

    if (!userId) {
        return {
            success: false,
            message: "User Not Authenticated",
        };
    }

    try {
        const data = await prisma.user.update({
            where: { id: userId },
            data: {
                bannerImage: url,
            },
        });

        if (data) {
            return {
                success: true,  // Corrected to show success
                message: "Banner image updated successfully",
            };
        }
    } catch (error) {
        console.error("Error updating banner image:", error);
        return {
            success: false,
            message: "Failed to update banner image",
        };
    }
};

export async function checkUsernameAvailability(username: string): Promise<boolean> {
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });
        
        // Return true if the username is available (no existing user found)
        console.log("🚀 ~ checkUsernameAvailability ~ existingUser:", existingUser)
        return existingUser === null;
    } catch (error) {
        console.error('Error checking username availability:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

export const saveProfileDataInDB = async (data: { username: string; firstName: string; lastName: string; bio?: string; websiteOrSocial?: string; walletAddress?: string; }) => {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
        return {
            success: false,
            message: "User Not Authenticated",
        };
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                username: data.username,
                firstName: data.firstName,
                lastName: data.lastName,
                bio: data.bio,
                websiteOrSocial: data.websiteOrSocial,
                walletAddress: data.walletAddress,
            },
        });
        revalidatePath("/dashboard",'page');
        return {
            success: true,
            message: "Profile updated successfully",
            user: updatedUser,
        };
    } catch (error) {
        console.error("Error updating profile data:", error);
        return {
            success: false,
            message: "Failed to update profile data",
        };
    }
};