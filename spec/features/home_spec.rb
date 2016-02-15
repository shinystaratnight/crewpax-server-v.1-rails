require 'spec_helper'

feature '[Home]' do
  background do
    visit '/'
  end

  scenario 'User visits home page' do
    expect(page).to have_content 'Jobs'
    expect(page).to have_content 'People'
  end

  scenario 'User visits jobs page' do
    find('.jobs').click
    expect(page).to have_content 'Post Job'
    expect(page).to have_content 'Jobs'
  end

  scenario 'User visits people page' do
    find('.people').click
    expect(page).to have_content 'Create Profile'
    expect(page).to have_content 'People'
  end
end
