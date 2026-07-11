import rss from '@astrojs/rss';
import { getPosts } from '../utils/userData';
import { site } from '../../config';

export async function GET(context) {
	const posts = getPosts();
	return rss({
		title: site.SITE_TITLE,
		description: site.SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			title: post.title,
			description: post.description,
			pubDate: post.pubDate,
			link: `/blog/${post.slug}/`,
			categories: post.tags || [],
		})),
	});
}
