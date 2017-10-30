var gulp = require('gulp');
// 删除文件
var clean = require('gulp-clean');
//- 多个文件合并为一个；
var concat = require('gulp-concat');                            
//- 压缩CSS为一行；
var minifyCss = require('gulp-minify-css');                  
//- 对文件名加MD5后缀
var rev = require('gulp-rev');
//- 文件重命名
var rename=require('gulp-rename');
//- 压缩JS为一行；
var uglify=require('gulp-uglify');      
//- 路径替换
var revCollector = require('gulp-rev-collector');
//- es6转换
var babel = require('gulp-babel');

// es6转化为es5
gulp.task('babel', () => {
    gulp.src(['src/js/nextJsTest.js'])
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('./dist'))
});

//- 创建一个名为 concat 的 task
gulp.task('concatcss', function() {  
    //- 需要处理的css文件，放到一个字符串数组里
    gulp.src(['./src/css/*.css'])
        //- 合并后的文件名
        .pipe(concat('main.min.css'))                           
        //- 压缩处理成一行
        .pipe(minifyCss())                                           
        //- 输出文件本地
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('concatjsLib', function() {
    //选择合并的JS
    gulp.src(['./src/lib/jquery.min.js','./src/lib/mricode.pagination.js', './src/lib/*.js'], {base: './src/lib'})
        //合并js
        .pipe(concat('vendor.min.js'))   
        //压缩
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('clean-scripts', function () {
  return gulp.src('app/tmp/*.js', {read: false})
    .pipe(clean());
});

gulp.task('concatjs', function() {
    // 选择合并的JS
    gulp.src(['./src/js/*.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('rev', () =>
    // 请参照npm 官网上的例子
    // by default, gulp would pick `assets/css` as the base, 
    // so we need to set it explicitly: 
    gulp.src(['./dist/css/*.css', './dist/js/*.js'], {base: 'dist'})
        .pipe(rev())
        .pipe(gulp.dest('./dist/assets'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./dist/assets'))
);

gulp.task('revCollector', function() {
    //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
    gulp.src(['./dist/assets/rev-manifest.json', './index.html'])
        //- 执行文件内css名的替换
        .pipe(revCollector())
        //- 替换后的文件输出的目录
        .pipe(gulp.dest('./dist/assets/'));
});

gulp.task('watch',function(){
    gulp.watch('./src/css/*.css',['concatcss', 'rev']);
    gulp.watch('./src/js/*.js',['concatjs', 'rev']);
    gulp.watch('./src/lib/*.js',['concatjsLib', 'rev']);
    gulp.watch('./index.html',['rev']);
})

gulp.task('default', ['concatcss', 'concatjsLib', 'concatjs','rev', 'revCollector']);
