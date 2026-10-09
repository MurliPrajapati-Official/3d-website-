#!/usr/bin/env bash
# Rebuilds the hero scroll-sequence frames and section stills from video.mp4.
#
# 1. scripts/clean_grid.py inpaints the camera grid burned into the clip.
# 2. Frames are exported as WebP at two sizes (desktop / mobile).
# 3. Stills used outside the hero also have the burned-in captions
#    ("Built Over Flames" / "Finished with Intention") painted out.
#
# requires: ffmpeg, python with numpy + opencv-python-headless
set -euo pipefail
cd "$(dirname "$0")/.."

SRC=video.mp4
TMP=$(mktemp -d)
CAPTIONS="delogo=x=130:y=512:w=170:h=52,delogo=x=625:y=512:w=125:h=52,delogo=x=1060:y=512:w=185:h=52"

python scripts/clean_grid.py "$SRC" "$TMP/clean.mp4"

mkdir -p public/frames/lg public/frames/sm public/stills
ffmpeg -v error -y -i "$TMP/clean.mp4" -vf "scale=1350:-2" -c:v libwebp -quality 64 -compression_level 5 public/frames/lg/f_%03d.webp
ffmpeg -v error -y -i "$TMP/clean.mp4" -vf "scale=720:-2"  -c:v libwebp -quality 60 -compression_level 5 public/frames/sm/f_%03d.webp

# name:time:needs-caption-removal
for p in egg:0.4:0 whisk:1.6:0 sear:3.6:1 greens:4.6:1 plate:6.8:1 toast:8.8:1; do
  IFS=: read -r name t cap <<< "$p"
  vf="null"
  [ "$cap" = 1 ] && vf="$CAPTIONS"
  ffmpeg -v error -y -ss "$t" -i "$TMP/clean.mp4" -frames:v 1 -vf "$vf" -c:v libwebp -quality 84 "public/stills/$name.webp"
done
ffmpeg -v error -y -i "$TMP/clean.mp4" -frames:v 1 -c:v libwebp -quality 70 public/poster.webp

rm -rf "$TMP"
echo "Frames: $(ls public/frames/lg | wc -l)"
