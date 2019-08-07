Rails.application.routes.draw do
  devise_for :users
  mount ActionCable.server => '/cable'
  namespace :api do
    namespace :v1 do
      resources :ideas
      resources :boards

      get '*path', to: 'application#fallback_index_html', constraints: ->(request) do
        !request.xhr? && request.format.html?
      end
    end
  end
end
