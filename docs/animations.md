# Animations Settings

## Overview

The website supports toggling animations on and off. When animations are disabled:

- Background GIFs (`back.gif` and `backlight.gif`) will not play
- Static images (`back.png` and `backlight.jpg`) will be shown immediately instead
- Other animations throughout the site may also be disabled

## How It Works

### Background Images

The website uses different background images based on:

1. **Theme Setting**: 
   - Light mode: `backlight.gif` → `backlight.jpg`
   - Dark mode: `back.gif` → `back.png`

2. **Animations Setting**:
   - Animations ON: Shows animated GIF first, then transitions to static image after 5 seconds
   - Animations OFF: Shows static image immediately (no GIF)

### Toggling Animations

You can toggle animations in two ways:

1. **Using the UI**:
   - Click the Settings icon (⚙️) in the top-right corner
   - Click "Animations On/Off" to toggle

2. **Using localStorage**:
   - Open browser console
   - Run the following code to toggle animations:

```js
const settings = JSON.parse(localStorage.getItem('settings'));
settings.animations = !settings.animations;
localStorage.setItem('settings', JSON.stringify(settings));
location.reload(); // Refresh to apply changes
```

## Implementation Details

The animations setting is stored in the browser's localStorage under the key `settings`. The relevant code is in:

- `layouts/Default.layout.tsx`: Controls background image selection
- `lib/state.ts`: Manages the persistent state
- `lib/navigation.tsx`: Provides UI controls for toggling settings

The system respects the user's "prefers-reduced-motion" setting by default.