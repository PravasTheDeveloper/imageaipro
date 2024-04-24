"use client";
import { useToast } from "@/components/ui/use-toast"
import { dataUrl, getImageSize } from "@/lib/utils";
import { setDimensions } from "@/redux/imageDetailsSlice";
import { RootState } from "@/redux/store";
import { CldImage, CldUploadWidget } from "next-cloudinary"
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

type MediaUploaderProps = {
  onValueChange: (value: string) => void;
  setImage: React.Dispatch<any>;
  publicId: string;
  image: any;
  type: string;
}

const MediaUploader = () => {
  const { toast } = useToast()
  const ImageDetails = useSelector((state: RootState) => state.imageData)

  const dispatch = useDispatch()
  console.log(ImageDetails)
  const onUploadSuccessHandler = (result: any) => {
    console.log(result)
    dispatch(setDimensions({ width: result?.info?.width, height: result?.info?.height, publicId: result?.info?.public_id, original_filename: result.info?.original_filename , secureURL:result?.info?.secure_url , imagesize:result?.info?.bytes }));

    toast({
      title: 'Image uploaded successfully',
      description: '1 credit was deducted from your account',
      duration: 5000,
      className: 'success-toast'
    })
  }

  const onUploadErrorHandler = () => {
    toast({
      title: 'Something went wrong while uploading',
      description: 'Please try again',
      duration: 5000,
      className: 'error-toast'
    })
  }

  return (
    <CldUploadWidget
      uploadPreset="jsm_imageaipro"
      options={{
        multiple: false,
        resourceType: "image",
      }}
      onSuccess={onUploadSuccessHandler}
      onError={onUploadErrorHandler}
    >
      {({ open }) => (
        <div className="flex flex-col gap-4">
          {ImageDetails.publicId ? (
            <>
              <div className="cursor-pointer overflow-hidden rounded-[10px]">
                <CldImage
                  width={ImageDetails.width}
                  height={ImageDetails.height}
                  src={ImageDetails.publicId}
                  alt="image"
                  sizes={"(max-width: 767px) 100vw, 50vw"}
                  placeholder={dataUrl as PlaceholderValue}
                  className="media-uploader_cldImage p-5"
                />
              </div>
            </>
          ) : (
            <div className="media-uploader_cta flex flex-col items-center justify-center" onClick={() => open()}>
              <h3 className="h3-bold text-dark-600">
                Original
              </h3>
              <div className='w-10 h-10 bg-slate-800 my-5 cursor-pointer text-2xl text-white rounded-xl flex justify-center items-center'>
                <FiPlus />
              </div>
              <p className='w-auto text-sm text-slate-900 font-semibold capitalize'>
                Please Enter Your Image Here
              </p>
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  )
}

export default MediaUploader