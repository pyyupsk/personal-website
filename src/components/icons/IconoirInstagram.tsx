import React from "react";
import type { SVGProps } from "react";

export function IconoirInstagram(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            {...props}
        >
            <g fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16a4 4 0 1 0 0-8a4 4 0 0 0 0 8"
                ></path>
                <path d="M3 16V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5Z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" d="m17.5 6.51l.01-.011"></path>
            </g>
        </svg>
    );
}
