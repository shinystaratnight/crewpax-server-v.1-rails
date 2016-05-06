class AttachmentUploader < CarrierWave::Uploader::Base
  storage :dropbox

  def store_dir
    "/"
  end

  def extension_white_list
    %w(pdf doc htm html docx pages txt)
  end

  def filename
    
    "#{secure_token}_userId_"+model.name if original_filename
  end


  protected
  def secure_token
    var = :"@#{mounted_as}_secure_token"
    model.instance_variable_get(var) or model.instance_variable_set(var, SecureRandom.uuid)
  end
  
end