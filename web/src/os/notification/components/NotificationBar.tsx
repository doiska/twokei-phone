import React, { memo, useEffect, useState } from 'react';
import { useNotifications } from '@os/notification/hooks/useNotifications';
import { MdBatteryFull } from 'react-icons/md';
import { Md4K } from 'react-icons/md';
import { NotificationItem } from './NotificationItem';
import NotificationList from './NotificationList';

const NotificationBar: React.FC = () => {

    const { addNotification, notifications, icons, removeNotification, barUncollapsed, setBarUncollapsed } = useNotifications();

    useEffect(() => {
        for (let i = 0; i < 100; i++) {
            addNotification({
                app: 'appstyle' + i,
                notificationIcon: <Md4K />,
                title: 'Notification Title',
                content: (<></>
                    // <div className="flex flex-col justify-start gap-2 mt-2">
                    //     <div className='flex flex-col gap-2'>
                    //         <div className='avatar gap-2'>
                    //             <div className='w-8 rounded'>
                    //                 <img src="https://daisyui.com/tailwind-css-component-profile-1@94w.jpg" />
                    //             </div>
                    //             <span className='text-sm'>{`doiská ${new Date().toLocaleDateString('pt-BR')}`}<br />teste do sistema de mensagens</span>
                    //         </div>
                    //     </div>

                    //     <div className='flex flex-row items-center justify-center text-xs gap-2 text-green-400' style={{ fontWeight: '600' }}>
                    //         <span className='hover:bg-zinc-600 rounded-lg p-2 transition-all duration-200'>Responder</span>
                    //         <span>|</span>
                    //         <span className='hover:bg-zinc-600 rounded-lg p-2 transition-all duration-200'>Marcar como lida</span>
                    //     </div>
                    // </div>
                )
            })
        }
    }, [])

    useEffect(() => {
        if (notifications.length === 0)
            setBarUncollapsed(true);

    }, [notifications, setBarUncollapsed]);

    return (
        <>
            <div
                className="relative flex flex-nowrap justify-between items-center min-h-[30px] w-full z-[99] px-2 hover:cursor-pointer bg-gray-300"
                onClick={() => setBarUncollapsed(curr => !curr)}
                tabIndex={0}
            >

                <div className='flex basis-10/12'>
                    <span className='justify-self-end'>{new Date().toLocaleString('pt-BR', { timeStyle: 'short' })}</span>
                    {
                        icons.map(({ key, badge, icon }) => {
                            <div className='mt-2'>{icon ?? 'icon'}</div>
                        })
                    }
                </div>
                <div className='flex basis-2/12 items-center justify-end'>
                    <span>95%</span>
                    <span><MdBatteryFull /></span>
                </div>
            </div>
            <NotificationList collapsed={barUncollapsed}>
                {
                    notifications.slice(0, 20).map((notification, idx) => {
                        return <NotificationItem
                            key={idx}
                            {...notification}
                            onClose={(e) => {
                                e.stopPropagation();
                                notification.onClose?.(notification);
                                removeNotification(idx);
                            }}
                            onClickClose={() => {
                                setBarUncollapsed(false);
                                if (!notification.cantClose) {
                                    removeNotification(idx);
                                }
                            }}
                        />
                    })
                }
            </NotificationList>
        </>
    );
}

export default memo(NotificationBar);