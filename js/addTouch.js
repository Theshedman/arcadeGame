/**
 * @description - Handle the touch-screen enable devices.
 *  Allow swipes (up, down, right, left
 */
// Source: https://www.kirupa.com/html5/detecting_touch_swipe_gestures.htm
document.addEventListener("touchstart", startTouch, false);
document.addEventListener("touchmove", moveTouch, false);

// Swipe Up / Down / Left / Right
var initialX = null;
var initialY = null;

function startTouch(e) {
  initialX = e.touches[0].clientX;
  initialY = e.touches[0].clientY;
};

function moveTouch(e) {
  e.preventDefault();
  if (initialX === null) {
    return;
  }

  if (initialY === null) {
    return;
  }

  var currentX = e.touches[0].clientX;
  var currentY = e.touches[0].clientY;

  var diffX = initialX - currentX;
  var diffY = initialY - currentY;

  if (Math.abs(diffX) > Math.abs(diffY)) {
    // sliding horizontally
    if (diffX > 0) {
      // swiped left
      player.moveHorizontal;
    } else {
      // swiped right
      player.x += player.moveHorizontal;
    }
  } else {
    // sliding vertically
    if (diffY > 0) {
      // swiped up
      player.y -= player.moveVertical;
    } else {
      // swiped down
      player.y += player.moveVertical;
    }
  }

  initialX = null;
  initialY = null;
};