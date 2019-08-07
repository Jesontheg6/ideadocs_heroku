class AddBoardAndUserToIdea < ActiveRecord::Migration[5.2]
  def change
    add_reference :ideas, :board, foreign_key: true
    add_reference :ideas, :user, foreign_key: true
  end
end
