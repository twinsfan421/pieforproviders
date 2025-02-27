# frozen_string_literal: true

# Serializer for businesses
class BusinessBlueprint < Blueprinter::Base
  identifier :id

  view :illinois_dashboard do
    field :name
    exclude :id
    association :children, name: :cases, blueprint: ChildBlueprint, view: :illinois_dashboard do |business, options|
      business.children.not_deleted.distinct.approved_for_date(options[:filter_date])
    end
  end

  view :nebraska_dashboard do
    field :name
    exclude :id
    association :children, name: :cases, blueprint: ChildBlueprint, view: :nebraska_dashboard do |business, options|
      business.children.not_deleted.distinct.approved_for_date(options[:filter_date])
    end
  end
end
