import React from 'react'

type Props = {
    className?: string
}

const GenericBody: React.FC<Props> = ({ children, className }) => {
    return (
        <div className={`w-full basis-[90%] ${className ?? ''}`}>
            {children}
        </div>
    )
}

export default GenericBody;