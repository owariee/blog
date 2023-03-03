const Post = () => {
  return (
    <div class="blog-content" style={{ overflow: 'auto' }}>
      <h1 style={{ marginBottom: 10 }}>$TITLE</h1>
      <h3 style={{ marginBottom: 10, textAlign: 'right' }}>$DATE</h3>
      <p>$CONTENT</p>
    </div>
  );
};

export default Post;
