import Head from "next/head";
import {
	mongoObjectId,
	ReceivedStaff,
	ReceivedArticle,
} from "../../ts_types/db_types";

import { NextPageContext } from "next";
import styles from "../../styles/[staff_id].module.css";
import {
	get_articles_by_author,
	get_staff_by_id,
	get_staff_by_slug,
	get_media_by_author,
} from "../../db";
import ListArticleDisplay from "../../components/ListArticleDisplay";
import Link from "next/link";
import Image from "next/image";
import { generateMetaTags } from "../../utils/generateMetaTags";


interface Props {
	staff_identifier: mongoObjectId;
	staff: ReceivedStaff;
	staff_articles: ReceivedArticle[];
	staff_media: {
		cover_image: string;
		cover_image_summary: string;
		cover_image_source: string;
		article_slug: string;
	}[];
}

function StaffMember(props: Props) {
	const staff_member = props.staff;
	const page_title = staff_member.name + " - The Stuyvesant Spectator";
	const meta_url = `https://stuyspec.com/staff/` + staff_member.slug;
	const meta_description =
		staff_member.description ||
		`${staff_member.name} at The Stuyvesant Spectator`;

	const display_email = staff_member.email
		.replace(/@/g, " [ at ] ")
		.replace(/\./g, " [ dot ] ");

	const email_href = `mailto:${staff_member.email}`;

	return (
		<div>
			<Head>
				{generateMetaTags(page_title, meta_description, meta_url)}
			</Head>

			<main id={styles.main}>
				<h1 id={styles.name}>
					{staff_member.name}{" "}
					<span id={styles.slug}>({staff_member.slug})</span>
				</h1>

				<span id={styles.email}>{display_email}</span>
				<div className={styles.contactPageLinksContainer}>
					<p>
						<a className ="link" href={email_href}>{staff_member.email}</a>
					</p>
				</div>
				<p id={styles.description}>{staff_member.description}</p>

				<ListArticleDisplay articles={props.staff_articles} />

				{props.staff_media.length > 0 ? (
					<>
						<h2 id={styles.media_subheading}>
							{props.staff.name}&apos;s art, photos, and other
							media:
						</h2>
						<section id={styles.media_display}>
							{props.staff_media.map((v, index) => (
								<div key={index}>
									<Link
										passHref
										href={"/article/" + v.article_slug}
									>
										<div className={styles.media_container}>
											<Image
												className={styles.media}
												src={v.cover_image}
												alt={
													v.cover_image_summary ||
													`${props.staff.name}'s work`
												}
												fill
												sizes="330px"
											/>
										</div>
									</Link>
								</div>
							))}
						</section>
					</>
				) : (
					<></>
				)}
			</main>
		</div>
	);
}

export default StaffMember;

export async function getServerSideProps(context: NextPageContext) {
	let staff_identifier = String(context.query.staff_identifier).toLowerCase();

	let staff: ReceivedStaff;
	if (context.query.identifier_type == "id") {
		staff = await get_staff_by_id(staff_identifier);
	} else {
		staff = await get_staff_by_slug(staff_identifier); // Getting staff by slug is default, for legacy support
	}

	let staff_articles = await get_articles_by_author(staff._id, 200);
	staff_articles = JSON.parse(JSON.stringify(staff_articles));

	let staff_media = await get_media_by_author(staff._id, 100);
	staff_media = JSON.parse(JSON.stringify(staff_media));

	if (staff) {
		return {
			props: {
				staff: JSON.parse(JSON.stringify(staff)),
				staff_identifier: staff_identifier,
				staff_articles: staff_articles,
				staff_media: staff_media,
			},
		};
	} else {
		return {
			notFound: true,
			props: { attempted_identifier: staff_identifier },
		};
	}
}
