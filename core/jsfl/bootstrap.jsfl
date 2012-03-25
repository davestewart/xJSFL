// ------------------------------------------------------------------------------------------------------------------------
//
//  ██████                       ██████              ██          ██
//  ██                           ██  ██              ██          ██
//  ██     █████ ████ █████      ██  ██ █████ █████ █████ █████ █████ ████ █████ █████
//  ██     ██ ██ ██   ██ ██      █████  ██ ██ ██ ██  ██   ██     ██   ██      ██ ██ ██
//  ██     ██ ██ ██   █████      ██  ██ ██ ██ ██ ██  ██   █████  ██   ██   █████ ██ ██
//  ██     ██ ██ ██   ██         ██  ██ ██ ██ ██ ██  ██      ██  ██   ██   ██ ██ ██ ██
//  ██████ █████ ██   █████      ██████ █████ █████  ████ █████  ████ ██   █████ █████
//                                                                               ██
//                                                                               ██
//
// ------------------------------------------------------------------------------------------------------------------------
// Core Bootstrap - Sets up the framework, then loads core classes and modules

	// --------------------------------------------------------------------------------
	// initialize
	
		(function()
		{
			// clear existing values, in case we're reloading
				for(var name in xjsfl)
				{
					if( ! /^(reload|uri|reset|loading|debugState)$/.test(name) )
					{
						delete xjsfl[name];
					}
				}
				
			// temp trace
				trace = fl.trace;

			// ensure FLfile.platformPathToURI() exists
			   if( ! FLfile['platformPathToURI'] )
			   {
				   fl.runScript(xjsfl.uri + 'core/jsfl/libraries/file/FLfile.jsfl');
			   }
			   
		   // ensure temp & logs folders exists
				var uri = xjsfl.uri + 'core/temp/';
				FLfile.createFolder(uri);
				FLfile.createFolder(uri + 'logs/');
		})();
		
	// --------------------------------------------------------------------------------
	// load framework
	
		// --------------------------------------------------------------------------------
		// attempt to load core
		
			try
			{
				// --------------------------------------------------------------------------------
				// set up
				
					// debug
						//fl.outputPanel.clear();
						trace('\n> xjsfl: RUNNING CORE BOOTSTRAP...');
						trace('> xjsfl: installation location: "' +FLfile.uriToPlatformPath(xjsfl.uri)+ '"');
	
					// flags
						xjsfl.loading = true;

					// load proxy classes
						trace('> xjsfl: loading proxy classes...');
						fl.runScript(xjsfl.uri + 'core/jsfl/proxies.jsfl');

					// logs
						xjsfl.output.reset(Log.INFO);
						xjsfl.output.reset(Log.FILE);
						
				// --------------------------------------------------------------------------------
				// load files
				
						
					// load main xjsfl class
						xjsfl.output.trace('loading xjsfl...');
						fl.runScript(xjsfl.uri + 'core/jsfl/libraries/xjsfl.jsfl');
						
						
					// load globals and key libraries
						xjsfl.output.trace('loading core classes...', 1);
						xjsfl.classes.load(xjsfl.uri + 'core/jsfl/libraries/framework/Globals.jsfl');
						xjsfl.classes.load(xjsfl.uri + 'core/jsfl/libraries/utils/Utils.jsfl');
						xjsfl.classes.load(xjsfl.uri + 'core/jsfl/libraries/file/URI.jsfl');
						xjsfl.classes.load(xjsfl.uri + 'core/jsfl/libraries/file/URIList.jsfl');
						
					// add search paths
						xjsfl.output.trace('adding search paths...', 1);
						if(FLfile.exists(fl.configURI + 'xJSFL/'))
						{
							xjsfl.settings.uris.add(fl.configURI + 'xJSFL/', 'core');
						}
						xjsfl.settings.uris.add(xjsfl.uri + 'core/', 'core');
						xjsfl.settings.uris.add(xjsfl.uri + 'user/', 'user');
						
					// initialize
						xjsfl.initGlobals(this, 'window');
			}
			catch(error)
			{
				xjsfl.output.warn('error running core bootstrap');
				xjsfl.output.log('reloading xjsfl...');
				fl.runScript(xjsfl.uri + 'core/jsfl/libraries/xjsfl.jsfl');
				xjsfl.debug.error(error);
			}
			
		// --------------------------------------------------------------------------------
		// attempt to load core libraries
	
			if(xjsfl.loading)
			{
				try
				{
					xjsfl.output.trace('loading supporting classes...', 1);
					include('File', 'Folder', 'Module', 'Table', 'Template', 'XML');
					xjsfl.classes.load(xjsfl.uri + 'core/jsfl/libraries/**/*.jsfl');
				}
				catch(error)
				{
					xjsfl.output.warn('error loading supporting libraries');
					debug(error);
				}			
			}
			
			
		// --------------------------------------------------------------------------------
		// attempt to load modules
	
			if(xjsfl.loading)
			{
				try
				{
					xjsfl.output.trace('initialising modules...', 1);
					xjsfl.modules.find();
				}
				catch(error)
				{
					xjsfl.output.warn('error initializing modules');
					debug(error);
				}			
			}
			
		// --------------------------------------------------------------------------------
		// attempt to load user bootstrap & finalise
	
			if(xjsfl.loading)
			{
				try
				{
					xjsfl.output.trace('running user bootstrap...', 1);
					xjsfl.file.load('//user/jsfl/bootstrap.jsfl');
				}
				catch(error)
				{
					xjsfl.output.warn('error running user bootstrap');
					debug(error);
				}			
			}
	
		// --------------------------------------------------------------------------------
		// cleanup
		
			if(xjsfl.loading)
			{
				xjsfl.output.trace('ready!');
				delete xjsfl.loading;
			}

