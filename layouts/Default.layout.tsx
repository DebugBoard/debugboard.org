import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

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
	const { theme, resolvedTheme } = useTheme();
	const [gifSrc, setGifSrc] = useState('');
	const [mounted, setMounted] = useState(false);

	const seo = useSeoProps(customSeo);

	// Ensure component is mounted to avoid hydration mismatch
	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!mounted) return;

		// Determine which background to use based on theme
		const isLightMode = resolvedTheme === 'light';
		const animationsEnabled = background === true;
		
		// Choose appropriate image based on animations setting and theme
		if (animationsEnabled) {
			// If animations are enabled, start with GIF and switch to static image after 5 seconds
			const initialGif = isLightMode ? '/images/backlight.gif' : '/images/back.gif';
			const staticImage = isLightMode ? '/images/backlight.jpg' : '/images/back.png';
			
			setGifSrc(initialGif);
			
			// Switch to static image after 5 seconds
			const timer = setTimeout(() => {
				setGifSrc(staticImage);
			}, 5000);
			
			return () => clearTimeout(timer);
		} else {
			// If animations are disabled, immediately use the static image
			const staticImage = isLightMode ? '/images/backlight.jpg' : '/images/back.png';
			setGifSrc(staticImage);
		}
	}, [mounted, resolvedTheme, background]);

	return (
		<>
			<NextSeo {...seo} />
			<Navbar.Standard />
			{/* Background */}
			{mounted && (
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
			)}
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
