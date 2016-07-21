class SponsorUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick
  
  storage :dropbox
  
  def store_dir
    "Sponsors_Image_uploads/"
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end

end