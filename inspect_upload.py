from PIL import Image
import numpy as np

img = Image.open(r"C:\Users\YUKESH G\.gemini\antigravity\brain\0273e5b4-493b-4729-8b37-0a2010935fec\.user_uploaded\media_1793767564604_232b23d5.png")
print("Size:", img.size)

# Crop top right where logo is
w, h = img.size
top_right = img.crop((w - 300, 0, w, 150))
top_right.save("login_top_right.png")
print("Saved login_top_right.png")
