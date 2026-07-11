# Development Log

## 2026-07-11（体验收口 + 站点统计修复）

### 本轮优化：把 Firefly 结构收紧，同时补足个性化

**做了什么**:

1. **站点统计字数修复**: 字数不再依赖 frontmatter 的伪字段，而是直接统计 `user/posts/` 里所有 Markdown 源文件的正文，先去掉 frontmatter，再按中文字符 + 英文单词计数。
2. **深色模式正文优化**: 文章详情、关于页、Markdown 预览的正文不再依赖 `prose-invert`，改成统一使用 CSS 变量，避免暗夜模式下出现偏深蓝、偏浅蓝的难读文本。
3. **布局收口**: 主容器宽度加大，左右侧栏停止内部滚动，详情页卡片更宽，留白更接近 Firefly，但保留当前站点的自定义感。
4. **搜索体验**: 顶部导航栏里的搜索框常驻显示，图标位于输入框内部，减少“先点图标再输入”的一步。
5. **文章与导航逻辑**: 文章点击后进入详情页，右侧栏继续显示大纲；归档/分类页继续保留日历，避免把所有页面都变成同一种信息结构。

**为什么这么做**:

- 让 Firefly 风格的“内容优先、卡片清晰、导航明确”真正落地，而不是只保留外壳。
- 让深色模式更适合长文阅读，避免高频出现浅蓝/深蓝文本造成视觉疲劳。
- 让统计、搜索、详情页和侧栏行为都变成“可预测”的固定规则，减少页面切换后的错觉和误判。

**做了会怎么样**:

- 站点统计会随着 `user/posts/` 里的文章总量真实变化，不再显示 0。
- 文章详情页在暗色模式下会更容易阅读，正文和标题不再偏蓝。
- 页面看起来更宽、更像一个完整博客，而不是内容挤在中间的小块区域。
- 导航和阅读流程更顺：先看到搜索，再看到分类，再进入文章和大纲。

**结果**: `npm run build` 通过，页面级浏览器检查无控制台错误。

## 2026-07-11（全量优化 + Bug 修复）

### 全量重构：路由过滤重写 + 布局对齐 Firefly + 搜索内联化 + 计时器重写

**目标**: 解决分类/标签点击不生效、右侧栏消失、CategoryNav 不对齐、搜索体验、计时器失效等核心问题。

**变更清单**:

1. **路由过滤重写（核心 Bug）**: 将归档过滤函数从 archive.astro 的 `<script is:inline>` 移至 BaseLayout.astro 的 bundled `<script>` 中，swup `contentReplaced` 事件直接调用。解决了 swup 不执行 inline script 导致标签/分类点击无效的问题。

2. **布局重构**: CategoryNav 移至 grid 的 main 列内部，与两侧栏等宽对齐。Header 和主体共享同一 max-w-[1400px] 容器，顶部导航栏与下方三栏等宽。

3. **搜索移至导航栏**: 移除搜索按钮 + 遮罩层模式，改为 Header 中的内联搜索框。聚焦时展开，输入即搜索（250ms 防抖），下拉结果展示。

4. **阅读计时器重写**: 字数统计改为客户端从 `.prose` DOM 读取纯文本（中文按字 + 英文按词）。计时器从 00:00 实时累计 MM:SS。

5. **文章详情页右侧栏**: 修复为 SiteStats + TOC（无日历），与列表页的 SiteStats + Calendar 区分。

6. **Logo + DM 单链接**: Logo 和站名在同一个 `<a href="/">` 内，点击整体跳转首页。

7. **Archive 页面清理**: 移除了全部 70+ 行冗余 inline script，过滤由 BaseLayout 统一管理。

**构建结果**: 10 pages built in 1.22s, 0 errors.

---
# Development Log

## 2026-07-10（细节精修 2）

### 8 项细节精修

**目标**: 完善博客细节体验，包括文档中文化、字体间距、卡片缩略图、分类导航、文章详情页、swup 过渡等。

**变更清单**:

1. **文档中文化**: DEVELOPMENT_LOG.md 全部英文内容（Step 0-9）转为简体中文，修复 TUTORIAL.md 中过时的 user/Fonts 路径引用。

