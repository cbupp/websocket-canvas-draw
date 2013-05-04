// Generated by CoffeeScript 1.6.2
(function() {
  var App;

  App = {};

  /*
  	Init
  */


  App.init = function() {
    App.canvas = document.createElement('canvas');
    App.canvas.height = 400;
    App.canvas.width = 800;
    document.getElementsByTagName('article')[0].appendChild(App.canvas);
    App.ctx = App.canvas.getContext("2d");
    App.ctx.fillStyle = "solid";
    App.ctx.strokeStyle = "#ECD018";
    App.ctx.lineWidth = 5;
    App.ctx.lineCap = "round";
    App.socket = io.connect('http://bupp.no-ip.org:4000');
    App.socket.on('draw', function(data) {
      return App.draw(data.x, data.y, data.type);
    });
    App.draw = function(x, y, type) {
      if (type === "dragstart" || type === "touchstart") {
        App.ctx.beginPath();
        return App.ctx.moveTo(x, y);
      } else if (type === "drag" || type === "touchmove") {
        App.ctx.lineTo(x, y);
        return App.ctx.stroke();
      } else {
        return App.ctx.closePath();
      }
    };
  };

  /*
  	Draw Events
  */


  $('canvas').live('drag dragstart dragend touchstart touchend touchmove', function(e) {
    var offset, type, x, y;

    type = e.type;
    offset = $(this).offset();
    e.preventDefault();
    e.offsetX = e.layerX;
    e.offsetY = e.layerY;
    x = e.offsetX;
    y = e.offsetY;
    App.draw(x, y, type);
    App.socket.emit('drawClick', {
      x: x,
      y: y,
      type: type
    });
  });

  $(function() {
    return App.init();
  });

}).call(this);
