import React from 'react'
import { FiHome } from 'react-icons/fi'
import { HiOutlineAdjustments } from 'react-icons/hi'
import { IoImageOutline } from 'react-icons/io5'
import { PiSelectionBackground } from 'react-icons/pi'
import { RiRobot2Line } from 'react-icons/ri'
import { TbZoomScan } from 'react-icons/tb'
import DashBoardHeroSection from './DashBoardHeroSection'
import UserProjectDetails from './UserProjectDetails'

export default function MainDashBoadSection() {
    return (
        <>
            <div className='w-full h-auto xl:p-20 md:p-10 p-5'>
                <div className='w-full h-auto'>
                    <DashBoardHeroSection />
                    <UserProjectDetails />
                </div>
            </div>
        </>
    )
}
