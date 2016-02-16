module.exports = function (grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    fixmyjs: {
      options: {
        legacy: true
      },
      build: {
        files: {
          'built/js/main.min.js': 'src/js/main.js',
          'built/js/game.min.js': 'src/js/game.js',
          'built/js/help.min.js': 'src/js/help.js',
          'built/js/classes.min.js': ['src/js/classes/achievement.js',
                                      'src/js/classes/item.js',
                                      'src/js/classes/mastery.js',
                                      'src/js/classes/monster.js',
                                      'src/js/classes/rune.js',
                                      'src/js/classes/spell.js',
                                      'src/js/classes/upgrade.js']
        }
      }
    },

    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      build: {
        files: {
          'built/js/main.min.js': 'src/js/main.js',
          'built/js/game.min.js': 'src/js/game.js',
          'built/js/help.min.js': 'src/js/help.js',
          'built/js/classes.min.js': ['src/js/classes/achievement.js',
                                      'src/js/classes/item.js',
                                      'src/js/classes/mastery.js',
                                      'src/js/classes/monster.js',
                                      'src/js/classes/rune.js',
                                      'src/js/classes/spell.js',
                                      'src/js/classes/upgrade.js']
        }
      }
    },

    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> v<%=pkg.version%> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'built/js/main.min.js': 'src/js/main.js',
          'built/js/game.min.js': 'src/js/game.js',
          'built/js/help.min.js': 'src/js/help.js',
          'built/js/classes.min.js': ['src/js/classes/achievement.js',
                                      'src/js/classes/item.js',
                                      'src/js/classes/mastery.js',
                                      'src/js/classes/monster.js',
                                      'src/js/classes/rune.js',
                                      'src/js/classes/spell.js',
                                      'src/js/classes/upgrade.js']
        }
      }
    },

    sass: {
      build: {
        files: {
          'built/css/style.css': 'src/scss/style.scss',
          'built/css/subpage.css': 'src/scss/subpage.scss'
        }
      }
    },

    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> v<%=pkg.version%> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'built/css/style.min.css': 'built/css/style.css',
          'built/css/subpage.min.css': 'built/css/subpage.css',
          'built/css/tooltipster.min.css': 'src/css/tooltipster.css'
        }
      }
    },

    htmlmin: {
      build: {
        files: {
          'built/about.html': 'src/about.html',
          'built/help.html': 'src/help.html',
          'built/index.html': 'src/index.html'
        }
      }
    },

    imagemin: {
      options: {
        optimizationLevel: 5
      },
      build: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['images/**/*.png'],
          dest: 'built/'
        }]
      }
    },

    copy: {
      html: {
        files: {
          'built/about.html': 'src/about.html',
          'built/help.html': 'src/help.html',
          'built/index.html': 'src/index.html'
        }
      },

      css: {
        files: {
          'built/css/style.min.css': 'built/css/style.css',
          'built/css/subpage.min.css': 'built/css/subpage.css',
          'built/css/tooltipster.min.css': 'src/css/tooltipster.css'
        }
      },

      js: {
        files: {
          'built/js/main.min.js': 'src/js/main.js',
          'built/js/game.min.js': 'src/js/game.js',
          'built/js/help.min.js': 'src/js/help.js'
        }
      },

      vendor: {
        files: [{
          expand: true,
          cwd: 'src/js/vendor/',
          src: ['*.js'],
          dest: 'built/js/vendor/'
        }]
      },

      favicon: {
        files: {
          'built/favicon.ico' : 'src/favicon.ico'
        }
      }
    },

    concat: {
      classes: {
        dest: 'built/js/classes.min.js',
        src: ['src/js/classes/achievement.js',
              'src/js/classes/item.js',
              'src/js/classes/mastery.js',
              'src/js/classes/monster.js',
              'src/js/classes/rune.js',
              'src/js/classes/spell.js',
              'src/js/classes/upgrade.js']
      }
    },

    watch: {
      stylesheets: {
        files: ['src/css/*.css', 'src/scss/*.scss'],
        tasks: ['sass', 'copy:css']
      },

      scripts: {
        files: 'src/**/*.js',
        tasks: ['jshint', 'copy:js', 'copy:vendor', 'concat:classes']
      },

      html: {
        files: 'src/*.html',
        tasks: ['copy:html']
      },

      images: {
        files: 'src/**/*.png',
        tasks: ['imagemin']
      }
    }


  });
  grunt.registerTask('prod', '', ['jshint', 'uglify', 'copy:favicon', 'copy:vendor', 'sass', 'cssmin', 'htmlmin']);
  grunt.registerTask('dev', '', ['jshint', 'sass', 'copy:html', 'copy:favicon', 'copy:css', 'copy:js', 'copy:vendor', 'concat:classes']);
};
