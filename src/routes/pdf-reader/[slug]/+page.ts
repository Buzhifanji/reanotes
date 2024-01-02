import { dev } from '$app/environment';

// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
export const csr = dev;

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;
export const ssr = false

export const load = ({ params }) => {
  // 从参数中获取slug，并返回相应的数据
  return {
    slug: params.slug
  }
}