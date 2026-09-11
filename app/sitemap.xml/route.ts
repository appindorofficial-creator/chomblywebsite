import { SITE } from "@/config/site";
import { sitemapPaths } from "@/lib/seo";
export function GET(){
 const urls=sitemapPaths();
 const xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+urls.map(path=>`<url><loc>${new URL(path,SITE.baseUrl).href}</loc></url>`).join("")+"</urlset>";
 return new Response(xml,{headers:{"Content-Type":"application/xml; charset=utf-8","Cache-Control":"public, max-age=300"}});
}
