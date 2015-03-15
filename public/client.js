$(function(){

   $.get('/comments', appendToList);

   function appendToList (comments) {
      var list = [];
      var content, cmt;
      for(var key in comments){
         cmt = comments[key];
         content = '<a href="/comments/'+key+'">'+key+'</a>';
         content += '<div><span>'+cmt+'</span></div><hr>';
         list.push($('<li>', {html: content}));
      }

      $('.comment-list').append(list);
   }

   $('form').on('submit', function(event){
      event.preventDefault();
   
      var form = $(this);
      var cmtData = form.serialize();

      $('.alert').hide();

      $.ajax({
         type: 'POST', url: '/comments', data: cmtData
      })
      .error(function() {
         $('.alert').show();
      })
      .success(function(data) {
         appendToList(data);
         form.trigger('reset');
      });
   });

}());
