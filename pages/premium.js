import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const Index = () => (
    <div>
        <Head>
            <title>Spades</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"/>
        </Head>
        <div className="container">
            <section class="hero is-medium is-primary is-bold">
                <div class="hero-head">
                    <Navbar/>
                </div>
                <div class="hero-body">
                    <div class="container">
                        <h1 class="title">
                            Primary bold title
                        </h1>
                        <h2 class="subtitle">
                            Primary bold subtitle
                        </h2>
                    </div>
                </div>
            </section>
        </div>
        <Footer/>
    </div>
);

export default Index;
