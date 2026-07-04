with open("components/AnimatedCharacters.tsx", "r") as f:
    content = f.read()

content = content.replace('.gif"', '.gif?v=2"')
# Add Okarun if missing
if 'name: "Okarun"' not in content:
    content = content.replace(
        '{ id: 8, name: "Kakashi", type: "img", url: "/assets/anime/kakashi.gif?v=2", color: "#64748b", scale: 1.5, funAnim: "walk" }',
        '{ id: 8, name: "Kakashi", type: "img", url: "/assets/anime/kakashi.gif?v=2", color: "#64748b", scale: 1.5, funAnim: "walk" },\n  { id: 9, name: "Okarun", type: "img", url: "/assets/anime/okarun.gif?v=2", color: "#10b981", scale: 1.5, funAnim: "zoom" }'
    )

with open("components/AnimatedCharacters.tsx", "w") as f:
    f.write(content)
