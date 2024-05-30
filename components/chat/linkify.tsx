import Link from "next/link";

const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

export function linkify(text: string) {
    const parts = text.split(urlRegex);
    return parts.map((part, index) => {
        if (urlRegex.test(part)) {
            return (
                <Link
                    key={index}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400"
                >
                    {part}
                </Link>
            );
        }
        return part;
    });
}
