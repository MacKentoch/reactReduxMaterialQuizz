module.exports = {
	
  base : {
    'root' 	: './',
    'public': './public/'
  },

  jsHint : {
    sources : './src/app/**/*.jsx'
  },

  css  :{
    sources : ['./src/app/style/index.scss'],
    dest		: {
      filename 	: 'style.css',
      dir				: './src/app/style/'
    }		
  },

  jspm : {
    main : './src/app/main.jsx!',
    dest : './public/js/appBundle.js'	
  }
	
};
