const path = require("path")

const toPath = (_path) => path.join(process.cwd(), _path);

module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  framework: "@storybook/react",
  typescript: {
    reactDocgen: false,
  },
  core: {
    builder: "webpack5",
  },
  webpackFinal: async (config) => {
    config.resolve.extensions.push('.svg')
    config.module.rules = config.module.rules.map(data => {
      if (/svg\|/.test( String(data.test)))
        data.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/
      return data
    })
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            prettier: false,
            svgo: false,
            titleProp: true,
            ref: true,
          },
        },
      ],
    })
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          "@emotion/core": toPath("node_modules/@emotion/react"),
          "emotion-theming": toPath("node_modules/@emotion/react"),
        },
      },
    };
  },
}
