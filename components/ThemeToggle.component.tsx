import { useTheme } from 'next-themes';
import { Icon } from '@iconify/react';

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<div className="flex items-center justify-between w-full">
			<span
				className="text-sm font-medium tracking-wide text-gray-300"
				style={{ fontFamily: 'Comfortaa, Arial, sans-serif' }}
			>
				Theme
			</span>
			<div className="flex items-center space-x-1">
				<button
					onClick={() => setTheme('light')}
					className={`p-2 rounded-lg transition-all duration-300 text-sm font-medium tracking-wide ${theme === 'light'
						? 'text-white'
						: 'text-gray-300 hover:text-white'
						}`}
					style={{
						background: theme === 'light'
							? 'rgba(255, 255, 255, 0.15)'
							: 'rgba(255, 255, 255, 0.05)',
						backdropFilter: 'blur(10px)',
						border: '1px solid rgba(255, 255, 255, 0.1)',
						boxShadow: theme === 'light'
							? '0 4px 15px rgba(0, 0, 0, 0.2)'
							: '0 2px 10px rgba(0, 0, 0, 0.1)'
					}}
				>
					<Icon className="w-4 h-4" icon="feather:sun" />
				</button>
				<button
					onClick={() => setTheme('dark')}
					className={`p-2 rounded-lg transition-all duration-300 text-sm font-medium tracking-wide ${theme === 'dark'
						? 'text-white'
						: 'text-gray-300 hover:text-white'
						}`}
					style={{
						background: theme === 'dark'
							? 'rgba(255, 255, 255, 0.15)'
							: 'rgba(255, 255, 255, 0.05)',
						backdropFilter: 'blur(10px)',
						border: '1px solid rgba(255, 255, 255, 0.1)',
						boxShadow: theme === 'dark'
							? '0 4px 15px rgba(0, 0, 0, 0.2)'
							: '0 2px 10px rgba(0, 0, 0, 0.1)'
					}}
				>
					<Icon className="w-4 h-4" icon="feather:moon" />
				</button>
			</div>
		</div>
	);
}