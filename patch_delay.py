with open('components/AnimatedCharacters.tsx', 'r') as f:
    content = f.read()

content = content.replace('const delay = Math.random() * 20;', 'const delay = Math.random() * 5;')

with open('components/AnimatedCharacters.tsx', 'w') as f:
    f.write(content)
