module.exports = function(grunt) {

    grunt.initConfig({
      
        inline: {
            dist: {
                options: {
                    tag: ''
                },
              src: 'src/index.html',
              dest: 'dist/index.html'
            }
          }        
    });

    grunt.loadNpmTasks('grunt-inline');
    grunt.loadNpmTasks('grunt-serve');  
    
    grunt.registerTask('b', ['inline']);
    grunt.registerTask('s', ['serve']);
  
  };