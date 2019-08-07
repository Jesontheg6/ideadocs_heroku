module SerializableResource
  def parse_json obj
    ActiveModelSerializers::SerializableResource.new(obj).as_json
  end
end