import re
html_path = r'f:\websites projects\Conch\index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

def add_size(match):
    tag = match.group(0)
    if 'width=' not in tag:
        tag = tag.replace('<svg', '<svg width="24" height="24"')
    return tag

html_fixed = re.sub(r'<svg[^>]*>', add_size, html)
with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html_fixed)
print('Done!')
