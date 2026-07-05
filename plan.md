1. *Extract Project Content & Update `Projects.tsx`*
   - Read the `.md` files in the `project overview` directory to gather detailed information (extended descriptions, architecture details, deliverables) for the user's projects.
   - Update `components/Projects.tsx` with this new extended content.
   - Modify the UI of the project modal to include an image placeholder for the architectural graph (linking to `assets/architectural_graph.png` or an external URL if found in the MD files).
   - Change the "Live Demo" button text to "Live Demo Link".
2. *Overhaul Shinobi Run (`AnimeMiniGame.tsx`)*
   - Update the background to a "Hidden Leaf Village" (Konoha) anime-style background.
   - Replace the blue circle obstacles with shuriken/kunai sprites.
   - Ensure the player character is explicitly set to Naruto and fix the platforming physics for smoother jumping and movement.
3. *Overhaul Racing Game*
   - Locate the racing game component.
   - Replace the player's "box car" with an F1 car sprite.
   - Add F1 thematic elements (like a track background or appropriate colors).
4. *Verify & Pre-commit checks*
   - Ensure proper testing, verification, review, and reflection are done by running required linting and build checks.
5. *Submit Changes*
   - Submit the updated code with an appropriate commit message.
