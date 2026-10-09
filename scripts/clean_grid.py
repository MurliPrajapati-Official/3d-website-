"""Paint the burned-in camera grid out of video.mp4.

Streams raw frames from ffmpeg, inpaints the two horizontal and two vertical
grid lines with OpenCV (Telea), and streams the result back into ffmpeg.

usage: python scripts/clean_grid.py <in.mp4> <out.mp4>
requires: numpy, opencv-python-headless, ffmpeg on PATH
"""
import subprocess
import sys

import cv2
import numpy as np

W, H = 1350, 1080
ROWS = [(337, 360), (713, 736)]  # grid line bands (with compression halo), start-inclusive
COLS = [(435, 458), (911, 934)]

src, dst = sys.argv[1], sys.argv[2]

mask = np.zeros((H, W), np.uint8)
for a, b in ROWS:
    mask[a:b, :] = 255
for a, b in COLS:
    mask[:, a:b] = 255

reader = subprocess.Popen(
    ['ffmpeg', '-v', 'error', '-i', src, '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-'],
    stdout=subprocess.PIPE,
)
writer = subprocess.Popen(
    ['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-s', f'{W}x{H}',
     '-r', '30', '-i', '-', '-c:v', 'libx264', '-crf', '12', '-preset', 'slow',
     '-pix_fmt', 'yuv420p', dst],
    stdin=subprocess.PIPE,
)

size = W * H * 3
count = 0
while True:
    buf = reader.stdout.read(size)
    if len(buf) < size:
        break
    frame = np.frombuffer(buf, np.uint8).reshape(H, W, 3)
    writer.stdin.write(cv2.inpaint(frame, mask, 7, cv2.INPAINT_TELEA).tobytes())
    count += 1

writer.stdin.close()
writer.wait()
reader.wait()
print(f'cleaned {count} frames')
