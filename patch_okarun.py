import re

with open('components/AnimatedCharacters.tsx', 'r') as f:
    content = f.read()

# Comment out okarun
content = re.sub(r'(\{\s*id:\s*9,\s*name:\s*"Okarun")', r'// \1', content)

with open('components/AnimatedCharacters.tsx', 'w') as f:
    f.write(content)
