class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  include Response
  include SerializableResource
  include Authenticate

  def fallback_index_html
   render :file => 'public/index.html'
  end
end
