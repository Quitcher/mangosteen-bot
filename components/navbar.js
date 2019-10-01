import Link from "next/link";

const Nav = () => (
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <Link href="./index"><a class="navbar-item">
                <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
            </a></Link>
            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
                <a class="navbar-item">
                    Add to Discord
                </a>

                <Link href="./commands"><a class="navbar-item">
                    Commands
                </a></Link>

                <Link href="./premium"><a class="navbar-item">
                    Premium
                </a></Link>

                <a class="navbar-item">
                    Community Server
                </a>
            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <a class="button is-light">
                            Log in
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
);

//https://via.placeholder.com/

export default Nav;
