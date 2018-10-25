const gulp = require('gulp')
const util = require('gulp-util')
const sequence = require('run-sequence')

require('./gulp-tasks/app')
require('./gulp-tasks/deps')
require('./gulp-tasks/servidor')

const swPrecache = require('sw-precache');

gulp.task('generate-service-worker', function(callback) {
    const rootDir = 'build';

    swPrecache.write(`${rootDir}/service-worker.js`, {
      staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}'],
      stripPrefix: rootDir
    }, callback);
  });

gulp.task('default', ()=>{
    console.log(util.env.production + 'ESTRANHA')
    if(util.env.production){
        sequence('deps', 'app', 'generate-service-worker')
        //gulp.start('deps', 'app')
    }else{
        sequence('deps', 'appDev', 'servidor')
        //gulp.start('deps', 'app', 'servidor')
    }
})
.on('error', function(err){console.log(err)})