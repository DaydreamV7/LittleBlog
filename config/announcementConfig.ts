/**
 * announcementConfig.ts — 公告配置
 * 控制左侧边栏公告卡片的显示内容和行为
 * 原 user/announcement.md 迁移至此
 */

/** 是否显示公告卡片（设为 false 即可隐藏） */
export const enabled = true;

/** 公告标题 */
export const title = '公告';

/**
 * 公告正文内容（支持多行文本）
 * 使用模板字符串可包含换行
 */
export const content = '正在重构博客中... 基于 Astro 7 + Tailwind CSS v4 的全新架构，数据完全存储在 user/ 目录下。';

/**
 * "了解更多"按钮配置
 * - enabled: 是否显示按钮
 * - href: 点击跳转的链接
 * - label: 按钮文字
 */
export const learnMore = {
  enabled: true,
  href: '/about',
  label: '了解更多',
};
