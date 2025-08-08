const isProduction = process.env.NODE_ENV === 'production';
const domain = isProduction ? 'debugboard.org' : 'localhost:3000';
const protocol = isProduction ? 'https' : 'http';

/**
 * @type {import('next-sitemap').IConfig}
 */
module.exports = {
	siteUrl: `${protocol}://${domain}`,
	generateRobotsTxt: true,
	exclude: ['/server-sitemap.xml', '/404', '/error'],
	changefreq: 'daily',
	priority: 0.7,
	sitemapSize: 5000,
	robotsTxtOptions: {
		policies: [
			{
				userAgent: '*',
				allow: '/',
			},
			{
				userAgent: '*',
				disallow: ['/api/', '/_next/', '/404', '/error'],
			},
		],
		additionalSitemaps: [
			`${protocol}://${domain}/sitemap.xml`,
			`${protocol}://${domain}/server-sitemap.xml`,
		],
	},
	transform: async (config, path) => {
		// Custom priority for different page types
		let priority = 0.7;
		let changefreq = 'daily';

		if (path === '/') {
			priority = 1.0;
			changefreq = 'daily';
		} else if (path.startsWith('/blog/')) {
			priority = 0.8;
			changefreq = 'weekly';
		} else if (path === '/blog') {
			priority = 0.9;
			changefreq = 'daily';
		} else if (path === '/projects') {
			priority = 0.8;
			changefreq = 'weekly';
		}

		return {
			loc: path,
			changefreq,
			priority,
			lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
		};
	},
};