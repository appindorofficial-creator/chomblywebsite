import {RenderPage,pageMetadata} from '@/components/site-pages';
import {notFound} from 'next/navigation';
import {legacyProductEnabled} from '@/config/site';
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props){return {...pageMetadata('/servicios/'+(await params).slug,'es'),robots:{index:false,follow:false}}}
export default async function Page({params}:Props){if(!legacyProductEnabled())notFound();return <RenderPage path={'/servicios/'+(await params).slug} lang="es"/>}
