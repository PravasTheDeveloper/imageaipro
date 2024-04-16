"use client"
import React from 'react'

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


export default function SignInPage() {
    return (
        <div className='container mx-auto bg-slate-100 w-full h-screen'>
            <div className='w-full h-full flex justify-center items-center py-5'>
                <Card className="w-[350px]">
                    <CardHeader>
                        <div className='mb-5'>
                            <Image src={`/mainsource/ImageAIPRO.png`} width={200} height={100} alt='ImageAIPRO' />
                        </div>
                        <CardTitle>Sign In</CardTitle>
                        <CardDescription>Create your image ai pro</CardDescription>
                        <div className='my-5'>
                            <Button className='w-full bg-transparent text-black border mt-5 border-slate-900'>
                                <FcGoogle className='text-xl mr-5' />
                                <p>
                                    Continue with google
                                </p>
                            </Button>
                            <Button className='w-full bg-transparent text-black border mt-5 border-slate-900'>
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
                                    <Input type='email' id="name" placeholder="Your Email Address" />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">Password</Label>
                                    <Input type='password' id="name" placeholder="Your password" />
                                </div>
                                <div className='text-[12px] font-semibold'>
                                    <Link href={"/"}>Forget password ?</Link>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="w-full h-auto flex flex-col">
                        <Button className='w-full'>Sign In</Button>
                        <div className='text-sm mt-2'>Din't have account ? <Link href={"/signup"}>Sign Up</Link></div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}