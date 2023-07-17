import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack, { WebpackPluginInstance, Compiler } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { BuildOptions } from './types/config';

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

export function buildPlugins({ isDev, paths }:BuildOptions): WebpackPluginInstance[] {
    const plugins = [new HtmlWebpackPlugin({
        template: paths.html,
    }),
    new webpack.ProgressPlugin(),

    new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
    }),
    new webpack.DefinePlugin({
        __IS_DEV__: JSON.stringify(isDev),
    }),

    ];

    if (isDev) {
        plugins.push(new webpack.HotModuleReplacementPlugin());
        plugins.push(new BundleAnalyzerPlugin({ openAnalyzer: false, analyzerPort: 8888 }));
        plugins.push(new ReactRefreshWebpackPlugin());
    }

    return plugins;
}
