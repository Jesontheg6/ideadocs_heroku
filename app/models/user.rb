class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable
  # include DeviseTokenAuth::Concerns::User

  has_many :boards, dependent: :destroy
  has_many :ideas, through: :boards
end
