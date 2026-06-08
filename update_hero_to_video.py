import re

filepath = r'c:\Users\Admin\Desktop\Sri Bhaskar\index.html'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the hero section opening tag
# Old: <section class="hero" id="home" style="background-image: url('hero-bg-real.jpg'); background-size: cover; background-position: center; height: 80vh; display: flex; align-items: center; position: relative;">
# New: <section class="hero" id="home" style="height: 80vh; display: flex; align-items: center; position: relative;">
content = re.sub(
    r'<section class="hero" id="home" style="background-image: url\(\'hero-bg-real.jpg\'\); background-size: cover; background-position: center; height: 80vh; display: flex; align-items: center; position: relative;">',
    '<section class="hero" id="home" style="height: 80vh; display: flex; align-items: center; position: relative;">',
    content
)

# Remove the plants container completely
plants_pattern = r'<!-- Animated Floating Plants \(High-Quality PNGs\) -->\s*<div class="plants-container">.*?</div>\s*'
content = re.sub(plants_pattern, '', content, flags=re.DOTALL)

# Add the video tag right after the dark overlay
# Overlay is: <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); pointer-events: none; z-index: 1;"></div>
video_tag = """
        <!-- Video Background -->
        <video class="hero-video" autoplay loop muted playsinline poster="hero-poster.jpg">
            <source src="hero-video.mp4" type="video/mp4">
        </video>
"""
content = content.replace(
    '<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); pointer-events: none; z-index: 1;"></div>',
    video_tag + '        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); pointer-events: none; z-index: 1;"></div>'
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("index.html updated for video hero.")
