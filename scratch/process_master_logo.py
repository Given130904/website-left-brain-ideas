import os
from PIL import Image, ImageOps, ImageFilter

jpeg_path = r'C:\Users\62895\Downloads\logo left brain ideas.jpeg'
img = Image.open(jpeg_path).convert('RGB')
print(f"Loaded master image: {img.size}")

# Convert to grayscale to inspect background vs content
gray = ImageOps.grayscale(img)

# Threshold to separate black background from white logo
# In master JPEG, logo is white/light on black background
threshold = 40
bw = gray.point(lambda p: 255 if p > threshold else 0)

bbox = bw.getbbox()
print(f"Content bounding box in 4K master: {bbox}")

# Crop to bounding box with small margin
margin = 20
left = max(0, bbox[0] - margin)
top = max(0, bbox[1] - margin)
right = min(img.width, bbox[2] + margin)
bottom = min(img.height, bbox[3] + margin)

cropped_rgb = img.crop((left, top, right, bottom))
cropped_bw = bw.crop((left, top, right, bottom))

# Create ultra-sharp transparent PNG
# Use grayscale intensity as alpha channel for anti-aliased smooth edges
cropped_gray = gray.crop((left, top, right, bottom))
transparent_img = Image.new("RGBA", cropped_rgb.size, (255, 255, 255, 0))

# Paste white color using gray intensity as mask
white_plane = Image.new("RGBA", cropped_rgb.size, (255, 255, 255, 255))
transparent_img = Image.composite(white_plane, Image.new("RGBA", cropped_rgb.size, (0,0,0,0)), cropped_gray)

output_png_path = r'public\assets\images\logo-left-brain-ideas-white.png'
transparent_img.save(output_png_path, "PNG", optimize=True)
print(f"Saved crisp high-res PNG to {output_png_path} ({transparent_img.size})")

# Let's also build a React SVG component or standalone SVG file for 100% vector rendering!
# We can save a high-res cropped SVG or embed exact vector shapes.
