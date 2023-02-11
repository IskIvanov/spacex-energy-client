import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import client from '../src/services/apollo-client';
import { AuthProvider } from 'src/contexts/auth-provider';

const theme = createTheme({
	palette: {
		mode: 'dark',
	},
});
export default function SpaceXEnergyClient({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client} >
			<ThemeProvider theme={theme}>
				<AuthProvider>
					<CssBaseline />
					<Component {...pageProps} />
				</AuthProvider>
			</ThemeProvider>
		</ApolloProvider>
	)
}
