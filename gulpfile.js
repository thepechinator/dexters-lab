'use strict';

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({
      pattern: ['gulp-*', 'gulp.*', 'glob', 'globby',
        'vinyl-source-stream', 'vinyl-buffer', 'run-sequence',
        'front-matter', 'fs-extra', 'del', 'require-dir',
        'webpack', 'node-cache']
    }),
    $ = plugins,
    fs = require('fs');

var production = argv.production || false;
var coverage = argv.coverage || false;
var isBuildServer = argv['build-server'] || false;

var config = {};
config.isWatching = false;

// This task will run on deployment to rebuild all the relevant responsive stuff.
gulp.task('default', function(cb) {
  if (production) {
    if (isBuildServer) {
      $.runSequence('clean', 'styles', 'js', 'images', 'sprites', 'test', 'clean-test', cb);
    } else {
      $.runSequence('fix-permissions', 'clean', 'styles', 'js', 'images', 'sprites', 'test', cb);
    }
  } else {
    $.runSequence('clean', 'styles', 'js', 'images', 'sprites', cb);
  }
});

gulp.task('clean', $.del.bind(null, [
  RESPONSIVE_JS_OUT_PATH + '/',
  OUT_PATH + '/img',
  OUT_PATH + '/sprites',
  OUT_PATH + '/test',
  RESPONSIVE_OUT_PATH + '/css'
]));

// Gets rid of test coverage output; useful on builds going public.
gulp.task('clean-test', $.del.bind(null, [
    OUT_PATH + '/test'
]));

// Don't use normalize_permissions for now.
// gulp.task('fix-permissions', plugins.shell.task('sudo normalize_permissions $PWD'));
gulp.task('fix-permissions', plugins.shell.task('sudo chown -R distributor.distributor . && sudo chmod -R u+rw,g+rws .'));

// Meant to be run when running locally.
gulp.task('watch', function() {
  config.isWatching = true;

  $.runSequence('default', function() {
    gulp.watch([RESPONSIVE_SRC_PATH + '/sass/**/*.scss',
      RESPONSIVE_SRC_PATH + '/foundation/scss/foundation/**/*.scss'], function() {
      $.runSequence('styles');
    });
    gulp.watch([RESPONSIVE_SRC_PATH + '/assets/img/**/*'], function() {
      $.runSequence('images');
    });
    gulp.watch([RESPONSIVE_SRC_PATH + '/assets/icons/**/*.svg'], function() {
      $.runSequence('sprites');
    });
  });
});

gulp.on('stop', function() {
  if (!config.isWatching) {
    process.nextTick(function() {
      process.exit(0);
    });
  }
});

function requireTasks(tasks) {
    tasks.forEach(function(task) {
        require(GULP_TASKS_PATH + '/' + task)(gulp, plugins, config, argv);
    });
}
requireTasks(['test', 'scripts', 'deploy', 'styles', 'images', 'sprites', 'help']);

