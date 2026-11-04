from PIL import Image
import numpy as np

img = Image.open("login_top_right.png").convert("RGB")
arr = np.array(img)
# look at dark or colored pixels (not background ~230-255)
non_bg = arr[np.mean(arr, axis=2) < 200]
print(f"Non-bg pixels: {len(non_bg)}")
unique, counts = np.unique(non_bg, axis=0, return_counts=True)
sorted_idx = np.argsort(-counts)
for i in sorted_idx[:10]:
    r, g, b = unique[i]
    print(f"  RGB({r}, {g}, {b}) / #{r:02x}{g:02x}{b:02x} : {counts[i]}")
