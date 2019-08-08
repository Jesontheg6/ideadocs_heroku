# user registration i.e sign_in
class RegistrationsController < Devise::RegistrationsController
  before_action :exists, only: :create
  respond_to :json

  # sign up function
  def create
    @user = User.new user_params
    if @user.save
      @user_serializer = parse_json @user
      json_res 'signed up user successfully', true, {user: @user_serializer}, :ok
    else
      json_res "couldn't create user", false, {error: @user.errors}, :unprocessable_entity
    end
  end

  private

  def user_params
  params.permit(
    :email, :password, :password_confirmation,
    :username, :firstname, :lastname)
  end

  def exists
    if User.exists? email: params[:email]
      json_res "user with email #{params[:email]} exists.", false, {}, :conflict
    end
  end
end
