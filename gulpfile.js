var gulp = require('gulp')
var jsonMerge = require('gulp-merge-json');
var yamlMerg = require('gulp-yaml-merge')


// Task to create example template
gulp.task('yaml', function() {
	gulp.src(['Base.yaml', 'partials-example/**/*.yaml'])
		.pipe(merge('example-template.yaml'))
		.pipe(gulp.dest('./dist'));
})

// Task to create template from json files
gulp.task('json', function() {
	gulp.src(['Base.json', 'partials/standard-vpc/**/*.json'])
		.pipe(jsonMerge('template.json'))
		.pipe(gulp.dest('./dist'));
})

// Task to create templates from yaml files
gulp.task('yaml', function() {
	gulp.src(['Base.yaml', 'partials/**/*.yaml'])
		.pipe(merge('template.yaml'))
		.pipe(gulp.dest('./dist'));
})

gulp.task('default', ['example'] );