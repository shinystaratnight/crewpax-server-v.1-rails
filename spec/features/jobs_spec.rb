require 'spec_helper'

feature '[Jobs]' do
  scenario 'Guest creates job successfully' do
    visit '/jobs'
    click_link 'Post Job'

    fill_in 'Name', with: 'Taxi Driver'
    select 'Transport', from: 'Category'
    fill_in 'Description', with: 'Reckless driver wanted.'
    fill_in 'Company name', with: 'Lionsgate films'
    fill_in 'Starts on', with: Date.current
    fill_in 'Ends on', with: Date.current + 2.days
    fill_in 'Location', with: 'Downtown, Vancouver, BC'
    fill_in 'Contact name', with: 'Meredith Garstin'
    fill_in 'Contact phone', with: '(604) 833-2265'
    fill_in 'Contact email', with: 'merre7@gmail.com'

    click_button 'Submit'

    expect(page).to have_content 'Confirmation email has been sent.'
    expect(page).not_to have_content 'Taxi Driver'

    open_email 'merre7@gmail.com'

    expect(current_email.subject).to eq 'EDIT/DELETE: "Taxi Driver" (Transport)'

    job = Job.last
    current_email.click_link secret_job_path(job, job.secret)

    expect(page).to have_content 'Job has been published.'
    expect(page).to have_content 'Taxi Driver'
  end
end
