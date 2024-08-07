import ProfileImage from "@/assets/images/profile.jpg";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { birthday } from "@/config/personal";
import dayjs from "dayjs";
import Image from "next/image";

export function HoverProfile() {
    const date = dayjs(birthday).format("MMMM DD, YYYY");

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <div className="size-10 overflow-hidden rounded-full animate-pulse-glow hover:cursor-pointer relative group">
                    <Image src={ProfileImage} alt="Profile image" width={200} height={200} />
                    <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 duration-300">
                        <div className="flex items-center justify-center h-full">
                            <span className="text-xs text-center text-white">hover</span>
                        </div>
                    </div>
                </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-[420px]">
                <div className="flex justify-between space-x-4">
                    <Image
                        src={ProfileImage}
                        alt="Profile image"
                        width={200}
                        height={200}
                        className="rounded size-24"
                    />
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">Pongsakorn Thipayanate</h4>
                        <div className="flex gap-2 items-center flex-nowrap">
                            <span className="text-xs text-muted-foreground">
                                Samut Sakhon, Thailand
                            </span>
                            <Separator orientation="vertical" className="h-3" />
                            <span className="text-xs text-muted-foreground">{date}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            A dedicated full-stack developer who is passionate about creating
                            impactful solutions through technology.
                        </p>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}
