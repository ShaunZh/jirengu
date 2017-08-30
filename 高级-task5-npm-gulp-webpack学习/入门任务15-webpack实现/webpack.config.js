var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './www/src/js/app/index.js',
  output: {
    filename: "app.bundle.js",
    path: path.resolve(__dirname + '/dist/js/')
  },
  /*plugins: [
    new UglifyJSPlugin()
  ],*/
  devtool: "source-map",

   module:{
     rules: [
       /*{
         test: /\.js$/,
	 exclude: /node_modules/,
	 use: ['babel-loader', 'script-loader']
       },
         test: /\.html$/,
	 use: 'html-loader'
       },
       {
       	 test: /\.css$/,
	 use: ['style-loader', 'css-loader']
       },
       {
 	 test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
	 use: [
	   {
	     loader: 'url-loader',
	     options: {
	       limit: 10000
	     }
	   }
	 ]
       }*/
     ]
   }
 }
