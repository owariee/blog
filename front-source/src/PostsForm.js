function PostsForm() {
  return (
    <div id="blog-post-list">
    <h1>Add Post</h1><br/>
    <form action="/posts_add.php" method="post">
      <label htmlFor="title">Title:</label><br/>
      <input className="input-full" type="text" id="title" name="title"/><br/>
      <label htmlFor="date">Date:</label><br/>
      <input className="input-full" type="text" id="date" name="date"/><br/>
      <label htmlFor="content">Content:</label><br/>
      <textarea className="input-full" id="content" name="content" rows="5" cols="33"></textarea><br/>
      <input type="submit" value="Submit"/>
    </form>
    </div>
  )
}

export default PostsForm;
