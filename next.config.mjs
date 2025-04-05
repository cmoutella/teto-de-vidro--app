/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['pt-BR', 'en', 'es'],
    defaultLocale: 'pt-BR'
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    return config
  }
}

export default nextConfig
