var gulp = require('gulp'),
    path = require('path'),
    _ = require('lodash'),
    //导入插件
    webpack = require('webpack'),
    //CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin'),
    //ExtractTextPlugin = require('extract-text-webpack-plugin'),
    pack_config = {},
    packer = require('gulp-webpack'),
    babel = require('gulp-babel'),
    order = require('gulp-order'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),//合并文件
    //rename = require('gulp-rename'),//重命名
    //路径配置
    jsSrc = './scripts/*.js';
pack_config = {
    entry: './scripts/CGraph.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    babel: {
        presets: ['es2015']
    }
    // 别名 插件 线上线下 
};
// 编译es6
gulp.task('compile', function () {
    return gulp.src(['CGraph.js', jsSrc, '!*/all.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(order(['scripts/CGraph.js']))
        .pipe(concat('all.js'))
        .pipe(gulp.dest('scripts'));
});
// 删除
gulp.task('clean', function () {
    return gulp.src('scripts/all.js')
        .pipe(clean());
});
// 监控文件
gulp.task('auto', function () {
    gulp.watch(['!all.js', jsSrc], ['clean', 'compile']);
});
// 读取config配置

// 打包生成文件
gulp.task('webpack', ['webpack:clean'], function () {
    return gulp.src(['./scripts/*.js', '!all.js'])
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(gulp.dest('./temp'))
        .pipe(order(['scripts/CGraph.js', 'scripts/*.js']))
        .pipe(packer({
            watch: true,
            output: {
                path: path.resolve(__dirname, 'dist'),
                filename: 'bundle.js'
            },
            module: {
                // loaders: [{
                //     test: /\.js$/,
                //     exclude: /node_modules/,
                //     loader: 'babel-loader',
                // }]
            },
            plugins: [
                //抽离公共模块 js fuck error example
                //new CommonsChunkPlugin('common'),
                //new ExtractTextPlugin('[name].css')
            ]
        }))
        //.pipe(concat('all.js'))
        .pipe(gulp.dest('dist/'));
});
// 清理
gulp.task('webpack:clean', function () {
    return gulp.src('dist/*.js')
        .pipe(clean());
});
// 注册缺省任务
gulp.task('default', ['compile', 'auto']);