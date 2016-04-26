Bcpax::Application.routes.draw do
  devise_for :users, controllers: { registrations: 'registrations' }
 
  # patch 'appointments/:date' => 'appointments#toggle', as: :toggle_appointment

  namespace :admin do
    resources :unions, :roles, :certificates, :users, :eligibilities
  end

  resources :admin, only:[:index]

  resources :jobs, shallow: true do
    resources :roles
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
    resources :roles 
    resources :appointments
  end

  # resources :users do
  #   resources :roles 
  # end
  
  resources :addresses
  resources :eligibilities
  # resources :jobs do
  #   resources :labels
  # end
  resources :jobs
  get 'jobs/:id/:secret' => 'jobs#show', as: :secret_job

  root 'home#index'

end
