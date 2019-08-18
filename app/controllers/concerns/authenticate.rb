require 'json'
require 'jwt'

module Authenticate
  def current_user
    firebase_access_token = request.headers['X-User-Token']
    firebase_project_id = ENV['FIREBASE_PROJECT_ID']

    decoded_token = JWT.decode firebase_access_token, nil, false,
                               verify_iat: true,
                               verify_aud: true,
                               aud: firebase_project_id,
                               verify_iss: true,
                               iss: "https://securetoken.google.com/#{firebase_project_id}"

    headers = decoded_token[1]
    kid = headers['kid']

    key_body = HTTP.get(ENV['GOOGLE_API_URL']).body.to_s
    cert_string = JSON.parse(key_body)[kid]
    cert = OpenSSL::X509::Certificate.new(cert_string)

    decoded_token = JWT.decode firebase_access_token, cert.public_key, true,
                               algorithm: 'RS256',
                               verify_iat: true,
                               verify_aud: true,
                               aud: firebase_project_id,
                               verify_iss: true,
                               iss: "https://securetoken.google.com/#{firebase_project_id}"
    if decoded_token
      @current_user = {
        id: decoded_token[0]['user_id'],
        email: decoded_token[0]['email'],
        expiry: decoded_token[0]['exp']
      }
      cookies.signed['user_id'] = @current_user[:id]
      cookies.signed['user_email'] = @current_user[:email]
      cookies.signed['user_expires_at'] = @current_user[:expiry]
      return @current_user
    else

      cookies.delete 'user_id'
      cookies.delete 'email'
      cookies.delete 'user_expires_at'
      return false
    end
  end
end