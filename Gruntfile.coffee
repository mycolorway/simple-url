module.exports = (grunt) ->

  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'

    coffee:
      options:
        bare: true
      src:
        files:
          'lib/url.js': 'src/url.coffee'
      spec:
        files:
          'spec/url-spec.js': 'spec/url-spec.coffee'

    watch:
      scripts:
        files: ['src/**/*.coffee', 'spec/**/*.coffee']
        tasks: ['coffee', 'umd']
      jasmine:
        files: [
          'lib/url.js'
          'spec/url-spec.js'
        ]
        tasks: 'jasmine:test:build'

    jasmine:
      test:
        src: 'lib/**/*.js'
        options:
          outfile: 'spec/index.html'
          specs: 'spec/url-spec.js'

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
  grunt.loadNpmTasks 'grunt-umd'

  grunt.registerTask 'default', ['coffee', 'umd', 'jasmine:test:build', 'watch']
  grunt.registerTask 'test', ['coffee', 'umd', 'jasmine:test']
