import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

const FriendsItems = (props: Props) => {
    const router= useRouter();
    const onClick=()=>{
        router.push('/');
    }
    return (
        <button
            className={cn("group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 mb-1 dark:hover:bg-zinc-700/50 transition",
                // params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700"
            )}
            onClick={onClick}
        >
            <p
                className={cn("line-clamp-1 text-sm font-semibold text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
                    // params?.channelId === channel.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white"
                )}
            >
                {/* {channel.name} */}
            </p>
        </button>
    )
}

export default FriendsItems