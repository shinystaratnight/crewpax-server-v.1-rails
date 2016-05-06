class ImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :file  
  #storage Rails.env.test? ? :file : :fog

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end

  # version :desktop do 
    process :resize_to_fit => [400, 400]
  # end

  version :thumb do
    process :resize_to_fit => [90, 90]
  end

  # version :mobile do 
  #   process :resize_to_fit => [290, 290]
  # end
end
