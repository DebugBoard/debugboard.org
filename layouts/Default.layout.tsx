import { NextSeo } from 'next-seo';

import { Background, Navbar } from '~/components';
import { useSeoProps } from '~/lib';

import type { WithChildren, WithProps } from '~/types';

interface DefaultLayoutProps extends WithChildren {
	backgroundBlur?: number;
	seo?: Partial<WithProps<typeof NextSeo>>;
}

export function DefaultLayout({
	backgroundBlur = 0,
	children,
	seo: customSeo,
}: DefaultLayoutProps) {
	const seo = useSeoProps(customSeo);

	return (
		<>
			<NextSeo {...seo} />
			<Navbar.Standard />
			{/* Background with GIF animation and static fallback */}
			<Background.Standard blur={backgroundBlur} />
			<main className="flex flex-col justify-center px-8" style={{
				backgroundColor: 'transparent',
				minHeight: '100vh'
			}}>
				{children}
			</main>
		</>
	);
}
