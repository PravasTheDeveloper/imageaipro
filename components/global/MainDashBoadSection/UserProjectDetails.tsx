import { setLoadingFalse } from '@/redux/aspectRationSlice';
import { setDimensions } from '@/redux/imageDetailsSlice';
import { RootState } from '@/redux/store';
import { setLoadingTrue } from '@/redux/userDetailsSlice';
import { fetchImagesByAuthorId } from '@/redux/userImageSlice';
import { CldImage } from 'next-cloudinary';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GlobalLoadingScreen from '../GlobalLoadingScreen/GlobalLoadingScreen';

export default function UserProjectDetails() {

    const dispatch = useDispatch()
    const { userDetails, loading, error } = useSelector((state: RootState) => state.userdetail);
    const imageUserDetails = useSelector((state: RootState) => state.userImageData.images);
    const router = useRouter()
    console.log(imageUserDetails)

    useEffect(() => {
        if (userDetails) {
            // @ts-ignore
            dispatch(fetchImagesByAuthorId({ authorId: userDetails.id }));
        }

    }, [dispatch, userDetails]);

    const getImageDetails = (data: any) => {

        dispatch(setLoadingTrue())

        dispatch(setDimensions({ width: data?.width, height: data?.height, publicId: data?.publicId, original_filename: data?.title, secureURL: data?.secureURL, imagesize: data?.imagesize }));

        setTimeout(() => {
            if (data.transformationType === "fillBackground") {
                dispatch(setLoadingFalse())
                router.push("/generativefill")
            } else if (data.transformationType === "removeBackground") {
                dispatch(setLoadingFalse())
                router.push("/backgroundremove")
            } else {
                dispatch(setLoadingFalse())
                router.push("/dashboard")
            }
        }, 2000);
    }
    if (loading === true) {
        return (
            <GlobalLoadingScreen />
        )
    }

    return (
        <>
            {
                <div className='w-full min-h-[50vh] mt-20'>
                    <h2 className='text-xl font-semibold mb-10'>
                        Your Project :
                    </h2>
                    <div className='w-full h-auto grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-10'>
                        {
                            imageUserDetails ?
                                imageUserDetails.map((data, index) => {
                                    return (
                                        <div key={index} className='w-full cursor-pointer aspect-square bg-slate-400 overflow-hidden rounded-lg relative' onClick={() => getImageDetails(data)}>
                                            <div className='bg-[#00000077] w-full h-full p-3 absolute z-50 flex items-end'>
                                                <div className='text-white opacity-100 text-sm font-semibold'>
                                                    <p>
                                                        {// @ts-ignore
                                                            data.title}
                                                    </p>
                                                    <p className='mt-3'>
                                                        {// @ts-ignore
                                                            data.transformationType
                                                        }
                                                    </p>
                                                    <p className='mt-3'>
                                                        {// @ts-ignore
                                                            (data.imagesize / (1024 * 1024)).toFixed(2)} MB
                                                    </p>

                                                </div>

                                            </div>
                                            <CldImage
                                                width={// @ts-ignore
                                                    data?.width}
                                                height={// @ts-ignore
                                                    data?.height}
                                                src={// @ts-ignore
                                                    data?.publicId}
                                                alt="image"
                                                sizes={"(max-width: 767px) 100vw, 50vw"}
                                                // placeholder={dataUrl as PlaceholderValue}
                                                className="media-uploader_cldImage"
                                            />
                                        </div>
                                    )
                                })
                                :
                                <div>
                                    Loading
                                </div>
                        }
                    </div>


                </div>

            }

        </>
    )
}
