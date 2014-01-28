module.exports = function(grunt) {
  var src = ['src/**/*.js', 'dist/**/*.js'];
  var files = ['Gruntfile.js'].concat(src);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    notify:{
      success:{
        options:{
          title:'Good job captain',
          message:'everything is shiny'
        }
      }
    },
    jshint: {
      files: files,
      options: {
        // options here to override JSHint defaults
        globals: {
          console: true,
          module: true,
        }
      }
    },
    shell: {
        heroLint: {
            options: {
                failOnError: true,
                stderr: true,
                stdout: true
            },
            command: 'node src/heroLint.js'
        }
    },
    watch: {
      files: files,
      tasks: ['jshint', 'jasmine', 'notify:success']
    }
  });
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-shell');
  grunt.registerTask('default', ['jshint', 'shell:heroLint', 'notify:success']);
  grunt.registerTask('test', ['jshint', 'shell:heroLint']);
};