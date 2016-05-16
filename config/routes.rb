Bcpax::Application.routes.draw do
  devise_for :users, controllers: { registrations: 'registrations' }
 
  # patch 'appointments/:date' => 'appointments#toggle', as: :toggle_appointment

  namespace :admin do
    resources :unions, :roles, :certificates, :users, :eligibilities, :certifiables
  end

  resources :admin, only:[:index]

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

  # resources :roles, shallow: true do
  #   resources :users 

  # end
  
  resources :addresses
  resources :eligibilities
  
  resources :jobs
  get 'jobs/:id/:secret' => 'jobs#show', as: :secret_job

  root 'home#index'

end
