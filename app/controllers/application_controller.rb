class ApplicationController < ActionController::API
  include ActionController::MimeResponds
  include Response
  include SerializableResource
  respond_to :json

  def fallback_index_html
    render file: 'public/index.html'
  end
end
