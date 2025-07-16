/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://campusconnects.in',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/Auth/*', '/admin/*', '/dashboard/*', '/api/*'], // exclude private/backend paths
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', disallow: ['/Auth', '/admin', '/dashboard'] },
    ],
  },
}
