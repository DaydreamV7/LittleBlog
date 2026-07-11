/**
 * userData.ts — 数据读取层
 * 从 user/ 目录读取文章内容，从 config/ 读取配置
 * 提供分类/标签聚合、站点统计、搜索数据等函数
 */

import * as profileCfg from '../../config/profileConfig';
import * as announcementCfg from '../../config/announcementConfig';
import { START_DATE } from '../../config/siteConfig';
import momentsData from '../../user/moments.json';

type PostModule = {
	frontmatter: Record<string, unknown>;
	url?: string;
	default: unknown;
};

const postModules = import.meta.glob<PostModule>('../../user/posts/**/*.{md,mdx}', {
	eager: true,
}) as Record<string, PostModule>;

const postRawModules = import.meta.glob('../../user/posts/**/*.{md,mdx}', {
	eager: true,
	as: 'raw',
}) as Record<string, unknown>;

const aboutModules = import.meta.glob<PostModule>('../../user/pages/about.{md,mdx}', {
	eager: true,
}) as Record<string, PostModule>;

/* ============================================
 * 接口定义
 * ============================================ */

export interface Post {
	slug: string;
	title: string;
	description: string;
	pubDate: Date;
	updatedDate?: Date;
	heroImage?: string;
	font?: string;
	category?: string;
	tags?: string[];
	frontmatter: Record<string, unknown>;
	filePath: string;
	mod: PostModule;
}

export interface Profile {
	name: string;
	bio: string;
	avatar: string;
	social: Record<string, string | undefined>;
}

export interface Moment { id: string; content: string; date: string; }
export interface CategoryItem { name: string; count: number; }
export interface TagItem { name: string; count: number; }

export interface SiteStats {
	totalPosts: number;
	totalCategories: number;
	totalTags: number;
	totalWords: number;       // 所有文章累计字数
	uptime: string;           // 运行时长（天）
	lastActivity: string;     // 最近文章发布日期
}

/* ============================================
 * 工具函数
 * ============================================ */

function slugFromPath(path: string): string {
	const match = path.match(/user\/posts\/(.+)\.(md|mdx)$/);
	return match ? match[1] : '';
}

/* ============================================
 * 文章数据
 * ============================================ */

export function getPosts(): Post[] {
	const posts: Post[] = [];
	for (const [filePath, mod] of Object.entries(postModules)) {
		const slug = slugFromPath(filePath);
		if (!slug) continue;
		const fm = mod.frontmatter;
		posts.push({
			slug, title: (fm.title as string) || slug,
			description: (fm.description as string) || '',
			pubDate: fm.pubDate ? new Date(fm.pubDate as string) : new Date(),
			updatedDate: fm.updatedDate ? new Date(fm.updatedDate as string) : undefined,
			heroImage: fm.heroImage as string | undefined,
			font: fm.font as string | undefined,
			category: fm.category as string | undefined,
			tags: (fm.tags as string[]) || [],
			frontmatter: fm, filePath, mod,
		});
	}
	return posts.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
	return getPosts().find((p) => p.slug === slug);
}

export function getPostStaticPaths() {
	return getPosts().map((post) => ({ params: { slug: post.slug }, props: { post } }));
}

export function getPostsByCategory(category: string): Post[] {
	return getPosts().filter((p) => p.category === category);
}

export function getPostsByTag(tag: string): Post[] {
	return getPosts().filter((p) => p.tags?.includes(tag));
}

export function getPostsByDate(dateStr: string): Post[] {
	return getPosts().filter((p) => p.pubDate.toISOString().split('T')[0] === dateStr);
}

/* ============================================
 * 分类与标签
 * ============================================ */

export function getCategories(): CategoryItem[] {
	const map = new Map<string, number>();
	for (const post of getPosts()) {
		if (post.category) map.set(post.category, (map.get(post.category) || 0) + 1);
	}
	return Array.from(map.entries()).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
}

export function getTags(): TagItem[] {
	const map = new Map<string, number>();
	for (const post of getPosts()) {
		for (const tag of post.tags || []) map.set(tag, (map.get(tag) || 0) + 1);
	}
	return Array.from(map.entries()).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
}

/* ============================================
 * 站点统计
 * ============================================ */

/** 计算所有文章的总字数（基于 frontmatter.content 或简单估算） */
function getWordCount(): number {
	let total = 0;
	for (const rawContent of Object.values(postRawModules)) {
		const content = stripFrontmatter(rawContent || '');
		// 中文按字符数，英文按空格分词
		const chinese = (content.match(/[\u4e00-\u9fff]/g) || []).length;
		const english = content.replace(/[\u4e00-\u9fff]/g, '').trim().split(/\s+/).filter(Boolean).length;
		total += chinese + english;
	}
	return total;
}

function stripFrontmatter(content: unknown): string {
	const text = typeof content === 'string'
		? content
		: content && typeof content === 'object' && 'default' in content
			? String((content as { default?: unknown }).default || '')
			: '';
	return text.replace(/^---\s*[\r\n]+[\s\S]*?[\r\n]+---\s*[\r\n]*/, '');
}

/** 计算运行天数 */
function getUptime(): string {
	const start = new Date(START_DATE);
	const now = new Date();
	const days = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
	return `${days} 天`;
}

export function getStats(): SiteStats {
	const posts = getPosts();
	return {
		totalPosts: posts.length,
		totalCategories: getCategories().length,
		totalTags: getTags().length,
		totalWords: getWordCount(),
		uptime: getUptime(),
		lastActivity: posts.length > 0
			? posts[0].pubDate.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
			: '无',
	};
}

export function getPostDates(): string[] {
	return getPosts().map((p) => p.pubDate.toISOString().split('T')[0]);
}

export interface CalendarPost {
	id: string;
	title: string;
	published: string;
}

/** 日历组件数据：返回所有文章的 id/title/published，供客户端 JS 使用 */
export function getCalendarData(): CalendarPost[] {
	return getPosts().map((p) => ({
		id: p.slug,
		title: p.title,
		published: p.pubDate.toISOString().split('T')[0],
	}));
}

/* ============================================
 * 配置数据（从 config/ 读取）
 * ============================================ */

export function getProfile(): Profile {
	return {
		name: profileCfg.name,
		bio: profileCfg.bio,
		avatar: profileCfg.avatar,
		social: profileCfg.social,
	};
}

export function getAnnouncement() {
	if (!announcementCfg.enabled) return null;
	return {
		title: announcementCfg.title,
		content: announcementCfg.content,
		learnMore: announcementCfg.learnMore,
	};
}

/* ============================================
 * 页面数据
 * ============================================ */

export function getMoments(): Moment[] {
	return (momentsData as unknown as Moment[])
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAboutPage(): { frontmatter: Record<string, unknown>; mod: PostModule } | null {
	for (const [, mod] of Object.entries(aboutModules)) return { frontmatter: mod.frontmatter, mod };
	return null;
}

export function estimateReadingTime(content: string): number {
	return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200));
}
