import type { ReactNode } from 'react';

interface NaviationItemBase {
	endIcon?: string | ReactNode;
	icon: string | ReactNode;
	text: string;
	onClick?: () => void;
	href?: string;
}

export enum NavigationItemType {
	ACTION = 'action',
	LINK = 'link',
	CUSTOM = 'custom',
}

export type NavigationItem =
	| ({
		type: NavigationItemType.ACTION;
	} & Omit<NaviationItemBase, 'href'>)
	| ({
		external?: boolean;
		type: NavigationItemType.LINK;
	} & NaviationItemBase)
	| ({
		type: NavigationItemType.CUSTOM;
		component: ReactNode;
	});

export type NavigationItems = Array<Array<NavigationItem>>;
