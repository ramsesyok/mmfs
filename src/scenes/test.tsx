import { makeScene2D, Rect, Txt } from '@revideo/2d';
import { createRef, waitFor } from '@revideo/core';

export default makeScene2D(function* (view) {
    // Simple test: just show a red rectangle and text
    const rectRef = createRef<Rect>();

    view.add(
        <Rect
            ref={rectRef}
            width={400}
            height={300}
            fill={'#ff0000'}
            x={0}
            y={0}
        >
            <Txt
                text="Test - 画面が表示されていますか？"
                fontSize={40}
                fill={'#ffffff'}
            />
        </Rect>
    );

    yield* waitFor(3);
});
