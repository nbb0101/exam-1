//引入+下载
var gulp = require('gulp');
//把scss文件编译为css文件
var sass = require('gulp-sass');
//自动添加前缀
var autoprefixer = require('gulp-autoprefixer');
//压缩css
var minCss = require('gulp-clean-css');
//压缩js
var minJs = require('gulp-uglify');
//压缩html
var minHtml = require('gulp-htmlmin');
//删除文件
var clean = require('gulp-clean');
//设置gulp任务的执行顺序
var sequence = require('gulp-sequence');
//起服务
var server = require('gulp-webserver');

//引入数据
var data = require('./data/data.json');


//删除目标文件
gulp.task('clean', function() {
    return gulp.src('target')
        .pipe(clean())
});
gulp.task('cleanCss', function() {
    gulp.src('target/css/*.css')
        .pipe(clean())
});

//css文件的操作
//转义scss,压缩css
gulp.task('minCss', ['cleanCss'], function() {
    return gulp.src('src/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ["last 2 versions", "Android >= 4.0"]
        }))
        .pipe(minCss())
        .pipe(gulp.dest('target'))
});
//拷贝css
gulp.task('copyCss', function() {
    return gulp.src('src/css/*.css')
        .pipe(gulp.dest('target/css'))
});

//js文件的操作
//压缩js
gulp.task('minJs', function() {
    return gulp.src(["src/js/**/*.js", "!src/js/libs/*.min.js"])
        .pipe(minJs())
        .pipe(gulp.dest('target/js'))
});
//拷贝js
gulp.task('copyJs', function() {
    return gulp.src('src/js/libs/*.min.js')
        .pipe(gulp.dest('target/js/libs'))
});

//imgs文件的操作
//拷贝img
gulp.task('copyImg', function() {
    return gulp.src('src/imgs/*.{png,jpg}')
        .pipe(gulp.dest('target/imgs'))
});

//html文件的操作
//拷贝html
gulp.task('copyHtml', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('target'))
});

//监听文件变动
gulp.task('watch', function() {
    gulp.watch('src/*.html', ['copyHtml'])
    gulp.watch('src/**/*.scss', ['minCss'])
    gulp.watch('src/js/*.js', ['minJs'])
})

//起服务
gulp.task('server', function() {
    gulp.src('target')
        .pipe(server({
            port: 8090,
            open: true,
            livereload: true
        }))
});

gulp.task('default', function(cb) {
    sequence('clean', ['minCss', 'copyCss', 'minJs', 'copyJs', 'copyHtml', 'copyImg'], 'watch', 'server', cb)
})