var app  = app || {};

app.LibraryView = Backbone.View.extend({
	el:'#books',

	initialize: function( initializeBooks) {
		this.collection = new app.Library();
		this.collection.fetch({reset:true}); 
	 	this.render();
		this.listenTo(this.collection,'reset',this.render);
		this.listenTo(this.collection,'add',this.renderBook );
	},

	events: {
		'click #add':'addBook'
    },

	addBook: function(e) {
		// we  do not  want the form to actually submit and reload the page.
		e.preventDefault();
		
		var formData = {};
		$( '#addBook div' ).children( 'input' ).each( function( i, el ) {
	        if( $( el ).val() !== '' )
	        {
	            formData[ el.id ] = $( el ).val();
	        }
	    });	    
    	this.collection.create( new app.Book( formData ) );
	},

	render: function() {
		this.collection.each(function(item) {
			this.renderBook(item);
		},this);
	},
	renderBook: function(item) {
		var  bookView = new app.BookView({ model:item });
	     // 在操作form dom之后加上 列表 dom
		this.$el.append(bookView.render().el);
	}
});