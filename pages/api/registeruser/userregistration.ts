import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prismadb'
import { getSession } from 'next-auth/react';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === "POST") {
            const { firstName, lastName, email, password } = req.body;

            if (!firstName || !lastName || !email || !password) {
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
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            password: password,
                            creditNumber: 100,
                            usedCredit: 0
                        },
                    });

                    const userId = newUser.id;

                    const newUserCredit = await prisma.creditHistory.create({
                        data: {
                            email: email,
                            creditAdd: 100,
                            creditUsed: 0,
                            userId: userId
                        },
                    })
                    if (newUser) {
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