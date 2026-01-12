import { makeScene2D, Img, Rect, Txt, Audio, Layout } from '@revideo/2d';
import { createRef, waitFor } from '@revideo/core';
import { config } from '../project';

export default makeScene2D(function* (view) {
    // Video dimensions
    const videoWidth = config.width;
    const videoHeight = config.height;

    // Helper function to convert left-top coordinates to Revideo's center origin
    // Revideo positions elements by their CENTER, not top-left corner
    const toRevideoCoords = (leftTopX: number, leftTopY: number, width: number, height: number) => ({
        x: leftTopX + width / 2 - videoWidth / 2,
        y: leftTopY + height / 2 - videoHeight / 2,
    });

    // Layout specifications (left-top coordinates)
    const slideSpec = { x: 75, y: 75, width: 1440, height: 810 };
    const subtitleSpec = { x: 75, y: 925, width: 1360, height: 130 };
    const characterSpec = { x: 1464, y: 130, width: 460, height: 950 };

    // Convert to Revideo coordinates (center-based)
    const slidePos = toRevideoCoords(slideSpec.x, slideSpec.y, slideSpec.width, slideSpec.height);
    const subtitlePos = toRevideoCoords(subtitleSpec.x, subtitleSpec.y, subtitleSpec.width, subtitleSpec.height);
    const characterPos = toRevideoCoords(characterSpec.x, characterSpec.y, characterSpec.width, characterSpec.height);

    // Create component references
    const slideRef = createRef<Img>();
    const subtitleRectRef = createRef<Rect>();
    const subtitleTextRef = createRef<Txt>();
    const characterRef = createRef<Img>();

    // Add components to view with proper layering (background → slide → subtitle → character)
    view.add(
        <>
            {/* Background - bottom-most layer (centered at origin) */}
            <Img
                src={`/${config.background}`}
                x={0}
                y={0}
                width={videoWidth}
                height={videoHeight}
            />

            {/* Slide background - second layer */}
            <Img
                ref={slideRef}
                src={`/${config.scenes[0].slidePath}`}
                x={slidePos.x}
                y={slidePos.y}
                width={slideSpec.width}
                height={slideSpec.height}
            />

            {/* Subtitle with green border - middle layer */}
            <Rect
                ref={subtitleRectRef}
                x={subtitlePos.x}
                y={subtitlePos.y}
                width={subtitleSpec.width}
                height={subtitleSpec.height}
                fill={config.caption.backgroundColor}
                padding={20}
            >
                <Txt
                    ref={subtitleTextRef}
                    text={config.scenes[0].text}
                    fontSize={config.caption.fontSize}
                    fill={config.caption.color}
                    stroke={config.caption.stroke}
                    lineWidth={config.caption.strokeWidth}
                    fontFamily={config.caption.fontFamily}
                    fontWeight={config.caption.fontWeight}
                    textWrap={true}
                    width={subtitleSpec.width - 40}
                />
            </Rect>

            {/* Character - top layer, positioned at bottom-right */}
            <Img
                ref={characterRef}
                src={`/${config.characterPath}`}
                x={videoWidth / 2}
                y={videoHeight / 2}
                offsetX={1}
                offsetY={1}
            />
        </>
    );

    // Scene loop: iterate through each scene in config
    for (const scene of config.scenes) {
        // Update slide image
        slideRef().src(`/${scene.slidePath}`);

        // Update subtitle text (hide if empty)
        if (scene.text && scene.text.trim() !== '') {
            subtitleTextRef().text(scene.text);
            subtitleRectRef().opacity(1);
        } else {
            subtitleRectRef().opacity(0);
        }

        // Create and add audio for this scene
        const audioRef = createRef<Audio>();
        view.add(
            <Audio
                ref={audioRef}
                src={`/${scene.voicePath}`}
                play={true}
            />
        );

        // Wait for 3 seconds (our audio files are 3 seconds long)
        yield* waitFor(3);

        // Remove audio after scene ends
        audioRef().remove();
    }
});
