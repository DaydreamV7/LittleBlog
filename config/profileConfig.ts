/**
 * profileConfig.ts — 个人资料配置
 * 存放博主昵称、简介、社交链接、头像路径等
 * 原 user/profile.json 迁移至此
 */

/** 博主显示名称 */
export const name = 'DM';

/** 一句话简介 */
export const bio = '写代码、打游戏、记录生活。';

/**
 * 头像路径
 * 指向 user/assets/ 目录下的图片文件
 * 构建时由 Vite 插件自动复制到 dist/user/assets/
 */
export const avatar = '/user/assets/images/Avator.png';

/**
 * 社交链接配置
 * - key 为平台名称（GitHub / Twitter / Email）
 * - value 为链接地址
 * - 设为 undefined 或注释掉即可隐藏对应图标
 */
export const social = {
  github: 'https://github.com/yourusername',
  twitter: 'https://twitter.com/yourusername',
  email: 'mailto:you@example.com',
  // mastodon: 'https://mastodon.social/@yourusername',  // 可选：添加 Mastodon
  // bilibili: 'https://space.bilibili.com/yourid',      // 可选：添加 B 站
};
