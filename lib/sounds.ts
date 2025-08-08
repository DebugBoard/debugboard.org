import { useSound } from 'use-sound';
import { usePersistantState } from '.';

export function useClick() {
	const state = usePersistantState();
	const result = useSound('/sounds/click.ogg', {
		volume: 0.05,
	});

	// Return no-op function during SSR or when sound is disabled
	if (!state.isClient || !state.get().sound) return [() => {}, null];

	return result;
}
