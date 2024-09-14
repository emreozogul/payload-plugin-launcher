export default function PlayIcon({
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
                d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538z"
            />
        </svg>
    )
}
