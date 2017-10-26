var gulp = require('gulp');
var concat = require('gulp-concat');                            //- 多个文件合并为一个；
var minifyCss = require('gulp-minify-css');                     //- 压缩CSS为一行；
var rev = require('gulp-rev');
var rename=require('gulp-rename');
var uglify=require('gulp-uglify');                              //- 对文件名加MD5后缀
var revCollector = require('gulp-rev-collector');               //- 路径替换

gulp.task('concatcss', function() {                                //- 创建一个名为 concat 的 task
    gulp.src(['./src/css/*.css'])                               //- 需要处理的css文件，放到一个字符串数组里
        .pipe(concat('main.min.css'))                           //- 合并后的文件名
        .pipe(minifyCss())                                      //- 压缩处理成一行
        .pipe(rev())                                            //- 文件名加MD5后缀
        .pipe(gulp.dest('./dist/css/'))                         //- 输出文件本地
        .pipe(rev.manifest({
            path: './rev-manifest.json',
            merge: true}))                                   //- 生成一个rev-manifest.json
        .pipe(gulp.dest('./rev'));                              //- 将 rev-manifest.json 保存到 rev 目录内


});

gulp.task('concatjsLib', function() {
    gulp.src(['./src/lib/jquery.min.js','./src/lib/mricode.pagination.js'])  //选择合并的JS
        .pipe(concat('vendor.js'))   //合并js
        .pipe(gulp.dest('./dist/js'))         //输出
        .pipe(rename({suffix:'.min'}))     //重命名
        .pipe(uglify())                    //压缩
        .pipe(gulp.dest('dist/js'));            //输出 

});

gulp.task('concatjs', function() {
    gulp.src(['./src/js/*.js'])  //选择合并的JS
        .pipe(concat('main.js'))   //合并js
        .pipe(gulp.dest('./dist/js'))         //输出
        .pipe(rename({suffix:'.min'}))     //重命名
        // .pipe(uglify())                    //压缩
        .pipe(gulp.dest('dist/js'));            //输出 

});

gulp.task('rev', function() {
    gulp.src(['./rev/*.json', './index.html'])   //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
        .pipe(revCollector())                                   //- 执行文件内css名的替换
        .pipe(gulp.dest('./dist/'));                     //- 替换后的文件输出的目录
});

gulp.task('watch',function(){
    gulp.watch('./src/css/*.css',['concatcss', 'rev']);
    gulp.watch('./src/js/*.js',['concatjs', 'rev']);
    gulp.watch('./src/lib/*.js',['concatjsLib', 'rev']);
    gulp.watch('./index.html',['rev']);
})

gulp.task('default', ['concatcss', 'concatjsLib', 'concatjs','rev']);