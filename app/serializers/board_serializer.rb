class BoardSerializer < ActiveModel::Serializer
  attributes :id, :title, :slug

  belongs_to :user, serializer: UserSerializer
  has_many :ideas, serializer: IdeaSerializer
end
