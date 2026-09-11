import {RenderPage,pageMetadata} from '@/components/site-pages';
import {notFound} from 'next/navigation';
import {legacyProductEnabled} from '@/config/site';
export const dynamic='force-dynamic';
export const metadata={...pageMetadata('/administracion','es'),robots:{index:false,follow:false}};
export default function Page(){if(!legacyProductEnabled())notFound();return <RenderPage path="/administracion" lang="es"/>}
