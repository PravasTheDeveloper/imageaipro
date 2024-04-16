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


export default function SignUpPage() {
    return (
        <div className='container mx-auto bg-slate-100 w-full min-h-screen'>
            <div className='w-full h-full flex justify-center items-center py-5'>
                <Card className="w-[350px]">
                    <CardHeader>
                        <div className='mb-5'>
                            <Image src={`/mainsource/ImageAIPRO.png`} width={200} height={100} alt='ImageAIPRO' />
                        </div>
                        <CardTitle>Sign Up</CardTitle>
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
                                    <Label htmlFor="name">Name</Label>
                                    <Input type='text' id="name" placeholder="Your Name" />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input type='email' id="name" placeholder="Your Email Address" />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">Password</Label>
                                    <Input type='password' id="name" placeholder="Your password" />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="cpassword">Confirm Passoword</Label>
                                    <Input type='password' id="name" placeholder="Confirm Password" />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <Button className='w-full'>Sign Up</Button>
                        <div className='text-sm mt-2'>Already have account ? <Link href={"/signin"}>Sign In</Link></div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}