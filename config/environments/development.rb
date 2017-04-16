Bcpax::Application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # In the development environment your application's code is reloaded on
  # every request. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  # Do not eager load code on boot.
  config.eager_load = false

  # Show full error reports and disable caching.
  config.consider_all_requests_local       = true
  config.action_controller.perform_caching = false
  # Perform page caching in development environment, and default to be false

  #development mode action mailer extra settings
  config.action_mailer.perform_deliveries = true
  config.action_mailer.raise_delivery_errors = true
  LAUNCHY_DEBUG=true

  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  # Raise an error on page load if there are pending migrations
  config.active_record.migration_error = :page_load

  # Debug mode disables concatenation and preprocessing of assets.
  # This option may cause significant delays in view rendering with a large
  # number of complex assets.
  config.assets.debug = true

  # Precompile additional assets.
  # application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
  # config.assets.precompile += %w(*.png *.jpg *.jpeg *.gif)

  config.action_mailer.delivery_method = :smtp #:sendmail  #:letter_opener
  config.action_mailer.smtp_settings = {
    address: "smtp.gmail.com",
    port: "587",
    from: "checkeredslinky@gmail.com", #'robot@bcpax.com',
    user_name:            ENV['GMAIL_USERNAME'],
    password:             ENV['GMAIL_PASSWORD'],
    authentication:       'plain',
    enable_starttls_auto: true
  }

  # config.action_mailer.sendmail_settings = {
  #   location: '/vagrant/node_modules/sendmail'
  # }

  config.beginning_of_week = :sunday

  config.action_mailer.default_url_options = { :host => "localhost",
                                               :port => "3000"}

  # for twilio - probably not needed in development
  # config.middleware.use Rack::TwilioWebhookAuthentication, Rails.application.secrets.twilio_auth_token, '/voice'

  #config.active_record.raise_in_transactional_callbacks = true

  # turned this off to avoid application.haml css error
  # config.assets.raise_production_errors = true
end
