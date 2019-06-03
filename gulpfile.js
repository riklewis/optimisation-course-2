var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var optimize = require("gulp-optimize-js");
var maps = require("gulp-sourcemaps");
var pump = require("pump");
var cleancss = require("gulp-clean-css");
var imagemin = require("gulp-imagemin");
var newer = require("gulp-newer");
var htmlmin = require("gulp-htmlmin");

var root = function() {
  return gulp.src("index.htm")
    .pipe(htmlmin({collapseWhitespace:true,removeComments:true}))
    .pipe(gulp.dest("build"));
};

var js = function() {
  return gulp.src(["js/optimisation.js","js/debug.js"])
    .pipe(maps.init())
    .pipe(concat("script.js"))
    .pipe(uglify())
    .pipe(optimize())
    .pipe(maps.write("../maps"))
    .pipe(gulp.dest("build/js"));
};

var css = function() {
  return gulp.src(["css/*.css"])
    .pipe(maps.init())
    .pipe(concat("style.css"))
    .pipe(cleancss({level:{1:{specialComments:0},2:{removeDuplicateRules:true}}}))
    .pipe(maps.write("../maps"))
    .pipe(gulp.dest("build/css"));
};

var img = function() {
  return gulp.src(["img/*.png","img/*.jpg","img/*.gif","img/*.svg"])
    .pipe(newer("build/img"))
    .pipe(imagemin())
    .pipe(gulp.dest("build/img"));
};

exports.default = gulp.parallel(root,js,css,img);
