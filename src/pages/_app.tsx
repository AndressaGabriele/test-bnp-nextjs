// pages/_app.tsx
import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MessageProvider } from '@/context/MessageContext';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<MessageProvider>
			<>
				<Head>
					<title>Teste Front-End - BNP</title>
				</Head>
				<Component {...pageProps} />
			</>
		</MessageProvider>
	);
}
