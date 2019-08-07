module Api
  module V1
    # sessions contrtoller i.e login, logout
    class SessionsController < Devise::SessionsController
      before_action :sign_in_params, :load_user, only: :create
      before_action :valid_token, :verify_signed_out_user, only: :destroy

      # sign in
      def create
        if @user.valid_password? params[:password]
          sign_in 'user', @user
          user_serializer = parse_json @user
          json_res 'signed in user', true, {user: user_serializer}, :ok
        else
          json_res 'unauthorized', false, {}, :unauthorized
        end
      end

      # sign out
      def destroy
        sign_out @user
        @user.generate_new_authentication_token
        json_res 'signed out user', true, {}, :ok
      end

      private

      def sign_in_params
        byebug
        params.require(:user).permit(:email, :password)
      end

      def load_user
        @user = User.find_for_database_authentication email: params[:email]

        unless @user
          json_res 'no user with that email', false, {}, :not_found
        end
      end

      def valid_token
        @user = User.where authentication_token: request.headers['X-User-Token']
        unless @user
          json_res 'invalid token', false, {}, :forbidden
        end
      end
    end
  end
end