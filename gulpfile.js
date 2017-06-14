var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')({lazy:true});
var del = require('del');
//Gulp-plugins
// var jshint = require('gulp-jshint');
// var jscs = require('gulp-jscs');
// var util = require('gulp-util');
// var print = require('gulp-print');
// var gulpif = require('gulp-if');


gulp.task('Hello-world',function () {
	console.log('My first gulptask !');
});

gulp.task('vet',function () {
	
	log('Just analyzing my source code with JSHint and JSCS');
	return gulp
	.src(config.alljs)
	.pipe($.if(args.verbose,$.print()))
	.pipe($.jscs())
	.pipe($.jshint())
	.pipe($.jshint.reporter('jshint-stylish'),{varbose:true})
	.pipe($.jshint.reporter('fail'));

});

gulp.task('styles',['clean-styles'],function () {
	log('Compiling LESS ---> CSS');

	return gulp
	.src(config.less)
	.pipe($.plumber())
	.pipe($.less())
	.pipe($.autoprefixer())
	.pipe(gulp.dest(config.temp));
});

gulp.task('clean-styles',function (done) {
 	var files = config.temp + '**/*.css';
 	clean(files,done);
});


gulp.task('less-watcher',function () {
	gulp.watch([config.less],['styles']);
})


function clean(path,done) {
	log('Cleaning' + path);
	del(path);
	done();
}

function
 log(msg) {
	$.util.log($.util.colors.blue(msg));
}