2. **字体放大 + 间距调整**: BaseLayout gap 从 2rem 增至 2.5rem，PostList 标题从 text-lg 增至 text-xl。

3. **标签左对齐**: PostList 标签容器 justify-end → justify-start，移至卡片左下角。

4. **文章缩略图**: PostList 卡片改为 flex 左右结构，左侧 h-24 w-24 圆角缩略图（优先使用 heroImage，回退 profile.avatar）。

5. **分类导航栏 + 归档页精简**: CategoryNav 添加 2px 主色底部边框；归档页筛选状态简化为"归档 · 共 X 篇"。

6. **文章详情页优化**: 阅读时间 + 字数统计移至标题上方（?? X分钟阅读 · XX字），移除详情页重复的 description 显示。

7. **关于页美化**: about.astro 内容包裹在 .card 容器中。

8. **swup 集成**: 安装 swup，containers: ['#main-content']，淡入淡出 0.2s 过渡。

**构建结果**: 10 pages built in 1.44s, 0 errors.

---
# Development Log

## 2026-07-10锛堢簿淇敼閫狅級

### 绮句慨鏀归€狅細閰嶇疆鏋舵瀯 + 鍙屼富棰樿壊 + 鍔熻兘澧炲己

**鐩爣**: 寤虹珛 config/ 閰嶇疆鐩綍銆佸疄鐜板弻涓婚鑹茬郴缁熴€佸叏灞€棰滆壊杩佺Щ鑷?CSS 鍙橀噺銆佸姛鑳藉寮恒€?

**鏀归€犺寖鍥?*:

1. **閰嶇疆鐩綍寤虹珛** (`config/`)
   - 鏂板缓 6 涓厤缃枃浠? siteConfig, themeConfig, profileConfig, navConfig, announcementConfig, index
   - 杩佺Щ `src/consts.ts` 鈫?`config/siteConfig.ts`
   - 杩佺Щ `user/profile.json` 鈫?`config/profileConfig.ts`
   - 杩佺Щ `user/announcement.md` 鈫?`config/announcementConfig.ts`
   - 鍒犻櫎鏃ф枃浠? consts.ts, profile.json, announcement.md

2. **鍙屼富棰樿壊绯荤粺** (`src/styles/global.css`)
   - CSS 鍙橀噺鍥涘眰瑕嗙洊: :root (sky light) 鈫?html.dark (sky dark) 鈫?html[data-theme="mech"] (mech light) 鈫?html[data-theme="mech"].dark (mech dark)
   - 9 涓牳蹇冨彉閲? --color-bg, --color-bg-card, --color-bg-nav, --color-text, --color-text-secondary, --color-border, --color-primary, --color-primary-hover, --color-primary-light
   - 鏂板 --shadow-card 鍜?--shadow-card-hover

3. **甯冨眬浼樺寲** (`BaseLayout.astro`)
   - 瀹瑰櫒瀹藉害: max-w-7xl (1280px) 鈫?max-w-[1400px]
   - 鏍忛棿璺? gap-6 (24px) 鈫?gap-8 (32px)
   - 涓夋爮姣斾緥: 260px_1fr_280px 鈫?240px_1fr_260px
   - 鍗＄墖鍐呰竟璺? 1.25rem 鈫?1.5rem

4. **鏁版嵁灞傚寮?* (`src/utils/userData.ts`)
   - SiteStats 鎺ュ彛鎵╁睍: totalWords, uptime, lastActivity
   - 鏂板鍑芥暟: getPostsByDate(), getWordCount(), getUptime()
   - getProfile() 鍜?getAnnouncement() 鏀逛负浠?config/ 璇诲彇

5. **鍏ㄥ眬棰滆壊杩佺Щ** (15+ 涓粍浠?椤甸潰)
   - 鎵€鏈?text-gray-*, text-indigo-*, bg-indigo-*, bg-gray-* 纭紪鐮佽壊鍊兼浛鎹负 CSS 鍙橀噺鍐呰仈鏍峰紡
   - 绛涢€夐摼鎺ョ粺涓€浠?/blog?xxx 鏀逛负 /archive?xxx

