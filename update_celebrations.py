import re

html_path = r'f:\websites projects\Conch\index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

def replacer(match):
    full = match.group(0)
    # Extract image, title, and description
    img_match = re.search(r'src="([^"]+)"', full)
    title_match = re.search(r'<h3>(.*?)</h3>', full)
    desc_match = re.search(r'<p>(.*?)</p>', full)
    
    if not img_match or not title_match or not desc_match:
        return full
        
    img_src = img_match.group(1)
    title = title_match.group(1)
    desc = desc_match.group(1)
    
    # Generate animated letters
    letters_html = ""
    delay = 0
    for char in title:
        if char == " ":
            letters_html += '<div class="ccc-letter-wrap" style="width: 0.3em;"></div>'
        else:
            letters_html += f'<div class="ccc-letter-wrap"><span class="ccc-letter-inner" style="transition-delay: {delay:.3f}s"><span>{char}</span><span>{char}</span></span></div>'
            delay += 0.035
            
    # New card structure
    return f'''<div class="ccc-card reveal">
        <div class="ccc-bg" style="background-image: url('{img_src}')"></div>
        <div class="ccc-content">
          <svg class="ccc-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="1em" height="1em"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          <div class="ccc-text-box">
            <h3>{letters_html}</h3>
            <p>{desc}</p>
          </div>
        </div>
      </div>'''

# Replace all celebration cards
html = re.sub(r'<div class="celebration-card[^>]*>.*?</div>\s*</div>', replacer, html, flags=re.DOTALL)

# Add cache buster
html = html.replace('css/style.css?v=5', 'css/style.css?v=6')

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("Updated HTML")
