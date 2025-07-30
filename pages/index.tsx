import dynamic from 'next/dynamic';
import { differenceInYears } from 'date-fns';
import { Icon } from '@iconify/react';

import { Animate, Button, Pill, CenterPiece, Status } from '~/components';
import { EventType, NavigationItemType } from '~/types';
import { Layout } from '~/layouts';

import type { EventProps } from '~/components/Event.component';
import type { NavigationItem } from '~/types';

const Event = dynamic<EventProps>(
	() => import('~/components/Event.component').then(({ Event }) => Event),
	{
		ssr: false,
	},
);

const ACTIONS: Array<NavigationItem> = [
	{
		type: NavigationItemType.LINK,
		href: '/projects',
		icon: <Icon className="mr-3" icon="feather:copy" />,
		text: 'Projects',
	},
	{
		type: NavigationItemType.LINK,
		href: '/blog',
		icon: <Icon className="mr-3" icon="feather:edit-3" />,
		text: 'Blog',
	},
];

export default function HomePage() {
	const today = new Date();
	const birthday = new Date('2003-05-27');
	const age = differenceInYears(today, birthday);
	const isBirthday =
		today.getDate() === birthday.getDate() && today.getMonth() === birthday.getMonth();

	const description = `I'm a ${age} year old software engineer and computer science student`;
	const status = "Currently developing Momentum Custom Firmware for Flipper Zero";

	return (
		<Layout.Default>
			<style dangerouslySetInnerHTML={{
				__html: `
					/* Disable scrolling on desktop for home page */
					@media (min-width: 768px) {
						body {
							overflow: hidden;
						}
					}
				`
			}} />
			{isBirthday && <Event event={EventType.BIRTHDAY} />}
			<CenterPiece />
			{/* Responsive positioning: negative margin on desktop, positive margin on mobile */}
			<div className="flex justify-center items-center mt-8 sm:mt-16 md:-mt-48 mb-16 relative z-50">
				<div className="w-full max-w-sm mx-auto px-4">
					<Status.Widget />
				</div>
			</div>
		</Layout.Default>
	);
}
