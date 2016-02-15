CarrierWave.configure do |config|
  config.root = Rails.root.join('tmp')
  config.cache_dir = 'uploads'
  config.fog_credentials = {
    provider: ENV['FOG_PROVIDER'],
    aws_access_key_id: ENV['AWS_ACCESS_KEY_ID'],
    aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
    region: 'us-west-1',
    endpoint: 'http://s3.amazonaws.com'
  }
  config.fog_directory = ENV['FOG_DIRECTORY']
end
