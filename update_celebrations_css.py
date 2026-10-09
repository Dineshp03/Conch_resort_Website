import os

css_path = r'f:\websites projects\Conch\css\style.css'

css_content = '''
/* ============================================================
   COLOR CHANGE CARDS (CELEBRATIONS)
   ============================================================ */
.ccc-card {
  position: relative;
  height: 22rem;
  width: 100%;
  cursor: pointer;
  overflow: hidden;
  background-color: #cbd5e1;
  border-radius: var(--radius-lg);
}
.ccc-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: all 0.5s ease;
  filter: saturate(100%);
}
@media (min-width: 768px) {
  .ccc-bg { filter: saturate(0%); }
  .ccc-card:hover .ccc-bg { filter: saturate(100%); transform: scale(1.1); }
}
@media (max-width: 767px) {
  .ccc-card:hover .ccc-bg { transform: scale(1.1); }
}
.ccc-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%);
}
.ccc-content {
  position: relative;
  z-index: 20;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  color: #cbd5e1;
  transition: color 0.5s ease;
}
.ccc-card:hover .ccc-content {
  color: #ffffff;
}
.ccc-arrow {
  margin-left: auto;
  font-size: 2rem;
  width: 32px;
  height: 32px;
  transition: transform 0.5s ease;
}
.ccc-card:hover .ccc-arrow {
  transform: rotate(-45deg);
}
.ccc-text-box h3 {
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  margin-bottom: 0.5rem;
  font-family: var(--font-display);
  font-size: 1.6rem;
  color: inherit;
}
.ccc-letter-wrap {
  display: inline-block;
  height: 32px;
  overflow: hidden;
  line-height: 32px;
}
.ccc-letter-inner {
  display: flex;
  flex-direction: column;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.ccc-card:hover .ccc-letter-inner {
  transform: translateY(-50%);
}
.ccc-text-box p {
  font-size: 0.95rem;
  opacity: 0.9;
  line-height: 1.4;
  color: inherit;
}
'''

with open(css_path, 'a', encoding='utf-8') as f:
    f.write(css_content)

print("Appended CSS")
