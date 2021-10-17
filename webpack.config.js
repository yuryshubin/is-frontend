const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: './src/index.tsx',
   mode: process.env.NODE_ENV || 'development',
   module: {
      rules: [
         {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
         },
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
         },
         {
            test: /\.(css|scss)$/,
            use: ['style-loader', 'css-loader'],
         },
         {
            test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
            use: ['file-loader'],
         },
      ],
   },
   resolve: {
      extensions: ['.tsx', '.ts', '.js'],
   },
   output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: path.join(__dirname, 'public', 'index.html'),
      }),
   ],
};
