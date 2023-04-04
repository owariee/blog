function Posts() {
  return (
    <>
      <div className="blog-content" style={{overflow: 'auto'}}>
        <h1 style={{marginBottom: 10}}>Posts</h1>
        <figure style={{float: 'right'}}>
        <img src="images/kazuma.gif" alt="This is a bunch of stars, duuuuh!"/>
        </figure>
        <p>
        Here resides some of my thinkings about a widely range of subjects, but mainly focused in
        some topics related to quality of life improvements, technology and how we depend on that 
        today:
        </p>
      </div>
      <div id="blog-post-list">
        <h1>POST YEAR</h1>
        <h2 style={{marginBottom: 10, textAlign: 'center'}}>POST MONTH</h2>
        <ul>
          <li>
          <span>Posts Date</span>
          <a href="post.php?id=<?php echo $entry['posts_id'] ?>">POST NAME</a>
          <a style={{float: 'right'}} href="posts_delete.php?id=' . $entry['posts_id'] . '">Delete</a>
          <a style={{float: 'right', marginRight: 10}} href="posts_edit.php?id=' . $entry['posts_id'] . '">Edit</a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Posts;
