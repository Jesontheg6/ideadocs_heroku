Rails.application.routes.draw do
  devise_for :users
  mount ActionCable.server => '/cable'
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      devise_scope :user do
        root 'users#index'
        post 'sign-up', to: 'registrations#create'
        delete 'delete', to: 'users#destory'
        get 'users', to: 'users#index'
        get 'user/:username', to: 'users#show'
        put 'user/:username', to: 'users#update'
        post 'login', to: 'sessions#create'
        delete 'logout', to: 'sessions#destroy'
      end
      resources :ideas
      resources :boards

      get '*path', to: 'application#fallback_index_html', constraints: ->(request) do
        !request.xhr? && request.format.html?
      end
    end
  end
end
