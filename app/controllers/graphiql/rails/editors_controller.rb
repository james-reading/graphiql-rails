module GraphiQL
  module Rails
    class EditorsController < ActionController::Base
      def show
        html = File.read(GraphiQL::Rails::Engine.root.join("public", "graphiql-rails", "index.html"))

        html.sub!("__APP_TITLE__", GraphiQL::Rails.config.title || "GraphiQL")
        html.sub!("__APP_CONFIG__", build_app_config.to_json)

        render html: html.html_safe, layout: false
      end

      def build_app_config
        {
          graphql_endpoint_path: params[:graphql_path] || raise(%|You must include `graphql_path: "/my/endpoint"` when mounting GraphiQL::Rails::Engine|),
          initial_query: GraphiQL::Rails.config.initial_query,
          logo: GraphiQL::Rails.config.logo,
          headers: GraphiQL::Rails.config.resolve_headers(view_context),
          query_params: GraphiQL::Rails.config.query_params,
          header_editor_enabled: GraphiQL::Rails.config.header_editor_enabled,
          input_value_deprecation: GraphiQL::Rails.config.input_value_deprecation,
          should_persist_headers: GraphiQL::Rails.config.should_persist_headers,
          action_cable_path: GraphiQL::Rails.config.action_cable_path,
          action_cable_channel_name: GraphiQL::Rails.config.action_cable_channel_name
        }
      end
    end
  end
end
