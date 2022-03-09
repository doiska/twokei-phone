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

//TODO: https://github.com/project-error/npwd/blob/eb5678b93238638931fcce113bfcf9856832b9bd/phone/src/lib/RecoilRootManager.tsx

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <Router>
                <PhoneWrapper>
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
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById('root')
)
