import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';

import { Background, Navbar } from '~/components';
import { usePersistantState, useSeoProps } from '~/lib';

import type { WithChildren, WithProps } from '~/types';

interface DefaultLayoutProps extends WithChildren {
	background?: boolean;
	backgroundBlur?: number;
	seo?: Partial<WithProps<typeof NextSeo>>;
}

export function DefaultLayout({
	background: overrideBackground,
	backgroundBlur = 0,
	children,
	seo: customSeo,
}: DefaultLayoutProps) {
	const { animations: background } = usePersistantState().get();
	const showBackground = overrideBackground ?? background;
	const [gifSrc, setGifSrc] = useState('/images/back.gif');

	const seo = useSeoProps(customSeo);

	useEffect(() => {
		// Switch to static PNG after 5 seconds
		const timer = setTimeout(() => {
			setGifSrc('/images/back.png');
		}, 5000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			<NextSeo {...seo} />
			<Navbar.Standard />
			{/* Background */}
			<img
				src={gifSrc}
				alt="Background"
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					zIndex: -1,
				}}
			/>
			{/* Disable animated particles background */}
			{false && showBackground && <Background.Standard blur={backgroundBlur} />}
			<main className="flex flex-col justify-center px-8" style={{
				backgroundColor: 'transparent',
				minHeight: '100vh'
			}}>
				{children}
			</main>
		</>
	);
}
