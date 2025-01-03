# SEO Tips & Steps
Basic SEO step for Vue.js application.

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

# 3. Add domain name in Google Search Console
Add domain name in google search console for some enhancement.

1. Go to https://search.google.com/search-console/about
2. Add domain by clicking on "Add property"
3. After adding domain address, copy the google-site-verification link and go to domain provider, and create as a record at DNS records list
4. And click on verify button

Example DNS Records
```
TXT	@	0	"google-site-verification=oDL1ch6z_NcdjCgNqenKTIusqNKTcWZ3HUIck2wCq68"	14400
```

# 4. Submit sitemap to the google
After added ```sitemap.xml``` file in the project, push to the production to be able to submit in **google search console**. To submit sitemap.xml, just navigate to the ```Indexing/Sitemaps``` and paste the site map url (https://www.softlandmyanmar.com/sitemap.xml) and click on submit button.

# 5. Add Head tags in every page in the project
To add head tag for head elements in Vue app, there is no built in head component in Vue. So that ```unhead``` comes in handy. Just install it and use like the following
```js
// script
import { Head } from '@unhead/vue/components'

// template
<Head>
    <title>Softland | Home</title>
    <meta name="description"
        content="Software နှင့် Website ၊ Web Application တွေကို One-stop ရေးသားပေးနေပါသည်။" />
</Head>
```

For detail instruction, check this - 

https://unhead.unjs.io/setup/vue/installation

# 6. Add Schemas
Add schemas or JavaScript Object Notation for Linked Data to provide structured data to search engines. They help search engines better understand the content and structure of your website, enhancing its SEO.
```js
<!-- Schemas  -->
    <!-- Organization Schema -->
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Softland Myanmar",
        "url": "https://www.softlandmyanmar.com",
        "logo": "https://www.softlandmyanmar.com/logo.png", 
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+959 403 438 913", 
          "contactType": "Customer Service",
          "areaServed": ["MM"], 
          "availableLanguage": ["en", "my"]
        },
        "sameAs": [
          "https://www.facebook.com/hornbillit",
          "https://www.linkedin.com/in/hitmyanmar/"
        ]
      }
    </script>

    <!-- Breadcrumb Schema -->
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.softlandmyanmar.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://www.softlandmyanmar.com/services"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Blogs",
            "item": "https://www.softlandmyanmar.com/services/blogs"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Contact Us",
            "item": "https://www.softlandmyanmar.com/contact"
          }
        ]
      }
    </script>
```
