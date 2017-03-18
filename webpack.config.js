module.exports = {
  context: __dirname + '/app/front',
  entry: './app.js',
  output: {
    filename: 'app.js',
    path: __dirname + '/public',
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["es2015", "react"]
        }
      }
    ]
  },
};
