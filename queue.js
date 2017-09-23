/*
Purpose:
    Instead of making specific roles, there is going to be one role (harvester)
    and queues that dictate what need to happen.

List of Queues:
    1) Tasks

    Harvester Tasks:                                         Task_Queues
      1) Fill Spawner                                               [0]
      2) Upgrade Controller                                         [1]
      3) Find extensions, towers that need energy and fill them     [2]
      4) Repair structures                                          [3]
      5) Build structures                                           [4]
      6) Destroy structures                                         [5]
      7) Nothing else to do? Upgrade Controller                     [6]


    Spawn:
      Create a spawn queue, pseudocode below


      Military Tasks: (not a queue, dynamic to defend base)
      1) Look for something to melee attack
      2) Look for something to ranged attack
      3) Look for something to heal
      4) Go wait at the flag


Functions Needed:
  Spawner
  Task
  Harvester Role
  Patrol Role

*/
module.exports {
  placer_function: function() {
    console.log("This is a placer function");
  },
  spawn_queue: function() {
    for (var i in Game.spawns) {
      if (Game.spawns[i] == null) { // For eachspawn point (mostly checking if each spawn point is busy)
        var spawn_room = Game.spawns[i].room;
        var count_patrol = _.sum(Game.creeps, (c) => c.room.name == spawn_room.name);
        var orange_flags = _.filter(Game.flags, (f) => ((f.room.name == spawn_room.name) && (f.color == 1)));
        var count_orange_flags = orange_flags.length;
        var energy = (spawn_room.energy_availble) * (2 / 3);
        var creep_body;

        for (var f in orange_flags) {
          if (orange_flags[f].memory.has_patrol == undefined)
            orange_flags[f].memory.has_patrol = false;
        }

        if ((count_patrol < count_orange_flags) && (energy > 300)) {
          orange_flags = _.filter(orange_flags, (f) => (f.memory.has_patrol == false)); // filter orange flags to ones without patrol creeps

          if ((orange_flags == undefined) || (orange_flags == null) || (orange_flags.length == 0)) // if the orange_flags is empty or null or undefined for some reason, return
            return -1;

          orange_flags = orange_flags[0];


          //spawn patrol
        }
      }
    }
    return 0;
  }
  /*
  Spawn Queue:

  Creeps memory:
  Spawn, Home (Room), Role, Mode [Haresting, Task], Current Task

  Creep Roles/num per room:
  Harvester = 6, Patrol Units = 1 per orange flag

  for each room
    check if number of patrol units is less then (number of orange flags in room)
    True
    if energy is at least 280
      spawn patrol unit
        Generate body parts
          energy = [floor(energy_availble / 280), (energy_availble % 280)]
          // each [MOVE, RANGED_ATTACK, ATTACK] == 280 energy, energy[0] = number of times we cna make a move, RANGED_ATTACK, ATTACK, energy[1] = number of tough parts
      end
    False
      check if number of harvester units is less than 6 ???
      true
      if energy is at least 200
        spawn harvester unit
          Generate body parts:
            energy = [floor(energy_availble / 200), (energy_availble % 200)]
            // each [WORK, CARRY, MOVE] == 200 energy, energy[0] = number of times we can make a work carry move, energy[1] = number of tough parts
      end
    false
  end
*/


  /*
  Task Queue:

  for each room
    if room.memory.task_queue is undefined
      room.memory.task_queue = []
      room.memory.task_queue[0] = []    // spawner
      room.memory.task_queue[1] = []    // controller
      room.memory.task_queue[2] = []    // Fill energy
      room.memory.task_queue[3] = []    // Repair
      room.memory.task_queue[4] = []    // Build
      room.memory.task_queue[5] = []    // Destroy
      room.memory.task_queue[6] = []    // Else, upgrade controller

    spawner = find spawner in room
      if (spawner.memory.queued == false) AND (spawner.energy < spawner.energy_availble)
        queue spawner to room.memory.task_queue[0]

    if room.controller.is_creep_task == False
      queue controller to room.memory.task_queue[1]

    fills = find any extensions, towers that need filling
      for each fill in fills
        queue fill to room.memory.task_queue[2]

    structs = filter to find all structs in the room that need repairing
      for each struct in structs
        queue struct to room.memory.task_queue[3]

    builds = find anything that needs building
      for each build in builds
        queue build to room.memory.task_queue[4]

    destroys = find anything that needs destroying (check by flag)
      for each destroy in destroys
        queue destroys to room.memory.task_queue[5]

    if room.memory.task_queue[6].length == 0
      reqneue task
  */






  /*
  Get free space around source:
  if source.memory.is_spaced == false
    Get pos of harvester
    x_pos, y_pos
    open_spaces = []
    source.memory.free_spaces = []
    check each position of x_y [x: + (-1), (0), (1)] [y: + (-1), (0), (1)]
      add to list if it is Terrain:[NOT WALL]
    for (var i in open_spaces)
      source.memory.free_spaces[i] = []
      source.memory.free_spaces[i]["x"] = open_spaces[i].x
      source.memory.free_spaces[i]["y"] = open_spaces[i].y
      source.memory.free_spaces[i]["is_used"] =  false

  if source.memory.is_spaced == true
    for (var i in source.memory.free_spaces)
      if source.memory.free_spaces[i]["is_used"] == true
        if creep is not at space
          source.memory.free_spaces[i]["is_used"] = false
  */
}
