module.exports = function(grunt) {
  var transport = require('grunt-cmd-transport');
  var style = transport.style.init(grunt);
  var text = transport.text.init(grunt);
  var script = transport.script.init(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    transport: {
      options: {
        paths: ['<%= pkg.app %>'],
        alias: '<%= pkg.sea.alias %>',
        parsers: {
          '.js': [script.jsParser],
          '.css': [style.css2jsParser],
          '.html': [text.html2jsParser]
        },
        debug: true
      },
      build: {
        files: [{
          cwd: '<%= pkg.app %>',
          src: '**/*',
          filter: 'isFile',
          dest: '<%= pkg.dist %>'
        }]
      }
    },

    concat: {
      options: {
        paths: ['.'],
        include: 'relative'
      },
      build: {
        files: [{
          expand: true,
          cwd: '<%= pkg.dist %>',
          src: ['**/*.js'],
          dest: '<%= pkg.dist %>',
          ext: '.js'
        }]
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: [{
          expand: true,
          cwd: '<%= pkg.dist %>',
          src: ['**/*.js', '!**/*-debug.js'],
          dest: '<%= pkg.dist %>/',
          ext: '.js'
        }]
      },
      compiler : {
        files: [{
          expand: true,
          cwd: 'compiler/src/',
          src: ['**/*.js', '!**/*-debug.js'],
          dest: 'compiler/dist/',
          ext: '.js'
        }]
      }
    },

    clean: {
      build : {
        src: ['.build', '.*']
      }
    }

  });


  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-cmd-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('compiler', ['uglify:compiler']);

  grunt.registerTask('default', ['transport', 'concat']);

  grunt.registerTask('build', ['transport:build', 'concat:build', 'uglify:build', 'clean']);

  grunt.registerTask('clear', ['clean']);

};
