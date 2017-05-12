var gulp=require('gulp');
var shell = require('gulp-shell')
var fileinclude  = require('gulp-file-include');
var less=require('gulp-less');

gulp.task('less',function(){
    gulp.src('public/less/*.less').pipe(less()).pipe(gulp.dest('public/css/'))
    });

gulp.task('less:watch',function(){
    gulp.watch('public/less/*.less',['less'])
})


gulp.task('templates',function(){
    return gulp.src('')
    .pipe(shell([ 'handlebars . > templates.js'],{cwd:'C:/Users/zhengying/Desktop/node后端训练场/myapp/public/main/templates'}))
    })




gulp.task('templates:watch', function () {
  return gulp.watch('templates/**/*.handlebars',function(cb){
    setTimeout(function(){
      gulp.run('templates')
      },100)
    })
});

gulp.task('fileinclude', function() {
    gulp.src('htmllayout/*.html')
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
    .pipe(gulp.dest(''));
});

gulp.task('fileinclude:watch',function(){
    gulp.watch('htmllayout/*.html',['fileinclude'])
    })



gulp.task('default',['templates','templates:watch','fileinclude','fileinclude:watch','less','less:watch'])