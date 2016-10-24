
// 即时函数是函数加载完之后立即执行的函数,内部使用$,即时传参jQuery
(function($){
  var ListView = Backbone.View.extend({
    el: $('body'),
    //  initialize 一旦实例化就会自动调用，这里放置绑定，UI事件
    initialize: function(){
      _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

       this.render(); // 不是所有的view 都是自己呈现的
    },
    // `render()`: Function in charge of rendering the entire view in `this.el`. Needs to be manually called by the user.
    render: function(){
      $(this.el).append("<ul> <li>hello world</li> </ul>");
    }
  });

  // **listView instance**: Instantiate main app view.
  var listView = new ListView();
})(jQuery);
