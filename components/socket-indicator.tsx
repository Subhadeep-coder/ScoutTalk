"use client";

import { useSocket } from "./providers/socket-provider";
import { Badge } from "./ui/badge";

export const SocketIndicator = () => {
    const { isConnected } = useSocket();

    if (!isConnected) {
        return (
            <Badge variant="outline" className="text-white bg-yellow-600 border-none">

            </Badge>
        )
    }

    return (
        <Badge variant="outline" className="text-white bg-yellow-600 border-none">

        </Badge>
    )
}