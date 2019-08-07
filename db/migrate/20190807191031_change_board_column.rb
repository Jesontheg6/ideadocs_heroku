class ChangeBoardColumn < ActiveRecord::Migration[5.2]
  def change
    change_table :boards do |t|
      t.rename :boardtitle, :title
    end
  end
end
