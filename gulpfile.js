var projectName = 'sample'

var gulp = require('gulp')
var jsonMerge = require('gulp-merge-json');
var yamlMerge = require('gulp-yaml-merge')

// Task to create example template
gulp.task('example', function() {
	gulp.src(['Base.yaml', 'partials-example/**/*.yaml'])
		.pipe(yamlMerge('example-template.yaml'))
		.pipe(gulp.dest('./dist'));
})

// Task to create template from json files
gulp.task('json', function() {
	gulp.src(['Base.json', 'partials/**/*.json'])
		.pipe(jsonMerge(projectName + '.json'))
		.pipe(gulp.dest('./dist'));
})

// Task to create templates from yaml files
gulp.task('yaml', function() {
	gulp.src(['Base.yaml', 'partials/**/*.yaml'])
		.pipe(yamlMerge(projectName + '.yaml'))
		.pipe(gulp.dest('./dist'));
})

gulp.task('default', ['example'] );