import { Users } from "lucide-react";
import ActionTooltip from "../action-tooltip";
import Link from "next/link";


export const ConversationAction = () => {

    return (
        <div>
            <ActionTooltip
                label="Add a server"
                side="right"
                align="center"
            >
                <Link
                    href={`/`}
                >
                    <button
                        className="group flex items-center"
                    >
                        <div className="flex mx-3 h-[48px] w-[48px] rounded-[16px] group-hover:rounded-[24px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
                            <Users className="group-hover:text-white transition text-emerald-500" size={25} />
                        </div>
                    </button>
                </Link>
            </ActionTooltip>
        </div>
    )
}