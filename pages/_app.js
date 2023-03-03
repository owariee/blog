import '../source/styles.css';
import Head from 'next/head';

const Website = ({ Component, pageProps, router }) => {
  const windowScroll = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <Head>
        <title>Gabriel's Blog</title>
      </Head>
      <div id="blog-block">
        <div id="blog-header">
          <h1>João Gabriel Sabatini</h1>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="posts">Posts</a>
            </li>
            <li>
              <a href="https://git.sabatini.xyz/wizzardy">Git</a>
            </li>
            <li>
              <a href="contact">Contact</a>
            </li>
          </ul>
        </div>
        <div id="blog-container">
          <Component {...pageProps} key={router.route} />
        </div>
      </div>
      <div id="blog-img-place">
        <img
          src="images/kennen.gif"
          alt="Dont put your mouse here!"
          onClick={windowScroll}
        ></img>
      </div>
    </div>
  );
};

export default Website;
