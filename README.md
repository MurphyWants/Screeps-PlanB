I tried in another git repo to make a good screeps routine. This is my PlanB.

Tasks Needed:
  - Role Functions
    - Harvester
    - Patrol
  - Source Finder
    - Function for finding nearest source to go to
  - Source Queue

Pseudocode Done:
  - Spawner
  - Task Queues

Pseudocode:


Flag Usage:
- Orange Flags: Spawns Patrol Units at flag
- White Flags: Creeps harvesting at source
- Grey Flags: Creeps wait line at source

// Game.flags["Guard1"].pos.look()[1].type


Need to Plan For:
- If things get desynched
  - Flags + Patrol Units
- Room Searching
- Creep colors
