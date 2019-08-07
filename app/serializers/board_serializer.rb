class BoardSerializer < ActiveModel::Serializer
  attributes :title

  belongs_to :user, serializer: UserSerializer
  has_many :idea, serializer: IdeaSerializer
end
