import React from 'react'

const SettingsCategory: React.FC<{ title?: string }> = ({ title, children }) => {
    return (
        <div className='flex flex-col text-white p-2 gap-1 bg-zinc-800 rounded-xl mb-2'>
            {title ? <span className='p-2'>{title}</span> : ''}
            <div>
                {children}
            </div>
        </div>
    )
}

export default SettingsCategory;
