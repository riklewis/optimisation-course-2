var gulp = require("gulp");
var plugins = require("gulp-load-plugins")();

var root = function() {
  return gulp.src("index.htm")
    .pipe(plugins.hashSrc({build_dir:"build",src_path:".",exts:[".js",".css"]}))
    //.pipe(plugins.htmlmin({collapseWhitespace:true,removeComments:true}))
    .pipe(gulp.dest("build"));
};

var js = function() {
  return gulp.src(["js/optimisation.js","js/debug.js"])
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.concat("script.js"))
    .pipe(plugins.uglify())
    .pipe(plugins.optimizeJs())
    .pipe(plugins.sourcemaps.write("../maps"))
    .pipe(gulp.dest("build/js"));
};

var css = function() {
  return gulp.src(["css/*.css"])
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.concat("style.css"))
    .pipe(plugins.cleanCss({level:{1:{specialComments:0},2:{removeDuplicateRules:true}}}))
    .pipe(plugins.sourcemaps.write("../maps"))
    .pipe(gulp.dest("build/css"));
};

var img = function() {
  return gulp.src(["img/*.png","img/*.jpg","img/*.gif","img/*.svg"])
    .pipe(plugins.newer("build/img"))
    .pipe(plugins.imagemin())
    .pipe(gulp.dest("build/img"));
};

exports.default = gulp.series(gulp.parallel(js,css,img),root);
