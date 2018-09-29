"use strict"

/**
 * @description - make mouse events to
 * fire with their corresponding
 * touch events.
 * @function - onTouch
 */
// Source: https://developer.mozilla.org/en-US/docs/Web/API/Touch_events#Example
function onTouch(evt) {
  evt.preventDefault();
  if (evt.touches.length > 1 || (evt.type == "touchend" && evt.touches.length > 0))
    return;

  var newEvt = document.createEvent("MouseEvents");
  var type = null;
  var touch = null;

  switch (evt.type) {
    case "touchstart":
      type = "mousedown";
      touch = evt.changedTouches[0];
      break;
    case "touchmove":
      type = "mousemove";
      touch = evt.changedTouches[0];
      break;
    case "touchend":
      type = "mouseup";
      touch = evt.changedTouches[0];
      break;
  }

  newEvt.initMouseEvent(type, true, true, evt.originalTarget.ownerDocument.defaultView, 0,
    touch.screenX, touch.screenY, touch.clientX, touch.clientY,
    evt.ctrlKey, evt.altKey, evt.shiftKey, evt.metaKey, 0, null);
  evt.originalTarget.dispatchEvent(newEvt);
}

/**
 * @description - A generic swipe detecting function for up, down, right, and left
 * @function - swipedetect
 * @param {element, function} el,callback -The first parameter should be an element while the second parameter would be a callback function
 */
// Source: http://www.javascriptkit.com/javatutors/touchevents2.shtml
// function swipedetect(el, callback) {

//   var touchsurface = el,
//     swipedir,
//     startX,
//     startY,
//     distX,
//     distY,
//     threshold = 101, //required min distance traveled to be considered swipe
//     restraint = 83, // maximum distance allowed at the same time in perpendicular direction
//     allowedTime = 200, // maximum time allowed to travel that distance
//     elapsedTime,
//     startTime,
//     handleswipe = callback || function (swipedir) {}

//     // Listens for touch start
//   touchsurface.addEventListener('touchstart', function (e) {
//     var touchobj = e.changedTouches[0]
//     swipedir = 'none'
//     dist = 0
//     startX = touchobj.pageX
//     startY = touchobj.pageY
//     startTime = new Date().getTime() // record time when finger first makes contact with surface
//     e.preventDefault()
//   }, false)

//   // Prevent the touchmove event default to avoid page scrolling.
//   touchsurface.addEventListener('touchmove', function (e) {
//     e.preventDefault() // prevent scrolling when inside DIV
//   }, false)

//   // Listens for the touch end
//   touchsurface.addEventListener('touchend', function (e) {
//     var touchobj = e.changedTouches[0]
//     distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
//     distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
//     elapsedTime = new Date().getTime() - startTime // get time elapsed
//     if (elapsedTime <= allowedTime) { // first condition for awipe met
//       if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
//         swipedir = (distX < 0) ? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
//       } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
//         swipedir = (distY < 0) ? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
//       }
//     }
//     handleswipe(swipedir)
//     e.preventDefault()
//   }, false)
// }

//USAGE:
/*
var el = document.getElementById('someel')
swipedetect(el, function(swipedir){
  swipedir contains either "none", "left", "right", "top", or "down"
  if (swipedir =='left')
      alert('You just swiped left!')
})
*/

/**
 * @description - implementing the swipedetect function.
 * If the touch swipe is up - move the player up one block.
 * If the touch swipe us down - move the player down one block.
 * If it is right - move the player right one block.
 * Else if it is left - the player should move left one block.
 */
const body = document.getElementsByTagName('body')[0];
document.addEventListener('touchstart', player.swipedetect(body, function (swipedir) {
  // Call the onTouch() to make sure the mouse events and touch events are the same in functionality
  onTouchu();
  //swipedir contains either "none", "left", "right", "top", or "down"
  switch (swipedir) {
    case 'up':
      if (this.y > 0) {
        this.y -= this.moveVertical;
      }
      break;
    case 'down':
      if (this.y < this.moveVertical * 4) {
        this.y += this.moveVertical;
      }
      break;
    case 'left':
      if (this.x > 0) {
        this.x -= this.moveHorizontal;
      }
      break;
    case 'right':
      if (this.x < this.moveHorizontal * 4) {
        this.x += this.moveHorizontal;
      }
  }
}), false);