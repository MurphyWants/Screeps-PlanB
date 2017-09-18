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
  }

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
   Spawn Queue:

   Creeps memory:
    Spawn, Home (Room), Role

    for each room
      check if number of patrol units is less then (number of orange flags in room)
        True
          var energy = (room.energy_availble * (2/3)) min of 300
          switch(true){ // For energy in
          case (energy < 301): spawn patrol w/ [TOUGH, TOUGH, MOVE, ATTACK, RANGED_ATTACK] // 300
        }
          end
        False
          check if number of harvester units is less than 6 ???
          true
            spawn harvester unit
            end
          false
            end
  */

  /*
  Get free space around source:

  getFreeSpace: function(src){
    var position = src.pos;
    var x_pos = -1;
    var y_pos = -1;
    var room_pos;
    while (x_pos < 2){
      var y_pos = -1;
      while (y_pos < 2){
        room_pos = new RoomPosition(position.x + x_pos, position.y + y_pos, src.room.name);
        console.log(room_pos.y);
        y_pos = y_pos + 1;
    }
    x_pos = x_pos + 1;
  }
}
  */
}
