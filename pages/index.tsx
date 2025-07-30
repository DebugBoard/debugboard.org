import dynamic from 'next/dynamic';
import { differenceInYears } from 'date-fns';
import { Icon } from '@iconify/react';

import { Animate, Button, Pill, CenterPiece, Status, GitHub } from '~/components';
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
							overflow: auto;
						}
					}
				`
			}} />
			{isBirthday && <Event event={EventType.BIRTHDAY} />}

			{/* Main content with reduced spacing */}
			<div className="flex flex-col items-center justify-start pt-10 pb-20">
				{/* Center Piece */}
				<div className="mb-12 w-full flex justify-center">
					<CenterPiece />
				</div>

				{/* Git commits and Discord Status side by side */}
				<div className="w-full flex flex-col md:flex-row justify-center gap-6 px-4">
					{/* GitHub Contribution Graph */}
					<div className="w-full md:w-1/2 relative z-40 flex justify-center">
						<div className="inline-block p-4 md:p-6 relative z-50 w-full"
							style={{
								background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))',
								WebkitBackdropFilter: 'blur(50px)',
								backdropFilter: 'blur(50px)',
								borderRadius: '50px',
								borderColor: 'rgba(66, 66, 66, 0.25)',
								borderWidth: '1.5px'
							}}
						>
							<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
								<h3
									className="text-xl font-medium w-fit"
									style={{
										color: '#610000',
										fontFamily: 'Minecraft, monospace',
										textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
									}}
								>
									GitHub Contributions
								</h3>
							</div>
							<GitHub.CommitGraph username="DebugBoard" monthsToShow={12} />
						</div>
					</div>

					{/* Status Widget */}
					<div className="w-full md:w-1/2 relative z-50 flex justify-center">
						<div className="inline-block p-4 md:p-6 relative z-50 w-full"
							style={{
								background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))',
								WebkitBackdropFilter: 'blur(50px)',
								backdropFilter: 'blur(50px)',
								borderRadius: '50px',
								borderColor: 'rgba(66, 66, 66, 0.25)',
								borderWidth: '1.5px'
							}}
						>
							<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
								<h3
									className="text-xl font-medium w-fit"
									style={{
										color: '#610000',
										fontFamily: 'Minecraft, monospace',
										textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
									}}
								>
									Discord Status
								</h3>
							</div>
							<Status.Widget />
						</div>
					</div>
				</div>
			</div>
		</Layout.Default >
	);
}
