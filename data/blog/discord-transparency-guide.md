---
tagline: Transparency Guide
title: How to Make Discord Transparent
description: A comprehensive guide to making Discord transparent on Windows using Vencord and Mica For Everyone
banner: /images/dicordcover.png
banner_alt: Discord application interface with transparency effects
date: '2025-01-31'
---


## Requirements

Before we begin, you'll need to download and install the following:

1. **[Vencord](https://vencord.dev/download/)** - A Discord client modification
2. **[Mica For Everyone](https://www.youtube.com/watch?v=M7R1e_n8lhE)** - Windows transparency tool
3. **[Transparency Effects Enabled in Windows settings](https://de4uth.org/TransparencyEffects.png)** - Windows system setting

## Setting Up Vencord

### Installing the Theme

1. Open Discord and navigate to the Vencord Settings tab in Discord Settings
   ![Vencord Settings](https://de4uth.org/vencordsettingts.png)

2. Follow this video guide to learn how to use CSS themes: [How to use CSS theme](https://de4uth.org/vencordtheme.mp4)

## Configuring Mica For Everyone

### Creating Process Rules

1. **Create a Discord Process Rule** - Make sure to capitalize the "D" in Discord
   ![Process Rule](https://de4uth.org/processrule.png)

2. **Configure Discord Rules** - Apply these specific settings for Discord
   ![Mica for Discord](https://de4uth.org/micafordisocrd.png)

## Discord Theme Settings

### Setting the Base Theme

1. **Set your theme to Ash** - This setting is located in Appearance in Client settings
   ![Theme Default](https://de4uth.org/themedefualt.png)

> **Note:** If this wasn't already selected, make sure to fully close and reopen Discord for the changes to take effect.

## CSS Theme Code

Copy and paste this CSS code into your Vencord theme settings. This is a slightly modified version of the Translucence theme by CapnKitten:

```css
:root {
  /* APP ELEMENTS */
  --app-bg: transparent;
  --app-blur: 0px;
  --app-margin: 24px;
  --app-radius: 10px;
  --main-rgb: 0,0,0;
  --main-content-opacity: 0.2;
  --sidebar-opacity: 0.4;
  --main-content-color: rgba(var(--main-rgb), var(--main-content-opacity));
  --sidebar-color: rgba(var(--main-rgb), var(--sidebar-opacity));
  
  /* ACCENT HSL AND TEXT COLOR SETTINGS */
  --accent-hue: 351;
  --accent-saturation: 100%;
  --accent-lightness: 26%;
  --accent-hsl: var(--accent-hue),calc(var(--accent-saturation) * var(--saturation-factor)),var(--accent-lightness);
  --accent-opacity: 1;
  --accent-text-color: hsl(0,0%,0%);
  
  /* ALERT HSL AND TEXT COLOR SETTINGS */
  --alert-hue: 359;
  --alert-saturation: 66.7%;
  --alert-lightness: 54.1%;
  --alert-hsl: var(--alert-hue),calc(var(--alert-saturation) * var(--saturation-factor)),var(--alert-lightness);
  --alert-opacity: 1;
  --alert-action-color: hsl(0,0%,100%);
  --alert-text-color: hsl(0,0%,100%);
  
  /* MESSAGE COLOR SETTINGS */
  --message-color: hsl(0,0%,0%,0.4);
  --message-color-hover: hsl(0,0%,0%,0.55);
  --message-radius: var(--app-radius);
  --message-padding-top: 8px;
  --message-padding-side: 8px;
  
  /* TEXTAREA SETTINGS */
  --textarea-color: 255,255,255;
  --textarea-alpha: 0.1;
  --textarea-alpha-focus: 0.15;
  --textarea-text-color: hsl(0,0%,100%);
  --textarea-placeholder-color: hsl(0,0%,90%);
  --textarea-radius: 28px;
  
  /* BUTTON SETTINGS */
  --button-height: 32px;
  --button-padding: 0 16px;
  --button-color: hsla(var(--accent-hsl),var(--accent-opacity));
  --button-action-color: hsl(0,0%,0%);
  --button-text-color: var(--accent-text-color);
  --button-radius: 16px;
  
  /* POPOUT SETTINGS */
  --popout-color: hsl(0,0%,0%,0.55);
  --popout-blur: 8px;
  --popout-radius: var(--app-radius);
  
  /* ANIMATION SETTINGS */
  --transition-time: 250ms;
  --transition-type: cubic-bezier(0.4,0,0.2,1);
}

.visual-refresh.theme-dark, .visual-refresh.theme-light {
  /* TEXT COLOR SETTINGS */
  --text-primary: hsl(0,0%,100%);
  --text-secondary: hsl(0,0%,77%);
  
  /* CHANNEL COLOR SETTINGS */
  --channels-default: hsl(0,0%,62%);
  --channel-icon: hsl(0,0%,62%);
  
  /* INTERACTIVE COLOR SETTINGS */
  --interactive-normal: hsl(0,0%,79%);
  --interactive-hover: hsl(0,0%,91%);
  --interactive-active: hsl(0,0%,100%);
  --interactive-muted: hsl(0,0%,43%);
  
  /* BACKGROUND SETTINGS */
  --background-modifier-hover: hsl(0,0%,100%,0.075);
  --background-modifier-active: hsl(0,0%,100%,0.1);
  --background-modifier-selected: hsl(0,0%,100%,0.125);
  --background-primary: transparent;
  --text-brand: hsl(var(--accent-hsl));
  --text-link: hsl(var(--accent-hsl));
}

/* APP ELEMENTS */
body {
  background-color: transparent;
}

.appMount__51fd7 {
  background: var(--app-bg) !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
  background-size: cover !important;
}

.appMount__51fd7 * {
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
}

.layers__160d8 {
  margin: calc(var(--app-margin) / 2) var(--app-margin) var(--app-margin) var(--app-margin);
  overflow: hidden;
  z-index: 1;
  backdrop-filter: blur(var(--app-blur));
}

.app__160d8,
.bg__960e4 {
  background-color: transparent;
}
```

## Troubleshooting

- **Discord not transparent?** Make sure Windows transparency effects are enabled and Mica For Everyone is running
- **Theme not applying?** Restart Discord completely after making changes
- **Performance issues?** Try reducing the blur amount in the CSS variables

## Credits

This guide is based on the excellent work by **CapnKitten** for the original Translucence theme. The transparency setup uses Mica For Everyone to achieve the glass effect on Windows.

---
