export type IconProps = {
    className?: string
    onClick: () => void
}

export const MenuIcon = (props: IconProps) => {
    const {className, onClick} = props

    return (
        <svg className={className}   onClick={onClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>menu</title><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" fill="currentColor"/>
        </svg>
    )
}
