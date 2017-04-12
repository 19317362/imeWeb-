var gulp=require('gulp');
var shell = require('gulp-shell')



/*gulp.task('templates', shell.task([ 'handlebars . > templates.js'], {cwd:'C:/Users/zhengying/Desktop/node后端训练场/myapp/public/js/templates/'}))*/

gulp.task('templates',function(){
    gulp.src('')
    .pipe(shell([ 'handlebars . > templates.js'],{cwd:'C:/Users/zhengying/Desktop/node后端训练场/myapp/public/js/templates/'}))
    })

gulp.task('templates:watch', function () {
  gulp.watch('./public/js/templates/**/*.handlebars', ['templates']);
});

/*gulp.task('templatesjs',function(){
    gulp.src('./js/templates/templates.js',{read:false})
    .pipe(gulp.dest('./js'))
    })*/

/*gulp.task('templatesjs:watch',function(){
    gulp.watch('./js/templates/templates.js',['templatesjs'])
    })*/

gulp.task('default',['templates','templates:watch'] )