class Board < ApplicationRecord
  belongs_to :user
  has_many :ideas, dependent: :destroy
  before_save { title.downcase! }

  attr_accessor :slug

  def slug
    @slug = title.dup
    @slug.downcase.gsub! ' ', '-'
  end
end