/**
 * config/index.ts — 配置聚合导出
 * 所有配置文件统一从此处导入，供组件和工具函数引用
 *
 * 使用方式：
 *   import { site, profile, theme, nav, announcement } from '../config';
 */

import * as site from './siteConfig';
import * as profile from './profileConfig';
import * as theme from './themeConfig';
import * as nav from './navConfig';
import * as announcement from './announcementConfig';

export { site, profile, theme, nav, announcement };

/** 获取完整配置对象（便于一次性传递） */
export function getConfig() {
  return { site, profile, theme, nav, announcement };
}
