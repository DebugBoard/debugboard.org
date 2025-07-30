import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
				<link rel="manifest" href="/icons/site.webmanifest" />
				<link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#3aa1f3" />
				<link rel="shortcut icon" href="/favicon.ico" />
				<link rel="icon" href="/favicon.ico" type="image/x-icon" />
				<meta name="msapplication-TileColor" content="#2b5797" />
				<meta name="msapplication-config" content="/icons/browserconfig.xml" />
				<meta name="theme-color" content="#0c0e10" />
				<meta name="darkreader" content="stfu" />
				<meta name="darkreader-lock" />
			</Head>
			<body className="antialiased font-inter bg-gray-50 text-gray-500 dark:bg-gray-900 selection:(bg-gray-900 dark:bg-white text-white dark:text-primary-500)">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
