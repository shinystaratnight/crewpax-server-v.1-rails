require 'spec_helper'

feature '[Registration]' do
  scenario 'Guest creates profile successfully' do
    visit '/users'
    click_link 'Create Profile'

    fill_in 'Name', with: 'Meredith Garstin'
    attach_file 'user_image', Rails.root.join('spec/fixtures/meredith.jpg')
    fill_in 'Phone', with: '(604) 833-2265'
    fill_in 'Email', with: 'merre7@gmail.com'
    fill_in 'Password', with: 'password'
    fill_in 'Password confirmation', with: 'password'

    click_button 'Submit'

    expect(page).to have_content 'Welcome! You have signed up successfully.'
    expect(page).to have_content 'Meredith Garstin'
  end
end
