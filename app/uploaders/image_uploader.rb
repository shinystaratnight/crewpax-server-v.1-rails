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

  process :resize_to_fit => [290, 290]

  version :thumb do
    process :resize_to_fill => [90, 90]
  end
end
