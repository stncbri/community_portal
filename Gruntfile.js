module.exports = function(grunt) {

  // project configuration.
  grunt.initConfig({
    
    clean: {
    	options:{},
	    build: ['tmp']
    },
    
 antretrieve: {
    options: {
    	user: process.env.DEV1USER, // storing my un/pw as env vars for security
        pass: process.env.DEV1PASS, // storing my un/pw as env vars for security        
        root: 'app_vf_pages/'
    },
    // specify one retrieve target 
    build: {
      serverurl:  'https://login.salesforce.com' ,
      pkg: { 
        apexpage:       ['CommunityPortal'],
        apexclass:      ['*']
      }
    }
  }
  
  
    
    
  }); 
  
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-zipstream');
  grunt.loadNpmTasks('grunt-ant-sfdc');
   
  // default task (no deploy)
  grunt.registerTask('default', ['clean', 'antretrieve' ]);
   
  
};