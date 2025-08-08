import clsx from 'clsx';
import Link from 'next/link';
import { forwardRef, Fragment } from 'react';
import { Icon } from '@iconify/react';
import { Menu, Transition } from '@headlessui/react';

import { NavigationItemType, WithChildren, WithClassName } from '~/types';

import type { AnchorHTMLAttributes, ReactNode } from 'react';

import type { NavigationItems } from '~/types';

type Position = 'top-left' | 'top-right';

interface StandardProps extends WithChildren {
	items: NavigationItems;
	position: Position;
}

interface MenuLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	active: boolean;
}

interface MenuButtonIconProps extends WithClassName {
	icon: string | ReactNode;
	direction?: 'left' | 'right';
}

const StyledMenuItem = forwardRef<any, MenuLinkProps>(function StyledMenuItem(
	{ active, children, className, ...rest },
	ref,
) {
	return (
		<div className="mx-2 my-2">
			<a
				className={clsx(
					'flex items-center px-4 py-3 text-sm font-medium tracking-wide cursor-pointer transition-all duration-300 rounded-2xl whitespace-nowrap',
					active
						? 'text-white'
						: 'text-gray-300 hover:text-white',
					className,
				)}
				style={{
					fontFamily: 'Comfortaa, Arial, sans-serif',
					background: active
						? 'rgba(255, 255, 255, 0.15)'
						: 'rgba(255, 255, 255, 0.05)',
					backdropFilter: 'blur(10px)',
					border: '1px solid rgba(255, 255, 255, 0.1)',
					boxShadow: active
						? '0 4px 15px rgba(0, 0, 0, 0.2)'
						: '0 2px 10px rgba(0, 0, 0, 0.1)'
				}}
				ref={ref}
				{...rest}
			>
				{children}
			</a>
		</div>
	);
});

function MenuButtonIcon({ className, icon, direction: type = 'left' }: MenuButtonIconProps) {
	if (typeof icon !== 'string') return <>{icon}</>;

	if (type === 'right')
		return <Icon aria-hidden="true" className={clsx('w-4 h-4 ml-3', className)} icon={icon} />;

	return <Icon aria-hidden="true" className={clsx('w-5 h-5 mr-3', className)} icon={icon} />;
}

/**
 * Menu Link
 *
 * @see https://headlessui.dev/react/menu#integrating-with-next-js
 */
function MenuLink({ children, href, onClick, active, className, ...rest }: MenuLinkProps) {
	return (
		<div className="mx-2 my-2">
			<Link
				href={href}
				onClick={(...args) => onClick(...args)}
				className={clsx(
					'flex items-center px-4 py-3 text-sm font-medium tracking-wide cursor-pointer transition-all duration-300 rounded-2xl whitespace-nowrap',
					active
						? 'text-white'
						: 'text-gray-300 hover:text-white',
					className,
				)}
				style={{
					fontFamily: 'Comfortaa, Arial, sans-serif',
					background: active
						? 'rgba(255, 255, 255, 0.15)'
						: 'rgba(255, 255, 255, 0.05)',
					backdropFilter: 'blur(10px)',
					border: '1px solid rgba(255, 255, 255, 0.1)',
					boxShadow: active
						? '0 4px 15px rgba(0, 0, 0, 0.2)'
						: '0 2px 10px rgba(0, 0, 0, 0.1)'
				}}
				{...rest}
			>
				{children}
			</Link>
		</div>
	);
}

export function Dropdown({ children, items, position = 'top-left' }: StandardProps) {
	return (
		<Menu as="div" className="relative inline-block text-left">
			{({ open }) => (
				<>
					<Menu.Button as={Fragment}>{children}</Menu.Button>

					<Transition
						appear={true}
						enter="transition ease-in-out"
						enterFrom="transform scale-95 opacity-0"
						enterTo="transform scale-100 opacity-100"
						leave="transition ease-in-out"
						leaveFrom="transform scale-100 opacity-100"
						leaveTo="transform scale-95 opacity-0"
						show={open}
					>
						<Menu.Items
							className={clsx(
								'absolute w-[calc(100vw-1rem)] sm:w-72 mt-2 focus:outline-none p-3',
								position === 'top-left' && 'origin-top-left left-0',
								position === 'top-right' && 'origin-top-right right-0',
							)}
							style={{
								background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))',
								WebkitBackdropFilter: 'blur(50px)',
								backdropFilter: 'blur(50px)',
								borderRadius: '25px',
								borderColor: 'rgba(66, 66, 66, 0.25)',
								borderWidth: '1.5px',
								boxShadow: '0 0 10px rgba(0,0,0,0.1)'
							}}
						>
							{items.map((section, index) => (
								<div key={index}>
									{section.map((item, j) => (
										<Menu.Item key={j}>
											{({ active }) => {
												switch (item.type) {
													case NavigationItemType.ACTION:
														return (
															<StyledMenuItem
																active={active}
																className="group"
																onClick={() => item.onClick()}
															>
																<MenuButtonIcon icon={item.icon} />
																{item.text}
																{item.endIcon && (
																	<>
																		<span className="flex-1" />
																		<MenuButtonIcon
																			direction="right"
																			icon={item.endIcon}
																		/>
																	</>
																)}
															</StyledMenuItem>
														);
													case NavigationItemType.LINK:
														const external = item.external ?? false;
														if (external)
															return (
																<StyledMenuItem
																	className="group"
																	active={active}
																	href={item.href}
																	rel="noopener noreferrer"
																	target="_blank"
																>
																	<MenuButtonIcon
																		icon={item.icon}
																	/>
																	{item.text}
																	<span className="flex-1" />
																	<MenuButtonIcon
																		direction="right"
																		icon="feather:external-link"
																	/>
																</StyledMenuItem>
															);

														return (
															<MenuLink
																active={active}
																href={item.href}
															>
																<MenuButtonIcon icon={item.icon} />
																{item.text}
															</MenuLink>
														);
													case NavigationItemType.CUSTOM:
														return (
															<div className="mx-2 my-2">
																<div
																	className="flex items-center px-4 py-3 text-sm font-medium tracking-wide transition-all duration-300 rounded-2xl whitespace-nowrap"
																	style={{
																		fontFamily: 'Comfortaa, Arial, sans-serif',
																		background: 'rgba(255, 255, 255, 0.05)',
																		backdropFilter: 'blur(10px)',
																		border: '1px solid rgba(255, 255, 255, 0.1)',
																		boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
																	}}
																>
																	{item.component}
																</div>
															</div>
														);
												}
											}}
										</Menu.Item>
									))}
								</div>
							))}
						</Menu.Items>
					</Transition>
				</>
			)}
		</Menu>
	);
}
