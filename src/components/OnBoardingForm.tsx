"use client";
import React, { FC, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera, Wallet } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PublicKey } from "@solana/web3.js";
import { onBoardUser } from "@/actions/onBoarding";
import { useRouter } from "next/navigation"; // Change this import
import Spinner from "./Spinner";

interface OnBoardingFormProps {
  defaultData: {
    firstName: string;
    lastName: string;
    bio: string;
    socialLink?: string;
    walletAddress?: string;
    username: string; // Add this line
  };
}

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  bio: z.string().max(500, "Bio must not exceed 500 characters").optional(),
  socialLink: z.string().url("Invalid URL").optional().or(z.literal("")),
  walletAddress: z.string().refine((value) => {
    try {
      new PublicKey(value);
      return true;
    } catch (error) {
      return false;
    }
  }, "Invalid Solana wallet address"),
});

type FormValues = z.infer<typeof formSchema>;

export const OnBoardingForm: FC<OnBoardingFormProps> = ({defaultData}) => {
  const [step, setStep] = React.useState(1);
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter(); // This should now work correctly
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: defaultData.firstName,
      lastName: defaultData.lastName,
      bio: defaultData.bio,
      socialLink: defaultData.socialLink,
      walletAddress: defaultData.walletAddress
    },
  });

  const nextStep = () => {
    form
      .trigger(["firstName", "lastName", "bio", "socialLink"])
      .then((isValid) => {
        if (isValid) setStep(2);
      });
  };
  const prevStep = () => setStep(1);

  const onSubmit = async(formData: FormValues) => {
    setLoading(true);
    const userData = {
      ...formData,
      bio: formData.bio || '',
      socialLink: formData.socialLink || '',
    };
    const res = await onBoardUser(userData);
    if(!res.success)
    {
        toast({
            variant: "destructive",
            title: "Error in Onboarding",
            description: res.message,
          })
          setLoading(false);
          return;
    }
    setLoading(false);
    toast({
        title: res.message,
      })
    router.push(`/dashboard/profile`);
    

  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-card rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Profile Setup</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={stepVariants}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
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
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about yourself"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="socialLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website or Social Link</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="button" onClick={nextStep} className="w-full">
                    Next
                  </Button>
                </div>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div
                key="step2"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={stepVariants}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-4">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Avatar className="w-24 h-24 bg-primary/10 flex justify-center items-center">
                      <Wallet className="w-12 h-12 text-primary" />
                    </Avatar>
                    <span className="text-lg font-semibold">
                      Wallet Information
                    </span>
                  </div>
                  <FormField
                    control={form.control}
                    name="walletAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Wallet Address</FormLabel>
                        <FormControl>
                          <Input placeholder="0x..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormDescription>
                    Please ensure you&apos;ve entered the correct wallet address.
                    This will be used for all future transactions and cannot be
                    easily changed later.
                  </FormDescription>
                  <div className="flex space-x-4">
                    <Button
                      type="button"
                      onClick={prevStep}
                      variant="outline"
                      className="w-full"
                    >
                      Back
                    </Button>
                    <Button type="submit" className="w-full">
                      Submit
                      {loading&&<Spinner/>}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </Form>
      <div className="mt-4 flex justify-center">
        <span className="text-sm text-muted-foreground">Step {step} of 2</span>
      </div>
    </div>
  );
};
