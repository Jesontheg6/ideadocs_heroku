require_relative 'boot'

require 'rails'
require 'active_model/railtie'
require 'active_job/railtie'
require 'active_record/railtie'
require 'active_storage/engine'
require 'action_controller/railtie'
require 'action_mailer/railtie'
require 'action_view/railtie'
require 'action_cable/engine'
require 'rails/test_unit/railtie'

Bundler.require(*Rails.groups)

module IdeaboardApi
  class Application < Rails::Application
    config.load_defaults 5.2

    config.api_only = true

    config.action_cable.mount_path = '/cable'
    config.enable_dependency_loading = true
  end
end
