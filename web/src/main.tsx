import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import PhoneProviders from 'PhoneProviders';
import Phone from './Phone';

import './styles/main.css';

Sentry.init({
	dsn: 'https://e0eff884bf5740d8940abae871bbed46@o1166650.ingest.sentry.io/6257134',
	integrations: [new BrowserTracing()],

	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for performance monitoring.
	// We recommend adjusting this value in production
	tracesSampleRate: 0.2,
});

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<RecoilRoot>
				<PhoneProviders />
			</RecoilRoot>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);
