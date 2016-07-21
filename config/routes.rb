Bcpax::Application.routes.draw do
  devise_for :users, controllers: { registrations: 'registrations', omniauth_callbacks: "users/omniauth_callbacks"}
 
  # patch 'appointments/:date' => 'appointments#toggle', as: :toggle_appointment

  namespace :admin do
    resources :unions, :roles, :certificates, :users, :eligibilities, :certifiables, :sponsors
  end

  resources :admin, only:[:index]

  #Create a custom route in users controller for search/sort result
  resources :users do
    collection do
      get "search"
    end

    collection do 
      get "sort"
    end
  end

  resources :jobs, shallow: true do
    resources :roles
  end
  
  resources :roles do 
    resources :labels, only:[:index]
  end 
  
  # resources :jobs do
  #   resources :roles 
  # end

  # resources :roles, shallow: true do 
  #   resources :jobs
  # end
  
  resources :roles, only:[:index]
  resources :attachments, only:[:create,:update, :index, :destroy]
  resources :certifiables, only:[:create, :destroy]
  resources :users, shallow: true do
    resources :appointments
  end

  
  resources :users do
    resources :jobs, only:[:index, :show]
  end
  

  # resources :roles, shallow: true do
  #   resources :users 

  # end
  
  resources :addresses
  resources :eligibilities
  
  resources :jobs
  get 'jobs/:id/:secret' => 'jobs#show', as: :secret_job

  resources :messages, only:[:new, :create]  

  root 'home#index'

end
