import React from "react";
import { NextApiResponse } from "next";
import { Server as NetServer, Socket } from "net";
import { Server as SocketIOServer } from 'socket.io';
import { Member, Message, Profile, Server } from "@prisma/client";

export type ServerWithMemberAndProfile = Server & {
    members: (Member & { profile: Profile })[];
};

export type ServerSearchItem = {
    label: string;
    type: "channel" | "member",
    data: {
        icon: React.ReactNode;
        name: string;
        id: string;
    }[] | undefined;
};

export type NextApiResponseServerIO = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io: SocketIOServer;
        };
    };
};

export type MessageWithMemberWithProfile = Message & {
    member: Member & {
        profile: Profile;
    };
};