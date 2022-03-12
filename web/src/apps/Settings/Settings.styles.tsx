import React from 'react'

const SettingsItemBody: React.FC<{ icon: JSX.Element }> = ({ children, icon }) => {
    return (
        <>
            <div className='px-2 my-1 flex flex-row items-center w-100%'>
                <span className='basis-[10%]'>{icon}</span>
                {children}
            </div>
        </>
    )
}

const SettingsItemLabel: React.FC<{ label: string, value?: any }> = ({ label, value, children }) => {
    return (
        <div className='flex-1 flex flex-col'>
            <span className='label-text'>{label}</span>
            {value ? <label className='text-sm text-blue-300'>{value}</label> : ''}
        </div>
    )
}

const SettingsItemOption: React.FC = ({ children }) => {
    return (
        <div className='basis-[35%] text-right'>
            {children}
        </div>
    )
}

export { SettingsItemBody, SettingsItemLabel, SettingsItemOption };