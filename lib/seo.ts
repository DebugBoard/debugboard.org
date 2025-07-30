import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import type { ComponentProps } from 'react';

export function useSeoProps(
	props: Partial<ComponentProps<typeof NextSeo>> = {},
): Partial<ComponentProps<typeof NextSeo>> {
	const router = useRouter();

	const title = 'DebugBoard';
	const description = "DebugBoard.org";

	return {
		title,
		description,
		canonical: `https://debugboard.org${router.asPath}`,
		openGraph: {
			title,
			description,
			site_name: 'DebugBoard',
			url: `https://debugboard.org${router.asPath}`,
			type: 'website',
			images: [
n 		{
					url: 'https://debugboard.org/favicon.ico',
					alt: description,
					width: 256,
					height: 256,
				},
			],
		},
		...props,
	};
}
