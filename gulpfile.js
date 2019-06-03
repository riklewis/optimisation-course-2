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

gulp.task("default",["root","js","css","img"]);

gulp.task("root",function(cb) {
  pump([
    gulp.src("index.htm"),
    htmlmin({collapseWhitespace:true,removeComments:true}),
    gulp.dest("build")
  ]);
});

gulp.task("js",function(cb) {
  pump([
    gulp.src(["js/optimisation.js","js/debug.js"]),
    maps.init(),
    concat("script.js"),
    uglify(),
    optimize(),
    maps.write("../maps"),
    gulp.dest("build/js")
  ]);
});

gulp.task("css",function(cb) {
  pump([
    gulp.src(["css/*.css"]),
    maps.init(),
    concat("style.css"),
    cleancss({level:{1:{specialComments:0},2:{removeDuplicateRules:true}}}),
    maps.write("../maps"),
    gulp.dest("build/css")
  ]);
});

gulp.task("img",function(cb) {
  pump([
    gulp.src(["img/*.png","img/*.jpg","img/*.gif","img/*.svg"]),
    newer("build/img"),
    imagemin(),
    gulp.dest("build/img")
  ]);
});
