var app  = app || {};

app.BookView = Backbone.View.extend({
    tagName: 'div',
    className: 'bookContainer',
    events: {
        'click .delete': 'deleteBook'
    },

    deleteBook: function() {
      this.model.destroy();
      this.remove();
    },

    // 切记： 因为本文件里面出现了模板，模板需要先缓存，所以本文件必须在模板id  之后，不然会导致 BookView无法成功加载
    template: _.template( $('#bookTemplate' ).html() ),
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(this.model, 'visible',this.toggleVisible);
    },

    render: function() {
        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        this.$el.html( this.template( this.model.attributes ) );

        return this;
    }
});