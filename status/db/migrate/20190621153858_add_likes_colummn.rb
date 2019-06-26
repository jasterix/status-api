class AddLikesColummn < ActiveRecord::Migration[5.2]
  def change
    add_column :boards, :likes, :integer, :default => 0
  end
end
