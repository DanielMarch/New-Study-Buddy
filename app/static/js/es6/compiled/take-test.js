(function() {
  'use strict';
  $(document).ready(init);
  var timer;
  function init() {
    timer = 60 * $('.time-limit-container-test').data('timer');
    setInterval(tickClock, 1000);
  }
  function tickClock() {
    timer--;
    if (timer < 0) {
      $('#test').submit();
    } else {
      var timerDisplay = Math.floor(timer / 60) + ':' + (timer % 60);
      $('.time-limit-container-test').text(timerDisplay);
    }
  }
})();

//# sourceMappingURL=take-test.map
