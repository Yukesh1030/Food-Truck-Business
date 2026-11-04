from PIL import Image
import numpy as np

img = Image.open("assets/Brand-logo.webp")
print(f"Format: {img.format}, Size: {img.size}, Mode: {img.mode}")

# Inspect colors in the image
if img.mode != "RGBA":
    img = img.convert("RGBA")

data = np.array(img)
# Alpha channel check
alpha = data[:, :, 3]
print(f"Alpha min: {alpha.min()}, max: {alpha.max()}")
non_transparent = data[alpha > 20]
print(f"Non-transparent pixels count: {len(non_transparent)}")

# Find unique or dominant non-transparent colors
unique_colors, counts = np.unique(non_transparent[:, :3], axis=0, return_counts=True)
sorted_indices = np.argsort(-counts)
print("Top 10 dominant colors (RGB, count):")
for i in sorted_indices[:10]:
    r, g, b = unique_colors[i]
    print(f"  RGB({r}, {g}, {b}) / #{r:02x}{g:02x}{b:02x} : {counts[i]}")
