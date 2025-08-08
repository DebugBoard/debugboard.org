import { useTheme } from 'next-themes';
import { ThemeToggle } from '~/components/ThemeToggle.component';

import { Status } from '~/components';
import { usePersistantState, useStatus } from '~/lib';

import { NavigationItemType, Theme } from '~/types';

import type { NavigationItem, NavigationItems } from '~/types';

const staticMenuItems: Array<Array<NavigationItem>> = [
	[
		{
			type: NavigationItemType.LINK,
			icon: 'feather:home',
			text: 'Home',
			href: '/',
		},
		{
			type: NavigationItemType.LINK,
			icon: 'feather:copy',
			text: 'Projects',
			href: '/projects',
		},
		{
			type: NavigationItemType.LINK,
			icon: 'feather:edit-3',
			text: 'Blog',
			href: '/blog',
		},

	],
];

export function useNavigation() {
	const state = usePersistantState();
	const { animations: background, sound } = state.get();
	const { loading, status } = useStatus();
	const { theme, setTheme } = useTheme();

	const menuItems: NavigationItems = [
		...staticMenuItems,
		...(!loading
			? [
				[
					{
						type: NavigationItemType.LINK,
						icon: <Status.Indicator status={status.discord_status} />,
						text: 'Discord Status',
						href: '/status',
					} as NavigationItem,
				],
			]
			: []),
	];

	const settingsItems: NavigationItems = [
		[
			{
				type: NavigationItemType.ACTION,
				icon: 'feather:image',
				endIcon: background ? 'feather:check-circle' : 'feather:circle',
				text: `Animations ${background ? 'On' : 'Off'}`,
				onClick: () =>
					state.set((settings) => ({
						...settings,
						animations: !settings.animations,
					})),
			},
			{
				type: NavigationItemType.ACTION,
				icon: sound ? 'feather:volume-2' : 'feather:volume-x',
				endIcon: sound ? 'feather:check-circle' : 'feather:circle',
				text: `Sounds ${sound ? 'On' : 'Off'}`,
				onClick: () =>
					state.set((settings) => ({
						...settings,
						sound: !settings.sound,
					})),
			},
		],
		[
			{
				type: NavigationItemType.CUSTOM,
				component: <ThemeToggle />,
			},
		],
	];

	return {
		menu: menuItems,
		settings: settingsItems,
	};
}
