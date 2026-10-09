import re
js_path = r'f:\websites projects\Conch\js\main.js'
with open(js_path, 'r', encoding='utf-8') as f:
    js = f.read()

init_code = '''

document.addEventListener('DOMContentLoaded', () => {
    const wwContainer = document.getElementById('works-wheel-container');
    if (wwContainer && window.WorksWheel) {
        const galleryItems = [
            { title: "Entrance", image: "images/WhatsApp Image 2026-06-08 at 11.00.07 AM.jpeg" },
            { title: "Facade", image: "images/WhatsApp Image 2026-06-08 at 11.00.08 AM (1).jpeg" },
            { title: "Pool", image: "images/WhatsApp Image 2026-06-08 at 11.00.08 AM.jpeg" },
            { title: "Bedroom", image: "images/WhatsApp Image 2026-06-08 at 11.00.09 AM.jpeg" },
            { title: "Garden", image: "images/WhatsApp Image 2026-06-08 at 11.00.10 AM.jpeg" },
            { title: "Pool Area", image: "images/WhatsApp Image 2026-06-08 at 11.00.10 AM (2).jpeg" },
            { title: "Interior", image: "images/WhatsApp Image 2026-06-08 at 11.00.11 AM.jpeg" },
            { title: "Bathroom", image: "images/WhatsApp Image 2026-06-08 at 11.00.11 AM (1).jpeg" },
            { title: "Tropical Garden", image: "images/WhatsApp Image 2026-06-08 at 11.00.12 AM.jpeg" },
            { title: "Lounge", image: "images/WhatsApp Image 2026-06-08 at 11.00.12 AM (1).jpeg" },
            { title: "Evening", image: "images/WhatsApp Image 2026-06-08 at 11.00.12 AM (2).jpeg" },
            { title: "Detail", image: "images/WhatsApp Image 2026-06-08 at 11.00.12 AM (3).jpeg" }
        ];
        new WorksWheel(wwContainer, galleryItems);
    }
});
'''

if 'WorksWheel(wwContainer' not in js:
    with open(js_path, 'a', encoding='utf-8') as f:
        f.write(init_code)

print('Updated main.js')
