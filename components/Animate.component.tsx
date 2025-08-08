import { animate, spring } from 'framer-motion';
import { isCrawlerUserAgent } from 'is-web-crawler';
import { useEffect, useRef } from 'react';
import { useMedia } from 'react-use';

import { usePersistantState } from '~/lib';

import type { ComponentPropsWithRef, ElementType } from 'react';

type AnimateProps<T extends ElementType> = {
	animation: any;
	as?: T;
	enabled?: boolean;
	transition?: any;
} & Omit<ComponentPropsWithRef<T>, 'animation' | 'as' | 'transition'>;

const defaultTransition = {
	delay: 0,
	duration: 1.5,
	ease: spring(),
	repeat: 0,
};

export function Animate<T extends ElementType>({
	animation,
	as: Component = 'div' as T,
	children,
	enabled = true,
	transition,
	...rest
}: AnimateProps<T>): React.JSX.Element {
	const state = usePersistantState();
	const { animations } = state.get();
	const prefersReducedMotion = useMedia('(prefers-reduced-motion)', true);

	const ref = useRef<HTMLElement | null>(null);

	useEffect(() => {
		// Only animate on client side
		if (!state.isClient) return;
		
		if (ref.current && enabled && animations && !(prefersReducedMotion || isCrawlerUserAgent()))
			animate(ref.current, animation, {
				...defaultTransition,
				...transition,
			});
	}, [animation, animations, enabled, prefersReducedMotion, transition, state.isClient]);

	return (
		// @ts-expect-error
		<Component ref={ref} {...rest}>
			{children}
		</Component>
	);
}
