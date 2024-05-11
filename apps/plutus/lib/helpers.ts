import urls from '@/constants/url'

const _isProduction = process.env.NODE_ENV === 'production'

export const getRedirectUrl = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    urls.app.overview
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https:${url}`
  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
  return url
}

// export const getRedirectUrl = () => {
// 	let url = process?.env?.NEXT_PUBLIC_SITE_URL ?? urls.app.overview;
// 	// Make sure to include `https://` when not localhost.
// 	url = isProduction ? `https:${url}` : `http:${url}`;
// 	// Make sure to including trailing `/`.
// 	url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
// 	return url;
// };
