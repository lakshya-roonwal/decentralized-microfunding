import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ImageIcon } from "lucide-react"
import { changeBackgroundBanner } from '@/actions/profile'
import { useToast } from '@/components/ui/use-toast'

interface NotionLikeBannerProps {
  initialImageUrl: string;
  height?: string;
}

export default function BannerEditor({ initialImageUrl, height = "300px" }: NotionLikeBannerProps) {
  const { toast } = useToast();
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [tempUrl, setTempUrl] = useState(initialImageUrl);

  const handleUrlChange = async() => {
    setImageUrl(tempUrl);
    const data=await changeBackgroundBanner(tempUrl);
    if(!data?.success)
    {
      toast({
        variant: "destructive",
        title: "Error in Chaning Banner",
        description: data?.message,
      })
      return;
    }
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      <div 
        className="relative w-full rounded-lg overflow-hidden transition-all duration-300"
        style={{ height }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-300"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        {isHovered && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="secondary" 
                className="absolute top-4 right-4 bg-white/80 hover:bg-white/90"
              >
                <ImageIcon className="mr-2 h-4 w-4" />
                Change Banner
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change Banner Image</DialogTitle>
              </DialogHeader>
              <div className='w-full h-full'>
                <img src={tempUrl} className='rounded-md'/>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Enter image URL"
                  value={tempUrl}
                  onChange={(e) => setTempUrl(e.target.value)}
                  className="flex-grow"
                />
                <Button onClick={handleUrlChange}>Update</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}