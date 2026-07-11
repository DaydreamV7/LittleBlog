import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import remarkToc from 'remark-toc';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Vite plugin: copies user/assets/ to dist/user/assets/ at build time,
 * and serves /user/* from user/ directory during dev.
 * 字体文件统一存放在 user/assets/fonts/
 */
function userAssetsPlugin() {
	const userDir = path.resolve(__dirname, 'user');
	const assetsDir = path.resolve(userDir, 'assets');

	return {
		name: 'user-assets',
		enforce: 'pre',

		// Dev server: serve /user/* from user/ directory
		configureServer(server) {
			server.middlewares.use((req, res, next) => {
				const url = req.url || '';

				// Serve /user/* -> user/*
				if (url.startsWith('/user/')) {
					const relativePath = url.replace('/user/', '');
					const filePath = path.join(userDir, relativePath);
					if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
						const ext = path.extname(filePath).toLowerCase();
						const mimeTypes = {
							'.png': 'image/png',
							'.jpg': 'image/jpeg',
							'.jpeg': 'image/jpeg',
							'.gif': 'image/gif',
							'.svg': 'image/svg+xml',
							'.webp': 'image/webp',
							'.woff2': 'font/woff2',
							'.woff': 'font/woff',
							'.ttf': 'font/ttf',
							'.otf': 'font/otf',
						};
						res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
						res.setHeader('Cache-Control', 'no-cache');
						fs.createReadStream(filePath).pipe(res);
						return;
					}
				}

				next();
			});
		},

		// Build: copy user/assets/ -> dist/user/assets/
		writeBundle(options) {
			const outDir = options.dir || path.resolve(__dirname, 'dist');

			function copyDirSync(src, dest) {
				if (!fs.existsSync(src)) return;
				fs.mkdirSync(dest, { recursive: true });
				const entries = fs.readdirSync(src, { withFileTypes: true });
				for (const entry of entries) {
					const srcPath = path.join(src, entry.name);
					const destPath = path.join(dest, entry.name);
					if (entry.isDirectory()) {
						copyDirSync(srcPath, destPath);
					} else {
						fs.copyFileSync(srcPath, destPath);
					}
				}
			}

			// Copy user/assets/ -> dist/user/assets/
			const distUserAssets = path.join(outDir, 'user', 'assets');
			copyDirSync(assetsDir, distUserAssets);
		},
	};
}

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	integrations: [mdx(), sitemap()],
	markdown: {
		remarkPlugins: [
			[remarkToc, { tight: true, maxDepth: 4 }],
		],
	},
	vite: {
		plugins: [tailwindcss(), userAssetsPlugin()],
		resolve: {
			alias: {
				'@user': path.resolve(__dirname, 'user'),
				'@config': path.resolve(__dirname, 'config'),
			},
		},
	},
});
