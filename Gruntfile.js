module.exports = function(grunt) {

    grunt.initConfig({
      
        inline: {
            dist: {
                options: {
                    tag: ''
                },
              src: 'index.html',
              dest: 'dist/index.html'
            }
          }
    });

    grunt.loadNpmTasks('grunt-inline');  
    
    grunt.registerTask('default', ['inline']);
  
  };