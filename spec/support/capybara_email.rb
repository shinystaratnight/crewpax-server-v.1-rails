require 'capybara/email/rspec'

RSpec.configure do |config|
  config.before do |example|
    clear_emails
  end
end
