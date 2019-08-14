class IdeaSerializer < ActiveModel::Serializer
  attributes :title, :body, :id, :updated_at, :color

  belongs_to :board, serilizer: BoardSerializer
end
