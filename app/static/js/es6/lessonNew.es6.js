///* global Quill */

'use strict';

$(function()
{
  // var editor = new Quill('#editor');
  // editor.addModule('toolbar', {container: '#toolbar'});

  var $form = $('form.lesson');
  var $button = $form.find('button');
  $button.click(submitNewLesson);

  function submitNewLesson(e)
  {
    $(this).closest('form').submit(function()
    {
      // var html = editor.getHTML();
      var html = $('#content-container iframe').contents().find('body > *:first-child').html();
      $('input[name=material]').val(html);
    });
  }
});