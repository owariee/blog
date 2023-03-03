const Index = () => {
  return (
    <div className="blog-content">
      <h1 style={{ marginBottom: 10 }}>Hello, welcome to my website!</h1>
      <figure style={{ float: 'right' }}>
        <img
          src="images/universe.gif"
          alt="This is a bunch of stars, duuuuh!"
        ></img>
      </figure>
      <p>
        Hi, my name is João Gabriel Sabatini, and this is my personal page where
        I post about things that i want. I personally like video-games, metal,
        animes, programming and open-source software(Linux, yay!). Actually I am
        graduating in Systems Analysis and Development. Then, you must be
        thinking, why this page is not fancy and not have all that kinda of CSS
        and JS, the answer is, I as a developer dont like the way that internet
        evolved along time, all of these "improvements" are basically bloat made
        to impress irrelevant people. I particularly like minimalism, then the
        system that i use, Artix Linux, is basically minimal as possible, only
        including softwares that i really want to use, everything configured to
        be the way that i want, and speed up my processes while i use a
        computer, check my rice in my personal git repo for some scripts :).
        Well, this is very long, for a short intro to my website, but describes
        how much I like technology, so feel at home and take a look around. If
        you want to contact me there is a page called contact where you can view
        some links to my social networks and e-mail, do not hesitate.
      </p>
      <h1 style={{ marginBottom: 10, textAlign: 'center', marginTop: 30 }}>
        Other problem with internet?
      </h1>
      <figure style={{ float: 'left' }}>
        <img
          src="images/kakashi.gif"
          alt="This is a bunch of stars, duuuuh!"
        ></img>
      </figure>
      <p>
        The other problem with internet is that it was made to be decentralized,
        but nowdays services like Facebook, Youtube, Google, Amazon and so on,
        serve like a central hub to do basically everything, and these companies
        collect the data of million people to sell for marketing purposes. So
        the internet that is special to me, is the internet where anyone control
        your proper data, and have your proper server hosting your own things,
        the way you want. However the IPV4 address exhaustion and the deprecated
        ISPs is a big problem in that sense too, because if people want to
        control your own data they will need to buy a VPS or something in order
        to get a valid IPV4 and show content on internet, but peer-to-peer
        alternatives is already being developed to solve this question, like Dat
        and Beaker Project.
      </p>
    </div>
  );
};

export default Index;
