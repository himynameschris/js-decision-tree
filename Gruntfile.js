module.exports = function(grunt) {

    grunt.initConfig({
        dtree: grunt.file.readJSON('config.json'),
        target: '',
        dataurl: '',
        inline: {
            default: {
                options: {
                    tag: '',
                    cssmin: true,
                    uglify: true
                },
              src: 'src/dtree.html',
              dest: 'dist/dtree.html'
            }      
        },
        replace: {
            default: {
              options: {
                patterns: [
                  {
                    match: 'dataurl',
                    replacement: '<%= dataurl %>'
                  }
                ]
              },
              files: [
                {expand: true, flatten: true, src: ['dist/dtree.html'], dest: '<%= target %>'}
              ]
            }
          }
    });

    grunt.loadNpmTasks('grunt-inline');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-serve');    
    
    grunt.registerTask('default', ['b']);
    grunt.registerTask('s', ['serve']);

    grunt.registerTask('b', function(target) {
        if(!target) target = 'dev';
        grunt.config('target', grunt.config('dtree.target.' + target));
        grunt.config('dataurl', grunt.config('dtree.data.' + target));

        console.log('target: ', grunt.config('target'), ' dataurl: ', grunt.config('dataurl'));

        grunt.task.run(['inline','replace']);
        
    })
  
  };