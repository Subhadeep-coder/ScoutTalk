import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { inviteCode: string } }
) {
    try {
        const profile = await currentProfile();
        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (!params.inviteCode) {
            return new NextResponse("Invite code missing", { status: 400 });
        }

        const existingServer = await db.server.findFirst({
            where: {
                inviteCode: params.inviteCode,
            },
            select: {
                id: true,
                name: true,
                imageUrl: true,
                members: true,
            }
        });
        const { members } = existingServer!;
        const isMemberExistsInServer = !!members.find(({ profileId }) => profileId === profile.id);
        return NextResponse.json({ server: existingServer, isMemberExistsInServer });
    } catch (error) {
        console.log("[SERVER_ID]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}