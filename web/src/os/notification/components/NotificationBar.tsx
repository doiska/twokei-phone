import React from 'react';

const NotificationItem: React.FC = ({ children }) => {
    return (<div className='mt-2'>{children}</div>);
}

const NotificationBar: React.FC = () => {
    return (
        <header
            className="relative grid justify-between items-center flex-nowrap h-[30px] w-full z-[99] px-4 hover:cursor-pointer"
        // onClick={() => setBarUncollapsed(curr => !curr)}
        >

        </header>
    );
}

export default NotificationBar;