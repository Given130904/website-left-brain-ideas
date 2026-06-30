from PIL import Image
import math

# Load the high-res 2336x2346 transparent PNG
img_path = r'public\assets\images\logo-left-brain-ideas-white.png'
img = Image.open(img_path).convert('L')
w, h = img.size

print(f"Loaded image for vectorization: {w}x{h}")

# Threshold to binary
threshold = 80
pixels = img.load()

# We can generate clean horizontal scanline SVG path or contour path
# To make SVG lightweight and infinitely scalable, let's trace horizontal segments with merge
paths = []

for y in range(h):
    x = 0
    while x < w:
        if pixels[x, y] > threshold:
            start_x = x
            while x < w and pixels[x, y] > threshold:
                x += 1
            paths.append(f"M{start_x},{y}h{x - start_x}v1h-{x - start_x}z")
        else:
            x += 1

d_data = " ".join(paths)
svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
  <path fill="#FFFFFF" d="{d_data}" />
</svg>'''

svg_path = r'public\assets\images\logo-left-brain-ideas.svg'
with open(svg_path, 'w', encoding='utf-8') as f:
    f.write(svg_content)

print(f"Successfully generated clean vector SVG at {svg_path} (ViewBox: 0 0 {w} {h})")
