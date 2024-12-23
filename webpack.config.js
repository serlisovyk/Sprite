const config = {
  mode: 'production',
  entry: {
    index: './src/js/**/*.js',
  },
  output: {
    filename: 'script.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}

export default config
