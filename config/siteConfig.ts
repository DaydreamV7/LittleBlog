/**
 * siteConfig.ts — 站点基础配置
 * 存放站点名称、描述、语言、起始日期、Logo 等全局设置
 */

/** 站点标题，显示在浏览器标签页和导航栏 */
export const SITE_TITLE = 'DM 的博客';

/** 站点描述，用于 SEO 和 RSS */
export const SITE_DESCRIPTION = '写代码、打游戏、记录生活。';

/** 站点语言代码，影响 HTML lang 属性 */
export const SITE_LANG = 'zh-CN';

/** 站点 URL（部署后修改为实际域名） */
export const SITE_URL = 'https://example.com';

/**
 * 站点起始日期（ISO 格式）
 * 用于计算"运行时长"统计指标
 * 格式：YYYY-MM-DD
 */
export const START_DATE = '2026-07-07';

/**
 * Logo 图片路径
 * 显示在顶部导航栏站点名称左侧
 * 置空或设为 undefined 则仅显示文字
 */
export const SITE_LOGO = '/user/assets/images/Avator.png';
