Rails.application.routes.draw do
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  }, controllers: {
    sessions: 'sessions',
    registrations: 'registrations'
  }
  # root 'boards#index'
  mount ActionCable.server => '/cable'
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      devise_scope :user do
        delete 'delete', to: 'users#destory'
        get 'users', to: 'users#index'
        get 'user/:username', to: 'users#show'
        put 'user/:username', to: 'users#update'
      end
      resources :ideas
      resources :boards
    end
  end
  get '*path', to: 'application#fallback_index_html', constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
