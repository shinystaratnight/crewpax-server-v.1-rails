$ ->
  $('.calendar a').on 'click', ->
    $(@).parent('.day').toggleClass 'unavailable'
