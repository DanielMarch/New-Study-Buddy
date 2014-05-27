/* jshint unused: false */

'use strict';

$(function()
{
  // var $form = $('form.lesson');
  // var $button = $form.find('button');
  // $button.click(submitNewLesson);

  var material = $('input[name=material]').val();
  $('#content-container iframe').contents().find('body #quill-2').html(material);

  var $form = $('form.lesson');
  var $button = $form.find('button');
  $button.click(submitNewLesson);

  function submitNewLesson(e)
  {
    $(this).closest('form').submit(function()
    {
      // var html = editor.getHTML();
      var html = $('#content-container iframe').contents().find('body > #quill-2').html();
      $('input[name=material]').val(html);
    });
  }
  // $('input[name=material]').val(html);
});