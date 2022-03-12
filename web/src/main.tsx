import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import PhoneProviders from 'PhoneProviders'
import Phone from './Phone';

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <PhoneProviders>
                <Router>
                    <Phone />
                </Router>
            </PhoneProviders>
        </RecoilRoot>
    </React.StrictMode >,
    document.getElementById('root')
)
