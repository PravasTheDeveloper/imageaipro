import type { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/lib/prismadb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "POST") {
        const { title, transformationType, publicId, secureURL, width, height, aspectRatio, color, prompt, authorId, imagesize, backgroundColor } = req.body;

        try {
            let newImage;
            const findUserImage = await prisma.image.findFirst({
                where: {
                    publicId: publicId
                }
            });

            if (findUserImage) {
                newImage = await prisma.image.update({
                    where: {
                        id: findUserImage.id
                    },
                    data: {
                        title,
                        transformationType,
                        publicId,
                        secureURL,
                        width,
                        height,
                        aspectRatio,
                        backgroundColor,
                        color,
                        prompt,
                        authorId,
                        imagesize
                    },
                });
            } else {
                newImage = await prisma.image.create({
                    data: {
                        title,
                        transformationType,
                        publicId,
                        secureURL,
                        width,
                        height,
                        aspectRatio,
                        backgroundColor,
                        color,
                        prompt,
                        authorId,
                        imagesize
                    },
                });
            }

            res.status(200).json({ message: "Image Save Successful", data: newImage });
        } catch (error) {
            console.error('Error creating/updating image:', error);
            res.status(500).json({ error: 'Failed to create/update image' });
        }
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}
