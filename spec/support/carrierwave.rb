CarrierWave.configure do |config|
  config.root = "#{Rails.root}/tmp/uploads/test"
end

RSpec.configure do |config|
  config.after(:all) do
    if Rails.env.test?
      FileUtils.rm_rf(Dir["#{Rails.root}/tmp/uploads/test"])
    end
  end
end
