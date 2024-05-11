import localFont from 'next/font/local'

export const fontSans = localFont({
  src: [
    {
      path: '../assets/fonts/sf-pro-text-regular-webfont.woff2',
      weight: '400',
      style: 'light',
    },
    {
      path: '../assets/fonts/sf-pro-text-regular-webfont.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/sf-pro-text-semibold-webfont.woff2',
      weight: '600',
      style: 'semibold',
    },
    {
      path: '../assets/fonts/sf-pro-text-medium-webfont.woff2',
      weight: '600',
      style: 'medium',
    },
    {
      path: '../assets/fonts/sf-pro-text-bold-webfont.woff2',
      weight: '700',
      style: 'bold',
    },
  ],
  variable: '--font-sans',
})

// export const fontSans = localFont({
// 	src: [
// 		{
// 			path: '../assets/fonts/Satoshi-Regular.woff2',
// 			weight: '400',
// 			style: 'normal',
// 		},
// 		{
// 			path: '../assets/fonts/Satoshi-Medium.woff2',
// 			weight: '500',
// 			style: 'normal',
// 		},
// 		{
// 			path: '../assets/fonts/Satoshi-Medium.woff2',
// 			weight: '600',
// 			style: 'semibold',
// 		},
// 		{
// 			path: '../assets/fonts/Satoshi-Bold.woff2',
// 			weight: '700',
// 			style: 'bold',
// 		},
// 		{
// 			path: '../assets/fonts/Satoshi-Black.woff2',
// 			weight: '900',
// 			style: 'black',
// 		},
// 	],
// 	variable: '--font-sans',
// });

// export const fontSans = localFont({
// 	src: '../assets/fonts/sf-pro-text-regular-webfont.woff2',
// 	weight: '500',
// 	variable: '--font-sans',
// 	display: 'swap',
// });

// Font files can be collocated inside `pages`
export const fontHeading = localFont({
  src: '../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading',
})
