var Router = Backbone.Router.extend({
	routes: {
    	'':'home',
    	'articles':'renderList',
    	'article/:id':'renderArticle',
    	'about':'renderAbout'
	},

	initialize: function() {
	  this.bind('route', this._pageView);
	},
	 
	_pageView: function() {
	  var path = Backbone.history.getFragment();
	  console.log(path);
	  ga('send', 'pageview', {page: "/" + path});
	},

	home:function() {
		home.render();
	},

	renderList:function() {

		/* add the view for the menu */
		var menu = new MenuView({model: menuModel});
		menuModel.set('state','simple');

		/* add the view for the article list */
		var articleListView = new ArticleListView({collection: newspaper});
		articleListView.render();
	},

	renderArticle:function() {

		/* We need to get the id of the article. */
		var articleID = this.current().params[0];

		/* add the view for the menu */
		var menu = new MenuView({model: menuModel});
		menuModel.set('state','full');
		menuModel.set('articleID',articleID);

		/* Create the view for the article and pass it the article's model */
		var article = new ArticleView({model: newspaper.get({'id':articleID})});

		article.render();
	},

	renderAbout:function() {

		var aboutModel = new AboutModel({id: 1});

		aboutModel.fetch({
			success: function() {
				var article = new ArticleView({model: aboutModel});
				article.render();

				/* add the view for the menu */
				var menu = new MenuView({model: menuModel});
				menuModel.set('state','simple');
			}
		});
	},

	// Get the id of the article by looking at the url
	current : function() {
	    var Router = this,
	        fragment = Backbone.history.fragment,
	        routes = _.pairs(Router.routes),
	        route = null, params = null, matched;

	    matched = _.find(routes, function(handler) {
	        route = _.isRegExp(handler[0]) ? handler[0] : Router._routeToRegExp(handler[0]);
	        return route.test(fragment);
	    });

	    if(matched) {
	        // NEW: Extracts the params using the internal
	        // function _extractParameters 
	        params = Router._extractParameters(route, fragment);
	        route = matched[1];
	    }

	    return {
	        route : route,
	        fragment : fragment,
	        params : params
	    };
	},
})