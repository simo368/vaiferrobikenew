import os
import glob

# The SVG logo to inject
svg_logo = '''<span class="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="14" cy="44" r="10" class="wheel-spin"/>
          <circle cx="50" cy="44" r="10" class="wheel-spin"/>
          <path d="M14 44L26 22h12l12 22M26 22l6 22M38 22l-8 22"/>
          <path d="M34 14h10M44 14l-6 8"/>
        </svg>
      </span>'''

svg_footer_logo = '''<span class="brand-mark" style="width:32px;height:32px" aria-hidden="true">
          <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="14" cy="44" r="10" class="wheel-spin"/>
            <circle cx="50" cy="44" r="10" class="wheel-spin"/>
            <path d="M14 44L26 22h12l12 22M26 22l6 22M38 22l-8 22"/>
            <path d="M34 14h10M44 14l-6 8"/>
          </svg>
        </span>'''

svg_mobile_logo = '''<span class="brand-mark" style="width:34px;height:34px" aria-hidden="true">
          <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="14" cy="44" r="10" class="wheel-spin"/>
            <circle cx="50" cy="44" r="10" class="wheel-spin"/>
            <path d="M14 44L26 22h12l12 22M26 22l6 22M38 22l-8 22"/>
            <path d="M34 14h10M44 14l-6 8"/>
          </svg>
        </span>'''

import re

for filepath in glob.glob("*.html"):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Restore header logo
    content = re.sub(
        r'<span class="brand-mark" aria-hidden="true"><img src="img/logo-bici\.jpg".*?</span>',
        svg_logo,
        content,
        flags=re.DOTALL
    )
    
    # Restore big bike hero inline styles to use CSS transform-box instead
    content = content.replace('style="transform-origin:212px 356px"', '')
    content = content.replace('style="transform-origin:686px 356px"', '')

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print("Fatto!")
