import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
) {
    try {
        const { serverId } = await req.json();
        const profile = await currentProfile();
        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (!serverId) {
            return new NextResponse("Server Id missing", { status: 400 });
        }
        const server = await db.server.update({
            where: {
                id: serverId
            },
            data: {
                members: {
                    create: [
                        {
                            profileId: profile.id
                        }
                    ]
                }
            },
            select: {
                id: true,
                members: true
            }
        });
        return NextResponse.json({ server });
    } catch (error) {
        console.log("[SERVER_ID]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}