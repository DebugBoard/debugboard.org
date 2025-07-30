// This script allows you to test the animations setting
// Run this in your browser console when on the website

// Get the current settings
const settings = JSON.parse(localStorage.getItem('settings'));
console.log('Current settings:', settings);

// Toggle animations setting
settings.animations = !settings.animations;
console.log('New animations setting:', settings.animations);

// Save the updated settings
localStorage.setItem('settings', JSON.stringify(settings));
console.log('Settings updated. Refresh the page to see changes.');

// Instructions:
// 1. Open your browser console (F12 or right-click > Inspect > Console)
// 2. Copy and paste this entire script
// 3. Press Enter to run it
// 4. Refresh the page to see the changes
// 5. You can run this script again to toggle the setting back