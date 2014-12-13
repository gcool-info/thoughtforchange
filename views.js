var splashScreen = Backbone.View.extend({

	el: '.page',

	events: {
   		'click .startBtn' : 'renderArticleList',
   		'click .about': 'renderAbout'
  	},

  	renderAbout: function() {
  		router.navigate('about', {trigger: true});
  	},

  	renderArticleList: function() {
  		router.navigate('articles', {trigger: true});
  	},

	render: function() {

		this.$el.html(_.template($('#splashScreen').html()));

		/* Set the height of the background layer */
		if ($('.splashBckg').innerHeight() < $( document ).innerHeight ()) {
			$('.splashBckg').innerHeight ($( document ).innerHeight ());
		}
	},

});

var ArticleListView = Backbone.View.extend({

	el: '.page',

	initialize: function() {
		this.listenTo(this.collection, 'add', this.render);
	},

	events: {
		'click .articleLink' : 'renderArticle'
  	},

  	renderArticle: function(e) {
  		var clickedArticle = $(e.currentTarget).attr("id");
  		router.navigate('article/' + clickedArticle, {trigger:true});
  	},

	render: function() {
		this.$el.html(_.template($('#articleList').html(), {articles: this.collection.models}));
	},

});

var ArticleView = Backbone.View.extend({

	el: '.page',

	render: function() {
		this.$el.html(_.template($('#article').html(), {article: this.model}));
	},

});

var MenuView = Backbone.View.extend({

	el: '.menu',

	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
	},

	events: {
		'click .left' : 'goToHome',
		'click .leftBack' : 'goToList',
		'click .right' : 'goToList',
		'click .facebook' : 'fbShare'
  	},

  	fbShare: function(e) {
  		e.stopImmediatePropagation();
  		FB.ui({
		  method: 'share',
		  href: 'thoughtforchange.gr/social.php?article=' + this.model.get('articleID'),
		}, function(response){});
  	},

  	goToList: function() {
  		router.navigate('articles', {trigger: true});
  	},

  	goToHome: function() {
  		router.navigate('', {trigger: true});
  	},

	render: function() {

		if (this.model.get('state') == 'none') {
			return;
		}
		else if (this.model.get('state') == 'simple') {
			this.$el.html(_.template($('#menuSimple').html()));
		}
		else {
			this.$el.html(_.template($('#menuFull').html(), {articleID: this.model.get('articleID')}));
		}
	},

});