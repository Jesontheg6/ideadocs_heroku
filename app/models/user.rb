class User < ApplicationRecord
# Include default devise modules.
devise :database_authenticatable, :registerable,
		:recoverable, :rememberable, :trackable, :validatable
	include DeviseTokenAuth::Concerns::User

	has_many :boards, dependent: :destroy
	has_many :ideas, dependent: :destroy
	
end
