module.exports = (grunt) ->

  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'

    connect:
      uses_defaults: {}

    coffee:
      options:
        bare: true
      module:
        files:
          'lib/url.js': 'src/url.coffee'
          'spec/url-spec.js': 'spec/url-spec.coffee'
    watch:
      scripts:
        files: ['src/**/*.coffee', 'spec/**/*.coffee']
        tasks: ['coffee', 'umd']
    jasmine:
      pivotal:
        src: 'lib/**/*.js'
        options:
          specs: 'spec/url-spec.js'
          summary: true
          host : 'http://127.0.0.1:8000/'

    umd:
      all:
        src: 'lib/url.js'
        template: 'umd.hbs'
        amdModuleId: 'simple-url'
        objectToExport: 'url'
        globalAlias: 'url'
        deps:
          'default': []
          amd: []
          cjs: []
          global:
            items: []
            prefix: ''

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-jasmine'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-umd'

  grunt.registerTask 'test', ['coffee', 'umd', 'connect', 'jasmine', 'watch']
