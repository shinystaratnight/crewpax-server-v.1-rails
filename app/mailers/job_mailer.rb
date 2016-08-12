class JobMailer < ActionMailer::Base
  layout 'email'

  def confirmation(job)
    @job = job
    mail to: @job.contact_email, subject: "EDIT/DELETE: \"#{@job.name}\" (#{@job.role.name})"
  end
end
