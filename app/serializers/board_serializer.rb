class BoardSerializer < ActiveModel::Serializer
  attributes :id, :title, :slug

  has_many :ideas, serializer: IdeaSerializer
end
