class RemoveUserModel < ActiveRecord::Migration[5.2]
  def change
    remove_reference :boards, :user
    remove_reference :ideas, :user
    drop_table :users
    drop_table :jwt_blacklist
  end
end
