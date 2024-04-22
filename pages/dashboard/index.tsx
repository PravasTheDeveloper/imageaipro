import LeftSideNavBar from '@/components/global/LeftSideNavBar'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import MediaUploader from '@/components/global/MediaUploader';

export default function DashBoard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) router.push('/signin');
  }, [session, status, router]);


  if (status === "loading") {
    return (
      <div className='w-full h-screen flex flex-col justify-center items-center'>
        {/* <Image src={'/AboutSection/login__singup__image.png'} width={260} height={97} alt='alphadrafts image' className='w-[300px]' /> */}
        <div className='mt-5 text-xl font-bold'>
          Loading ...
        </div>
      </div>
    )
  }
  return (
    <>
      <div className='w-full h-screen flex'>
        <LeftSideNavBar />
        <div className='flex-1'>
          {/* <MediaUploader /> */}
          <CldImage
            width={400}
            height={400}
            src={"imageaipro/n586qlzvhl6h4pgcnusx"}
            alt="image"
            sizes={"(max-width: 767px) 100vw, 50vw"}
            // placeholder={dataUrl as PlaceholderValue}
            className="media-uploader_cldImage"
            fillBackground
          />
        </div>
      </div>
    </>
  )
}

