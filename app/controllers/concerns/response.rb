module Response
  def json_res msg, is_success, data, status
    data.each do |key, value|
      render json: {
        message: msg,
        is_success: is_success,
        key => value,
      }, status: status
    end
  end
end