6. **鍔熻兘澧炲己**
   - PostList: 鏂板鍒嗙被瀵艰埅鏍忥紙姘村钩婊氬姩鏍囩锛?
   - archive.astro: 鍗囩骇涓虹瓫閫変腑鏋紙鏀寔 ?category=?tag=?date= 鍙傛暟锛?
   - Calendar: 鍙偣鍑绘棩鏈熻烦杞?/archive?date=YYYY-MM-DD
   - SiteStats: 鎵╁睍涓?6 椤规寚鏍?+ grid-cols-2 甯冨眬
   - Announcement: 澧炲姞鈥滀簡瑙ｆ洿澶氣€滳TA 鎸夐挳
   - ThemeToggle: 鏂板闀挎寜鍒囨崲涓婚鑹插姛鑳?
   - blog/index.astro: 閲嶅畾鍚戣嚦 /archive

7. **鏋勫缓閰嶇疆**
   - astro.config.mjs: 鏂板 @config alias
   - package.json: 鏂板 pagefind 渚濊禆鍜?build:search 鑴氭湰
   - Vite resolve alias: @user, @config

8. **鏂囨。浣撶郴**
   - README.md: 瀹屽叏閲嶅啓锛屼腑鏂囬」鐩粙缁?
   - docs/USER_GUIDE.md: 鏂板缓锛岄潰鍚戠敤鎴风殑閰嶇疆鎸囧崡
   - docs/TUTORIAL.md: 閲嶅啓锛屾灦鏋勮璁¤В鏋?
   - docs/DEVELOPMENT_LOG.md: 杩藉姞鏈绮句慨璁板綍

**鏋勫缓缁撴灉**: 10 pages built in ~1s, 0 errors.

---

## 2026-07-11

### Firefly 椋庢牸鍏ㄩ潰鏀归€?

**鐩爣**: 鍙傜収 Firefly (Material Design 3) 椋庢牸锛屽叏闈㈤噸鍐欏崥瀹?UI 缁勪欢锛屾坊鍔犳殫鑹叉ā寮忋€佸垎绫?鏍囩绯荤粺銆佹棩鍘嗐€佹悳绱㈢瓑鍔熻兘銆?

**鏀归€犺寖鍥?*:

