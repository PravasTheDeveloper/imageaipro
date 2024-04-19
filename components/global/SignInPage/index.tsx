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
import Image from 'next/image'

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import Swal from 'sweetalert2'
import { ClipLoader } from 'react-spinners'
import { LuEye, LuEyeOff } from 'react-icons/lu'


export default function SignInPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [signinbuttonloading, setsigninbuttonloading] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordshow, setpasswordshow] = useState(true)

    const handlesubmit = async (e: any) => {
        setsigninbuttonloading(true)
        e.preventDefault()

        if (!email || !password) {
            Swal.fire({
                title: "Warning",
                text: "Please fill all the feild",
                icon: "warning"
            });
        } else {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl: `${window.location.origin}/dashboard`
            })

            if (result?.url) {
                window.location.href = result.url;
            }
        }
    }

    useEffect(() => {
        if (status === "loading") return;
        if (session) router.push('/dashboard');
    }, [session, status, router]);

    console.log(session)

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
        <div className='bg-slate-100 w-full h-screen'>
            <div className='w-full h-full flex justify-center items-center py-5'>
                <Card className="w-[350px]">
                    <CardHeader>
                        <div className='mb-5'>
                            <Image src={`/mainsource/ImageAIPRO.png`} width={200} height={100} alt='ImageAIPRO' />
                        </div>
                        <CardTitle>Sign In</CardTitle>
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
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        type='email'
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Your Email Address" />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">Password</Label>
                                    <div className='relative flex items-center h-full'>
                                        <Input
                                            type={`${passwordshow === true ? 'password' : "text"}`}
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Your password"
                                        />
                                        {passwordshow === false ? <LuEye className='text-xl absolute right-2 cursor-pointer' onClick={() => { setpasswordshow(true) }} /> : <LuEyeOff className='text-xl absolute right-2 cursor-pointer' onClick={() => { setpasswordshow(false) }} />}
                                    </div>
                                </div>
                                <div className='text-[12px] font-semibold'>
                                    <Link href={"/"}>Forget password ?</Link>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="w-full h-auto flex flex-col">
                        <Button className='w-full' onClick={handlesubmit}>
                            {
                                signinbuttonloading === true ? <ClipLoader
                                    color='write'
                                    size={20}
                                /> :
                                    'Sign In'
                            }
                        </Button>
                        <div className='text-sm mt-2'>{`Din't have account ? `}<Link href={"/signup"}>Sign Up</Link></div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}