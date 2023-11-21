/* eslint-disable unicorn/prefer-module */
/** @type {import('next').NextConfig} */

const path = require('node:path')

module.exports = {
  experimental: {
    serverActions: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            titleProp: true,
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    })
    return config
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'assets/styles')],
  },
}
