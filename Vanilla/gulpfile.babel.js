import gulp from "gulp";
import autoprefixer from "gulp-autoprefixer";
import miniCSS from "gulp-csso";
import gulpInclude from "gulp-file-include";
import bro from "gulp-bro";
import babel from "babelify";
import concat from "gulp-concat";

import del from "del";
import g_ws from "gulp-webserver";

const ROUTES = {
    html: {
        watch: "src/**/*.html",
        src: "src/index.html",
        dest: "build"
    },
    js : {
        watch : "src/js/**/*.js",
        src : "src/js/script.js",
        dest: "build/js"
    },
    css: {
        watch: "src/css/**/*.css",
        src: "src/css/*.css",
        dest: "build/css"
    }
};

const htmlBuild = () => {
    return gulp
        .src(ROUTES.html.src)
        .pipe(gulpInclude({
            prefiex: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(ROUTES.html.dest));
};

const jsBuild = () => {
    return gulp
        .src(ROUTES.js.src)
        .pipe(bro({
            transform: [
                babel.configure({ presets: ["@babel/preset-env"] })
            ]
        }))
        .pipe( gulp.dest(ROUTES.js.dest) );
}

const webserver = () => {
    return gulp
        .src("build")
        .pipe(
            g_ws({ livereload : true, open: true })
        );
};

const cssBuild = () => {
    return gulp
        .src(ROUTES.css.src)
        .pipe(concat('style.css'))
        .pipe(autoprefixer())
        .pipe(miniCSS())
        .pipe(gulp.dest(ROUTES.css.dest));
};

const watch = () => {
    gulp.watch(ROUTES.html.watch, htmlBuild);
    gulp.watch(ROUTES.css.watch, cssBuild);
    gulp.watch(ROUTES.js.watch, jsBuild);
};

const clean = () => {
    return del(["build/", ".publish"]);
};

const live = gulp.parallel([webserver, watch]);
const prepare = gulp.series([clean]);
export const assets = gulp.series([htmlBuild, cssBuild, jsBuild]);
export const build = gulp.series([prepare, assets])
export const dev = gulp.series([build, live]);
