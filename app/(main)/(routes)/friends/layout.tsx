import React from 'react'

type Props = {
    children: React.ReactNode;
}

const FriendsLayout = ({ children }: Props) => {
    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
            </div>
            <main className='h-full md:pl-60'>
                {children}
            </main>
        </div>
    )
}

export default FriendsLayout