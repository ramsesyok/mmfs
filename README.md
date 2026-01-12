# Revideo JSON Video Engine

A JSON-driven video generation engine using Revideo (Motion Canvas) and TypeScript. Creates slide-based videos with voiceovers, subtitles, and character images, similar to Yukkuri Movie Maker 4.

## Features

- 🎬 **JSON Configuration**: Define entire videos using simple JSON files
- 🎨 **Fixed Layout**: Optimized for 1920x1080 @ 60fps
- 🔊 **Audio Sync**: Automatic scene timing based on voice audio duration
- 📝 **Subtitles**: Auto-hiding subtitle system with customizable styling
- 🎭 **Character Support**: Extensible character system ready for expressions and lip-sync
- 📐 **Coordinate Conversion**: Intuitive left-top coordinates automatically converted to Revideo's center origin

## Quick Start

### Installation

```bash
npm install
```

### Preview

```bash
npm run serve
```

Open browser to `http://localhost:4000` to preview your video.

### Render

```bash
npm run render
```

## Project Structure

```
├── public/
│   ├── config.json          # Video configuration
│   ├── chara_base.png       # Character image (460x950)
│   ├── slide01.png          # Slide backgrounds (1440x810)
│   ├── slide02.png
│   ├── voice01.wav          # Audio files
│   └── voice02.wav
├── src/
│   ├── project.ts           # Project configuration
│   └── scenes/
│       └── main.tsx         # Main scene implementation
```

## Configuration

Edit `public/config.json` to customize your video:

```json
{
  "width": 1920,
  "height": 1080,
  "fps": 60,
  "characterPath": "chara_base.png",
  "fontSize": 48,
  "scenes": [
    {
      "slidePath": "slide01.png",
      "voicePath": "voice01.wav",
      "text": "Your subtitle text here"
    }
  ]
}
```

## Layout Specifications

All coordinates use left-top origin (0,0 at top-left corner):

| Element | Position (x, y) | Size (W × H) | Layer |
|---------|----------------|--------------|-------|
| Slide | (75, 75) | 1440 × 810 | Bottom |
| Subtitle | (75, 925) | 1360 × 130 | Middle |
| Character | (1464, 130) | 460 × 950 | Top |

## How It Works

1. **Load Config**: Reads `config.json` from public folder
2. **Setup Layout**: Creates slide, subtitle, and character components
3. **Scene Loop**: For each scene:
   - Updates slide image
   - Updates subtitle text
   - Plays audio and waits for completion
   - Moves to next scene

## Customization

### Adding Scenes

Add more scenes to the `scenes` array in `config.json`:

```json
{
  "slidePath": "slide03.png",
  "voicePath": "voice03.wav",
  "text": "New scene text"
}
```

### Changing Character

Replace `chara_base.png` with your own character image (460×950 recommended).

### Adjusting Subtitle Style

Edit `src/scenes/main.tsx` to customize:
- Font size: `fontSize={config.fontSize}`
- Border color: `stroke={'#00ff00'}`
- Background: `fill={'rgba(0, 0, 0, 0.7)'}`

## Technical Details

- **TypeScript**: Full type safety with defined interfaces
- **Coordinate System**: Automatic conversion from left-top to center origin
- **Audio Sync**: Scene duration matches audio file length exactly
- **Extensible**: Character component ready for future enhancements

## Dependencies

- `@revideo/core` ^1.3.0
- `@revideo/2d` ^1.3.0
- `@revideo/cli` ^1.3.0
- `vite` 5.4.11
- `typescript` ^5.7.3

## License

ISC
