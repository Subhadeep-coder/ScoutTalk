"use client";

import { useSocket } from "./providers/socket-provider";
import { Badge } from "./ui/badge";

export const SocketIndicator = () => {
    const { isConnected } = useSocket();

    if (!isConnected) {
        return (
            <Badge variant="outline" className="text-white bg-yellow-600 border-none">
                Fallback
            </Badge>
        )
    }

    return (
        <Badge variant="outline" className="text-white bg-green-600 border-none">
            Live Updates
        </Badge>
    )
}