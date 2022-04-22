const path = require('path');

const conf = {
    entry: './src/client/main.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, 'public/')
        },
        port: 3000,
        devMiddleware: {
            publicPath: 'https://localhost:3000/',
            writeToDisk: true
        },
        hot: 'only'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/'),
        publicPath: path.join(__dirname, 'public/'),
        pathinfo: true
    }
};

module.exports = conf;
