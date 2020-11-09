var ms = require('gulp-monkeyscript');
var msProject = ms.createProject("package.json");

var gulp = require('gulp');
//var gulpless = require('gulp-less');
var concat = require('gulp-concat');
var strip = require('gulp-strip-comments');

/**
 * LESS compile/merge task.
 * @param {Function} cb Some callback.
 */
function lessTask(cb) {
	// uncomment to use LESS->CSS builder
	
	// gulp.src("src/less/index.less")
	// 	.pipe(gulpless())
	// 	.pipe(gulp.dest("src/css/"));
    
	cb();
}

/**
 * Main build task.
 * @param {Function} cb Some callback.
 */
function buildTask(cb) {
     
	gulp.src([
		'src/**/!(index)*.js',	// all .js files EXCEPT index
		'src/index.js',		// index at the end
	])
		.pipe(concat("script.user.js"))
		.pipe(strip())
		.pipe(msProject()) // append Tampermonkey header
		.pipe(gulp.dest("dist/"));
    
	cb();
}

// task names
exports.less = lessTask;
exports.build = buildTask;
exports.default = gulp.series(lessTask, buildTask)