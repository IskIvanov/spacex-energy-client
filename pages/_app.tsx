import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client';
import client from '../src/services/apollo-client';

export default function SpaceXEnergyClient({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client} >
			<Component {...pageProps} />
		</ApolloProvider>
	)
}
