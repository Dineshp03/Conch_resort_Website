import re
css_path = r'f:\websites projects\Conch\css\style.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

# Make hero full screen
css = re.sub(r'\.hero\s*\{[^}]*\}', '.hero { position: relative; min-height: 100vh; display: flex; align-items: center; }', css)
css = re.sub(r'\.hero-left\s*\{[^}]*\}', '.hero-left { position: relative; z-index: 2; width: 100%; max-width: 800px; padding: 0 5%; }', css)
css = re.sub(r'\.hero-right\s*\{[^}]*\}', '.hero-right { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 1; }', css)
css = re.sub(r'\.hero-right\s*img\s*\{[^}]*\}', '.hero-right img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }', css)
css = re.sub(r'\.hero-right::before\s*\{[^}]*\}', '.hero-right::before { content: \'\'; position: absolute; inset: 0; background: rgba(0,0,0,0.4); z-index: 1; }', css)

# Make text white
css += '\n.hero-title, .hero-subtitle, .hero-eyebrow, .hero-title .line2 { color: #fff !important; }'
css += '\n.hero-eyebrow svg { fill: #fff !important; }\n'

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)

print('Fixed Hero CSS')

