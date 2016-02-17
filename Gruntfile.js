module.exports = function (grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    fixmyjs: {
      options: {
        legacy: true
      },
      default: {
        files: {
          src: ['src/js/main.js',
                'src/js/game.js',
                'src/js/help.js',
                'src/js/classes/achievement.js',
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
      default: {
        files: {
          src: ['src/js/main.js',
                'src/js/game.js',
                'src/js/help.js',
                'src/js/classes/achievement.js',
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
      dev: {
        files: {
          'built/dev/js/main.min.js': 'src/js/main.js',
          'built/dev/js/game.min.js': 'src/js/game.js',
          'built/dev/js/help.min.js': 'src/js/help.js',
          'built/dev/js/classes.min.js': ['src/js/classes/achievement.js',
                                          'src/js/classes/item.js',
                                          'src/js/classes/mastery.js',
                                          'src/js/classes/monster.js',
                                          'src/js/classes/rune.js',
                                          'src/js/classes/spell.js',
                                          'src/js/classes/upgrade.js']
        }
      },
      prod: {
        files: {
          'built/prod/js/main.min.js': 'src/js/main.js',
          'built/prod/js/game.min.js': 'src/js/game.js',
          'built/prod/js/help.min.js': 'src/js/help.js',
          'built/prod/js/classes.min.js': ['src/js/classes/achievement.js',
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
      dev: {
        files: {
          'built/dev/css/style.css': 'src/scss/style.scss',
          'built/dev/css/subpage.css': 'src/scss/subpage.scss'
        }
      },
      prod: {
        files: {
          'built/prod/css/style.css': 'src/scss/style.scss',
          'built/prod/css/subpage.css': 'src/scss/subpage.scss'
        }
      }
    },

    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> v<%=pkg.version%> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      dev: {
        files: {
          'built/dev/css/style.min.css': 'built/dev/css/style.css',
          'built/dev/css/subpage.min.css': 'built/dev/css/subpage.css',
          'built/dev/css/tooltipster.min.css': 'src/css/tooltipster.css'
        }
      },
      prod: {
        files: {
          'built/prod/css/style.min.css': 'built/prod/css/style.css',
          'built/prod/css/subpage.min.css': 'built/prod/css/subpage.css',
          'built/prod/css/tooltipster.min.css': 'src/css/tooltipster.css'
        }
      }
    },

    htmlmin: {
      dev: {
        files: {
          'built/dev/about.html': 'src/about.html',
          'built/dev/help.html': 'src/help.html',
          'built/dev/index.html': 'src/index.html'
        }
      },
      prod: {
        files: {
          'built/prod/about.html': 'src/about.html',
          'built/prod/help.html': 'src/help.html',
          'built/prod/index.html': 'src/index.html'
        }
      }
    },

    imagemin: {
      options: {
        optimizationLevel: 4
      },
      dev: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['images/**/*.png'],
          dest: 'built/dev/'
        }]
      },
      prod: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['images/**/*.png'],
          dest: 'built/prod/'
        }]
      }
    },

    copy: {
      html_dev: {
        files: {
          'built/dev/about.html': 'src/about.html',
          'built/dev/help.html': 'src/help.html',
          'built/dev/index.html': 'src/index.html'
        }
      },

      css_dev: {
        files: {
          'built/dev/css/style.min.css': 'built/dev/css/style.css',
          'built/dev/css/subpage.min.css': 'built/dev/css/subpage.css',
          'built/dev/css/tooltipster.min.css': 'src/css/tooltipster.css'
        }
      },

      js_dev: {
        files: {
          'built/dev/js/main.min.js': 'src/js/main.js',
          'built/dev/js/game.min.js': 'src/js/game.js',
          'built/dev/js/help.min.js': 'src/js/help.js'
        }
      },

      js_prod: {
        files: {
          'built/prod/js/main.min.js': 'src/js/main.js',
          'built/prod/js/game.min.js': 'src/js/game.js',
          'built/prod/js/help.min.js': 'src/js/help.js'
        }
      },

      vendor_dev: {
        files: [{
          expand: true,
          cwd: 'src/js/vendor/',
          src: ['*.js'],
          dest: 'built/dev/js/vendor/'
        }]
      },

      vendor_prod: {
        files: [{
          expand: true,
          cwd: 'src/js/vendor/',
          src: ['*.js'],
          dest: 'built/prod/js/vendor/'
        }]
      },

      favicon_dev: {
        files: {
          'built/dev/favicon.ico' : 'src/favicon.ico'
        }
      },
      favicon_prod: {
        files: {
          'built/prod/favicon.ico' : 'src/favicon.ico'
        }
      }
    },

    concat: {
      classes_dev: {
        dest: 'built/dev/js/classes.min.js',
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
      stylesheets_dev: {
        files: ['src/css/*.css', 'src/scss/*.scss'],
        tasks: ['sass:dev', 'copy:css_dev']
      },
      stylesheets_prod: {
        files: ['src/css/*.css', 'src/scss/*.scss'],
        tasks: ['sass:prod', 'cssmin:prod']
      },

      scripts_dev: {
        files: ['src/**/*.js'],
        tasks: ['copy:js_dev', 'copy:vendor_dev', 'concat:classes_dev']
      },
      scripts_prod: {
        files: ['src/**/*.js'],
        tasks: ['uglify:prod', 'copy:vendor_prod', 'concat:classes_dev']
      },

      html_dev: {
        files: ['src/*.html'],
        tasks: ['copy:html_dev']
      },
      html_prod: {
        files: ['src/*.html'],
        tasks: ['htmlmin:prod']
      },

      images_dev: {
        files: ['src/**/*.png'],
        tasks: ['imagemin:build_dev', 'copy:favicon_dev']
      },
      images_prod: {
        files: ['src/**/*.png'],
        tasks: ['imagemin:build_prod', 'copy:favicon_prod']
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      dev: {
        tasks: ['watch:stylesheets_dev', 'watch:scripts_dev', 'watch:html_dev']
      },
      prod: {
        tasks: ['watch:stylesheets_prod', 'watch:scripts_prod', 'watch:html_prod']
      }
    }


  });

  grunt.registerTask('dev', '', ['jshint', 'sass:dev', 'copy:html_dev', 'copy:favicon_dev', 'copy:css_dev', 'copy:js_dev', 'copy:vendor_dev', 'concat:classes_dev']);
  grunt.registerTask('prod', '', ['jshint', 'uglify:prod', 'copy:favicon_prod', 'copy:vendor_prod', 'sass:prod', 'cssmin:prod', 'htmlmin:prod']);

  grunt.registerTask('build', '', ['prod', 'dev']);
  grunt.registerTask('build-dev', '', ['dev']);
  grunt.registerTask('build-prod', '', ['prod']);
  grunt.registerTask('build-images', '', ['imagemin:prod', 'imagemin:dev']);

  grunt.registerTask('watch-dev', '', ['concurrent:dev']);
  grunt.registerTask('watch-prod', '', ['concurrent:prod']);
  grunt.registerTask('watch-all', '', ['watch-dev', 'watch-prod']);
}
