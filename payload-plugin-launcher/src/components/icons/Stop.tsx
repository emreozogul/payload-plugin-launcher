import * as React from "react";

export default function StopIcon({
    height = "1em",
    fill = "currentColor",
    focusable = "false",
    ...props
}: Omit<React.SVGProps<SVGSVGElement>, "children">) {
    return (
        <svg
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            height={height}
            focusable={focusable}
            {...props}
        >
            <path
                fill={fill}
                d="M5.25 3A2.25 2.25 0 0 0 3 5.25v9.5A2.25 2.25 0 0 0 5.25 17h9.5A2.25 2.25 0 0 0 17 14.75v-9.5A2.25 2.25 0 0 0 14.75 3z"
            />
        </svg>
    )
}