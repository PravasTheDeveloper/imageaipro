"use client"
import { SelectDemo } from '@/components/SelectDemo';
import LeftSideNavBar from '@/components/global/LeftSideNavBar';
import MediaUploader from '@/components/global/MediaUploader';
import MobileDeviceNavbar from '@/components/global/MobileDeviceNavbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { download } from '@/lib/utils';
import { setLoadingFalse } from '@/redux/aspectRationSlice';
import { RootState } from '@/redux/store';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { CldImage, getCldImageUrl } from 'next-cloudinary';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { TbPhotoScan } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { DotLoader } from 'react-spinners';
import Swal from 'sweetalert2';

export default function BackGroundRemove() {

    const BestColorsToUse = [
        {
            id: 1,
            name: "white",
            color: "#FFFFFF",
        },
        {
            id: 2,
            name: "lightgray",
            color: "#D3D3D3",
        },
        {
            id: 4,
            name: "lightblue",
            color: "#ADD8E6",
        },
        {
            id: 5,
            name: "lightpink",
            color: "#FFB6C1",
        },
        {
            id: 7,
            name: "lightgreen",
            color: "#90EE90",
        },
        {
            id: 8,
            name: "lightyellow",
            color: "#FFFFE0",
        }
    ];


    const [backgroundColorForImage, setbackgroundColorForImage] = useState("")
    const { data: session, status } = useSession();
    const router = useRouter();
    const dispatch = useDispatch()
    const AspectRatioOption = useSelector((state: RootState) => state.aspectRatio)
    const ImageDetails = useSelector((state: RootState) => state.imageData)
    const { userDetails, loading, error } = useSelector((state: RootState) => state.userdetail);
    console.log(session)



    if (AspectRatioOption.loading === true) {
        setTimeout(() => {
            dispatch(setLoadingFalse());
        }, 5000);
    }


    const [inputname, setinputname] = useState("")
    const [transformedUrl, setTransformedUrl] = useState('');

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

    const handleSaveImage = (e: any) => {
        e.preventDefault();
        if (inputname === "") {
            Swal.fire({
                title: "Input Error",
                text: "Please fill the name input feild",
                icon: "error"
            });
        } else {
            download(getCldImageUrl({
                width: ImageDetails.width,
                height: ImageDetails.height,
                src: ImageDetails.publicId,
                aspectRatio: AspectRatioOption.aspectRatio,
                removeBackground: true,
                background:backgroundColorForImage
            }), inputname)
        }
    };

    const handleSaveImageDetails = async () => {
        const { width, height, publicId, original_filename } = ImageDetails;
        const { aspectRatio } = AspectRatioOption

        const response = await axios.post("/api/imageinfosave/imageinfosave", {
            width,
            height,
            publicId,
            transformationType: "removeBackground",
            title: inputname == "" ? original_filename : inputname,
            aspectRatio: aspectRatio,
            backgroundColor : backgroundColorForImage,
            secureURL: ImageDetails.secureURL,
            // @ts-ignore
            authorId: userDetails?.id,
            imagesize: ImageDetails.iamgesize,
            
        })

        if (response.status = 200) {
            Swal.fire({
                title: "Save Successfull",
                text: "Image Details Save Successfull",
                icon: "success"
            });
        }
    }

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
                            <p className='text-slate-500 mb-10'>
                                {`Enhance your image's corners with ai`}
                            </p>
                            <label  className='text-sm font-semibold' htmlFor="">File Name</label>
                            <Input type="text" onChange={(e) => { setinputname(e.target.value) }} value={inputname === "" ? ImageDetails.original_filename : inputname} placeholder="Your File Name" />
                            {/* <SelectDemo /> */}
                            <div className='mt-10 flex'>
                                <div className='w-16 cursor-pointer p-1 h-16 mr-3 bg-slate-400 flex rounded'>
                                    <div className={`w-full h-full bg-transparent`} onClick={() => setbackgroundColorForImage("transparent")}>
                                        <Image src={"/mainsource/transperent.png"} width={70} height={70} alt='Transperent Image' />
                                    </div>
                                </div>
                                {
                                    BestColorsToUse.map((data, index) => {
                                        return (
                                            <div key={index} className='w-16 p-1 h-16 mr-3 bg-slate-400 flex cursor-pointer rounded'>
                                                <div className={`w-full h-full bg-${data.color}`} style={{ backgroundColor: data.color }} onClick={() => setbackgroundColorForImage(data.name)}>

                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>
                        <div className='mt-10'>
                            <div className='w-full h-auto min-h-[500px] bg-slate-500 lg:flex'>
                                <div className='lg:w-1/2 w-full h-auto min-h-[300px] bg-slate-200 flex flex-col justify-center items-center'>
                                    <MediaUploader />
                                </div>

                                <div className='lg:w-1/2 select-none w-full h-auto min-h-[300px] bg-slate-300 flex flex-col justify-center items-center'>
                                    {
                                        AspectRatioOption.loading === true ?
                                            <div className='flex w-full h-full flex-col justify-center items-center'>
                                                <DotLoader
                                                    size={50}
                                                    color='#1e293b'
                                                />
                                                <p className='mt-3 font-semibold'>
                                                    Filling your image
                                                </p>
                                            </div>
                                            :
                                            ImageDetails.publicId ?
                                                <CldImage
                                                    width={ImageDetails.width}
                                                    height={ImageDetails.height}
                                                    aspectRatio={AspectRatioOption.aspectRatio}
                                                    src={ImageDetails.publicId}
                                                    alt="image"
                                                    sizes={"(max-width: 767px) 100vw, 50vw"}
                                                    className="media-uploader_cldImage p-5"
                                                    removeBackground
                                                    // background={backgroundColorForImage === "transparent" ? "" : backgroundColorForImage}
                                                    background={backgroundColorForImage}
                                                />
                                                :
                                                <div className='flex justify-center flex-col items-center font-semibold ' style={{ backgroundColor: backgroundColorForImage }} >
                                                    <TbPhotoScan className='text-6xl mb-5' />
                                                    Generative Image
                                                </div>
                                    }
                                </div>
                            </div>
                            <div className='flex mt-14 mb-10'>
                                <Button className='w-full rounded-full mr-10' onClick={handleSaveImageDetails}>
                                    Save Image
                                </Button>
                                <Button className='w-full rounded-full' onClick={handleSaveImage}>
                                    Download Image
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}