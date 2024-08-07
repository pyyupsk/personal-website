import { HoverProfile } from "@/components/hover-profile";
import { author, email } from "@/config/personal";
import Link from "next/link";
import { SocialsIcons } from "./socials-icons";

export function ProfileCard() {
    return (
        <div className="flex justify-between items-center border p-5 rounded w-full">
            <div className="flex flex-col justify-center items-start flex-1">
                <div className="flex justify-between items-center gap-2 mb-2 w-full">
                    <div className="flex items-center gap-2">
                        <HoverProfile />
                        <div>
                            <h1 className="font-semibold leading-7 hover:underline underline-offset-2">
                                @{author}
                            </h1>
                            <p className="text-xs font-light">Full Stack Developer</p>
                        </div>
                    </div>
                    <SocialsIcons className="md:hidden flex" />
                </div>
                <p className="text-xs">
                    Interested in collaborating or hiring? Reach out to me at{" "}
                    <Link
                        href={`mailto:${email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link"
                    >
                        {email}
                    </Link>
                </p>
            </div>
            <SocialsIcons className="hidden md:flex" />
        </div>
    );
}
