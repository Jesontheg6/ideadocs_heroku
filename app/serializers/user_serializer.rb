class UserSerializer < ActiveModel::Serializer
  attributes :email, :username

  has_many :boards, serializer: BoardSerializer
  has_many :ideas, serializer: IdeaSerializer
end
