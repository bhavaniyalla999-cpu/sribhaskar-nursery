import os

outdoor_file = 'c:/Users/Admin/Desktop/Sri Bhaskar/outdoor.html'
indoor_file = 'c:/Users/Admin/Desktop/Sri Bhaskar/indoor.html'

with open(outdoor_file, 'r', encoding='utf-8') as f:
    outdoor_content = f.read()

header_end_idx = outdoor_content.find('<header class="section"')
if header_end_idx != -1:
    top_html = outdoor_content[:header_end_idx]
else:
    raise Exception("Could not find header in outdoor.html")

# Replace Outdoor specific meta tags
top_html = top_html.replace(
    '<title>Outdoor Plants | Sri Bhaskar Nursery</title>', 
    '<title>Indoor Plants | Sri Bhaskar Nursery</title>'
)
top_html = top_html.replace(
    '<meta name="description" content="Premium outdoor plants for villas, resorts, and estates. Sri Bhaskar Nursery provides healthy palms, flowering plants, and ornamental trees.">',
    '<meta name="description" content="Premium indoor plants for your home and office. Sri Bhaskar Nursery provides healthy, low-maintenance indoor greenery.">'
)

indoor_header = """<header class="section" style="background: var(--primary); color: var(--white); text-align: center; padding: 120px 20px 80px;">
        <div class="container">
            <h1 style="font-size: 3.5rem; margin-bottom: 20px;">Indoor <span>Plants</span></h1>
            <p style="font-size: 1.2rem; max-width: 700px; margin: 0 auto; opacity: 0.9;">Bring nature inside your home. Discover our collection of low-maintenance, air-purifying indoor plants perfect for any space. These beautiful plants not only enhance your home's aesthetics but also improve air quality, reduce stress, and create a calming, natural environment inside your living room or office.</p>
        </div>
    </header>

    <!-- Indoor Plants Collection -->
    <section class="section" id="varieties">
        <div class="container">
            <div class="plant-grid">
"""

with open(indoor_file, 'r', encoding='utf-8') as f:
    indoor_content = f.read()

# Find where the remaining cards actually start. We look for the first plant-card div.
cards_start_idx = indoor_content.find('<div class="plant-card"')

if cards_start_idx != -1:
    remaining_content = indoor_content[cards_start_idx:]
else:
    # If there are no cards left, maybe just keep the rest?
    remaining_content = "</div></div></section>\n" + indoor_content[indoor_content.find('<section class="section" id="inventory"'):]

final_content = top_html + indoor_header + "                " + remaining_content

with open(indoor_file, 'w', encoding='utf-8') as f:
    f.write(final_content)

print("Restored indoor.html")
