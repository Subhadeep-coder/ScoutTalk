import { Hash, Menu } from 'lucide-react';
import React from 'react';
import { MobileToggle } from '../mobile-toggle';
import UserAvatar from '../user-avatar';
import { SocketIndicator } from '../socket-indicator';

type Props = {
    serverId: string;
    name: string;
    type: "channel" | "conversation";
    imageUrl?: string;
}

const ChatHeader = ({
    serverId,
    name,
    type,
    imageUrl,
}: Props) => {
    return (
        <div className='text-md px-3 font-semibold h-12 flex items-center border-neutral-200 dark:border-neutral-800 border-b-2'>
            <MobileToggle serverId={serverId} />
            {
                type === "channel" && (
                    <Hash className='h-5 w-5 mr-2 text-zinc-500 dark:text-zinc-400' />
                )
            }
            {
                type === "conversation" && (
                    <UserAvatar
                        src={imageUrl}
                        className='mr-2 h-8 w-8 md:h-8 md:w-8'
                    />
                )
            }
            <p className='text-md text-black font-semibold dark:text-white'>
                {name}
            </p>
            <div className="ml-auto flex items-center">
                <SocketIndicator />
            </div>
        </div>
    )
}

export default ChatHeader