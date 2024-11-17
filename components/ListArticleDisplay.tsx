import {
	ReceivedArticle,
	DepartmentsArray,
	DepartmentsArrayDisplay,
} from "../ts_types/db_types";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/ListArticleDisplay.module.css";
import ArticlePreviewText from "./ArticlePreviewText";
import generate_contributors_jsx from "./GenerateContributorsJSX";

export default function ListArticleDisplay(props: {
	articles: ReceivedArticle[];
	hideImg?: boolean;
}) {
	return (
		<section id={styles.list_view}>
			{props.articles.map((article) => (
				<div className={styles.item} key={article._id as any}>
					<div className={styles.inner_item}>
						<div className={styles.item_left}>
							<p className={styles.department + " discrete-link"}>
								<Link
									href={`/department/${DepartmentsArray[article.section_id]
										}`}
								>
									{
										DepartmentsArrayDisplay[
										article.section_id
										]
									}
								</Link>
							</p>
							<h2>
								<Link
									href={"/article/" + article.slug}
									className="discrete-link"
									dangerouslySetInnerHTML={{ __html: article.title }}
								>
								</Link>
							</h2>
							<div className={styles.authors}>
								{generate_contributors_jsx(
									article.contributors
								)}
							</div>
							<p className={styles.summary}>
								<Link
									href={"/article/" + article.slug}
									className="discrete-link"
								>
									{article.summary}
								</Link>
							</p>
							<p className={styles.article_volume_issue}>
								<Link
									href={`/volume/${article.volume}/issue/${article.issue}`}
								>
									Issue {article.issue}, Volume{" "}
									{article.volume}
								</Link>
							</p>
						</div>

						{article.cover_image ? (
							<div className={styles.image_div}>
								<Image
									fill
									src={article.cover_image}
									alt="Cover Image"
									className={styles.image}
								/>
							</div>
						) : (
							<></>
						)}
					</div>
				</div>
			))}
		</section>
	);
}
