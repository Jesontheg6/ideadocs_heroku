require 'date'

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
      logger.add_tags 'ActionCable', current_user[:email]
    end

    protected

    # this checks whether a user is authenticated
    def find_verified_user
      verified_user = { id: cookies.signed[:user_id], email: cookies.signed[:user_email] }
      if verified_user && Time.at(cookies.signed[:user_expires_at]) > Time.now
        verified_user
      else
        reject_unauthorized_connection
      end
    end
  end
end
