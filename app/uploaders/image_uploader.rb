class ImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  # storage :dropbox 
  # storage Rails.env.test? ? :file : :drobpox
  
  Rails.env.production? ? (storage :dropbox) : (storage :file) 

  def store_dir
    if Rails.env.production?
      "Images_uploads/"
    else
      "#{Rails.root}/tmp/uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
    end
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end

  def default_url
    "/images/fallback/" + [version_name, "default_user_avatar.png"].compact.join('_')
  end

  def filename
    "profile_picture_" + "user_id_" + "#{model.id}" + ".#{model.image.file.extension}" if original_filename
  end


  process :resize_to_fit => [400, 400]
  

  version :thumb do
    process :resize_to_fit => [90, 90]
  end


end
