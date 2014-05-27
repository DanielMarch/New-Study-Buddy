function ajax(url, verb) {
  'use strict';
  var data = arguments[2] !== (void 0) ? arguments[2] : {};
  var success = arguments[3] !== (void 0) ? arguments[3] : (function(r) {
    return console.log(r);
  });
  var dataType = arguments[4] !== (void 0) ? arguments[4] : 'html';
  $.ajax({
    url: url,
    type: verb,
    success: success,
    data: data,
    dataType: dataType
  });
}
(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    getContents();
  }
  function getContents() {}
})();

//# sourceMappingURL=lesson-view.map
