var gulp = require('gulp');
var concat = require('gulp-concat');                //- 多个文件合并为一个；
var minifyCss = require('gulp-minify-css');         //- 压缩CSS文件；
var rev = require('gulp-rev');                      //- 对css、js文件名加MD5后缀
var revCollector = require('gulp-rev-collector');   //- 路径替换
var clean = require('gulp-clean');                  //- 用于删除文件
var uglify = require('gulp-uglify');                //- 压缩js代码
var imagemin = require('gulp-imagemin');            //- 压缩图片
var base64 = require('gulp-base64');                //- 把小图片转成base64字符串
var q = require('q');                               //- 用于解决任务执行顺序的问题（一个任务执行完毕才执行另外一个任务）（暂时还没用到）
var less = require('gulp-less');
var gutil = require('gulp-util');
/*清理文件*/
gulp.task('clean',function () {                     //删除dist目录下的所有文件
    gulp.src('dist/*',{read:false})
        .pipe(clean());
});

gulp.task('less',function(callback){
    // 找到less文件
	gulp.src(['src/less/*.css'])
		// 用gulp-less做处理
		// .pipe(less())
		// .pipe(minifyCss())                          //- 压缩处理成一行
		.pipe(rev())                                //- 文件名加MD5后缀
		.pipe(gulp.dest('dist/less'))                //- 输出文件到dist/css目录下
		.pipe(rev.manifest())                       //- 生成一个rev-manifest.json
		.pipe(gulp.dest('rev-less'))                 //- 将rev-manifest.json保存到rev-css目录内
		.on('end',function () {
			callback();
		});
	
})
/*压缩js文件，并生成md5后缀的js文件*/
gulp.task('compress-js',function (callback) {       //- 创建一个名为compress-js的task
    gulp.src(['src/js/**/*.js'])             //- 需要处理的js文件，放到一个字符串数组里
		// .pipe(babel())
        .pipe(uglify())                             //- 压缩文件
		.on('error', function(err) {
			gutil.log(gutil.colors.red('[Error]'), err.toString())
		})
        .pipe(rev())                                //- 文件名加MD5后缀
        .pipe(gulp.dest('dist/js'))                 //- 另存压缩后的文件
        .pipe(rev.manifest())                       //- 生成一个rev-manifest.json
        .pipe(gulp.dest('rev-js'))                  //- 将rev-manifest.json保存到 rev-js 目录内
        .on('end',function () {
            callback();
        })
		
});

/*压缩css文件，并生成md5后缀的css文件*/
gulp.task('compress-css', function(callback) {      //- 创建一个名为compress-css的task
    gulp.src(['src/css/**/*.css'])           //- 需要处理的css文件，放到一个字符串数组里
        .pipe(minifyCss())                          //- 压缩处理成一行
        .pipe(rev())                                //- 文件名加MD5后缀
        .pipe(gulp.dest('dist/css'))                //- 输出文件到dist/css目录下
        .pipe(rev.manifest())                       //- 生成一个rev-manifest.json
        .pipe(gulp.dest('rev-css'))                 //- 将rev-manifest.json保存到rev-css目录内
        .on('end',function () {
            callback();
        });
});


gulp.task('compress-css2', function(callback) {     
    gulp.src(['dist/less/*.less'])           
        .pipe(less())
        .pipe(minifyCss())
		.pipe(rev())
        .pipe(gulp.dest('dist/less'))                
        .on('end',function () {
            callback();
        });
});


/*修改html文件的link标签和script标签引用的css和js文件名，并把html文件输出到指定的位置*/
gulp.task('rev-html',['less','compress-css','compress-css2','compress-js'], function() {          //- compress-css和compress-js任务执行完毕再执行rev-index任务
    /*修改index.html文件的link标签和script标签引用的css和js文件名，并把html文件输出到指定的位置*/
    gulp.src(['rev-css/*.json','rev-less/*.json','rev-js/*.json', 'src/**/*.html'])   //- 读取两个rev-manifest.json文件以及需要进行css和js名替换的html文件
        .pipe(revCollector())                                               //- 执行文件内css和js名的替换
        .pipe(gulp.dest('dist/'));                                          //- 替换后的html文件输出的目录
		

});

/*压缩并复制图片*/
gulp.task('compress-img',function () {
    gulp.src('src/img/**/*.*')    //原图片的位置
        .pipe(imagemin())                   //执行图片压缩
        .pipe(gulp.dest('dist/img'));    //压缩后的图片输出的位置
});

/*最终执行的任务-css*/
gulp.task('rev',['rev-html','compress-img']);

//***********************************************************************************************

//命令行顺序: clean, rev