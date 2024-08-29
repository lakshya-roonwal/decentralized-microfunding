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

