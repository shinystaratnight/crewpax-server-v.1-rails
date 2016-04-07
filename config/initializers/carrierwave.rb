CarrierWave.configure do |config|
  config.root = Rails.root.join('tmp')
  config.cache_dir = 'uploads'
# For dropbox config
  config.dropbox_app_key = ENV["APP_KEY"]
  config.dropbox_app_secret = ENV["APP_SECRET"]
  config.dropbox_access_token = ENV["ACCESS_TOKEN"]
  config.dropbox_access_token_secret = ENV["ACCESS_TOKEN_SECRET"]
  config.dropbox_user_id = ENV["USER_ID"]
  # config.dropbox_access_type = "dropbox" if you Choose the type of access App folder or
  config.dropbox_access_type = "app_folder" 

  # config.fog_credentials = {
  #   provider: ENV['FOG_PROVIDER'],
  #   aws_access_key_id: ENV['AWS_ACCESS_KEY_ID'],
  #   aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
  #   region: 'us-west-1',
  #   endpoint: 'http://s3.amazonaws.com'
  # }
  # config.fog_directory = ENV['FOG_DIRECTORY']
end


