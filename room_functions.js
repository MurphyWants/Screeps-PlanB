module.exports = {
  get_source_free_spaces: function() {
    for (var r in Game.rooms) {
      var room = Game.room[r];
      var sources = room.find(FIND_SOURCES);
      for (s in sources) {
        var src = sources[s];
        if (src.memory.isFlagged == undefined) {
          src.memory.isFlagged = false;
        }
        if (!(src.memory.isFlagged)) {
          src.memory.isFlagged = true;
          var open_spaces = [];
          var x_pos = -1;
          var y_pos = -1;
          var position;
          var look;
          var isFree = true;
          var x_look, y_look;
          src.memory.free_spaces = [];
          while (x_pos < 2) {
            while (y_pos < 2) {
              isFree = true;
              x_look = src.pos.x + x_pos;
              y_look = src.pos.y + y_pos;
              position = new RoomPosition(x_look, y_look, src.room.name);
              look = position.look();
              for (var i in look) {
                switch (look[i].type) {
                  case "source":
                    isFree = false;
                    break;
                  case "terrain":
                    switch (look[i].terrain) {
                      case "wall":
                        isFree = false;
                        break;
                      default:
                        break;
                    }
                    break;
                  default:
                    break
                }
              }
              if (isFree) {
                open_spaces.push([x_look, y_look, src.room.name]);
              }
              y_pos += 1;
            }
            y_pos = -1;
            x_pos += 1;
          }
          src.memory.free_spaces = [];
          for (var o in open_spaces){
            var space = open_spaces[o];
            src.memory.free_spaces[o] = [space, false]; // space, isUSed
            position = new RoomPosition(space[0], space[1], space[2]);
            position.createFlag(space[2] + "." + space[0] + "." + space[1], COLOR_WHITE);
          }
        }
      }
    }
  }
}
