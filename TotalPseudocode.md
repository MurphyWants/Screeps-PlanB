- Main
  - Creep Spawner
    - For each spawner
      - If number of patrol units is less than number of orange flags in room, spawn patrol unit
        - **Expand**
      - If harvester unit is less than 6, spawn harvester
        - **Expand**
  - Enqueue Tasks
    - **Expand**
    - If anything needs building, add it to build queue
    - If anything needs repairing, add it to repair queue
    - If anything needs energy, add it to energy queue
  - For each creep; by role
    - Patrol unit
      - Switch (true)
        - Enemy in room? Mode = attack
        - Creep needs healing? Mode = heal
        - Else: Mode = wait
      - Switch(Mode)
        - attack:
          - If something in in range of melee attack: Melee attack
          - If something is in range of ranged attack: Range attack
          - Else: move towards enemy
        - heal
          - If something is in range of healing: heal
          - Else move towards it
        - wait
          - Go sit at flag
    - Harvester
      - if energy == 0, mode = harvest
      - Switch (mode)
       - harvest
        - harvest till full
       - get_task
        - Check room.memory.task_queue[0] <== Fill the spawner
        - Check room.memory.task_queue[1] <== Upgrade the controller
        - Check room.memory.task_queue[2] <== Fill extensions, towers
        - Check room.memory.task_queue[3] <== Repair structures
        - Check room.memory.task_queue[4] <== Build structures
        - Check room.memory.task_queue[5] <== Destroy structures
        - Check room.memory.task_queue[6] <== Nothing else to do? Upgrade controller
       - do_task
        - switch(task)
          - fill spawner: Transfer Energy to Spawner until spawner is full
          - Upgrade controller: Transfer Energy to controller until creep is dead
          - Fill extensions, tower: Fill structure until full of energy
          - Repair structures: repair structure to max or limit (Ex: Wall max is 3 million, might stagger it up and up)
          - Build structure: Go build the structure until it is built
          - Destroy structure: Destroy the structure until it is destroyed
          - Upgrade the controller until some other task pops up
  - Every 10(?) ticks
    - Build roads from each relevant structure (spawn, controller, source)
      - For Each Room
        - For Each container, controller, extension, extractor, lab, link, nuker, observer, powerbank, powerspawn, portal, rampart, wall, spawn, storage, terminal, tower
          - If structure.memory.roadBuilt equals false or undefined
            - Find path to each spawner, controller, source. For each coord: use Helper_Make_Road
            - set structure.memory.roadBuilt to true


- Helper Functions
  - Helper_Make_Road (array, room)
    - Given Object array http://docs.screeps.com/api/#RoomPosition.findPathTo
          [
            { x: 10, y: 5, dx: 1,  dy: 0, direction: RIGHT },
            { x: 10, y: 6, dx: 0,  dy: 1, direction: BOTTOM },
            { x: 9,  y: 7, dx: -1, dy: 1, direction: BOTTOM_LEFT },
            ...
          ]
    - const Pos = new RoomPosition(Object.x, Object.y, roomname)
    - Pos.lookfor(road) or lookfor(construction_site for road), if found, end, else make construction for road
