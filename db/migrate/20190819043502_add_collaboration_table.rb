class AddCollaborationTable < ActiveRecord::Migration[5.2]
  def change
    create_table :collaborations do |t|
      t.string :user_id
      t.integer :role
      t.timestamps
    end
    add_reference :collaborations, :board, foreign_key: true
    add_index :collaborations, :user_id
  end
end
