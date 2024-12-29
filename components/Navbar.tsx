import styles from "../styles/Navbar.module.css";
import subscribe_button_styles from "../styles/SubscribeButton.module.css";
import Link from "next/link";
import CollapsibleSearch from "./CollapsibleSearch";
import Image from "next/image";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";

import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaLinkedinIn,
  FaSpotify,
} from "react-icons/fa";

function currentDate() {
  const today = new Date();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = days[today.getDay()];
  const month = months[today.getMonth()];
  const date = today.getDate();
  const year = today.getFullYear();

  return `${dayOfWeek}, ${month} ${date}, ${year}`;
}

const Navbar = () => {
  const [viewSubSection, setViewSubSection] = useState(false);
  const [scroll, setScroll] = useState(0);

  function toggleMenu() {
    setViewSubSection(!viewSubSection);
  }

  function handleScroll() {
    if (window.innerWidth > 1050) {
      const position = window.scrollY;
      setScroll(position);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div id={styles.ghost} style={scroll > 121.6 ? { height: "40px" } : {}} />

      <div id={styles.nav_parent}>
        <nav id={styles.nav}>
          <div id={styles.navbar_hero}>
            <div
              id={styles.hamburgerMenu}
              className="button"
              onClick={toggleMenu}
            >
              <Image
                src="/images/hamburger-menu.svg"
                width={25}
                height={25}
                id={styles.hamburgerMenu}
                className="button"
                alt="Button to view the departments"
              />
            </div>

            <div>
              <div id={styles.media_buttons}>
                <Link
                  href="https://open.spotify.com/show/40JaCJA0FvtZToAv81qVjz"
                  aria-label="The Lens Podcast on Spotify"
                >
                  <FaSpotify id={styles.media_button} />
                </Link>
                <Link
                  href="https://www.facebook.com/stuyspectator"
                  aria-label="Facebook"
                >
                  <FaFacebookF id={styles.media_button} />
                </Link>
                <Link
                  href="https://www.instagram.com/stuyspectator/"
                  aria-label="Instagram"
                >
                  <FaInstagram id={styles.media_button} />
                </Link>
                <Link
                  href="https://www.linkedin.com/company/the-stuyvesant-spectator"
                  aria-label="Linkedin"
                >
                  <FaLinkedinIn id={styles.media_button} />
                </Link>
                <Link href="https://github.com/stuyspec" aria-label="GitHub">
                  <FaGithub id={styles.media_button} />
                </Link>
              </div>
              <span id={styles.date}>{currentDate()}</span>
            </div>

            <span
              id={styles.logo_container}
              className={styles.clickable_nav_element}
            >
              <Link passHref href="/">
                <div>
                  <span id={styles.logo_the}>The </span>Spectator
                </div>
              </Link>
            </span>

            <div id={styles.subscribe_search}>
              <div
                id={styles.subscribe}
                className={styles.clickable_nav_element}
              >
                <Link href="/subscribe">
                  <p id={subscribe_button_styles.subscribe_button_navbar}>
                    Subscribe
                  </p>
                </Link>
              </div>

              <div>
                <CollapsibleSearch />
              </div>
            </div>
          </div>
        </nav>

        <div
          style={
            scroll > 121.6
              ? {
                  position: "fixed",
                  top: 0,
                  boxShadow:
                    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                  right: 0,
                  left: 0,
                  zIndex: 3,
                  backgroundColor: "var(--secondary-nav)",
                }
              : {}
          }
        >
          <div id={styles.department_bar}>
            <span>
              <Link href="/department/news">News</Link>
            </span>
            <span>
              <Link href="/department/features">Features</Link>
            </span>
            <span>
              <Link href="/department/opinions">Opinions</Link>
            </span>
            <span>
              <Link href="/department/science">Science</Link>
            </span>
            <span>
              <Link href="/department/ae">Arts & Entertainment</Link>
            </span>
            <span>
              <Link href="/department/humor">Humor</Link>
            </span>
            <span>
              <Link href="/department/sports">Sports</Link>
            </span>
            <span>
              <Link href="/department/spec-plus">Spec+</Link>
            </span>
            <span>
              <Link href="/about/recruitments">Recruitments</Link>
            </span>
          </div>
        </div>

        <div>
          <Sidebar
            showSidebar={viewSubSection}
            setShowSidebar={setViewSubSection}
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
