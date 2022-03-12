import React from 'react'
import { INotification } from '../providers/NotificationProvider'

type INotificationItem = INotification & {
    onClose: (e: any) => void;
    onClickClose: (e: any) => void;
}

export const NotificationItem: React.FC<INotificationItem> = ({ onClose, onClickClose, ...notification }) => {

    const { title, notificationIcon, content, cantClose, onClick, icon } = notification;

    return (
        <li
            className="flex flex-col relative bg-zinc-700 text-white h-full p-3 my-[0.5px] first:rounded-t-lg last:rounded-b-lg"
            onClick={(e) => {
                if (onClick) {
                    onClick(notification);
                    onClickClose(e);
                }
                else {
                    onClose(e);
                }
            }}
        >

            <div className='flex flex-row gap-1 text-[12px] items-center'>
                <span>{notificationIcon}</span>
                <span>{title}</span>
            </div>
            <span>
                {content}
            </span>
        </li>
    )
}