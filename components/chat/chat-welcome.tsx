import { Hash } from 'lucide-react';
import React from 'react'

type Props = {
    type: "channel" | "conversation";
    name: string;
}

const ChatWelcome = ({ name, type }: Props) => {
    return (
        <div className="px-4 mb-4 space-y-2">
            {
                type === "channel" && (
                    <div className="flex items-center justify-center h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700">
                        <Hash className='h-12 w-12 text-white' />
                    </div>
                )
            }
            <p className='text-xl font-bold md:text-3xl'>
                {type === "channel" ? "Welcome to #" : ""}{name}
            </p>
            <p className='text-sm text-zinc-600 dark:text-zinc-400'>
                {
                    type === "channel"
                        ? `This is the start of the #${name} channel`
                        : `This is the start of your conversation with ${name}`
                }
            </p>
        </div>
    )
}

export default ChatWelcome