import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prismadb'
import { getSession } from 'next-auth/react';
import nodemailer from "nodemailer";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === "POST") {
            const { name, email, username, password } = req.body;

            if (!name || !email || !username || !password) {
                res.status(400).json({ message: 'Please fill all fields' });
            } else {
                await prisma.$connect();

                const existingUser = await prisma.user.findUnique({
                    where: {
                        email: email,
                    },
                });

                if (existingUser) {
                    res.status(209).json({ message: "User already exists" });
                    await prisma.$disconnect();
                } else {
                    await prisma.$connect();

                    const newUser = await prisma.user.create({
                        data: {
                            name: name,
                            username: username,
                            email: email,
                            password: password,
                            planId: 1,
                            creditBalance: 10,
                            photo: "anonymousphoto.png"
                        },
                    });


                    // const userId = newUser.id;

                    // const newUserCredit = await prisma.creditHistory.create({
                    //     data: {
                    //         email: email,
                    //         creditAdd: 100,
                    //         creditUsed: 0,
                    //         userId: userId
                    //     },
                    // })
                    if (newUser) {
                        // const transporter = nodemailer.createTransport({
                        //     host: 'smtp.ethereal.email',
                        //     port: 587,
                        //     auth: {
                        //         user: 'liliane.ohara65@ethereal.email',
                        //         pass: '44gR5A4Rrf64tkEBHh'
                        //     }
                        // });
                        

                        // const mailOptions = {
                        //     from: '"Pravas Chandra" <info.pravas.cs@gmail.com>',
                        //     to: 'pravassarkarmithun2020@gmail.com',
                        //     subject: 'Welcome to YourApp!',
                        //     text: `Hi ${name},\n\nWelcome to YourApp! Your account has been successfully created.`
                        // };

                        // transporter.sendMail(mailOptions, function (error, info) {
                        //     if (error) {
                        //         console.error(error);
                        //     } else {
                        //         console.log('Email sent: ' + info.response);
                        //     }
                        // });

                        res.status(201).json({ message: "User created successfully" });
                    } else {
                        res.status(500).json({ message: "Server error" });
                    }
                }
            }
        } else {
            res.status(405).json({ message: 'Method Not Allowed' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        await prisma.$disconnect();
    }
}

export async function getServerSideProps(context: any) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/dashboard/cowriting',
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
}