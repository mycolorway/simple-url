module.exports = (grunt) ->

  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'

    connect:
      uses_defaults: {}
    coffee:
      module:
        files:
          'lib/url.js': 'src/url.coffee'
          'spec/lib/url-spec.js': 'spec/src/url-spec.coffee'
    watch:
      scripts:
        files: ['src/**/*.coffee', 'spec/src/**/*.coffee']
        tasks: ['coffee']
    jasmine:
      pivotal:
        src: 'lib/**/*.js'
        options:
          specs: 'spec/lib/url-spec.js'
          summary: true
          host : 'http://127.0.0.1:8000/'

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-jasmine'
  grunt.loadNpmTasks 'grunt-contrib-connect'

  grunt.registerTask 'test', ['coffee', 'connect', 'jasmine']
