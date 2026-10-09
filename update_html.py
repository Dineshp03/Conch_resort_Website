import re
html_path = r'f:\websites projects\Conch\index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

new_gallery = '''<!-- ===================== GALLERY ===================== -->
  <section class="gallery-section" id="gallery" aria-labelledby="gallery-heading">
    <div id="works-wheel-container" class="works-wheel-container"></div>
  </section>

  <!-- Lightbox -->'''

html = re.sub(r'<!-- ===================== GALLERY ===================== -->.*?<!-- Lightbox -->', new_gallery, html, flags=re.DOTALL)

if 'js/works-wheel.js' not in html:
    html = html.replace('<script src="js/main.js"></script>', '<script src="js/works-wheel.js"></script>\n  <script src="js/main.js"></script>')

html = html.replace('css/style.css?v=4', 'css/style.css?v=5')

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print('Replaced gallery with Works Wheel')
