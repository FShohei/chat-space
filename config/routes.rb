Rails.application.routes.draw do
  devise_for :users
  root 'messages#index'
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages,only: [:index, :create]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  end
end  
