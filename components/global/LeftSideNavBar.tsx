import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { CgProfile } from "react-icons/cg";
import { RiCoinsLine } from "react-icons/ri";
import { FiHome } from "react-icons/fi";
import { IoImageOutline } from "react-icons/io5";
import { RiRobot2Line } from "react-icons/ri";
import { TbZoomScan } from "react-icons/tb";
import { HiOutlineAdjustments } from "react-icons/hi";
import { PiSelectionBackground } from "react-icons/pi";
import { signOut, useSession } from 'next-auth/react';
import axios from 'axios';
import { fetchUserDetails } from '@/redux/userDetailsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function LeftSideNavBar() {

    const router = useRouter().route
    const dispatch = useDispatch();
    const { data: session, status } = useSession();
    // console.log(router)
    const { userDetails, loading, error } = useSelector((state: RootState) => state.userdetail);

    // console.log(userDetails)

    useEffect(() => {
        // @ts-ignore
        if(session){
            // @ts-ignore
            dispatch(fetchUserDetails(session?.user?.email));
        }
        
    }, [dispatch , session])

    return (
        <div className='w-[220px] 2xl:w-[300px] h-full border-r border-slate-400 2xl:p-10 p-5 hidden md:flex flex-col justify-between'>
            <Link href={"/dashboard"}>
                <Image src={`/mainsource/ImageAIPRO.png`} width={200} height={100} alt='ImageAIPRO' />
            </Link>
            <div className='text-center '>
                <ul>
                    <li className={`${router === "/dashboard" ? "bg-active" : "leftsidebuttonauto"}`}>
                        <FiHome className='icon-left-bar' />
                        <Link href={"/dashboard"}>Home</Link>
                    </li>
                    {/* <li className='leftsidebuttonauto'>
                        <IoImageOutline className='icon-left-bar' />
                        <Link href={"/dashboard"}>Image Restore</Link>
                    </li> */}
                    <li className={`${router === "/generativefill" ? "bg-active" : "leftsidebuttonauto"}`}>
                        <RiRobot2Line className='icon-left-bar' />
                        <Link href={"/generativefill"}>Generative Fill</Link>
                    </li>
                    {/* <li className='leftsidebuttonauto'>
                        <TbZoomScan className='icon-left-bar' />
                        <Link href={"/dashboard"}>Object Remove</Link>
                    </li>
                    <li className='leftsidebuttonauto'>
                        <HiOutlineAdjustments className='icon-left-bar' />
                        <Link href={"/dashboard"}>Object Recolor</Link>
                    </li> */}
                    <li className={`${router === "/backgroundremove" ? "bg-active" : "leftsidebuttonauto"}`}>
                        <PiSelectionBackground className='icon-left-bar' />
                        <Link href={"/backgroundremove"}>Background Remove</Link>
                    </li>
                </ul>
            </div>

            <div>
                <div className='leftsidebuttonauto flex items-center  font-semibold px-2'>
                    <CgProfile className='text-lg' />
                    <Link href={"/dashboard"} className='text-md ml-2' onClick={()=>{signOut()}}>Sign Out</Link>
                </div>
                <div className='leftsidebuttonauto flex items-center  font-semibold px-2'>
                    <RiCoinsLine className='text-lg' />
                    <Link href={"/dashboard"} className='text-md ml-2'>Credit</Link>
                </div>
            </div>
        </div>
    )
}
