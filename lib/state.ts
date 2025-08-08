import { useState, useEffect } from 'react';
import { useMedia } from 'react-use';

import type { Settings } from '~/types';

const DEFAULT_SETTINGS: Settings = {
	animations: null,
	sound: true,
};

export const STATE_KEY = 'settings';

export function usePersistantState() {
	const [isClient, setIsClient] = useState(false);
	const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
	const noMotionPreference = useMedia('(prefers-reduced-motion: no-preference)', true);

	// Set client flag after hydration
	useEffect(() => {
		setIsClient(true);
	}, []);

	useEffect(() => {
		if (!isClient) return;

		// Load from localStorage only on client
		try {
			const stored = localStorage.getItem(STATE_KEY);
			if (stored) {
				const parsed = JSON.parse(stored);
				setSettings(parsed);
			}
		} catch (error) {
			console.warn('Failed to load settings from localStorage:', error);
		}
	}, [isClient]);

	useEffect(() => {
		if (!isClient) return;

		// Save to localStorage only on client
		try {
			localStorage.setItem(STATE_KEY, JSON.stringify(settings));
		} catch (error) {
			console.warn('Failed to save settings to localStorage:', error);
		}
	}, [settings, isClient]);

	useEffect(() => {
		if (!isClient) return;

		// Set default animation preference only on client
		if (settings.animations === null) {
			setSettings(prev => ({
				...prev,
				animations: noMotionPreference,
			}));
		}
	}, [noMotionPreference, settings.animations, isClient]);

	return {
		get: () => settings,
		set: (updater: (prev: Settings) => Settings) => setSettings(updater),
		isClient,
	};
}
