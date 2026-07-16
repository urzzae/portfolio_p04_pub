const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pages = [
  { name: 'main',         template: 'pages/main.html',         filename: 'index.html' },
  { name: 'about',        template: 'pages/about.html',         filename: 'about.html' },
  { name: 'service',      template: 'pages/service.html',       filename: 'service.html' },
  { name: 'project',      template: 'pages/project.html',       filename: 'project.html' },
  { name: 'careers',      template: 'pages/careers.html',       filename: 'careers.html' },
  { name: 'contact',      template: 'pages/contact.html',       filename: 'contact.html' },
  { name: 'project_info', template: 'pages/project_info.html',  filename: 'project_info.html' },
];

const entry = {};
pages.forEach(({ name }) => {
  entry[name] = `./src/entries/${name}.js`;
});

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';

  return {
    entry,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'assets/js/[name].[contenthash:8].js',
      clean: true,
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { url: false } },
            {
              loader: 'sass-loader',
              options: {
                api: 'modern',
                sassOptions: {
                  quietDeps: true,
                  silenceDeprecations: ['legacy-js-api', 'global-builtin', 'color-functions', 'import'],
                },
              },
            },
          ],
        },
      ],
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: 'assets/css/[name].[contenthash:8].css',
      }),

      ...pages.map(
        ({ name, template, filename }) =>
          new HtmlWebpackPlugin({
            filename,
            template,
            chunks: [name],
            inject: 'body',
          })
      ),

      new CopyWebpackPlugin({
        patterns: [
          { from: 'images',              to: 'images' },
          { from: 'js/api',              to: 'js/api' },
          { from: 'css/webfont.css',     to: 'css/webfont.css', noErrorOnMissing: true },
          { from: 'pages/global',        to: 'global' },
        ],
      }),
    ],

    resolve: {
      alias: {
        '@scss': path.resolve(__dirname, 'scss'),
        '@js':   path.resolve(__dirname, 'js'),
      },
    },

    devServer: {
      static: {
        directory: path.resolve(__dirname, 'dist'),
      },
      port: 3000,
      open: true,
      hot: true,
    },

    devtool: isDev ? 'source-map' : false,
  };
};
