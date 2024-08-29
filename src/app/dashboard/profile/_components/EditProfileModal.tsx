import React, { useRef, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PublicKey } from "@solana/web3.js";
import { User } from '@prisma/client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Globe, Pencil, User as UserIcon, Wallet } from 'lucide-react';
import { checkUsernameAvailability, saveProfileDataInDB } from '@/actions/profile';

interface EditProfileModalProps {
  userData: User;
}

const formSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  bio: z.string().max(500, "Bio must not exceed 500 characters").optional(),
  websiteOrSocial: z.string().url("Invalid URL").optional().or(z.literal("")),
  walletAddress: z.string().refine((value) => {
    try {
      new PublicKey(value);
      return true;
    } catch (error) {
      return false;
    }
  }, "Invalid Solana wallet address").optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditProfileModal({ userData }: EditProfileModalProps) {
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user: clerkUser, isLoaded } = useUser();
  const { toast } = useToast();
  const [profileImage, setProfileImage] = useState(userData.profileImage || "");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: userData.username,
      firstName: userData.firstName,
      lastName: userData.lastName,
      bio: userData.bio || "",
      websiteOrSocial: userData.websiteOrSocial || "",
      walletAddress: userData.walletAddress || "",
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isLoaded && clerkUser) {
      try {
        await clerkUser.setProfileImage({ file });
        setProfileImage(URL.createObjectURL(file)); // Update the profile image state
        toast({
          title: "Profile picture updated successfully!",
        });
      } catch (error) {
        console.error('Error updating profile picture:', error);
        toast({
          variant: "destructive",
          title: "Failed to update profile picture. Please try again.",
        });
      }
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
        // Check username availability
        if (data.username !== userData.username) {
        const isUsernameAvailable = await checkUsernameAvailability(data.username);
        console.log("🚀 ~ onSubmit ~ isUsernameAvailable:", isUsernameAvailable)
        if (!isUsernameAvailable) {
            form.setError("username", { 
                type: "manual", 
                message: "This username is already taken. Please choose another." 
            });
            return;
        }
    }

        if (isLoaded && clerkUser) {
            await clerkUser.update({
                firstName: data.firstName,
                lastName: data.lastName,
                username: data.username
            });
        }
        
        // Call the new server action function
        const saveResponse = await saveProfileDataInDB(data);
        if (!saveResponse.success) {
            throw new Error(saveResponse.message);
        }

        setOpen(false);
        toast({
            title: "Profile updated successfully!",
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        toast({
            variant: "destructive",
            title: "Failed to update profile. Please try again.",
        });
    }
};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className='mt-6'>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] w-full h-full sm:h-auto sm:max-h-[90vh] p-0">
        <ScrollArea className="w-full h-full max-h-screen sm:max-h-[calc(90vh-2rem)]">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                      <Avatar className="h-24 w-24 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                        <AvatarImage src={profileImage} alt={`${userData.firstName} ${userData.lastName}`} />
                        <AvatarFallback>{userData.firstName?.[0]}{userData.lastName?.[0]}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1 text-center sm:text-left">
                        <h4 className="text-sm font-medium leading-none">{form.watch("firstName")} {form.watch("lastName")}</h4>
                        <p className="text-sm text-muted-foreground">@{form.watch("username")}</p>
                        <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Change Picture
                        </Button>
                      </div>
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                      aria-label="Upload profile picture"
                    />
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <div className="relative">
                    <UserIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input {...field} className="pl-8" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
                
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="websiteOrSocial"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website or Social</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Globe className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input {...field} className="pl-8" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="walletAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Wallet Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Wallet className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input {...field} className="pl-8" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                <Button type="submit" className="w-full sm:w-auto">Save Changes</Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}