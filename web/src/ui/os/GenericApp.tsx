import React from 'react'

type Props = {
    className?: string
}

const GenericApp: React.FC<Props> = ({ children, className }) => {
    return (
        <div className={`h-full w-full flex flex-col ${className ?? ''}`}>
            {children}
        </div>
    )
}

export default GenericApp;