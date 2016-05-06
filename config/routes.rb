Bcpax::Application.routes.draw do
  devise_for :users, controllers: { registrations: 'registrations' }
 
  # patch 'appointments/:date' => 'appointments#toggle', as: :toggle_appointment

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
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
