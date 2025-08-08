import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import type { ComponentProps } from 'react';

export function useSeoProps(
	props: Partial<ComponentProps<typeof NextSeo>> = {},
): Partial<ComponentProps<typeof NextSeo>> {
	const router = useRouter();

	const title = props.title ? `${props.title} | DebugBoard` : 'DebugBoard - Software Engineering & Transparency Guides';
	const description = props.description || "DebugBoard.org - Your ultimate resource for software engineering tutorials, transparency guides for Discord, Spotify, Obsidian, and Zen Browser. Learn how to customize your applications with step-by-step guides and code examples.";

	return {
		title,
		description,
		canonical: `https://debugboard.org${router.asPath}`,
		additionalMetaTags: [
			{
				name: 'keywords',
				content: 'software engineering, transparency guides, Discord transparent, Spotify transparent, Obsidian transparent, Zen Browser, Vencord, CSS themes, Windows customization, programming tutorials, web development, React, Next.js, TypeScript',
			},
			{
				name: 'author',
				content: 'DebugBoard',
			},
			{
				name: 'robots',
				content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
			},
			{
				name: 'googlebot',
				content: 'index, follow',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1.0',
			},
			{
				property: 'article:author',
				content: 'DebugBoard',
			},
			{
				property: 'article:publisher',
				content: 'https://debugboard.org',
			},
		],
		openGraph: {
			title,
			description,
			site_name: 'DebugBoard',
			url: `https://debugboard.org${router.asPath}`,
			type: 'website',
			locale: 'en_US',
			images: [
				{
					url: 'https://debugboard.org/banner.png',
					alt: 'DebugBoard - Software Engineering & Transparency Guides',
					width: 1200,
					height: 630,
					type: 'image/png',
				},
			],
		},
		twitter: {
			handle: '@debugboard',
			site: '@debugboard',
			cardType: 'summary_large_image',
		},
		languageAlternates: [
			{
				hrefLang: 'en',
				href: `https://debugboard.org${router.asPath}`,
			},
		],
		...props,
	};
}
