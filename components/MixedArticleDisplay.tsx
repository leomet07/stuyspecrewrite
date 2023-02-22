import {
	DepartmentsArray,
	DepartmentsArrayDisplay,
	ReceivedArticle,
} from "../ts_types/db_types";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/MixedArticleDisplay.module.css";
import groupByImageExists from "../utils/groupArticles";
import generate_contributors_jsx from "./GenerateContributorsJSX";

function CenterArticle(props: {
	article: ReceivedArticle;
	display_image?: boolean;
	display_department?: boolean;
}) {
	const article = props.article;
	return (
		<div className={styles.article} key={String(article._id)}>
			{props.display_image && article.cover_image ? (
				<Link passHref href={"/article/" + article.slug}>
					<div className={styles.centerImageContainer}>
						<Image
							alt="big image"
							className={styles.centerImage}
							src={article.cover_image}
							sizes="800px"
							quality={90}
							fill
						/>
					</div>
				</Link>
			) : (
				<></>
			)}
			{props.display_department ? (
				<Link
					href={`/department/${DepartmentsArray[article.section_id]}`}
					passHref
				>
					<p
						id={styles.articleInfo}
						className={styles.department + " discrete-link"}
						style={{
							fontFamily: "var(--secondary-font)",
						}}
					>
						{DepartmentsArrayDisplay[article.section_id]}
					</p>
				</Link>
			) : (
				<></>
			)}
			<Link passHref href={"/article/" + article.slug}>
				<h2 id={styles.title} className="discrete-link">
					{article.title}
				</h2>
			</Link>
			<p
				className={styles.authors}
				style={{
					fontFamily: "var(--secondary-font)",
				}}
			>
				By&nbsp;
				{generate_contributors_jsx(article.contributors)}
			</p>
			<Link passHref href={"/article/" + article.slug}>
				<p id={styles.summary} className="discrete-link">
					{article.summary}
				</p>
			</Link>

			<p className={styles.article_volume_issue}>
				<Link href={`/volume/${article.volume}/issue/${article.issue}`}>
					Issue {article.issue}, Volume {article.volume}
				</Link>
			</p>
		</div>
	);
}

export default function MixedArticleDisplay(props: {
	articles: ReceivedArticle[];
	display_department?: boolean;
}) {
	const grouping = groupByImageExists(props.articles);
	const articlesWithPhotos: ReceivedArticle[] = grouping["withPhotos"]
		.sort((a, b) => b.volume - a.volume)
		.sort((a, b) => b.issue - a.issue);

	const articlesWithoutPhotos: ReceivedArticle[] = grouping["withoutPhotos"];
	// ].concat(grouping["withPhotos"].slice(0).slice(num_articles_with_images));
	const num_articles_each_side = Math.floor(articlesWithoutPhotos.length / 2);

	let sorted_articles = props.articles
		.slice(0)
		.sort((a, b) => b.volume - a.volume)
		.sort((a, b) => b.issue - a.issue);
	sorted_articles.splice(
		sorted_articles.findIndex((v) => v._id == articlesWithPhotos[0]._id),
		1
	);

	sorted_articles = [articlesWithPhotos[0], ...sorted_articles];

	return (
		<div id={styles.mixed_article_view}>
			<section id={styles.left}>
				{articlesWithoutPhotos
					.slice(0)
					.slice(0, num_articles_each_side)
					.map((article, index) => (
						<CenterArticle
							key={index}
							article={article}
							display_department={props.display_department}
						/>
					))}
			</section>
			<section id={styles.center_desktop}>
				<div className={styles.top}>
					{articlesWithPhotos
						.slice(0)
						.slice(0, 1)
						.map((article_iterator, index) => (
							<CenterArticle
								key={index}
								article={article_iterator}
								display_image
								display_department={props.display_department}
							/>
						))}
				</div>
				<div className={styles.bottom}>
					{articlesWithPhotos
						.slice(0)
						.slice(1)
						.map((article_iterator, index) => (
							<CenterArticle
								key={index}
								article={article_iterator}
								display_image
								display_department={props.display_department}
							/>
						))}
				</div>
			</section>
			<section id={styles.right}>
				{articlesWithoutPhotos
					.slice(0)
					.slice(num_articles_each_side)
					.map((article, index) => (
						<CenterArticle
							key={index}
							article={article}
							display_department={props.display_department}
						/>
					))}
			</section>
			<section id={styles.top_mobile}>
				{sorted_articles.slice(0).map((article_iterator, index) => (
					<CenterArticle
						key={index}
						article={article_iterator}
						display_image
						display_department={props.display_department}
					/>
				))}
			</section>
		</div>
	);
}
