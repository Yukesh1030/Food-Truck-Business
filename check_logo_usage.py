import glob
import re

files = glob.glob("*.html") + glob.glob("css/*.css")
for f in files:
    with open(f, "r", encoding="utf-8") as fp:
        c = fp.read()
    if "Brand-logo.webp" in c:
        for line in c.splitlines():
            if "Brand-logo.webp" in line:
                print(f"{f}: {line.strip()[:100]}")
