import React from 'react'
import NotificationBar from '@os/notification/components/NotificationBar'
import NavigationBar from '@os/navigation/NavigationBar'
import PhoneWrapper from './PhoneWrapper'
import { Route, Routes } from 'react-router-dom'
import { Apps } from '@apps/Apps'
import HomeApp from '@apps/Home/HomeApp';
import LoadingSpinner from '@ui/components/LoadingSpinner'

const Phone = () => {
    return (
        <PhoneWrapper>
            <NotificationBar />
            <div className="h-[95%] w-full flex flex-col">
                <>
                    <React.Suspense fallback={<LoadingSpinner />}>
                        <Routes>
                            <Route index element={<HomeApp />} />
                            {
                                Apps.map(({ id, disable, path, AppElement }) => <Route key={id} path={path} element={<AppElement />} />)
                            }
                        </Routes>
                    </React.Suspense>
                </>
            </div>
            <NavigationBar />
        </PhoneWrapper>
    )
}


export default Phone;