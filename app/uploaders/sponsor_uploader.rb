class SponsorUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :dropbox
  
  def store_dir
    "Sponsors_Image_uploads/"
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end

  def filename
    if original_filename.present?
      extension = File.extname(original_filename).to_s
      "sponsor_image_sponsor_random_id_"+"#{secure_token(10)}"+ extension 
    end
  end

  #process :resize_to_fit =>[240, 200]
  process :resize_to_fit =>[300, 250]

  version :thumb do
     process :resize_to_fit => [90, 90]
  end

  protected
  def secure_token(length=16)
    var = :"@#{mounted_as}_secure_token"
    model.instance_variable_get(var) or model.instance_variable_set(var, SecureRandom.hex(length/2))
  end

end