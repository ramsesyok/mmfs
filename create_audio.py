#!/usr/bin/env python3
import wave
import struct
import math

def create_wav(filename, duration=3, frequency=440, sample_rate=44100):
    """Create a simple sine wave WAV file"""
    num_samples = int(sample_rate * duration)
    
    with wave.open(filename, 'w') as wav_file:
        # Set parameters: 1 channel, 2 bytes per sample, sample rate
        wav_file.setnchannels(1)
        wav_file.setsampwidth(2)
        wav_file.setframerate(sample_rate)
        
        # Generate sine wave samples
        for i in range(num_samples):
            # Calculate sine wave value
            value = int(32767 * 0.3 * math.sin(2 * math.pi * frequency * i / sample_rate))
            # Pack as signed short (16-bit)
            data = struct.pack('<h', value)
            wav_file.writeframes(data)

# Create two audio files with different frequencies
create_wav('/home/ramses/mmfs/public/voice01.wav', duration=3, frequency=440)
create_wav('/home/ramses/mmfs/public/voice02.wav', duration=3, frequency=523)

print("Created voice01.wav and voice02.wav")
