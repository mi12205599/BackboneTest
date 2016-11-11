var  app  = app || {};

$(function() {
 	$( '#releaseDate' ).datetimepicker();
	new app.LibraryView(books);
});