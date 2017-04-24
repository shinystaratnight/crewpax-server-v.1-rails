class JobMailer < ActionMailer::Base
  #layout 'email'
  default from: 'crewcall@bcpax.com' # "bcpax.developer@gmail.com"
  layout 'mailer'

  def confirmation(job)
    @job = job
    mail to: @job.contact_email, subject: "EDIT/DELETE: \"#{@job.name}\" (#{@job.role.name})"
  end

  # notify users of the job posting based on their notification settings
  def notification(job, email)
    @job = job
    #@hostname = root_url
    @bodystring = "#{@job.name}\n\nLocation: #{@job.location}\n\nDescription: #{@job.description}\n\nStarts on: #{@job.starts_on}\n\nLink: #{root_url}/jobs/#{@job.id}"
    mail to: email, subject: "New #{@job.role.name} Job Posted To Crewcall", body: @bodystring
  end

end
