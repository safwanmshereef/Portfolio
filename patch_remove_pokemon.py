import re

with open("components/AnimatedCharacters.tsx", "r") as f:
    content = f.read()

# We want to comment out or remove the pokemon
content = re.sub(r'(\{\s*id:\s*[1-4],\s*name:\s*"(Pikachu|Charizard|Blastoise|Venusaur)".*?\n)', r'// \1', content)

with open("components/AnimatedCharacters.tsx", "w") as f:
    f.write(content)
