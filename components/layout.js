import Head from 'next/head';
import Navbar from './navbar';
import Footer from './footer';

const Layout = (props) => (
  <div>
    <Head>
      <title>Spades</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"/>
    </Head>
    <Navbar/>
    <div className="container">
      {props.children}
    </div>
    <Footer/>
  </div>
);

export default Layout;
