class IdeaSerializer < ActiveModel::Serializer
  attributes :title, :body

  belongs_to :user, serializer: UserSerializer
  belongs_to :board, serilizer: BoardSerializer
end
