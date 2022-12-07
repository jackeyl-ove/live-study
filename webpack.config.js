const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/ //表示node_modules中的tsx文件不做处理
      },
      {
        test: /\.scss$/,
        use: 'sass-loader',
      }
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  
}