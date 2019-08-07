module Api
  module V1
    class UsersController < ApplicationController
      before_action :authenticate_with_token!
      before_action :set_user, only: [:show, :update, :destroy]

      # GET /users
      def index
        users_serializer = parse_json User.all
        json_res 'success', true, {users: users_serializer}, :ok
      end

      # GET /users/username
      def show
        if @user
          user_serializer = parse_json @user
          json_res 'success', true, {user: user_serializer}, :ok
        else
          json_res 'not found', false, {error: @user.errors}, :not_found
        end
      end

      # update
      def update
        if @user.update user_params
          user_serializer = parse_json @user
          json_res 'updated user successfully', true, {user:user_serializer}, :ok
        else
          json_res 'error updating user', false, {error: @user.errors}, :unprocessable_entity
        end
      end

      # DELETE /users/1
      def destroy
        @user.destroy
      end

      # Use callbacks to share common setup or constraints between actions.
      def set_user
        @user = User.where username: params[:alias], email: params[:username]
        unless @user
          json_res "user doesn't exists.",false, {}, :not_found
        end
      end

      def user_params
        params.require(:user).permit(
          :email, :password
        )
      end
    end
  end
end