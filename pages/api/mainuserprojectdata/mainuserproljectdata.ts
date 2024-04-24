import type { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/lib/prismadb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === 'POST') {
        const authorId = req.query.authorId as string;
        try {
            const images = await prisma.image.findMany({
                where: {
                    authorId: authorId,
                },
                orderBy: {
                    updatedAt: 'desc'
                }
            });
            res.status(200).json(images);
        } catch (err) {
            console.error('Error fetching images:', err);
            res.status(500).json({ error: 'Failed to fetch images' });
        }
    } else {
        res.status(400).json({ message: "Invalid request method" });
    }
}
