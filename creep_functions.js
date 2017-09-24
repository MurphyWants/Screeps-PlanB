module.exports = {
  Creep.prototype.move_prototpe = function(target) {
    var length = this.pos.findPathTo(target).length;
    var color;
    var opa;
    if (this.memory.path_color != undefined) {
      color = this.memory.path_color;
      opa = .5;
    } else {
      color = '#000000';
      opa = .25;
    }
    this.moveTo(target, {
      reusePath: length,
      visualizePathStyle: {
        stroke: color,
        opacity: opa;
      }
    })
  }
}
