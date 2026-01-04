# Songify Widget

A customizable "Now Playing" widget that displays your currently playing Spotify track. Perfect for streamers who want to show their audience what music they're listening to.

![Preview](https://github.com/user-attachments/assets/a789b8aa-21a5-4db1-8100-c5bbe6adce41)


## What is Songify?

[Songify](https://songify.rocks) is a desktop application that fetches your currently playing Spotify song and makes it available via a simple API. This widget connects to that API to display your music in a beautiful, embeddable format.

## Features

### 🎵 Real-Time Song Display
- Automatically updates when your track changes
- Shows song title and artist information
- Smooth scrolling text for long song names

### 🎨 Fully Customizable Appearance
- **Rounded Corners** - Adjust corner radius from sharp to fully rounded
- **Transparency** - Set background opacity from solid to fully transparent
- **Icon Position** - Place the album art on the left or right side

### 🖼️ Album Art & Canvas Support
- Display album cover art alongside the song info
- Support for Spotify Canvas (animated album art) when available
- Automatic fallback to static cover if canvas isn't available

### ✨ Scroll Animations
- **Continuous Loop** - Text scrolls continuously in one direction
- **Bounce** - Text scrolls to the end, pauses, then scrolls back
- **Stop at End** - Text scrolls once and stops
- **Fade Edges** - Smooth fade effect at text boundaries
- Adjustable scroll speed and direction

### 🎬 Show/Hide Animations
- Animate the widget in and out when songs change
- 25+ entrance animations (fade, slide, zoom, bounce, flip, and more)
- 25+ exit animations to match
- Configurable display duration

## Widget Generator

The widget includes a built-in generator that lets you customize every aspect of your widget visually:

1. **Enter your Songify UUID** - Get this from your Songify desktop app
2. **Adjust settings** - See changes in real-time with the live preview
3. **Copy your URL** - Use the generated URL in OBS or your streaming software

All your preferences are automatically saved, so you won't lose your settings when you return.

## Using the Widget

### In OBS Studio
1. Add a new **Browser Source**
2. Paste your generated widget URL
3. Set dimensions to **312 x 64 pixels**
4. Enable "Shutdown source when not visible" for better performance

### In Streamlabs
1. Add a new **Browser Source** widget
2. Paste your generated widget URL
3. Set width to **312** and height to **64**

### In StreamElements
1. Add a new **Browser Source** overlay
2. Paste your generated widget URL
3. Adjust dimensions as needed

## Widget Dimensions

| Property | Value |
|----------|-------|
| Width | 312 px |
| Height | 64 px |

## Requirements

- [Songify Desktop App](https://songify.rocks) running on your computer
- Spotify account connected to Songify
- Your unique Songify UUID (found in the Songify app settings)

## Links

- 🌐 [Songify Website](https://songify.rocks)
- 🎵 [Widget Generator](https://widget.songify.rocks)
- 💬 [Discord Community](https://discord.gg/H8nd4T4)

---

Made with ♪ for the streaming community
