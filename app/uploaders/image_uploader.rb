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
    if Rails.env.production?
      "profile_picture_" + "user_id_" + "#{model.id}" + "_#{secure_token}" + "#{File.extname(original_filename).downcase}" if original_filename
    else
      "profile_picture_" + "user_id_" + "#{model.id}" + ".#{model.image.file.extension}" if original_filename
    end
  end



  process :resize_to_fit => [400, 400]


  version :thumb do
    process :resize_to_fit => [90, 90]
  end

  protected
  def secure_token
    var = :"@#{mounted_as}_secure_token"
    model.instance_variable_get(var) or model.instance_variable_set(var, SecureRandom.uuid[0..6])
  end


end
