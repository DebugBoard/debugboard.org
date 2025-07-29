import defaultTheme from 'windicss/defaultTheme';

export const colors: Record<string, Record<number, string>> = {
	...defaultTheme.colors,
	gray: {
		50: '#f9fafb',
		100: '#eaeaeb',
		200: '#cacbcd',
		300: '#a7a9ac',
		400: '#696c71',
		500: '#282d34',
		600: '#24292f',
		700: '#181b20',
		800: '#121518',
		900: '#000000',
	},
	primary: {
		50: '#fef2f2',
		100: '#fee2e2',
		200: '#fecaca',
		300: '#f87171',
		400: '#dc2626',
		500: '#b91c1c',
		600: '#991b1b',
		700: '#7f1d1d',
		800: '#6b0000',
		900: '#450a0a',
	},
};
