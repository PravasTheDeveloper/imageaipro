"use client"
import React, { useEffect, useState } from 'react'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Image from 'next/image'

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Swal from 'sweetalert2'
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { ClipLoader } from "react-spinners"

export default function SignUpPage() {

    const [UserDetails, setUserDetails] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        cpassword: ""
    })

    let name = ""
    let value = ""

    const handleinput = (e: any) => {
        name = e.target.name
        value = e.target.value

        setUserDetails((prevUserDetails) => ({
            ...prevUserDetails,
            [name]: value,
        }));
    }
    const handleInputHandle = async () => {
        const { name, username, email, password, cpassword } = UserDetails

        if (!name || !username || !email || !password || !cpassword) {
            Swal.fire({
                title: "Feild Empty",
                text: "Please fill all the feild",
                icon: "warning"
            });
        } else if (password != cpassword) {
            Swal.fire({
                title: "Feild Error",
                text: "Password and confirm password must be same",
                icon: "error"
            });
        } else {
            setsignupbuttonloading(true)
            const response = await axios.post("/api/registeruser/userregistration", UserDetails)

            if (response.status === 201) {
                Swal.fire({
                    title: "Congratulation",
                    text: "Registration is successful redirecting to login page",
                    icon: "success"
                });

                setsignupbuttonloading(false)
                router.push("/signin")
            } else if (response.status === 209) {
                Swal.fire({
                    title: "Wrong email",
                    text: "You already used this email",
                    icon: "error"
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: "Unknown Error",
                    icon: "error"
                });
            }
            setsignupbuttonloading(false)
        }

    }

    const [passwordshow, setpasswordshow] = useState(true)
    const [signupbuttonloading, setsignupbuttonloading] = useState(false)

    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;
        if (session) router.push('/dashboard');
    }, [session, status, router]);

    // console.log(session)

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


    return (
        <div className='bg-slate-100 w-full xl:h-screen h-auto min-h-screen select-none'>
            <div className='w-full h-full flex justify-center items-center py-5'>
                <Card className="w-[350px]">
                    <CardHeader>
                        <div className='mb-5'>
                            <Image src={`/mainsource/ImageAIPRO.png`} width={200} height={100} alt='ImageAIPRO' />
                        </div>
                        <CardTitle>Sign Up</CardTitle>
                        <CardDescription>Create your image ai pro</CardDescription>
                        <div className='my-5'>
                            <Button className='w-full bg-transparent text-black border mt-5 border-slate-900 hover:text-white' onClick={() => { signIn("google") }}>
                                <FcGoogle className='text-xl mr-5' />
                                <p>
                                    Continue with google
                                </p>
                            </Button>
                            <Button className='w-full bg-transparent text-black border mt-5 border-slate-900 hover:text-white' onClick={() => { signIn("github") }}>
                                <FaGithub className='text-xl mr-5' />
                                <p>
                                    Continue with github
                                </p>
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Name</Label>
                                    <Input type='text' value={UserDetails.name} name="name" onChange={handleinput} id="name" placeholder="Your Name" />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="username">User Name</Label>
                                    <Input type='text' value={UserDetails.username} name="username" onChange={handleinput} id="username" placeholder="Your User Name" />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input type='email' value={UserDetails.email} name="email" onChange={handleinput} id="email" placeholder="Your Email Address" />
                                </div>
                                <div className="flex flex-col space-y-1.5 ">
                                    <Label htmlFor="password">Password</Label>
                                    <div className='relative flex items-center h-full'>
                                        <Input type={`${passwordshow === true ? 'password' : "text"}`} value={UserDetails.password} name="password" onChange={handleinput} id="password" placeholder="Your password" />
                                        {passwordshow === false ? <LuEye className='text-xl absolute right-2 cursor-pointer' onClick={() => { setpasswordshow(true) }} /> : <LuEyeOff className='text-xl absolute right-2 cursor-pointer' onClick={() => { setpasswordshow(false) }} />}
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="cpassword">Confirm Passoword</Label>
                                    <div className='relative flex items-center h-full'>
                                        <Input type={`${passwordshow === true ? 'password' : "text"}`} value={UserDetails.cpassword} name="cpassword" onChange={handleinput} id="cpassword" placeholder="Confirm Password" />
                                        {passwordshow === false ? <LuEye className='text-xl absolute right-2 cursor-pointer' onClick={() => { setpasswordshow(true) }} /> : <LuEyeOff className='text-xl absolute right-2 cursor-pointer' onClick={() => { setpasswordshow(false) }} />}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <Button className='w-full' onClick={handleInputHandle}>
                            {
                                signupbuttonloading === true ? <ClipLoader
                                    color='write'
                                    size={20}
                                /> :
                                    'Sign Up'
                            }
                        </Button>
                        <div className='text-sm mt-2'>Already have account ? <Link href={"/signin"}>Sign In</Link></div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}