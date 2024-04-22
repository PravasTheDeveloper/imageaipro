import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { FaBars } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { CgProfile } from "react-icons/cg";
import { RiCoinsLine } from "react-icons/ri";
import { FiHome } from "react-icons/fi";
import { IoImageOutline } from "react-icons/io5";
import { RiRobot2Line } from "react-icons/ri";
import { TbZoomScan } from "react-icons/tb";
import { HiOutlineAdjustments } from "react-icons/hi";
import { PiSelectionBackground } from "react-icons/pi";
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { fetchUserDetails } from '@/redux/userDetailsSlice';

export default function MobileDeviceNavbar() {
    const router = useRouter().route
    const dispatch = useDispatch();

    // console.log(router)
    const { userDetails, loading, error } = useSelector((state: RootState) => state.userdetail);

    // console.log(userDetails)

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchUserDetails("6622978345ce1f88841c7318"));
    }, [dispatch])
    return (
        <>
            <Sheet>
                <div className='w-full h-14 bg-slate-200 md:hidden flex justify-between items-center px-7'>
                    <Link href={"/dashboard"} className=''>
                        <Image src={`/mainsource/ImageAIPRO.png`} width={200} height={100} alt='ImageAIPRO' />
                    </Link>
                    <SheetTrigger asChild>
                        <Button variant="outline" className='bg-transparent text-xl'><FaBars /></Button>
                    </SheetTrigger>
                </div>

                <SheetContent className='flex flex-col justify-between'>
                    <SheetHeader>
                        <SheetTitle>
                            <Link href={"/dashboard"}>
                                <Image src={`/mainsource/ImageAIPRO.png`} width={200} height={100} alt='ImageAIPRO' />
                            </Link>
                        </SheetTitle>
                        <SheetDescription>
                            Make your image ai pro
                        </SheetDescription>
                    </SheetHeader>


                    <div className='text-center '>
                        <ul>
                            <li className={`${router === "/dashboard" ? "mobile-bg-active" : "mobilenavbarstyles"}`}>
                                <FiHome className='mobile-icon-left-bar' />
                                <Link href={"/dashboard"}>Home</Link>
                            </li>
                            <li className='mobilenavbarstyles'>
                                <IoImageOutline className='mobile-icon-left-bar' />
                                <Link href={"/dashboard"}>Image Restore</Link>
                            </li>
                            <li className={`${router === "/generativefill" ? "mobile-bg-active" : "mobilenavbarstyles"}`}>
                                <RiRobot2Line className='mobile-icon-left-bar' />
                                <Link href={"/generativefill"}>Generative Fill</Link>
                            </li>
                            <li className='mobilenavbarstyles'>
                                <TbZoomScan className='mobile-icon-left-bar' />
                                <Link href={"/dashboard"}>Object Remove</Link>
                            </li>
                            <li className='mobilenavbarstyles'>
                                <HiOutlineAdjustments className='mobile-icon-left-bar' />
                                <Link href={"/dashboard"}>Object Recolor</Link>
                            </li>
                            <li className='mobilenavbarstyles'>
                                <PiSelectionBackground className='mobile-icon-left-bar' />
                                <Link href={"/dashboard"}>Background Remove</Link>
                            </li>
                        </ul>
                    </div>


                    <SheetFooter>
                        <div>
                            <div className='mobilenavbarstyles flex items-center  font-semibold px-2'>
                                <CgProfile className='text-lg' />
                                <Link href={"/dashboard"} className='text-md ml-2' onClick={() => { signOut() }}>Profile</Link>
                            </div>
                            <div className='mobilenavbarstyles flex items-center  font-semibold px-2'>
                                <RiCoinsLine className='text-lg' />
                                <Link href={"/dashboard"} className='text-md ml-2'>Credit</Link>
                            </div>
                        </div>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </>
    )
}
