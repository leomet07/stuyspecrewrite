/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import { defaultProps, ReceivedArticle } from "../../ts_types/db_types";
import { get_article_by_slug } from "../../db";
import { NextPageContext } from "next";
import styles from "../../styles/[article_slug].module.css";
import { all_sections } from "../../globals/globals";
import ShareButton from "../../components/ShareButton";
import romanize from "../../utils/Romanize";
import SubscribeForm from "../../components/SubscribeForm";
import Link from "next/link";
// import RecommendedArticles from "../../components/RecommendedArticles";
import generate_contributors_jsx from "../../components/GenerateContributorsJSX";

interface Props extends defaultProps {
	article: ReceivedArticle;
}

const Article = (props: Props) => {
	const {
		text,
		title,
		cover_image,
		section_id,
		volume,
		issue,
		contributors,
		cover_image_summary,
		cover_image_contributor,
		cover_image_source,
	} = props.article;

	const providers = ["facebook", "twitter", "linkedin", "email"];

	return (
		<div>
			<Head>
				<title>{title}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main id={styles.main}>
				<div id={styles.article}>
					<p id={styles.section}>
						<Link
							href={
								"/department/" +
								String(all_sections[section_id]).toLowerCase()
							}
							passHref
						>
							{all_sections[section_id]}
						</Link>
					</p>
					<h1 id={styles.title}>{title}</h1>
					<h3 id={styles.issue_volume_text}>
						Issue {props.article.issue}, Volume{" "}
						{props.article.volume}
					</h3>
					<div id={styles.infoBar}>
						<h3 id={styles.authors}>
							By&nbsp;{generate_contributors_jsx(contributors)}
						</h3>

						<div id={styles.shareButtons}>
							{providers.map((provider) => (
								<ShareButton
									key={provider}
									provider={provider}
									url={`https://stuyspec.com/article/${props.article.slug}`}
								/>
							))}
						</div>
					</div>

					{cover_image /* Only check for cover image to decide visibility as some articles do not have image info */ ? (
						<>
							<div id={styles.cover_image_div}>
								<Image
									fill
									id={styles.cover_image}
									src={cover_image}
									alt="Cover Image"
									sizes="1100px"
								/>
							</div>
							<div id={styles.coverImageInfo}>
								<div>{cover_image_summary}</div>
								<div>
									By&nbsp;
									{generate_contributors_jsx([
										cover_image_contributor,
									])}
								</div>
								<div>
									{" " +
										(cover_image_source
											? cover_image_source
											: "")}
								</div>
							</div>
						</>
					) : (
						<></>
					)}

					<div
						id={styles.content}
						dangerouslySetInnerHTML={{ __html: text }}
					></div>
					<p
						style={{
							fontStyle: "italic",
							paddingBottom: "0.5rem",
							borderBottom: "2px solid var(--light-grey)",
						}}
					>
						Article appears in print in Volume {romanize(volume)},
						Issue {issue}
					</p>

					{/* <div id={styles.subsribe_insert}>
						<SubscribeForm />
					</div> */}

					{/* <RecommendedArticles /> */}
				</div>
				<div id={styles.advertisements}></div>
			</main>
		</div>
	);
};

export default Article;

export async function getServerSideProps(context: NextPageContext) {
	const article_slug: string = String(context.query.article_slug);

	let article = await get_article_by_slug(article_slug);
	if (article) {
		return {
			props: { article: JSON.parse(JSON.stringify(article)) },
		};
	} else {
		return {
			notFound: true,
			props: { attempted_identifier: article_slug },
		};
	}
}
