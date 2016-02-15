$ ->
  $('#job_category').on 'change', ->
    category_id = $(@).val()
    window.location.href = if category_id then "/categories/#{category_id}/jobs" else '/jobs'
