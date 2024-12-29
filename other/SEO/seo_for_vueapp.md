# SEO Tips & Steps
Basic SEC step for Vue.js application.

# 1. Robots
A "robots.txt" file is a text file on a website that instructs search engine crawlers which pages on the site they can access and which ones they should not crawl, essentially acting as a set of rules to manage how search engines interact with a website and which content they can index; it's primarily used to prevent overloading a site with crawl requests by blocking access to specific areas like login pages or internal directories that aren't meant for public viewing.

**Add ```public/robots.txt``` in public folder**
```js
User-agent: *
Disallow:
Sitemap: https://www.softlandmyanmar.com/sitemap.xml
```

# 2. Sitemap
A "Sitemap.xml" file is a document on a website that lists all the important pages and URLs, allowing search engines like Google to easily crawl and index the site's content, essentially providing a roadmap for search engines to understand the website structure and prioritize which pages to discover and display in search results; it helps ensure all key pages are found and indexed efficiently, especially when new content is added.

**Add ```public/sitemap.xml``` in public folder**
```html
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://www.softlandmyanmar.com/</loc>
        <lastmod>2024-12-29</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://www.softlandmyanmar.com/services</loc>
        <lastmod>2024-12-29</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://www.softlandmyanmar.com/blogs</loc>
        <lastmod>2024-12-29</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://www.softlandmyanmar.com/contact</loc>
        <lastmod>2024-12-29</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
</urlset>
```

