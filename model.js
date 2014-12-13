var Article = Backbone.Model.extend({
	idAttribute: 'id',
        tabletop: {
          instance: storage,
          sheet: 'articles'
        },
        sync: Backbone.tabletopSync
});

var Newspaper = Backbone.Collection.extend({
    model: Article,

    comparator: function(model) {
        return -model.get('id');
    },

    tabletop: {
        instance: storage,
        sheet: 'articles'
    },
    sync: Backbone.tabletopSync
});

var MenuState = Backbone.Model.extend({
    default: {
        state: 'none',
        articleID: null,
    }
});


var AboutModel = Backbone.Model.extend({
    idAttribute: 'id',
        tabletop: {
          instance: storage,
          sheet: 'about'
        },
        sync: Backbone.tabletopSync
});