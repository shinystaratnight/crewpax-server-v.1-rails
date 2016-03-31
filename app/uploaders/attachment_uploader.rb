class AttachmentUploader < CarrierWave::Uploader::Base
  storage :dropbox

  def store_dir
    "/"
  end

  def extension_white_list
    %w(pdf doc htm html docx pages txt jpg jpeg )
  end

  def filename
    model.name if original_filename
  end
  
end