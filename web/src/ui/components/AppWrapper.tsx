import React, { CSSProperties } from 'react';

export interface AppWrapperTypes {
    id?: string;
    style?: CSSProperties;
    className?: string;
    handleClickAway?: (...args: any[]) => void;
}

const AppWrapper: React.FC<AppWrapperTypes> = ({ children, style, handleClickAway, className, ...props }) => {
    return (
        <div {...props} className={`relative flex flex-col w-full h-full p-0 m-0 min-h-[720px] ${className ?? ''}`} style={style ?? {}}>
            {children}
        </div>
    )
}

export default AppWrapper;