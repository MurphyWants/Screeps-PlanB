/*
Purpose:
    Instead of making specific roles, there is going to be one role (harvester)
    and queues that dictate what need to happen.

List of Queues:
    1) Tasks
    2) Spawn
    3) Military

    Tasks:
      1) Fill Spawner
      2) Upgrade Controller
      3) Find extensions, towers that need energy and fill them
      4) Repair structures
      5) Build structures
      6) Destroy structures

    Spawn:
      Create a spawn queue, not sure how yet

    Military:
      To be worked out later

*/
module.exports {
  placer_function: function() {
    console.log("This is a placer function");
  }

  /*
   Spawn Queue
    for each room
      check if memory.room.isSpawning is true
        True:
          check if the spawner is spawning
            True
              End
            False
              Set memory.room.isSpawning to False
              end
        False:
          check if number of patrol units is less then $(room level)????
            True
              spawn patrol unit
              set memory.room.isSpawning to True
              set memory.room.SpawnTime to spawner.spawning("remainingTime") + Game.time - 1
              end
            False
              check if number of harvester units is less than 6 ???
              true
                spawn harvester unit
                set memory.room.isSpawning to True
                set memory.room.SpawnTime to spawner.spawning("remainingTime") + Game.time - 1
                end
              false
                end
  */
}
