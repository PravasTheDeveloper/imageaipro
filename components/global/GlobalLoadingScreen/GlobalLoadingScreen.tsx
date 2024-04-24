import Image from 'next/image'
import React from 'react'
import { CircleLoader } from 'react-spinners'

export default function GlobalLoadingScreen() {
    return (
        <>
            <div className='w-full bg-white h-screen absolute flex flex-col justify-center items-center top-0 left-0'>
                <Image src={'/mainsource/ImageAIPRO.png'} width={260} height={97} alt='alphadrafts image' className='w-[300px]' />
                <div className='my-5'>
                    <CircleLoader />
                </div>
                <div className='mt-5 text-xl font-bold'>
                    Loading ...
                </div>
            </div>
        </>
    )
}
