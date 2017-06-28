/* global $ */

// admin user tools
$(function () {
  var _csrf = $('[name=_csrf]').val()

  // auto-size the record content
  var textarea = $('.record-content textarea')
  textarea.height(textarea[0].scrollHeight)

  // save
  $('#save-btn').on('click', function () {
    try {
      var data = JSON.parse(textarea.val())
      data._csrf = _csrf
    } catch (e) {
      return onError({resonseJSON: e.toString()}, 0, 'Error parsing JSON')
    }
    
    $('#error-general').text('')
    $.ajax(location.pathname, {method: 'post', contentType: 'application/json; charset=utf-8', dataType: 'json', data: JSON.stringify(data)})
      .done(onUpdate)
      .fail(onError)
  })

  // suspend
  $('#suspend-btn').on('click', function () {
    var data = {reason: prompt('Reason?'), _csrf}
    if (!data.reason) return
    data = JSON.stringify(data)
    $('#error-general').text('')
    $.ajax(location.pathname + '/suspend', {method: 'post', contentType: 'application/json; charset=utf-8', data})
      .done(onUpdate)
      .fail(onError)
  })

  // unsuspend
  $('#unsuspend-btn').on('click', function () {
    if (!confirm('Unsuspend?')) return
    $('#error-general').text('')
    $.ajax(location.pathname + '/unsuspend', {method: 'post', contentType: 'application/json; charset=utf-8', data: JSON.stringify({_csrf})})
      .done(onUpdate)
      .fail(onError)
  })

  // resend confirmation email
  $('#resend-email-confirmation-btn').on('click', function () {
    if (!confirm('Resend confirmation email?')) return
    $('#error-general').text('')
    $.ajax(location.pathname + '/resend-email-confirmation', {method: 'post', contentType: 'application/json; charset=utf-8', data: JSON.stringify({_csrf})})
      .done(onUpdate)
      .fail(onError)
  })
})

function onUpdate () {
  location.reload()
}

function onError (jqXHR, _, err) {
  $('#error-general').text(err + ' ' + JSON.stringify(jqXHR.responseJSON))
}