import { SITE } from "@/config/site";
export function GET(){
 const body=SITE.indexingEnabled
   ? ["User-agent: *","Allow: /","",`Sitemap: ${SITE.baseUrl}/sitemap.xml`].join("\n")+"\n"
   : ["User-agent: *","Disallow: /"].join("\n")+"\n";
 return new Response(body,{headers:{"Content-Type":"text/plain; charset=utf-8","Cache-Control":"public, max-age=300"}});
}
