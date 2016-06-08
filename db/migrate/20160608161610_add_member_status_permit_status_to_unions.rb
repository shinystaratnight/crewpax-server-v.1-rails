class AddMemberStatusPermitStatusToUnions < ActiveRecord::Migration
  def change
    add_column :unions, :has_member_status, :boolean, default: false
    add_column :unions, :has_permit_status, :boolean, default: false
  end
end
