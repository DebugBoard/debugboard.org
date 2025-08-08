import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export function Standard({ blur = 0 }) {
	const { resolvedTheme } = useTheme();
	const [backgroundSrc, setBackgroundSrc] = useState('');
	const [mounted, setMounted] = useState(false);

	// Ensure component is mounted to avoid hydration mismatch
	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!mounted) return;

		// Determine which background to use based on theme
		const isLightMode = resolvedTheme === 'light';
		
		// Choose appropriate GIF and static image based on theme
		const initialGif = isLightMode ? '/images/backlight.gif' : '/images/back.gif';
		const staticImage = isLightMode ? '/images/backlight.jpg' : '/images/back.png';
		
		// Start with GIF
		setBackgroundSrc(initialGif);
		
		// Switch to static image after 5 seconds (when GIF finishes)
		const timer = setTimeout(() => {
			setBackgroundSrc(staticImage);
		}, 5000);
		
		return () => clearTimeout(timer);
	}, [mounted, resolvedTheme]);

	if (!mounted || !backgroundSrc) {
		return null;
	}

	return (
			<img
				src={backgroundSrc}
				alt=""
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					zIndex: -1,
					filter: blur ? `blur(${blur}px)` : 'none',
				}}
			/>
		);
}
