"use client";
import { useToast } from "@/components/ui/use-toast"
import { dataUrl, getImageSize } from "@/lib/utils";
import { CldImage, CldUploadWidget } from "next-cloudinary"
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";

type MediaUploaderProps = {
  onValueChange: (value: string) => void;
  setImage: React.Dispatch<any>;
  publicId: string;
  image: any;
  type: string;
}

const MediaUploader = () => {
  const { toast } = useToast()

  const [ImageDetails, setImageDetails] = useState({
    publicId: "",
    width: "",
    height: "",
    secureURL: ""
  })

  const onUploadSuccessHandler = (result: any) => {
    // setImage((prevState: any) => ({
    //   ...prevState,
    //   publicId: result?.info?.public_id,
    //   width: result?.info?.width,
    //   height: result?.info?.height,
    //   secureURL: result?.info?.secure_url
    // }))

    console.log(result.info)

    setImageDetails((prevState: any) => ({
      ...prevState,
      publicId: result?.info?.public_id,
      width: result?.info?.width,
      height: result?.info?.height,
      secureURL: result?.info?.secure_url
    }))

    // onValueChange(result?.info?.public_id)

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
          <h3 className="h3-bold text-dark-600">
            Original
          </h3>

          {ImageDetails.publicId ? (
            <>
              <div className="cursor-pointer overflow-hidden rounded-[10px]">
                <CldImage
                  width={400}
                  height={400}
                  src={ImageDetails.publicId}
                  alt="image"
                  sizes={"(max-width: 767px) 100vw, 50vw"}
                  placeholder={dataUrl as PlaceholderValue}
                  className="media-uploader_cldImage"
                />
              </div>
            </>
          ) : (
            <div className="media-uploader_cta flex flex-col items-center justify-center" onClick={() => open()}>
              <div className='w-10 h-10 bg-slate-800 text-2xl text-white rounded-xl flex justify-center items-center'>
                <FiPlus />
              </div>
              <p className='w-auto text-sm text-slate-900 mt-3 font-semibold capitalize'>
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