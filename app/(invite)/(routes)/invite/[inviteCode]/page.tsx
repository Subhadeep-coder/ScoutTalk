"use client";

import InvitePage from '@/components/invite-page';
import axios from 'axios';
import {  useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
    params: {
        inviteCode: string;
    }
}

const InviteCodePage = ({ params }: Props) => {
    const [existsServer, setExistsServer] = useState(null);
    const router = useRouter();
    useEffect(() => {
        async function fetchApi() {
            const res = await axios.patch(`/api/servers/accept-invite/${params.inviteCode}`);
            if (res.data.isMemberExistsInServer)
                router.push(`/servers/${res.data.id}`);
            else
                setExistsServer(res.data.server);
        }
        fetchApi();
    }, [params.inviteCode, router])
    if (!existsServer)
        return;
    return (
        <InvitePage
            server={existsServer!}
        />
    );
}
export default InviteCodePage