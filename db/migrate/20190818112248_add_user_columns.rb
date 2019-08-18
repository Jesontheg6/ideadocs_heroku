class AddUserColumns < ActiveRecord::Migration[5.2]
  def change
    add_column :boards, :user_id, :string
  end
end
