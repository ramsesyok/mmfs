import { makeProject } from '@revideo/core';
import main from './scenes/main?scene';
import configData from './config.json';

// TypeScript interfaces for config.json
export interface SceneConfig {
    slidePath: string;
    voicePath: string;
    text: string;
}

export interface VideoConfig {
    width: number;
    height: number;
    fps: number;
    characterPath: string;
    background: string;
    caption: {
        fontSize: number;
        fontFamily: string;
        fontWeight: number;
        backgroundColor: string;
        color: string;
        stroke: string;
        strokeWidth: number;
    };
    scenes: SceneConfig[];
}

// Import config directly
export const config: VideoConfig = configData as VideoConfig;

export default makeProject({
    scenes: [main],
});
