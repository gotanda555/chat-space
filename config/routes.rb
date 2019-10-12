Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  #root to: 'messages#index'
  root to: 'groups#index'
  # resources :users, only: [:index, :edit, :update]
  resources :users, only: [:edit, :update, :index]
  resources :groups, only: [:new, :create, :edit, :update, :index] do
    resources :messages, only: [:index, :create]

    namespace :api do
      resources :messages, only: :index, defaults: { format: 'json' }
    end
    
end
end
