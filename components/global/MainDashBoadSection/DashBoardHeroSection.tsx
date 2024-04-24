import React from 'react'
import { HiOutlineAdjustments } from 'react-icons/hi'
import { IoImageOutline } from 'react-icons/io5'
import { PiSelectionBackground } from 'react-icons/pi'
import { RiRobot2Line } from 'react-icons/ri'
import { TbZoomScan } from 'react-icons/tb'

export default function DashBoardHeroSection() {
    return (
        <>
            <div className='w-full md:h-[300px] h-auto py-10 px-1 md:px-0 md:py-0 rounded-xl dashboard_gradient flex flex-col justify-center'>
                <div className='mb-10 text-center text-white'>
                    <h1 className='lg:text-3xl md:text-2xl text-xl font-semibold'>Make Your Image Pro With Image Ai PRO</h1>
                </div>
                <div className='w-full h-auto md:h-[100px] md:flex md:justify-around px-10'>
                    <div className='maindashboardiconstyle'>
                        <div className='md:w-14 w-full flex h-14 md:bg-slate-700 justify-center items-center rounded-lg md:rounded-full'>
                            <IoImageOutline className='text-4xl text-white' />
                        </div>
                        <p className='lg:flex md:hidden flex'>
                            Image Restore
                        </p>
                    </div>
                    <div className='maindashboardiconstyle'>
                        <div className='w-14 md:h-14 h-auto bg-slate-700 flex justify-center items-center rounded-full'>
                            <RiRobot2Line className='text-4xl text-white' />
                        </div>
                        <p className='lg:flex md:hidden flex'>
                            Generative Fill
                        </p>
                    </div>
                    <div className='maindashboardiconstyle'>
                        <div className='w-14 h-14 bg-slate-700 flex justify-center items-center rounded-full'>
                            <TbZoomScan className='text-4xl text-white' />
                        </div>
                        <p className='lg:flex md:hidden flex'>
                            Object Remove
                        </p>
                    </div>
                    <div className='maindashboardiconstyle'>
                        <div className='w-14 h-14 bg-slate-700 flex justify-center items-center rounded-full'>
                            <HiOutlineAdjustments className='text-4xl text-white' />
                        </div>
                        <p className='lg:flex md:hidden flex'>
                            Object Recolor
                        </p>
                    </div>
                    <div className='maindashboardiconstyle'>
                        <div className='w-14 h-14 bg-slate-700 flex justify-center items-center rounded-full'>
                            <PiSelectionBackground className='text-4xl text-white' />
                        </div>
                        <p className='lg:flex md:hidden flex'>
                            Background Remove
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
