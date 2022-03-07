import { Apps } from 'apps/Apps'
import React from 'react'
import ReactDOM from 'react-dom'
import { Route } from 'react-router-dom'
import './styles/index.css'

ReactDOM.render(
    <React.StrictMode>
        //TODO: match "/" show home app

        {
            Apps.map((App) => (
                <>{!App.disable && <App.Route key={App.id} />}</>
            ))
        }

    </React.StrictMode>,
    document.getElementById('root')
)
