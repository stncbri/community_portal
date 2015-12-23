module.exports = function(grunt) {

  // project configuration.
  grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),

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
  },

    compress: {
        // example build target for static resources
    	options:{
    		pretty:true,
    		mode:'zip'
    	},
        build: {
          options: {
        	  archive: 'build/staticresources/<%= pkg.name %>.resource'
          },
          expand:true,
          cwd:'tmp',
          src:'**/*'

        }
      },

      copy: {
          main: {
            files: [
              { src: ['app_*/**/*','ngForce/**/*','bootstrap/**/*','bower_components/**/*','img/**/*'], dest: 'tmp/' },
              { expand: true, flatten: true,src: ['app_vf_pages/pages/*'], dest: 'build/pages/' }
            ]
          }
        },

        antdeploy: {
            options: {
              root: 'build/'
            },
            dev1:  {
              options: {
                user: process.env.DEV1USER, // storing my un/pw as env vars for security
                pass: process.env.DEV1PASS, // storing my un/pw as env vars for security
              },
              pkg: {
                staticresource: ['*'],
                apexpage:       ['*']
              }
            },
            dev2:  {
                options: {
                  user: process.env.DEV1USER, // storing my un/pw as env vars for security
                  pass: process.env.DEV1PASS, // storing my un/pw as env vars for security
                },
                pkg: {
                  staticresource: ['*'],
                  apexpage:       ['*']
                }
              }
          }



  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-ant-sfdc');

//custom task to write the -meta.xml file for the metadata deployment
  grunt.registerTask('write-meta', 'Write the required salesforce metadata', function() {
    grunt.log.writeln('Writing metadata...');
    var sr = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<StaticResource xmlns="http://soap.sforce.com/2006/04/metadata">',
      '  <cacheControl>Public</cacheControl>',
      '  <contentType>application/zip</contentType>',
      '  <description>Community Portal App Resources</description>',
      '</StaticResource>'
    ];
    var dest = grunt.template.process('<%= compress.build.options.archive %>') + '-meta.xml';
    grunt.file.write(dest, sr.join('\n'));
  });

  // default task (no deploy)
  grunt.registerTask('default', ['clean', 'copy' ,'compress' , 'write-meta' ,'antdeploy:dev2', 'clean' ]);


};
