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



gulp.task('default',['templates','templates:watch'] )