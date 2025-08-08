import clsx from 'clsx';

import { LanyardAvatarType } from '~/types';

interface LoadingTypes {
	type?: LanyardAvatarType;
}

export function Loading({ type }: LoadingTypes) {
	return (
		<div
			style={{
				background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))',
				WebkitBackdropFilter: 'blur(50px)',
				backdropFilter: 'blur(50px)',
				borderRadius: '50px',
				borderColor: 'rgba(66, 66, 66, 0.25)',
				borderWidth: '1.5px'
			}}
			className="flex flex-col space-y-5 w-full max-w-sm mx-auto px-6 py-6 shadow-xl motion-safe:animate-pulse"
		>
			{/* Discord User Skeleton */}
			<div className="inline-flex items-center">
				<div className="max-w-md max-h-12 my-auto rounded-[15px] pointer-events-none select-none ring-2 ring-gray-200 dark:ring-gray-500">
					<div className="w-12 h-12 rounded-[15px] bg-gray-300 dark:bg-gray-600" />
				</div>
				<div className="flex-1 ml-4">
					{/* Display name skeleton */}
					<div className="w-32 h-4 rounded bg-gray-300 dark:bg-gray-600 mb-2" />
					{/* Username skeleton */}
					<div className="w-20 h-3 rounded bg-gray-300 dark:bg-gray-600 mb-2" />
					{/* Custom status skeleton */}
					<div className="w-24 h-3 rounded bg-gray-300 dark:bg-gray-600" />
				</div>
				{/* Status indicator skeleton */}
				<div className="w-6 h-6 mx-3 rounded-full bg-gray-300 dark:bg-gray-600" />
			</div>

			{/* Separator */}
			<hr className="h-0.5 bg-gray-400 bg-opacity-30 border-none rounded-full" />

			{/* Activity Skeleton (optional second item) */}
			<div className="inline-flex items-center">
				<div className="max-w-md max-h-12 my-auto rounded-[15px] pointer-events-none select-none ring-2 ring-gray-200 dark:ring-gray-500">
					<div className="w-12 h-12 rounded-[15px] bg-gray-300 dark:bg-gray-600" />
				</div>
				<div className="flex-1 ml-4">
					{/* Activity title skeleton */}
					<div className="w-28 h-4 rounded bg-gray-300 dark:bg-gray-600 mb-2" />
					{/* Activity description skeleton */}
					<div className="w-36 h-3 rounded bg-gray-300 dark:bg-gray-600" />
				</div>
				{/* Activity icon skeleton */}
				<div className="w-6 h-6 mx-3 rounded bg-gray-300 dark:bg-gray-600" />
			</div>
		</div>
	);
}
