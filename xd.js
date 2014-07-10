var XboxController = require('xbox-controller');
var arDrone = require('ar-drone');

var controller = new XboxController;
var drone = arDrone.createClient();

var speed = 0.2;

controller.on('xboxbutton:press', function(key) {
  drone.disableEmergency();
});

controller.on('a:release', function(key) {
  drone.takeoff();
});

controller.on('b:press', function(key) {
  drone.land();
});

controller.on('x:press', function(key) {
  // Cancels ALL movement instructions
  drone.stop();
});

controller.on('y:press', function(key) {
  drone.animate('flipAhead', 1000);
});


controller.on('righttrigger', function(position) {
  drone.front(position/100);
});

controller.on('lefttrigger', function(position) {
  drone.back(position/100);
});


controller.on('left:move', function(position) {
  console.log(position);
  if(position.x < -100) {
    drone.left(speed);
  }
  if(position.x > 100) {
    drone.right(speed);
  }
});

controller.on('right:move', function(position) {
  console.log(position);
  if(position.y < -100) {
    drone.up(speed);
  }
  if(position.y > 100) {
    drone.down(speed);
  }
});

controller.on('leftshoulder:press', function(){
  // drone.counterClockwise(speed);
});

controller.on('rightshoulder:press', function(){
  // drone.clockwise(speed);
});