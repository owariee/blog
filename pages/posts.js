const Posts = () => {
  return (
    <div>
      <div className="blog-content" style={{ overflow: 'auto' }}>
        <h1 style={{ marginBottom: 10 }}>Posts</h1>
        <figure style={{ float: 'right' }}>
          <img
            src="images/kazuma.gif"
            alt="This is a bunch of stars, duuuuh!"
          ></img>
        </figure>
        <p>
          Here resides some of my thinkings about a widely range of subjects,
          but mainly focused in some topics related to quality of life
          improvements, technology and how we depend on that today:
        </p>
      </div>
      <div id="blog-post-list">
        <h1>$DATE_OLD</h1>
        <ul>
          <li>
            <span>$(date -d @$EPOCH '+%Y %b %d') </span>
            <a href="">$TITLE</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Posts;
