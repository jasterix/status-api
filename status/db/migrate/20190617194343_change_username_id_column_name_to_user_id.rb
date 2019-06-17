class ChangeUsernameIdColumnNameToUserId < ActiveRecord::Migration[5.2]
  def change
    rename_column :boards, :username_id, :user_id
  end
end
