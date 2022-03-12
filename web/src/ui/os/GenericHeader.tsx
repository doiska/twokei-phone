import React from 'react'

type Props = {
    title: string,
    description?: string
}

const GenericHeader: React.FC<Props> = ({ children, title, description }) => {
    return (
        <div className='flex flex-col basis-[10%] text-gray-200 p-3'>
            <span className='text-lg'>{title}</span>
            <span className='text-sm'>{description}</span>
        </div>
    )
}

export default GenericHeader