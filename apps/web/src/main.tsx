import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import { RecoilRoot } from 'recoil';

import * as Sentry from '@sentry/react';
// eslint-disable-next-line import-helpers/order-imports
import { BrowserTracing } from '@sentry/tracing';

import './styles/main.css';
import './styles/animation.css';
import './utils/TimeJS';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PhoneProviders from 'PhoneProviders';

Sentry.init({
	dsn: 'https://e0eff884bf5740d8940abae871bbed46@o1166650.ingest.sentry.io/6257134',
	integrations: [new BrowserTracing()],

	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for performance monitoring.
	// We recommend adjusting this value in production
	tracesSampleRate: 0.2,
});

const queryClient = new QueryClient();


ReactDOM.render(
	<React.StrictMode>
		<HashRouter>
			<QueryClientProvider client={queryClient}>
				<RecoilRoot>
					<PhoneProviders/>
				</RecoilRoot>
			</QueryClientProvider>
		</HashRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
