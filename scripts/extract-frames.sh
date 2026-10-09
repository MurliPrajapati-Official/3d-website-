#!/usr/bin/env bash
# Rebuilds the hero scroll-sequence frames and section stills from video.mp4.
#
# The film's 3x3 grid is part of its design: each tile is a slightly shifted
# view and the black lines hide the joins, so the grid is kept as-is.
# Stills used outside the hero have the burned-in captions
# ("Built Over Flames" / "Finished with Intention") painted out.
#
# requires: ffmpeg
set -euo pipefail
cd "$(dirname "$0")/.."

SRC=video.mp4
CAPTIONS="delogo=x=130:y=512:w=170:h=52,delogo=x=625:y=512:w=125:h=52,delogo=x=1060:y=512:w=185:h=52"

mkdir -p public/frames/lg public/frames/sm public/stills
ffmpeg -v error -y -i "$SRC" -an -vf "scale=1350:-2" -c:v libwebp -quality 66 -compression_level 5 public/frames/lg/f_%03d.webp
ffmpeg -v error -y -i "$SRC" -an -vf "scale=720:-2"  -c:v libwebp -quality 60 -compression_level 5 public/frames/sm/f_%03d.webp

# name:time:needs-caption-removal
for p in egg:0.4:0 whisk:1.6:0 sear:3.6:1 greens:4.6:1 plate:6.8:1 toast:8.8:1; do
  IFS=: read -r name t cap <<< "$p"
  vf="null"
  [ "$cap" = 1 ] && vf="$CAPTIONS"
  ffmpeg -v error -y -ss "$t" -i "$SRC" -frames:v 1 -vf "$vf" -c:v libwebp -quality 84 "public/stills/$name.webp"
done
ffmpeg -v error -y -i "$SRC" -frames:v 1 -c:v libwebp -quality 70 public/poster.webp

echo "Frames: $(ls public/frames/lg | wc -l)"
