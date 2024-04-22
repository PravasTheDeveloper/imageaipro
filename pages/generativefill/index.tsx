"use client"
import { SelectDemo } from '@/components/SelectDemo';
import LeftSideNavBar from '@/components/global/LeftSideNavBar';
import MediaUploader from '@/components/global/MediaUploader';
import MobileDeviceNavbar from '@/components/global/MobileDeviceNavbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSession } from 'next-auth/react';
import { CldImage } from 'next-cloudinary';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { FiPlus } from "react-icons/fi";
import { TbPhotoScan } from "react-icons/tb";

export default function GenerativeFill() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [transformedUrl, setTransformedUrl] = useState('');

    useEffect(() => {
        if (status === "loading") return;
        if (!session) router.push('/signin');
    }, [session, status, router]);

    const handleTransformImage = () => {
        const cloudinaryUrl = `https://res.cloudinary.com/dxhaelva2/image/upload/b_gen_fill,ar_${`16:9`},c_pad/c_limit,w_1920/f_auto/q_auto/v1/${'imageaipro/s9f0elknptqkwmkympwv'}`;
        setTransformedUrl(cloudinaryUrl);
    };

    console.log(transformedUrl)


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

    const handleSaveImage = () => {
        // Initiate download of the transformed image
        const link = document.createElement('a');
        link.href = "";
        link.download = 'transformed_image.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <div className='w-full h-screen md:flex'>
                <LeftSideNavBar />
                <MobileDeviceNavbar />
                <div className='h-full flex-1 xl:px-40 px-7 pt-10 pb-0'>
                    
                    <div className='h-full w-full flex flex-col justify-between pb-5'>
                        <div>
                            <h1 className='text-3xl font-semibold text-indigo-950'>
                                Generative Fill
                            </h1>
                            <p className='text-slate-500'>
                                {`Enhance your image's corners with ai`}
                            </p>
                            <Input type="email" className='my-10' placeholder="Email" />
                            <SelectDemo />
                        </div>
                        <div className='mt-10'>
                            <div className='w-full h-auto min-h-[500px] bg-slate-500 lg:flex'>
                                <div className='lg:w-1/2 w-full h-auto min-h-[300px] bg-slate-200 flex flex-col justify-center items-center'>
                                    <MediaUploader />
                                </div>
                                <div className='lg:w-1/2 w-full h-auto min-h-[300px] bg-slate-300 flex flex-col justify-center items-center'>

                                    {
                                        transformedUrl ?
                                            <CldImage
                                                width={800}
                                                height={400}
                                                aspectRatio="3:4"
                                                alt="backgroundpro"
                                                sizes="100vw"
                                                src={transformedUrl}
                                                className="media-uploader_cldImage"
                                            /> :
                                            <div className='flex justify-evenly flex-col items-center'>
                                                <TbPhotoScan className='text-6xl' />
                                                <p className='text-sm font-semibold mt-3'>
                                                    Transformed Image
                                                </p>
                                            </div>
                                    }

                                </div>
                            </div>
                            <div className='flex mt-14 mb-10'>
                                <Button className='w-full rounded-full mr-10' onClick={handleTransformImage}>
                                    Transform Image
                                </Button>
                                <Button className='w-full rounded-full'>
                                    Save Image
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// https://res.cloudinary.com/dxhaelva2/image/upload/b_gen_fill,ar_1920:960,c_pad/c_limit,w_1920/f_auto/q_auto/v1/imageaipro/s9f0elknptqkwmkympwv?_a=BAVCkKDW0