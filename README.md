# Little Red Dot

A React city-building learning prototype inspired by Singapore. Four timed rounds introduce local land-use constraints, imports, efficient production and long-term liveability. Future stage names stay hidden until unlocked.

## Run

With Node.js 20.19+ or 22.12+ installed:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. `npm run build` produces the static app in `dist/`. `npm test` checks the simulation and four-round progression.

A project-local Node runtime and npm were downloaded into ignored `.tools/` for this Windows workspace. If Node is not on PATH, use:

```powershell
.tools/node.exe .tools/package/bin/npm-cli.js install
.tools/node.exe node_modules/vite/bin/vite.js --host 127.0.0.1
```

## Experience

- Click or keyboard-select an empty hex, then choose infrastructure from the building palette. Costs are charged against the city budget. Undo is available within the current round.
- Start each round when ready. A 10-minute countdown uses an absolute deadline saved in localStorage, so refreshing or switching tabs does not reset it. Building and undo are disabled before the start, at checkpoints and when the timer expires. Timeout automatically opens the reflection.
- Hover over, keyboard-focus, or tap a developed plot to see its land type and **Undo this land type**. This clears only that plot during an active round and refunds its paid building cost. The map’s Undo control can restore a removed building. Saved checkpoints, the round timer and chats remain intact.
- Use **Reset map** in the map header to clear all 36 plots, and restore the total credits allocated through the current round. The current countdown, role, chat, imports and saved round snapshots remain intact. Reset is available before starting or during active planning; it can be undone with the map’s Undo control during the round.
- Explore the five essentials in City insights: housing, commercial services, essential goods, food and water. Imports are blocked in round one in both UI and simulation logic. In round two, students can enable food, water and essential-goods imports. Housing and commercial services remain local.
- Complete a multiple-choice reflection each round. Checkpoints save immutable city snapshots. A briefing explains the next round's feature and clears the map and restores the full building budget plus 65 additional credits per new round. Round two unlocks imports, round three increases farm/factory/catchment output by 50%, and round four adds 10 liveability points. The next timer starts only after the student dismisses the briefing.
- After the stage-one reflection, a blocking teacher-time modal asks students to listen for instructions and learning points. It has no close button, ignores Escape and backdrop clicks, and restores after a refresh. The next timer stays stopped. The “Continue when your teacher says to” button opens two navigable HTML slides about local food-production limits and food imports. Students can use Previous/Next buttons, slide indicators, or left/right arrow keys. Their slide position survives refreshes, and the timer remains paused. The last slide continues to the round-two briefing. This is a classroom instruction, not a teacher-authenticated lock.
- Review all four city iterations in My journey or the final report. Export the journal as JSON.
- State is stored in localStorage. No external database, authentication, API functions, or backend services are required. Fonts load from Google Fonts, with system fallbacks.

## Four-expert group demo

The group shares one city. Use the team setup form to enter four player names (up to 40 characters each) and choose a different role for every player. Each role can be assigned only once; all four names and roles are required when saving the team. Names and assignments persist with the city. Use Edit team to update the roster, and select a player card to switch the active expert in this local demo. Chat records each sender’s name at posting time, including the named simulated teammate. Round snapshots retain their roster. Select a role above the board: housing expert (housing capacity), food expert (food), water expert (water), or trade and industry expert (both commercial services and essential goods). Live cards show targets met or at risk. At a checkpoint, each role passes only when every essential in its expertise has zero unmet demand, after permitted imports. An expert with any shortfall fails that round; the learning journey continues. Results appear in the reflection, saved city snapshots, final report and exported journal. Round one still guarantees at least one expert fails because local-only essential requirements exceed available land.

Open **Expert chat** to choose one of four role rooms. Post as your selected expert in any room, use suggested questions, and receive clearly labelled scripted mock replies. Replies use the current city's shortfalls and round rules; they never enable imports in round one. Each room has its own history. Messages and selected role are saved with the city in browser localStorage. Enter sends, Shift+Enter adds a line; keyboard arrows switch room tabs. Chat stays available before, during and after a round, so students can keep coordinating even when the building timer has expired. Blocking teacher and lesson modals still take priority. Starting a fresh city clears its chat history.

This proof of concept simulates four participants by switching roles in one browser. It does not connect separate devices or provide real multiplayer, authentication, a database or streaming. Chat history is limited to 100 messages per room and each message to 500 characters.

## Ten-group local classroom

Use the **Switch group** selector to choose Group 01–10. Student URLs are `?group=1` through `?group=10`. Each group has a separate localStorage record for its map, credits, timer, player names, roles, chats and round history. Open each group's workspace in a separate tab to simulate simultaneous work. Reset map and New city affect only the selected group. The earlier single-group save is read as Group 01 when no dedicated Group 01 save exists; it is preserved unchanged.

