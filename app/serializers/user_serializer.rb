class UserSerializer < ActiveModel::Serializer
  attributes :email, :username

  has_many :board, serializer: BoardSerializer
  has_many :idea, serializer: IdeaSerializer
end
