import { contacts } from "@/config/contacts";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function SocialsIcons({ className }: { className?: string }) {
    return (
        <div className={cn("gap-2", className)}>
            {contacts
                .filter((contact) => contact.type === "social")
                .map((contact) => (
                    <Link
                        key={contact.name}
                        href={contact.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {contact.icon && <contact.icon className="size-5" />}
                    </Link>
                ))}
        </div>
    );
}
