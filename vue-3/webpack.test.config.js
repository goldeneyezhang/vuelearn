var path = require('path');
var webpack = require('webpack');
module.exports={
    module:{
        loaders:[{
            test:/\.js$/,
            loader:'babel-loader',
            
            exclude:[
               path.resolve( __dirname, './test' ), path.resolve( __dirname, './node_modules' )
            ]
        },
            {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
              loaders: {
              }
              // other vue-loader options go here
            }
          },
          {
            test: /\.less$/,
            loader: "style-loader!css-loader!less-loader",
            
            },
            {
                test: /\.css$/,
                use: [
                  'vue-style-loader',
                  'css-loader'
                ],
              },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
    }
};