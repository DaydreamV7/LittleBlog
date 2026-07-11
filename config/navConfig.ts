/**
 * navConfig.ts — 导航栏链接配置
 * 定义顶部导航栏显示的链接列表
 */

export interface NavLink {
  /** 链接地址 */
  href: string;
  /** 显示文本 */
  label: string;
}

/**
 * 导航链接列表
 * - href: 页面路径
 * - label: 导航栏显示的文字
 * 按数组顺序从左到右排列
 */
export const navLinks: NavLink[] = [
  { href: '/', label: '主页' },
  { href: '/archive', label: '归档' },
  { href: '/tools', label: '工具' },
  { href: '/about', label: '关于' },
];
