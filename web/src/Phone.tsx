import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Link, Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { Apps } from '@apps/Apps'
import HomeApp from '@apps/Home/HomeApp';
import PhoneWrapper from './PhoneWrapper'
import './styles/main.css'
import NavigationBar from '@os/navigation/NavigationBar'
import { RecoilRoot } from 'recoil'
import { NotificationProvider } from '@os/notification/providers/NotificationProvider';
import NotificationBar from '@os/notification/components/NotificationBar'

//TODO: https://github.com/project-error/npwd/blob/eb5678b93238638931fcce113bfcf9856832b9bd/phone/src/lib/RecoilRootManager.tsx

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <NotificationProvider>
                <Router>
                    <PhoneWrapper>
                        <NotificationBar />
                        <div className="h-[95%] w-full flex flex-col">
                            <>
                                <Routes>
                                    <Route index element={<HomeApp />} />
                                    {
                                        Apps.map(
                                            ({ id, disable, path, AppElement }) =>
                                                <Route key={id} path={path} element={<AppElement />} />
                                        )
                                    }
                                </Routes>
                            </>
                        </div>
                        <NavigationBar />
                    </PhoneWrapper>
                </Router>
            </NotificationProvider>
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById('root')
)
