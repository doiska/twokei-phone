import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { Apps } from '@apps/Apps'
import HomeApp from '@apps/Home/HomeApp';
import PhoneWrapper from './PhoneWrapper'
import './styles/main.css'

//TODO: match "/" show home app

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <PhoneWrapper>
                <div className="h-[90%] w-full flex flex-col">
                    <>
                        <Routes>
                            <Route index element={<HomeApp />} />
                            {
                                Apps.map(({ id, disable, path, AppElement }) => (
                                    <Route key={id} path={path} element={<AppElement />} />
                                ))
                            }
                        </Routes>
                    </>
                </div>
            </PhoneWrapper>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
)
