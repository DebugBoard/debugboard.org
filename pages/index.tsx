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
	{
		type: NavigationItemType.LINK,
		external: true,
		href: 'https://linktr.ee/WillyJL',
		icon: <Icon className="mr-3" icon="feather:link" />,
		text: 'Links',
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
			{isBirthday && <Event event={EventType.BIRTHDAY} />}
			<CenterPiece />
			<div className="flex justify-center items-center -mt-48 mb-16 relative z-50">
				<div className="w-full max-w-sm mx-auto px-4">
					<Status.Widget />
				</div>
			</div>
		</Layout.Default>
	);
}
