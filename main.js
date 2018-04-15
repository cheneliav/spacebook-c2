var SpacebookApp = function () {
  var posts = [
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]},
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]},
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]}
  ];

  // the current id to assign to a post
  var currentId = 0;
  var $posts = $('.posts');

  var _findPostById = function (id) {
    for (var i = 0; i < posts.length; i += 1) {
      if (posts[i].id === id) {
        return posts[i];
      }
    }
  }

  var createPost = function (text) {
    var post = {
      text: text,
      id: currentId,
      comments : []
    }

    currentId += 1;

    posts.push(post);
  }

  var renderPosts = function () {
    $posts.empty();

    for (var i = 0; i < posts.length; i += 1) {
      var post = posts[i];

      var commentsContainer = '<div class="comments-container">' +
      '<input type="text" class="comment-name">' +
      '<button class="btn btn-primary add-comment">Post Comment</button> </div>';

      $posts.append('<div class="post" data-id=' + post.id + '>'
        + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text +
        commentsContainer + '</div>');
    }
  }

  var removePost = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    var id = $clickedPost.data().id;

    var post = _findPostById(id);

    posts.splice(posts.indexOf(post), 1);
    $clickedPost.remove();
  }

  var toggleComments = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    $clickedPost.find('.comments-container').toggleClass('show');
  }

  var createComment = function (text,idc) {
    
    var comment = {
      text: text
    }
    posts[idc].comments.push(comment);
 
  }


  var renderComments = function (idc) {
  
     $('.comment').empty();

     for (var i = 0; i < posts[idc].comments.length; i += 1) {
       //var comment = posts[idc].comments[i];


      $posts.append('<div class="comment" >'
        + '<a href="#" class="remove-com">remove</a> '  + posts[idc].comments[i].text +
        '</div>');
     }
  }
  var removeComment = function (currentCom) {
    var $clickedCom = $(currentCom).closest('.comment');
  
    $clickedCom.remove();
  }



  return {
    createPost: createPost,
    renderPosts: renderPosts,
    removePost: removePost,

    // TODO: Implement
     createComment: createComment,

    // TODO: Implement
     renderComments: renderComments,

    // TODO: Implement
     removeComment: removeComment,
    toggleComments: toggleComments
  }
}

var app = SpacebookApp();

// immediately invoke the render method
app.renderPosts();

// Events
$('.add-post').on('click', function () {
  var text = $('#post-name').val();
  
  app.createPost(text);
  app.renderPosts();
});

$('.posts').on('click', '.remove', function () {
  app.removePost(this);
});

$('.posts').on('click','.show-comments', function () {
  app.toggleComments(this);
});


$('.posts').on('click','.add-comment', function () {
  
  var text = $('.comment-name').val();
  var idc = $(this).closest('.post').data().id;
  
  app.createComment(text,idc);
  app.renderComments(idc);
});

$('.posts').on('click', '.remove-com', function () { 
  app.removeComment(this);
});