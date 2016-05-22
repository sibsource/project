module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt);

  grunt.initConfig({
    globalConfig: {
      static: {
        js: ['assets/js/**/*.js'],
        css: ['assets/css/**/*.css'],
        dist: 'assets'
      }
    },
    jscs: {
      options: {
        config: '.jscsrc',
        verbose: true,
        fix: false,
        preset: 'google',
        requireCurlyBraces: ['if']
      },
      src: [
        '<%= globalConfig.static.js %>',
        '!assets/js/vendor/*.js'
      ]
    },
    eslint: {
      options: {
        configFile: '.eslintrc'
      },
      target: ['<%= globalConfig.static.js %>']
    },
    bower_concat: {
      all: {
        dest: {
          'js': '<%= globalConfig.static.dist %>/bower.js',
          'css': '<%= globalConfig.static.dist %>/bower.css'
        },
        dependencies: {
          'bootstrap': 'jquery',
        },
        mainFiles: {
          'bootstrap': [
            'dist/css/bootstrap.css',
            'dist/js/bootstrap.js'
          ],
          'alertify.js': [
            'dist/js/alertify.js',
            'dist/css/alertify.css'
          ]
        }
      }
    },
    concat: {
      js: {
        src: '<%= globalConfig.static.js %>',
        dest: '<%= globalConfig.static.dist %>/app.js'
      },
      css: {
        src: '<%= globalConfig.static.css %>',
        dest: '<%= globalConfig.static.dist %>/app.css'
      }
    },
    uglify: {
      bower: {
        options: {
          mangle: true,
          compress: true
        },
        files: {
          '<%= globalConfig.static.dist %>/bower.min.js': [
            '<%= globalConfig.static.dist %>/bower.js'
          ]
        }
      },
      app: {
        options: {
          mangle: true,
          compress: true,
          sourceMap: true
        },
        files: {
          '<%= globalConfig.static.dist %>/app.min.js': [
            '<%= globalConfig.static.js %>'
          ]
        }
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      bower: {
        files: {
          '<%= globalConfig.static.dist %>/bower.min.css': [
            '<%= globalConfig.static.dist %>/bower.css'
          ]
        }
      },
      app: {
        files: {
          '<%= globalConfig.static.dist %>/app.min.css': [
            '<%= globalConfig.static.css %>'
          ]
        }
      }
    },
    notify: {
      build: {
        options: {
          message: 'Build is completed successfully!'
        }
      }
    },
    shell: {
      bowerinstall: {
        command: function(libname) {
          return 'bower install ' + libname + ' -S';
        }
      },
      boweruninstall: {
        command: function(libname) {
          return 'bower uninstall ' + libname + ' -S';
        }
      },
      bowerupdate: {
        command: function(libname) {
          return 'bower update ' + libname;
        }
      }
    }
  });
  grunt.registerTask('default', ['jscs', 'eslint']);
  grunt.registerTask('build', [
    'bower_concat',
    'concat',
    'uglify',
    'cssmin',
    'notify:build'
  ]);
  grunt.registerTask('bowerinstall', function(library) {
    grunt.task.run('shell:bowerinstall:' + library);
    grunt.task.run('build');
  });
  grunt.registerTask('boweruninstall', function(library) {
    grunt.task.run('shell:boweruninstall:' + library);
    grunt.task.run('build');
  });
  grunt.registerTask('bowerupdate', function(library) {
    grunt.task.run('shell:bowerupdate:' + library);
    grunt.task.run('build');
  });
};
