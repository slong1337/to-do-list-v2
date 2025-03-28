export type IconProps = {
    className?: string
}

export const SendIcon = (props: IconProps) => {
    const {className} = props

    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>send-circle</title>
            <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M8,7.71V11.05L15.14,12L8,12.95V16.29L18,12L8,7.71Z" fill="currentColor"/>
        </svg>
    )
}
