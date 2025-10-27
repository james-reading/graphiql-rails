module GraphiQL
  module Rails
    class Engine < ::Rails::Engine
      isolate_namespace GraphiQL::Rails

      initializer 'graphiql.assets.public' do |app|
        app.middleware.use(ActionDispatch::Static, "#{root}/public")
      end
    end
  end
end
