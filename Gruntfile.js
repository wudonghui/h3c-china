module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },

      // <script src="javascripts/jquery-1.9.1.min.js"></script>
      // <script src="javascripts/TweenMax.min.js" /></script>
      // <script src="javascripts/quo.js"></script>
      // <script src="javascripts/nobounce.js"></script>
      // <script src="javascripts/model.js"></script>
      // <script src="javascripts/open.js"></script>
      // <script src="javascripts/scene3.js"></script>
      // <script src="javascripts/scene4.js"></script>
      // <script src="javascripts/scene5.js"></script>
      // <script src="javascripts/scene6.js"></script>
      // <script src="javascripts/scene7.js"></script>
      // <script src="javascripts/scene8.js"></script>
      // <script src="javascripts/h3c.js"></script>

      build: {
        src: ['public/javascripts/jquery-1.9.1.min.js',
              'public/javascripts/TweenMax.min.js',
              'public/javascripts/quo.js',
              'public/javascripts/nobounce.js',
              'public/javascripts/model.js',
              'public/javascripts/open.js',
              'public/javascripts/scene3.js',
              'public/javascripts/scene4.js',
              'public/javascripts/scene5.js',
              'public/javascripts/scene6.js',
              'public/javascripts/scene7.js',
              'public/javascripts/scene8.js',
              'public/javascripts/h3c.js',
              ],
        dest: 'public/prod.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};