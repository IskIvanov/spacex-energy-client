// import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import client from '../src/services/apollo-client';

// Add dark mode to the theme provider
const theme = createTheme({
	palette: {
		mode: 'dark',
	},
});

export default function SpaceXEnergyClient({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client} >
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
		</ApolloProvider>
	)
}
