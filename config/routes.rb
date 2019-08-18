Rails.application.routes.draw do
  # root 'boards#index'
  mount ActionCable.server => '/cable'
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :boards, param: :slug do
        resources :ideas
      end
    end
  end
  get '*path', to: 'application#fallback_index_html', constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