1. **global.css 娓呯悊 + 鏆楄壊妯″紡鍩虹璁炬柦**
   - 娓呯悊浜?398 琛屼腑绾?270 琛岄噸澶嶇殑鏃?Bear Blog CSS
   - 鏂板 CSS 鍙橀噺绯荤粺 (`--color-bg`, `--color-bg-card`, `--color-text` 绛?
   - 浣跨敤 `@custom-variant dark` 鍚敤 Tailwind v4 class-based 鏆楄壊妯″紡

2. **鏁版嵁灞傛墿灞?* (`src/utils/userData.ts`)
   - 鏂板鎺ュ彛: `CategoryItem`, `TagItem`, `SiteStats`
   - 鏂板鍑芥暟: `getCategories()`, `getTags()`, `getPostsByCategory()`, `getPostsByTag()`, `getStats()`, `getPostDates()`, `getAnnouncement()`
   - Post 鎺ュ彛鏂板: `category?: string`, `tags?: string[]`

3. **鏂板缓缁勪欢** (8涓?
   - `ThemeToggle.astro`: 浜殫妯″紡鍒囨崲鎸夐挳锛宭ocalStorage 鎸佷箙鍖?
   - `SearchOverlay.astro`: 鍏ㄦ枃鎼滅储閬僵灞傦紝Ctrl+K 蹇嵎閿?
   - `Announcement.astro`: 鍏憡鍗＄墖锛岃鍙?user/announcement.md
   - `Categories.astro`: 鍒嗙被鍒楄〃锛屽甫璁℃暟鍜岀瓫閫夐珮浜?
   - `TagCloud.astro`: 鏍囩浜戯紝鎸夐鐜囧彉鍖栧ぇ灏?
   - `SiteStats.astro`: 绔欑偣缁熻 (鏂囩珷/鍒嗙被/鏍囩鏁伴噺)
   - `Calendar.astro`: 鏈堝巻缁勪欢锛屾湁鏂囩珷鐨勬棩鏈熸爣璁板皬鍦嗙偣
   - `tools/markdown-preview.astro`: Markdown 瀹炴椂棰勮鍣?

4. **閲嶅啓缁勪欢** (8涓?
   - `Header.astro`: 姣涚幓鐠冩晥鏋?+ 鍥哄畾椤堕儴 + 涓枃瀵艰埅
   - `Profile.astro`: Firefly 椋庢牸璧勬枡鍗?(compact/full 涓ょ妯″紡)
   - `Moments.astro`: 浠呮樉绀烘渶杩?3 鏉★紝MM-DD 鏃ユ湡鏍煎紡
   - `PostList.astro`: 鏀寔 ?category= 鍜??tag= URL 鍙傛暟绛涢€?
   - `BlogPostLayout.astro`: TOC 绉昏嚦鍙充晶杈规爮 slot
   - `TableOfContents.astro`: 宸︿晶绔栫嚎鎸囩ず鍣?+ IntersectionObserver 婊氬姩楂樹寒
   - `BaseHead.astro`: 鏆楄壊妯″紡闃查棯鐑佽剼鏈?
   - `Footer.astro`: 涓枃椤佃剼

5. **甯冨眬閲嶅啓** (`src/layouts/BaseLayout.astro`)
   - 涓夋爮鍝嶅簲寮? xl(>=1280px)涓夋爮, md(>=768px)涓ゆ爮, <768px鍗曟爮
   - 宸︽爮鍥哄畾: Profile + Announcement + Categories + TagCloud + Moments
   - 鍙虫爮 slot: 鍒楄〃椤典紶 SiteStats+Calendar锛屾枃绔犻〉浼?TOC

6. **椤甸潰璺敱**
   - 鏂板缓: `archive.astro` (鎸夊勾浠藉垎缁勭殑鏂囩珷鏃堕棿绾?
   - 鏂板缓: `tools/index.astro` (宸ュ叿鍒楄〃椤?
   - 閲嶅啓: `index.astro`, `blog/index.astro` (涓夋爮 + 鍙虫爮缁勪欢)

7. **鏁版嵁鏇存柊**
   - `user/announcement.md`: 绀轰緥鍏憡
   - `user/profile.json`: 涓枃 Bio
   - `user/moments.json`: 涓枃鍐呭
   - 绀轰緥鏂囩珷: 娣诲姞 category 鍜?tags 瀛楁
   - `src/consts.ts`: 涓枃绔欏悕鍜屾弿杩?

**鏋勫缓缁撴灉**: 10 pages built in ~1s, 0 errors.
- `/index.html`, `/about/`, `/archive/`, `/blog/`
- `/blog/hello-world/`, `/blog/pixel-games/`, `/blog/nested/deep-post/`, `/blog/game/celeste/`
- `/tools/`, `/tools/markdown-preview/`
- `/rss.xml`, `/sitemap-index.xml`

---

## 2026-07-10

### 绗?0 姝ワ細鍒濆鍖栭」鐩粨鏋?

**鍒涘缓鐨勬枃浠讹細**
- `docs/DEVELOPMENT_LOG.md`锛堟湰鏂囦欢锛?

**鐩殑锛?* 鍦ㄤ唬鐮佸彉鏇村墠寤虹珛鎿嶄綔鏃ュ織鏈哄埗銆?

---

### 绗?1 姝ワ細鍒涘缓 `user/` 鐩綍缁撴瀯

**鍒涘缓鐨勬枃浠讹細**
- `user/assets/`锛堝ご鍍忋€佸浘鐗囷級
- `user/Fonts/`锛圖efault.woff2銆丆ode.woff2銆丳ixel.woff2 鍗犱綅鏂囦欢锛?
- `user/Fonts/README.md`
- `user/posts/`锛堝崥瀹㈡枃绔犳牴鐩綍锛?
- `user/posts/nested/`锛堝祵濂楃洰褰曟紨绀猴級
- `user/pages/`锛堥潤鎬侀〉闈級

**鐩殑锛?* 鎵€鏈変釜浜烘暟鎹殑鍗曚竴浜嬪疄鏉ユ簮锛屽畬鍏ㄥ彲绉绘涓旇嚜鍖呭惈銆?

**鍐崇瓥锛氫负浠€涔堢敤 `user/` 鑰屼笉鏄?`src/content/`锛?*
- `src/content/` 涓?Astro 鐨?Content Collections锛圸od schema锛夌揣瀵嗚€﹀悎锛岄檺鍒朵簡鏂囦欢澶瑰祵濂楃殑鐏垫椿鎬с€?
- `user/` 鏄鏋舵棤鍏崇殑鈥斺€斿鏋滃皢鏉ヨ縼绉诲埌 Hugo/11ty锛屾暟鎹洰褰曞彲浠ョ洿鎺ユ惉璧般€?

---

### 绗?2 姝ワ細瀹夎渚濊禆

**淇敼锛?* `package.json`
**鏂板锛?* `tailwindcss@^4.3.2`銆乣@tailwindcss/vite@^4.3.2`銆乣@tailwindcss/typography@^0.5.20`銆乣remark-toc`

**鍐崇瓥锛氫负浠€涔堢敤 `@tailwindcss/vite` 鑰屼笉鏄?`@astrojs/tailwind`锛?*
- `@astrojs/tailwind` 浠呮敮鎸?Astro ^3 || ^4 || ^5銆傛湰椤圭洰浣跨敤 Astro ^7銆?
- Tailwind v4 鐨勫畼鏂?Astro 闆嗘垚鏂瑰紡灏辨槸鐩存帴浣跨敤 `@tailwindcss/vite` 浣滀负 Vite 鎻掍欢銆?
- 杩欏疄闄呬笂鏇寸畝鍗曗€斺€斾笉闇€瑕?Astro 闆嗘垚鍖呰灞傘€?

---

### 绗?3 姝ワ細鏍稿績閰嶇疆閲嶅啓

**淇敼锛?* `astro.config.mjs`銆乣tsconfig.json`
**鍒涘缓锛?* 锛堟棤 tailwind.config.mjs鈥斺€擳ailwind v4 浣跨敤鍩轰簬 CSS 鐨勯厤缃級
**淇敼锛?* `src/styles/global.css`

**鍏抽敭鍐崇瓥锛?*
- Tailwind v4 鐨勯厤缃€氳繃 `global.css` 涓殑 CSS 鎸囦护锛坄@source`銆乣@plugin`銆乣@theme`锛夊畬鎴愶紝鑰屼笉鏄崟鐙殑 JS 閰嶇疆鏂囦欢銆?
- 鑷畾涔?Vite 鎻掍欢 `userAssetsPlugin()` 鍚屾椂澶勭悊寮€鍙戞ā寮忥紙涓棿浠讹級鍜屾瀯寤烘ā寮忥紙writeBundle 澶嶅埗锛変腑 `user/assets/` 鍜?`user/Fonts/` 鐨勯潤鎬佽祫婧愩€?
- 鍦?tsconfig 涓坊鍔犱簡 `vite/client` 绫诲瀷浠ユ敮鎸?`import.meta.glob`銆?

**閬囧埌鐨勯敊璇細**
- `.astro` frontmatter 涓寘鍚?`**/*.md` glob 妯″紡鐨?JSDoc 娉ㄩ噴瀵艰嚧 `CompilerError: Unexpected token`銆備慨澶嶏細鍒犻櫎杩欎簺娉ㄩ噴銆?
- `astro.config.mjs` 涓殑 `// @ts-check` 瀵艰嚧鏃犵被鍨嬬殑 Vite 鎻掍欢鍙傛暟浜х敓 TypeScript 閿欒銆備慨澶嶏細鍒犻櫎 `@ts-check`銆?
- Write 宸ュ叿杩藉姞鑰岄潪鏇挎崲鍐呭銆備慨澶嶏細瀵规瘡涓枃浠朵娇鐢?Write 宸ュ叿鐨勮鍐欐ā寮忋€?

---

### 绗?4 姝ワ細鏁版嵁灞?

**鍒涘缓锛?* `src/utils/userData.ts`
**鍒犻櫎锛?* `src/content.config.ts`

**鍐崇瓥锛氫负浠€涔堢敤 `import.meta.glob` 鑰屼笉鏄?Content Collections锛?*
- Content Collections 闇€瑕?Zod schemas锛岄檺鍒朵簡 frontmatter 鐨勭伒娲绘€с€?
- `import.meta.glob` 鏀寔浠绘剰鐩綍娣卞害鍜屼换鎰?frontmatter 褰㈢姸銆?
- 鐢ㄦ埛鏄庣‘瑕佹眰鏃?schema 鐨勬暟鎹鍙栨柟寮忋€?

---

### 绗?5 姝ワ細缁勪欢涓庨〉闈?

**鍒涘缓锛?* `BaseLayout.astro`銆乣BlogPostLayout.astro`銆乣Profile.astro`銆乣Moments.astro`銆乣PostList.astro`銆乣TableOfContents.astro`
**淇敼锛?* `BaseHead.astro`銆乣Header.astro`銆乣Footer.astro`銆乣FormattedDate.astro`锛堟湭淇敼锛?
**閲嶅啓锛?* `index.astro`銆乣blog/index.astro`銆乣blog/[...slug].astro`銆乣about.astro`銆乣rss.xml.js`

---

### 绗?7 姝ワ細绀轰緥鏁版嵁

**鍒涘缓锛?* `user/profile.json`銆乣user/moments.json`銆乣user/posts/hello-world.md`銆乣user/posts/nested/deep-post.md`銆乣user/posts/pixel-games.md`銆乣user/pages/about.md`

---

### 绗?8 姝ワ細娓呯悊涓庢瀯寤洪獙璇?

**鍒犻櫎锛?* `src/content/blog/*`銆乣src/assets/blog-placeholder-*.jpg`銆乣src/layouts/BlogPost.astro`銆乣src/components/HeaderLink.astro`

**鏋勫缓缁撴灉锛?* 6 涓〉闈㈠湪绾?1 绉掑唴鏋勫缓鎴愬姛銆?
- `/index.html`銆乣/about/index.html`銆乣/blog/index.html`
- `/blog/hello-world/index.html`銆乣/blog/nested/deep-post/index.html`銆乣/blog/pixel-games/index.html`
- `/rss.xml`銆乣/sitemap-index.xml`
- Vite 鎻掍欢鍒涘缓浜?`dist/Fonts/` 鍜?`dist/user/assets/`

---

### 绗?9 姝ワ細UI 绮剧偧 鈥?Firefly 鏍稿績

**淇敼锛?* `PostList.astro`銆乣Moments.astro`
**鍒涘缓锛?* `user/posts/game/celeste.md`锛堝儚绱犲瓧浣撻獙璇侊級

**鍙樻洿锛?*
- PostList锛氱Щ闄ゆ弿杩拌鍜屽儚绱犳爣绛惧窘绔犮€傜幇鍦ㄥ彧鏄剧ず鏍囬 + 鏃ユ湡銆?
- Moments锛氱Щ闄ゆ墍鏈?`#hashtag` 鏍囩銆傛棩鏈熸牸寮忎粠鐩稿鏃堕棿锛堜粖澶?鏄ㄥぉ锛夋敼涓轰弗鏍肩殑 `MM-DD` 鏍煎紡銆?
- Profile锛氬凡绾噣锛堝ご鍍?+ 鍚嶇О + 绠€浠?+ 绀句氦閾炬帴锛夈€傛棤缁熻/瀛楁暟/杩愯鏃躲€?
- 鍒涘缓浜?`user/posts/game/celeste.md`锛宖rontmatter 涓寘鍚?`font: "pixel"`銆?

**楠岃瘉锛?*
- 鏋勫缓杈撳嚭纭 `/blog/game/celeste/` 鏈?`<article class="font-pixel-active">`銆?
- 闈炲儚绱犳枃绔狅紙濡?`/blog/hello-world/`锛夋覆鏌撶殑 `<article>` 娌℃湁鍍忕礌绫汇€?
- 渚ц竟鏍?Profile 濮嬬粓浣跨敤 `--font-default`锛堝儚绱犵被浠呬綔鐢ㄤ簬 `<article>` 鍐呴儴锛夈€?
- 鏋勫缓缁撴灉锛? 涓〉闈紝0 涓敊璇€?