**Teacher’s View** opens `?view=teacher` with a ten-group overview: phase, round, countdown, completed-round progress, plot count, expert targets met and team names. Select any group to inspect its city, essential resource balance, named expert outcomes, filtered conversations and saved reflections. **Open selected group** launches that group's student tab. The teacher view is read-only and never writes student state or advances timers.

The overview listens for storage events across all ten records and rereads on focus or visibility changes. Countdowns use each group's independent saved deadline. This is a local proof of concept: group and teacher tabs must share the same browser profile and origin. Separate student devices are not connected, and there is no teacher authentication or shared database.

## Learning model

This is illustrative classroom data, not a factual simulation of Singapore. The eight land types are HDB neighbourhood, Commercial building, Factory, Shopping Centre, Sports & Recreational Hub, Nature Reserve, Farm and Water Catchment. HDBs, commercial buildings, factories, farms and water catchments are marked essential. Shopping, recreation and reserves raise liveability.

Each essential starts with 600 units of demand, increasing by 120 per round. Per-plot output is 180 housing, 120 commercial services, 100 essential goods, 30 food or 40 water. Each essential has one dedicated land type. Consequently, meeting every round-one need requires at least **4 + 5 + 6 + 20 + 15 = 50 plots**, while the island has only **36**. This proves every possible local-only allocation must fall short, even with unlimited budget or planning time. Starting credits are 600, enough to develop every tile even at the most expensive per-plot cost, so budget is not the cause of the unavoidable shortfall. Tests enforce this guarantee.

The first-round debrief explains the deliberately constrained scenario and reassures students that the shortfall is not a personal failure. It connects the experience to Singapore's dependence on international supply while recognising that local production and diversified sources improve resilience. See [SFA’s Singapore Food Statistics 2025](https://www.sfa.gov.sg/news-publications/newsroom/singapore-food-statistics-2025) and [PUB’s Singapore Water Story](https://www.pub.gov.sg/Public/WaterLoop/OurWaterStory).

Coverage uses the actual supply-to-demand ratio, floored and capped at 100%, so a remaining shortfall cannot display as 100%. Local resilience averages the five local essential coverage percentages and liveability. Imports fill unmet demand without changing local coverage or the resilience score. The five resource cards show combined local and imported coverage separately. Liveability starts at 35 and increases through shopping centres, sports hubs and reserves.

Progress is saved under `little-red-dot-v2-group-1` through `little-red-dot-v2-group-10`. Earlier prototype saves remain untouched under their original key; the revised scenario starts fresh. No external database or server functions are used. The map has 36 plots, all empty at the start of every round. It is a stylised Singapore-inspired outline, not a geographic boundary dataset.

## Design research

- [Nourish Change — Awwwards Site of the Day, 15 February 2021](https://www.awwwards.com/sites/nourish-change): illustrative interaction and a step-by-step sustainability learning experience.
- [Ecovise — Behance](https://www.behance.net/gallery/243375697/Ecovise-Sustainability-ESG-Web-App-UIUX-Design/modules/1404517609): sustainability metrics and dashboard hierarchy. The indexed project module was accessible; the main project page returned 403.
- [City builder designs — Dribbble](https://dribbble.com/search/city-builder): playful building assets and city-builder visual language.

Only the Awwwards reference above has a verified award in this research. The other references are design inspiration, not claimed award winners. All map, buildings and icons in this prototype are original SVG/CSS, without copied third-party artwork.

Every round starts with all 36 plots cleared. Building credits are restored to 600 plus 65 per subsequent round (665, 730, 795); completed maps remain in the journal and final report. Refreshing an active round keeps its current map and timer.

After the Round 2 reflection, a paused water-security lesson shows the Straits Times video and September 2019 Linggiu Reservoir case study. Continue to the Round 3 briefing when ready. The lesson restores after refreshing and the next timer stays stopped.

After the Round 3 reflection, students watch the learning video and discuss one idea before continuing to the Round 4 briefing. This paused lesson restores after a refresh, and Round 4 starts only after students continue and press Start round 4.

The pre-Round-4 video lesson also includes smart-farm examples from the Straits Times feature on Singapore Aquaculture Technologies and Green Harvest, with supporting farm/SFA sources and a discussion connecting efficient production to land use and liveability.

Teaching slides, reflection feedback and scripted Expert Chat replies follow the supplied food-and-water insecurity notes. See [curriculum alignment](docs/curriculum-alignment.md) for the topic mapping, historical policy context and verified corrections.

Register or edit team names and roles in Round 1 only. The saved team carries into Rounds 2-4, where students use the same player cards to select their expert without repeating registration.
