import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"name": "DebugBoard",
		"description": "Your ultimate resource for software engineering tutorials, transparency guides for Discord, Spotify, Obsidian, and Zen Browser",
		"url": "https://debugboard.org",
		"author": {
			"@type": "Person",
			"name": "DebugBoard"
		},
		"publisher": {
			"@type": "Organization",
			"name": "DebugBoard",
			"url": "https://debugboard.org"
		},
		"potentialAction": {
			"@type": "SearchAction",
			"target": "https://debugboard.org/blog?search={search_term_string}",
			"query-input": "required name=search_term_string"
		}
	};

	return (
		<Html lang="en">
			<Head>
				{/* Favicon and Icons */}
				<link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
				<link rel="manifest" href="/icons/site.webmanifest" />
				<link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#3aa1f3" />
				<link rel="shortcut icon" href="/favicon.ico" />
				<link rel="icon" href="/favicon.ico" type="image/x-icon" />
				
				{/* Microsoft Tiles */}
				<meta name="msapplication-TileColor" content="#2b5797" />
				<meta name="msapplication-config" content="/icons/browserconfig.xml" />
				
				{/* Theme and Display */}
				<meta name="theme-color" content="#0c0e10" />
				<meta name="color-scheme" content="dark light" />
				
				{/* Dark Reader */}
				<meta name="darkreader" content="stfu" />
				<meta name="darkreader-lock" />
				
				{/* Preconnect to external domains for performance */}
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				
				{/* DNS Prefetch for better performance */}
				<link rel="dns-prefetch" href="//debugboard.org" />
				
				{/* Structured Data */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
				/>
				
				{/* Google Search Console Verification (add your verification code here) */}
				{/* <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" /> */}
				
				{/* Bing Webmaster Tools Verification (add your verification code here) */}
				{/* <meta name="msvalidate.01" content="YOUR_VERIFICATION_CODE" /> */}
			</Head>
			<body className="antialiased font-inter bg-gray-50 text-gray-500 dark:bg-gray-900 selection:(bg-gray-900 dark:bg-white text-white dark:text-primary-500)">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
