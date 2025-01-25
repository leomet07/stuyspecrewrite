import styles from "../styles/Navbar.module.css";
import subscribe_button_styles from "../styles/SubscribeButton.module.css";
import Link from "next/link";
import CollapsibleSearch from "./CollapsibleSearch";
import Image from "next/image";
import Sidebar from "./Sidebar";
import { useState } from "react";

const Navbar = () => {
	const [viewSubSection, setViewSubSection] = useState(false);
	function toggleMenu() {
		setViewSubSection(!viewSubSection);
	}
	let dateTime = new Date();
	console.log(dateTime);
	return (
		<div id={styles.nav_parent}>
			<nav id={styles.nav}>
				<div id={styles.hamburgerMenu} className="button" onClick={toggleMenu}>
					<Image
						src="/images/hamburger-menu.svg"
						width={30}
						height={30}
						id={styles.hamburgerMenu}
						className="button"
						alt="Button to view the departments"
					/>
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
				<div
					id={styles.subscribe_parent}
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
			</nav>
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
			<div>
				<Sidebar showSidebar={viewSubSection} setShowSidebar={setViewSubSection} />
			</div>
		</div>
	);
};

export default Navbar;
