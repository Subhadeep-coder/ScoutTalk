import React from 'react'
import { ScrollArea } from '../ui/scroll-area'
// import ServerSearch from '../server/server-search'
import { Separator } from '../ui/separator'
import { currentProfile } from '@/lib/current-profile'
import { redirect } from 'next/navigation'

type Props = {}

const FriendsSidebar = async (props: Props) => {
    const profile = await currentProfile();

    if (!profile) {
        return redirect("/");
    }
    return (
        <div className='flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]'>
            <button
                className='w-full px-3 text-md font-semibold flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:bg-zinc-700/50 transition'
            >
                Friends
            </button>
            <ScrollArea className='flex-1 px-3'>
                <div className="mt-2">
                    {/* <ServerSearch
                        data={searchData as ServerSearchItem[]}
                    /> */}
                </div>
                <Separator className='my-2 bg-zinc-200 dark:bg-zinc-700 rounded-md' />
            </ScrollArea>
        </div>
    )
}

export default FriendsSidebar