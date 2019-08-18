class ApplicationController < ActionController::API
  include ActionController::MimeResponds
  include Authenticate
  include Response
  include SerializableResource

  def fallback_index_html
    render file: 'public/index.html'
  end
end
