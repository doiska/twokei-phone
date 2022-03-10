import React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll'

const NotificationList: React.FC<{ collapsed: boolean }> = ({ children, collapsed }) => {

    return (
        <ScrollContainer className={`absolute w-full top-[30px] z-[98] backdrop-blur-sm transition-all duration-500 scroll-smooth overflow-y-scroll cursor-grab select-none snap-y`} style={{ height: collapsed ? '0' : '90%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <ul className="flex flex-col p-3">
                {children}
            </ul>
        </ScrollContainer>
    )
}

export default NotificationList;