module.exports = function(grunt) {
  var transport = require('grunt-cmd-transport');
  var style = transport.style.init(grunt);
  var text = transport.text.init(grunt);
  var script = transport.script.init(grunt);

  var formatter = function(hash){
      var reg = /\\/g;
      var result = ''; //
      var val;
      for(var key in hash){
          //val = hash[key];
          val = hash[key];
          var file = key.replace(reg,'\/');
          var arr = file.split('.');
          arr[arr.length-2] = arr[arr.length-2] + '_' + val;
          val = arr.join('.');
          result += '["'+file + '" , "'+ val + '"],'; //\n
      }
      var lastIndex = result.lastIndexOf(',');
      if (lastIndex > -1) {
          result = result.substring(0, lastIndex);
      }
      //result += '\n];';
      return result;
  };

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

   min: {
      'dist': {
        'src': ['compiler/src/**/*.js'],
        'dest': 'compiler/dist/aa-min.js'
      }
    },

    cachebuster: {
      build: {
          options: {
              banner: 'var fileMap = ',
              //format: 'json',
              basedir: 'src/',
              hashTail : true,
              length : 8,
              complete : formatter
          },
          src: ['src/**/*.js', '!src/**/*-debug.js'],
          dest: 'dist/filemap.js'
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
  grunt.loadNpmTasks('grunt-yui-compressor');
  grunt.loadNpmTasks('grunt-cachebuster');

  grunt.registerTask('compiler', ['uglify:compiler']);

  grunt.registerTask('yuicompressor', ['min']);

  grunt.registerTask('cache', ['cachebuster']);

  grunt.registerTask('default', ['transport', 'concat']);

  grunt.registerTask('build', ['transport:build', 'concat:build', 'uglify:build', 'cachebuster', 'clean']);

  grunt.registerTask('clear', ['clean']);

};
