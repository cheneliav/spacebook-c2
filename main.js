var posts = [];


var addPost = function () {
        var Post = {
            text: $(".form-control").val(),
            id: posts.length
        }
        posts.push(Post);
        // alert(Post.id);
        // alert(Post.text);

    }

    var renderPosts = function () {
     
        $('.posts').find('p').remove();
        for (var i = 0; i < posts.length; i++) {
            $('.posts').append('<p class="post" data-id="'+posts[i].id+'"><button type="button" class="remove">REMOVE</button>'+ posts[i].text +'</p>');
            bindEvents(); 
        }
    }  
    var btnClick = function () {
        
    addPost();
    renderPosts();

}


var bindEvents = function () {
    $('.remove').off(); //add this line
    $('.remove').click(function () {
      //  alert("ttttt"); 
        $(this).closest("p").remove();
    });
  }

$('.btn').on('click', btnClick);


   

