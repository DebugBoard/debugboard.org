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
		<Layout.Default 
			seo={{
				title: 'DebugBoard - Software Engineering & Transparency Guides',
				description: 'Welcome to DebugBoard.org - Your ultimate resource for software engineering tutorials, transparency guides for Discord, Spotify, Obsidian, and Zen Browser. Learn programming, web development, and application customization.',
				additionalMetaTags: [
					{
						name: 'keywords',
						content: 'DebugBoard, software engineering, programming tutorials, transparency guides, Discord transparent, Spotify transparent, Obsidian transparent, Zen Browser, web development, React, Next.js, TypeScript, CSS themes, Windows customization',
					},
				],
				openGraph: {
					title: 'DebugBoard - Software Engineering & Transparency Guides',
					description: 'Your ultimate resource for software engineering tutorials and transparency guides for popular applications',
					type: 'website',
				},
			}}
		>
			{/* Hidden SEO content for search engines */}
			<div className="sr-only">
				<h1>DebugBoard - Software Engineering & Transparency Guides</h1>
				<p>Welcome to DebugBoard.org, your comprehensive resource for software engineering tutorials, programming guides, and application transparency customization. Learn how to make Discord transparent, customize Spotify, enhance Obsidian, and modify Zen Browser with our step-by-step guides.</p>
				<h2>Featured Content</h2>
				<ul>
					<li>Discord Transparency Guide - Learn how to make Discord transparent using Vencord and Mica For Everyone</li>
					<li>Spotify Transparency Tutorial - Customize your Spotify interface with transparency effects</li>
					<li>Obsidian Customization - Enhance your note-taking experience with transparent themes</li>
					<li>Zen Browser Modifications - Optimize your browsing experience with custom transparency</li>
					<li>Software Engineering Projects - Explore various programming projects and tutorials</li>
					<li>Web Development Resources - Learn React, Next.js, TypeScript, and modern web technologies</li>
				</ul>
			</div>

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
