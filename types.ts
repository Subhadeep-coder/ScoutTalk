import { Member, Profile, Server } from "@prisma/client";
import React from "react";

export type ServerWithMemberAndProfile = Server & {
    members: (Member & { profile: Profile })[];
}

export type ServerSearchItem = {
    label: string;
    type: "channel" | "member",
    data: {
        icon: React.ReactNode;
        name: string;
        id: string;
    }[] | undefined;
}