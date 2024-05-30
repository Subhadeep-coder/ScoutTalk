"use client";

import React from 'react';
import { Button } from './ui/button'
import { Member } from '@prisma/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type Props = {
    server: {
        id: string;
        name: string;
        imageUrl: string;
        members: Member[];
    };
}

const InvitePage = ({ server }: Props) => {
    const router = useRouter();
    const onJoin = async () => {
        const response = await axios.patch(`/api/servers/accept-invite`, { serverId: server.id });
        console.log(response.data);
        router.push(`/servers/${server.id}`);
    }
    return (
        <div className="h-full w-full flex items-center justify-center">
            <Card className='bg-gray-600'>
                <CardHeader>
                    <CardTitle>
                        <Image
                            src={server.imageUrl}
                            alt='Server Image'
                            width={240}
                            height={60}
                            className='object-fill w-auto h-auto'
                            priority
                        />
                    </CardTitle>
                    <CardDescription className='flex items-center justify-center'>
                        <h1 className='text-2xl text-white'>
                            {server.name}
                        </h1>
                    </CardDescription>
                </CardHeader>
                <CardContent className='flex items-center justify-center'>
                    <span className='text-sm text-gray-400'>{server.members.length} members</span>
                </CardContent>
                <CardFooter className='flex items-center justify-center'>
                    <Button
                        className='w-full'
                        variant={"primary"}
                        onClick={onJoin}
                    >
                        Accept Invite
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default InvitePage