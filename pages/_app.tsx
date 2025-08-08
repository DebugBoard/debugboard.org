import NProgress from 'nprogress';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { useEffectOnce, useEvent } from 'react-use';
import { useRouter } from 'next/router';
import { Analytics } from '@vercel/analytics/next';

import 'nprogress/nprogress.css';
import 'windi.css';

import { colors, useClick } from '~/lib';
import { Theme } from '~/types';

NProgress.configure({
	easing: 'ease',
	minimum: 0.3,
	showSpinner: false,
	speed: 800,
});

// Removed next-axiom reportWebVitals export due to hook call issues

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const [play] = useClick();

	useEvent('mousedown', () => play());
	useEvent('mouseup', () => play());

	useEffectOnce(() => {
		router.events.on('routeChangeStart', () => NProgress.start());
		router.events.on('routeChangeComplete', () => NProgress.done());
		router.events.on('routeChangeError', () => NProgress.done());
	});

	return (
		<ThemeProvider attribute="class" defaultTheme={Theme.SYSTEM} themes={Object.values(Theme)}>
			<Component {...pageProps} />
			<Analytics />
			<style jsx global>{`
				@font-face {
					font-family: 'Comfortaa';
					src: url('/Comfortaa-Regular.ttf') format('truetype');
					font-weight: normal;
					font-style: normal;
					font-display: swap;
				}
				.font-comfortaa {
					font-family: 'Comfortaa', 'Arial', sans-serif !important;
				}
				#nprogress .bar {
					height: 0.25rem;
					background-color: #b91c1c;
				}
				#nprogress .peg {
					box-shadow: 0 0 10px #b91c1c, 0 0 5px #b91c1c;
				}
				#nprogress .spinner-icon {
					border-top-color: #b91c1c;
					border-left-color: #b91c1c;
				}
			`}</style>
		</ThemeProvider>
	);
}
