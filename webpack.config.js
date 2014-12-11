module.exports = {
  entry: './amalgamatr.js',
  output: {
    path: __dirname,
    filename: 'build/amalgamatr.js',
    publicPath: '/',
    library: "amalgamatr",
    libraryTarget: "umd"
  },
  resolve: {
    extensions: ['', '.js']
  },
  externals: {
    "jQuery": "jQuery",
  }
};
