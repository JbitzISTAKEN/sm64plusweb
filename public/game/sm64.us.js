// include: shell.js
// The Module object: Our interface to the outside world. We import
// and export values on it. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(Module) { ..generated code.. }
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to check if Module already exists (e.g. case 3 above).
// Substitution will be replaced with actual code on later stage of the build,
// this way Closure Compiler will not mangle it (e.g. case 4. above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module = typeof Module != 'undefined' ? Module : {};

// --pre-jses are emitted after the Module integration code, so that they can
// refer to Module (if they choose; they can also define Module)

  if (!Module.expectedDataFileDownloads) {
    Module.expectedDataFileDownloads = 0;
  }

  Module.expectedDataFileDownloads++;
  (function() {
    // Do not attempt to redownload the virtual filesystem data when in a pthread or a Wasm Worker context.
    if (Module['ENVIRONMENT_IS_PTHREAD'] || Module['$ww']) return;
    var loadPackage = function(metadata) {

      var PACKAGE_PATH = '';
      if (typeof window === 'object') {
        PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
      } else if (typeof process === 'undefined' && typeof location !== 'undefined') {
        // web worker
        PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
      }
      var PACKAGE_NAME = 'build/us_web/sm64.us.data';
      var REMOTE_PACKAGE_BASE = 'sm64.us.data';
      if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
        Module['locateFile'] = Module['locateFilePackage'];
        err('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
      }
      var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;
var REMOTE_PACKAGE_SIZE = metadata['remote_package_size'];

      function fetchRemotePackage(packageName, packageSize, callback, errback) {
        if (typeof process === 'object' && typeof process.versions === 'object' && typeof process.versions.node === 'string') {
          require('fs').readFile(packageName, function(err, contents) {
            if (err) {
              errback(err);
            } else {
              callback(contents.buffer);
            }
          });
          return;
        }
        var xhr = new XMLHttpRequest();
        xhr.open('GET', packageName, true);
        xhr.responseType = 'arraybuffer';
        xhr.onprogress = function(event) {
          var url = packageName;
          var size = packageSize;
          if (event.total) size = event.total;
          if (event.loaded) {
            if (!xhr.addedTotal) {
              xhr.addedTotal = true;
              if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
              Module.dataFileDownloads[url] = {
                loaded: event.loaded,
                total: size
              };
            } else {
              Module.dataFileDownloads[url].loaded = event.loaded;
            }
            var total = 0;
            var loaded = 0;
            var num = 0;
            for (var download in Module.dataFileDownloads) {
            var data = Module.dataFileDownloads[download];
              total += data.total;
              loaded += data.loaded;
              num++;
            }
            total = Math.ceil(total * Module.expectedDataFileDownloads/num);
            if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
          } else if (!Module.dataFileDownloads) {
            if (Module['setStatus']) Module['setStatus']('Downloading data...');
          }
        };
        xhr.onerror = function(event) {
          throw new Error("NetworkError for: " + packageName);
        }
        xhr.onload = function(event) {
          if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            var packageData = xhr.response;
            callback(packageData);
          } else {
            throw new Error(xhr.statusText + " : " + xhr.responseURL);
          }
        };
        xhr.send(null);
      };

      function handleError(error) {
        console.error('package error:', error);
      };

      var fetchedCallback = null;
      var fetched = Module['getPreloadedPackage'] ? Module['getPreloadedPackage'](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;

      if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);

    function runWithFS() {

      function assert(check, msg) {
        if (!check) throw msg + new Error().stack;
      }
Module['FS_createPath']("/", "gfx", true, true);
Module['FS_createPath']("/gfx", "actors", true, true);
Module['FS_createPath']("/gfx/actors", "amp", true, true);
Module['FS_createPath']("/gfx/actors", "blue_coin_switch", true, true);
Module['FS_createPath']("/gfx/actors", "blue_fish", true, true);
Module['FS_createPath']("/gfx/actors", "bobomb", true, true);
Module['FS_createPath']("/gfx/actors", "bomb", true, true);
Module['FS_createPath']("/gfx/actors", "boo", true, true);
Module['FS_createPath']("/gfx/actors", "boo_castle", true, true);
Module['FS_createPath']("/gfx/actors", "book", true, true);
Module['FS_createPath']("/gfx/actors", "bookend", true, true);
Module['FS_createPath']("/gfx/actors", "bowser", true, true);
Module['FS_createPath']("/gfx/actors", "bowser_flame", true, true);
Module['FS_createPath']("/gfx/actors", "breakable_box", true, true);
Module['FS_createPath']("/gfx/actors", "bub", true, true);
Module['FS_createPath']("/gfx/actors", "bubba", true, true);
Module['FS_createPath']("/gfx/actors", "bubble", true, true);
Module['FS_createPath']("/gfx/actors", "bullet_bill", true, true);
Module['FS_createPath']("/gfx/actors", "bully", true, true);
Module['FS_createPath']("/gfx/actors", "burn_smoke", true, true);
Module['FS_createPath']("/gfx/actors", "butterfly", true, true);
Module['FS_createPath']("/gfx/actors", "cannon_barrel", true, true);
Module['FS_createPath']("/gfx/actors", "cannon_base", true, true);
Module['FS_createPath']("/gfx/actors", "cannon_lid", true, true);
Module['FS_createPath']("/gfx/actors", "capswitch", true, true);
Module['FS_createPath']("/gfx/actors", "chain_ball", true, true);
Module['FS_createPath']("/gfx/actors", "chain_chomp", true, true);
Module['FS_createPath']("/gfx/actors", "chair", true, true);
Module['FS_createPath']("/gfx/actors", "checkerboard_platform", true, true);
Module['FS_createPath']("/gfx/actors", "chillychief", true, true);
Module['FS_createPath']("/gfx/actors", "chuckya", true, true);
Module['FS_createPath']("/gfx/actors", "clam_shell", true, true);
Module['FS_createPath']("/gfx/actors", "coin", true, true);
Module['FS_createPath']("/gfx/actors", "cyan_fish", true, true);
Module['FS_createPath']("/gfx/actors", "dirt", true, true);
Module['FS_createPath']("/gfx/actors", "door", true, true);
Module['FS_createPath']("/gfx/actors", "dorrie", true, true);
Module['FS_createPath']("/gfx/actors", "exclamation_box", true, true);
Module['FS_createPath']("/gfx/actors", "exclamation_box_outline", true, true);
Module['FS_createPath']("/gfx/actors", "explosion", true, true);
Module['FS_createPath']("/gfx/actors", "eyerok", true, true);
Module['FS_createPath']("/gfx/actors", "flame", true, true);
Module['FS_createPath']("/gfx/actors", "flyguy", true, true);
Module['FS_createPath']("/gfx/actors", "fwoosh", true, true);
Module['FS_createPath']("/gfx/actors", "goomba", true, true);
Module['FS_createPath']("/gfx/actors", "haunted_cage", true, true);
Module['FS_createPath']("/gfx/actors", "heart", true, true);
Module['FS_createPath']("/gfx/actors", "heave_ho", true, true);
Module['FS_createPath']("/gfx/actors", "hoot", true, true);
Module['FS_createPath']("/gfx/actors", "impact_ring", true, true);
Module['FS_createPath']("/gfx/actors", "impact_smoke", true, true);
Module['FS_createPath']("/gfx/actors", "king_bobomb", true, true);
Module['FS_createPath']("/gfx/actors", "klepto", true, true);
Module['FS_createPath']("/gfx/actors", "koopa", true, true);
Module['FS_createPath']("/gfx/actors", "koopa_flag", true, true);
Module['FS_createPath']("/gfx/actors", "koopa_shell", true, true);
Module['FS_createPath']("/gfx/actors", "lakitu_cameraman", true, true);
Module['FS_createPath']("/gfx/actors", "lakitu_enemy", true, true);
Module['FS_createPath']("/gfx/actors", "leaves", true, true);
Module['FS_createPath']("/gfx/actors", "mad_piano", true, true);
Module['FS_createPath']("/gfx/actors", "manta", true, true);
Module['FS_createPath']("/gfx/actors", "mario", true, true);
Module['FS_createPath']("/gfx/actors", "mario_cap", true, true);
Module['FS_createPath']("/gfx/actors", "metal_box", true, true);
Module['FS_createPath']("/gfx/actors", "mips", true, true);
Module['FS_createPath']("/gfx/actors", "mist", true, true);
Module['FS_createPath']("/gfx/actors", "moneybag", true, true);
Module['FS_createPath']("/gfx/actors", "monty_mole", true, true);
Module['FS_createPath']("/gfx/actors", "monty_mole_hole", true, true);
Module['FS_createPath']("/gfx/actors", "mr_i_eyeball", true, true);
Module['FS_createPath']("/gfx/actors", "mr_i_iris", true, true);
Module['FS_createPath']("/gfx/actors", "mushroom_1up", true, true);
Module['FS_createPath']("/gfx/actors", "peach", true, true);
Module['FS_createPath']("/gfx/actors", "pebble", true, true);
Module['FS_createPath']("/gfx/actors", "penguin", true, true);
Module['FS_createPath']("/gfx/actors", "piranha_plant", true, true);
Module['FS_createPath']("/gfx/actors", "pokey", true, true);
Module['FS_createPath']("/gfx/actors", "poundable_pole", true, true);
Module['FS_createPath']("/gfx/actors", "power_meter", true, true);
Module['FS_createPath']("/gfx/actors", "purple_switch", true, true);
Module['FS_createPath']("/gfx/actors", "sand", true, true);
Module['FS_createPath']("/gfx/actors", "scuttlebug", true, true);
Module['FS_createPath']("/gfx/actors", "seaweed", true, true);
Module['FS_createPath']("/gfx/actors", "skeeter", true, true);
Module['FS_createPath']("/gfx/actors", "smoke", true, true);
Module['FS_createPath']("/gfx/actors", "snowman", true, true);
Module['FS_createPath']("/gfx/actors", "snufit", true, true);
Module['FS_createPath']("/gfx/actors", "sparkle", true, true);
Module['FS_createPath']("/gfx/actors", "sparkle_animation", true, true);
Module['FS_createPath']("/gfx/actors", "spindrift", true, true);
Module['FS_createPath']("/gfx/actors", "springboard", true, true);
Module['FS_createPath']("/gfx/actors", "star", true, true);
Module['FS_createPath']("/gfx/actors", "stomp_smoke", true, true);
Module['FS_createPath']("/gfx/actors", "sushi", true, true);
Module['FS_createPath']("/gfx/actors", "swoop", true, true);
Module['FS_createPath']("/gfx/actors", "thwomp", true, true);
Module['FS_createPath']("/gfx/actors", "toad", true, true);
Module['FS_createPath']("/gfx/actors", "tornado", true, true);
Module['FS_createPath']("/gfx/actors", "treasure_chest", true, true);
Module['FS_createPath']("/gfx/actors", "tree", true, true);
Module['FS_createPath']("/gfx/actors", "ukiki", true, true);
Module['FS_createPath']("/gfx/actors", "unagi", true, true);
Module['FS_createPath']("/gfx/actors", "walk_smoke", true, true);
Module['FS_createPath']("/gfx/actors", "warp_pipe", true, true);
Module['FS_createPath']("/gfx/actors", "water_bubble", true, true);
Module['FS_createPath']("/gfx/actors", "water_mine", true, true);
Module['FS_createPath']("/gfx/actors", "water_ring", true, true);
Module['FS_createPath']("/gfx/actors", "water_splash", true, true);
Module['FS_createPath']("/gfx/actors", "water_wave", true, true);
Module['FS_createPath']("/gfx/actors", "whirlpool", true, true);
Module['FS_createPath']("/gfx/actors", "white_particle", true, true);
Module['FS_createPath']("/gfx/actors", "white_particle_small", true, true);
Module['FS_createPath']("/gfx/actors", "whomp", true, true);
Module['FS_createPath']("/gfx/actors", "wiggler", true, true);
Module['FS_createPath']("/gfx/actors", "wooden_signpost", true, true);
Module['FS_createPath']("/gfx/actors", "yellow_sphere", true, true);
Module['FS_createPath']("/gfx/actors", "yellow_sphere_small", true, true);
Module['FS_createPath']("/gfx/actors", "yoshi", true, true);
Module['FS_createPath']("/gfx/actors", "yoshi_egg", true, true);
Module['FS_createPath']("/gfx", "levels", true, true);
Module['FS_createPath']("/gfx/levels", "bbh", true, true);
Module['FS_createPath']("/gfx/levels", "bitdw", true, true);
Module['FS_createPath']("/gfx/levels", "bitfs", true, true);
Module['FS_createPath']("/gfx/levels", "bits", true, true);
Module['FS_createPath']("/gfx/levels", "bob", true, true);
Module['FS_createPath']("/gfx/levels", "bowser_1", true, true);
Module['FS_createPath']("/gfx/levels", "bowser_2", true, true);
Module['FS_createPath']("/gfx/levels", "bowser_3", true, true);
Module['FS_createPath']("/gfx/levels", "castle_grounds", true, true);
Module['FS_createPath']("/gfx/levels", "castle_inside", true, true);
Module['FS_createPath']("/gfx/levels", "ccm", true, true);
Module['FS_createPath']("/gfx/levels", "cotmc", true, true);
Module['FS_createPath']("/gfx/levels", "ddd", true, true);
Module['FS_createPath']("/gfx/levels", "ending", true, true);
Module['FS_createPath']("/gfx/levels", "hmc", true, true);
Module['FS_createPath']("/gfx/levels", "intro", true, true);
Module['FS_createPath']("/gfx/levels", "jrb", true, true);
Module['FS_createPath']("/gfx/levels", "lll", true, true);
Module['FS_createPath']("/gfx/levels", "menu", true, true);
Module['FS_createPath']("/gfx/levels", "pss", true, true);
Module['FS_createPath']("/gfx/levels", "rr", true, true);
Module['FS_createPath']("/gfx/levels", "sl", true, true);
Module['FS_createPath']("/gfx/levels", "ssl", true, true);
Module['FS_createPath']("/gfx/levels", "thi", true, true);
Module['FS_createPath']("/gfx/levels", "totwc", true, true);
Module['FS_createPath']("/gfx/levels", "ttc", true, true);
Module['FS_createPath']("/gfx/levels", "ttm", true, true);
Module['FS_createPath']("/gfx/levels", "vcutm", true, true);
Module['FS_createPath']("/gfx/levels", "wdw", true, true);
Module['FS_createPath']("/gfx/levels", "wf", true, true);
Module['FS_createPath']("/gfx/levels", "wmotr", true, true);
Module['FS_createPath']("/gfx", "textures", true, true);
Module['FS_createPath']("/gfx/textures", "cave", true, true);
Module['FS_createPath']("/gfx/textures", "effect", true, true);
Module['FS_createPath']("/gfx/textures", "fire", true, true);
Module['FS_createPath']("/gfx/textures", "generic", true, true);
Module['FS_createPath']("/gfx/textures", "grass", true, true);
Module['FS_createPath']("/gfx/textures", "inside", true, true);
Module['FS_createPath']("/gfx/textures", "intro_raw", true, true);
Module['FS_createPath']("/gfx/textures", "ipl3_raw", true, true);
Module['FS_createPath']("/gfx/textures", "machine", true, true);
Module['FS_createPath']("/gfx/textures", "mountain", true, true);
Module['FS_createPath']("/gfx/textures", "outside", true, true);
Module['FS_createPath']("/gfx/textures", "segment2", true, true);
Module['FS_createPath']("/gfx/textures", "sky", true, true);
Module['FS_createPath']("/gfx/textures", "skybox_tiles", true, true);
Module['FS_createPath']("/gfx/textures", "skyboxes", true, true);
Module['FS_createPath']("/gfx/textures", "snow", true, true);
Module['FS_createPath']("/gfx/textures", "spooky", true, true);
Module['FS_createPath']("/gfx/textures", "title_screen_bg", true, true);
Module['FS_createPath']("/gfx/textures", "water", true, true);

      /** @constructor */
      function DataRequest(start, end, audio) {
        this.start = start;
        this.end = end;
        this.audio = audio;
      }
      DataRequest.prototype = {
        requests: {},
        open: function(mode, name) {
          this.name = name;
          this.requests[name] = this;
          Module['addRunDependency']('fp ' + this.name);
        },
        send: function() {},
        onload: function() {
          var byteArray = this.byteArray.subarray(this.start, this.end);
          this.finish(byteArray);
        },
        finish: function(byteArray) {
          var that = this;
          // canOwn this data in the filesystem, it is a slide into the heap that will never change
          Module['FS_createDataFile'](this.name, null, byteArray, true, true, true);
          Module['removeRunDependency']('fp ' + that.name);
          this.requests[this.name] = null;
        }
      };

      var files = metadata['files'];
      for (var i = 0; i < files.length; ++i) {
        new DataRequest(files[i]['start'], files[i]['end'], files[i]['audio'] || 0).open('GET', files[i]['filename']);
      }

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        // Reuse the bytearray from the XHR as the source for file reads.
          DataRequest.prototype.byteArray = byteArray;
          var files = metadata['files'];
          for (var i = 0; i < files.length; ++i) {
            DataRequest.prototype.requests[files[i].filename].onload();
          }          Module['removeRunDependency']('datafile_build/us_web/sm64.us.data');

      };
      Module['addRunDependency']('datafile_build/us_web/sm64.us.data');

      if (!Module.preloadResults) Module.preloadResults = {};

      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }

    }
    if (Module['calledRun']) {
      runWithFS();
    } else {
      if (!Module['preRun']) Module['preRun'] = [];
      Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
    }

    }
    loadPackage({"files": [{"filename": "/gfx/actors/amp/amp_body.rgba16.png", "start": 0, "end": 1146}, {"filename": "/gfx/actors/amp/amp_electricity.rgba16.png", "start": 1146, "end": 1491}, {"filename": "/gfx/actors/amp/amp_eyes.rgba16.png", "start": 1491, "end": 2359}, {"filename": "/gfx/actors/amp/amp_mouth.rgba16.png", "start": 2359, "end": 4301}, {"filename": "/gfx/actors/blue_coin_switch/blue_coin_switch_side.rgba16.png", "start": 4301, "end": 5787}, {"filename": "/gfx/actors/blue_coin_switch/blue_coin_switch_top.rgba16.png", "start": 5787, "end": 8402}, {"filename": "/gfx/actors/blue_fish/blue_fish.rgba16.png", "start": 8402, "end": 10220}, {"filename": "/gfx/actors/bobomb/bob-omb_buddy_left_side.rgba16.png", "start": 10220, "end": 11633}, {"filename": "/gfx/actors/bobomb/bob-omb_buddy_right_side.rgba16.png", "start": 11633, "end": 13347}, {"filename": "/gfx/actors/bobomb/bob-omb_eyes.rgba16.png", "start": 13347, "end": 13565}, {"filename": "/gfx/actors/bobomb/bob-omb_eyes_blink.rgba16.png", "start": 13565, "end": 13722}, {"filename": "/gfx/actors/bobomb/bob-omb_left_side.rgba16.png", "start": 13722, "end": 14813}, {"filename": "/gfx/actors/bobomb/bob-omb_right_side.rgba16.png", "start": 14813, "end": 15923}, {"filename": "/gfx/actors/bomb/bomb_left_side.rgba16.png", "start": 15923, "end": 16999}, {"filename": "/gfx/actors/bomb/bomb_right_side.rgba16.png", "start": 16999, "end": 18335}, {"filename": "/gfx/actors/bomb/bomb_spike.rgba16.png", "start": 18335, "end": 18954}, {"filename": "/gfx/actors/boo/boo_eyes.rgba16.png", "start": 18954, "end": 21540}, {"filename": "/gfx/actors/boo/boo_mouth.rgba16.png", "start": 21540, "end": 22950}, {"filename": "/gfx/actors/boo_castle/bbh_boo_eyes.rgba16.png", "start": 22950, "end": 25536}, {"filename": "/gfx/actors/boo_castle/bbh_boo_mouth.rgba16.png", "start": 25536, "end": 26946}, {"filename": "/gfx/actors/book/book_cover.rgba16.png", "start": 26946, "end": 28714}, {"filename": "/gfx/actors/bookend/bookend_cover.rgba16.png", "start": 28714, "end": 30482}, {"filename": "/gfx/actors/bookend/bookend_mouth.rgba16.png", "start": 30482, "end": 31864}, {"filename": "/gfx/actors/bookend/bookend_pages.rgba16.png", "start": 31864, "end": 32419}, {"filename": "/gfx/actors/bookend/bookend_spine.rgba16.png", "start": 32419, "end": 33780}, {"filename": "/gfx/actors/bookend/bookend_tooth.rgba16.png", "start": 33780, "end": 33964}, {"filename": "/gfx/actors/bowser/bowser_armband.rgba16.png", "start": 33964, "end": 35122}, {"filename": "/gfx/actors/bowser/bowser_armband_spike.rgba16.png", "start": 35122, "end": 37505}, {"filename": "/gfx/actors/bowser/bowser_blue_eye_unused.rgba16.png", "start": 37505, "end": 40979}, {"filename": "/gfx/actors/bowser/bowser_body.rgba16.png", "start": 40979, "end": 42480}, {"filename": "/gfx/actors/bowser/bowser_chest.rgba16.png", "start": 42480, "end": 43146}, {"filename": "/gfx/actors/bowser/bowser_claw_edge.rgba16.png", "start": 43146, "end": 45730}, {"filename": "/gfx/actors/bowser/bowser_claw_horn_angle.rgba16.png", "start": 45730, "end": 47667}, {"filename": "/gfx/actors/bowser/bowser_claw_horn_tooth.rgba16.png", "start": 47667, "end": 48858}, {"filename": "/gfx/actors/bowser/bowser_eye_center_0.rgba16.png", "start": 48858, "end": 52789}, {"filename": "/gfx/actors/bowser/bowser_eye_center_1.rgba16.png", "start": 52789, "end": 56720}, {"filename": "/gfx/actors/bowser/bowser_eye_closed_0.rgba16.png", "start": 56720, "end": 59985}, {"filename": "/gfx/actors/bowser/bowser_eye_closed_1.rgba16.png", "start": 59985, "end": 63250}, {"filename": "/gfx/actors/bowser/bowser_eye_far_left_0.rgba16.png", "start": 63250, "end": 67052}, {"filename": "/gfx/actors/bowser/bowser_eye_far_left_1.rgba16.png", "start": 67052, "end": 70854}, {"filename": "/gfx/actors/bowser/bowser_eye_half_closed_0.rgba16.png", "start": 70854, "end": 74557}, {"filename": "/gfx/actors/bowser/bowser_eye_half_closed_1.rgba16.png", "start": 74557, "end": 78260}, {"filename": "/gfx/actors/bowser/bowser_eye_left_0.rgba16.png", "start": 78260, "end": 82268}, {"filename": "/gfx/actors/bowser/bowser_eye_left_1.rgba16.png", "start": 82268, "end": 86276}, {"filename": "/gfx/actors/bowser/bowser_eye_right_0.rgba16.png", "start": 86276, "end": 90078}, {"filename": "/gfx/actors/bowser/bowser_eye_right_1.rgba16.png", "start": 90078, "end": 93880}, {"filename": "/gfx/actors/bowser/bowser_eyebrow.rgba16.png", "start": 93880, "end": 97322}, {"filename": "/gfx/actors/bowser/bowser_hair.rgba16.png", "start": 97322, "end": 99690}, {"filename": "/gfx/actors/bowser/bowser_mouth_unused.rgba16.png", "start": 99690, "end": 99852}, {"filename": "/gfx/actors/bowser/bowser_muzzle.rgba16.png", "start": 99852, "end": 101470}, {"filename": "/gfx/actors/bowser/bowser_nostrils.rgba16.png", "start": 101470, "end": 103929}, {"filename": "/gfx/actors/bowser/bowser_shell.rgba16.png", "start": 103929, "end": 106557}, {"filename": "/gfx/actors/bowser/bowser_shell_edge.rgba16.png", "start": 106557, "end": 106896}, {"filename": "/gfx/actors/bowser/bowser_tongue.rgba16.png", "start": 106896, "end": 108767}, {"filename": "/gfx/actors/bowser/bowser_upper_face.rgba16.png", "start": 108767, "end": 110381}, {"filename": "/gfx/actors/bowser_flame/bowser_flame_0.rgba16.png", "start": 110381, "end": 112136}, {"filename": "/gfx/actors/bowser_flame/bowser_flame_1.rgba16.png", "start": 112136, "end": 113941}, {"filename": "/gfx/actors/bowser_flame/bowser_flame_10.rgba16.png", "start": 113941, "end": 119368}, {"filename": "/gfx/actors/bowser_flame/bowser_flame_11.rgba16.png", "start": 119368, "end": 124952}, {"filename": "/gfx/actors/bowser_flame/bowser_flame_12.rgba16.png", "start": 124952, "end": 130195}, {"filename": "/gfx/actors/bowser_flame/bowser_flame_13.rgba16.png", "start": 130195, "end": 134207}, {"filename": "/gfx/actors/bowser_flame/bowser_flame_2.rgba16.png", "start": 134207, "end": 136448}, {"filename": "/gfx/actors/bowser_flame/bowser_flame_3.rgba16.png", "start": 136448, "end": 138947}, {"filename": "/gfx/actors/bowser_flame/bowser_flame_4.rgba16.png", "start": 138947, "end": 141717}, {"filename": "/gfx/actors/bowser_flame/bowser_flame_5.rgba16.png", "start": 141717, "end": 144686}, {"filename": "/gfx/actors/bowser_flame/bowser_flame_6.rgba16.png", "start": 144686, "end": 147663}, {"filename": "/gfx/actors/bowser_flame/bowser_flame_7.rgba16.png", "start": 147663, "end": 151322}, {"filename": "/gfx/actors/bowser_flame/bowser_flame_8.rgba16.png", "start": 151322, "end": 155958}, {"filename": "/gfx/actors/bowser_flame/bowser_flame_9.rgba16.png", "start": 155958, "end": 161200}, {"filename": "/gfx/actors/breakable_box/cork_box_surface.rgba16.png", "start": 161200, "end": 164707}, {"filename": "/gfx/actors/breakable_box/crazy_box_surface.rgba16.png", "start": 164707, "end": 167969}, {"filename": "/gfx/actors/bub/bub_eye_border.rgba16.png", "start": 167969, "end": 168220}, {"filename": "/gfx/actors/bub/bub_eyes.rgba16.png", "start": 168220, "end": 168659}, {"filename": "/gfx/actors/bub/bub_fins.rgba16.png", "start": 168659, "end": 169472}, {"filename": "/gfx/actors/bub/bub_scales.rgba16.png", "start": 169472, "end": 170703}, {"filename": "/gfx/actors/bubba/bubba_eye_border.rgba16.png", "start": 170703, "end": 170954}, {"filename": "/gfx/actors/bubba/bubba_eyes_unused.rgba16.png", "start": 170954, "end": 171393}, {"filename": "/gfx/actors/bubba/bubba_fins.rgba16.png", "start": 171393, "end": 172206}, {"filename": "/gfx/actors/bubba/bubba_scales.rgba16.png", "start": 172206, "end": 174496}, {"filename": "/gfx/actors/bubba/bubba_sunglasses.rgba16.png", "start": 174496, "end": 174754}, {"filename": "/gfx/actors/bubble/bubble.rgba16.png", "start": 174754, "end": 175963}, {"filename": "/gfx/actors/bubble/mr_i_bubble.rgba16.png", "start": 175963, "end": 178142}, {"filename": "/gfx/actors/bullet_bill/bullet_bill_eye.rgba16.png", "start": 178142, "end": 178911}, {"filename": "/gfx/actors/bullet_bill/bullet_bill_mouth.rgba16.png", "start": 178911, "end": 181406}, {"filename": "/gfx/actors/bully/bully_eye.rgba16.png", "start": 181406, "end": 182104}, {"filename": "/gfx/actors/bully/bully_horn.rgba16.png", "start": 182104, "end": 182331}, {"filename": "/gfx/actors/bully/bully_left_side.rgba16.png", "start": 182331, "end": 183168}, {"filename": "/gfx/actors/bully/bully_right_side.rgba16.png", "start": 183168, "end": 184064}, {"filename": "/gfx/actors/burn_smoke/burn_smoke.ia16.png", "start": 184064, "end": 185312}, {"filename": "/gfx/actors/butterfly/butterfly_wing.rgba16.png", "start": 185312, "end": 188224}, {"filename": "/gfx/actors/cannon_barrel/cannon_barrel.rgba16.png", "start": 188224, "end": 189348}, {"filename": "/gfx/actors/cannon_base/cannon_base.rgba16.png", "start": 189348, "end": 190467}, {"filename": "/gfx/actors/cannon_lid/cannon_lid.rgba16.png", "start": 190467, "end": 192405}, {"filename": "/gfx/actors/capswitch/cap_switch_base.rgba16.png", "start": 192405, "end": 192538}, {"filename": "/gfx/actors/capswitch/cap_switch_head.ia16.png", "start": 192538, "end": 194240}, {"filename": "/gfx/actors/chain_ball/chain_ball.rgba16.png", "start": 194240, "end": 196008}, {"filename": "/gfx/actors/chain_chomp/chain_chomp_bright_shine.rgba16.png", "start": 196008, "end": 196914}, {"filename": "/gfx/actors/chain_chomp/chain_chomp_dull_shine.rgba16.png", "start": 196914, "end": 197595}, {"filename": "/gfx/actors/chain_chomp/chain_chomp_eye.rgba16.png", "start": 197595, "end": 198348}, {"filename": "/gfx/actors/chain_chomp/chain_chomp_tongue.rgba16.png", "start": 198348, "end": 199965}, {"filename": "/gfx/actors/chain_chomp/chain_chomp_tooth.rgba16.png", "start": 199965, "end": 200218}, {"filename": "/gfx/actors/chair/chair_bottom.rgba16.png", "start": 200218, "end": 200934}, {"filename": "/gfx/actors/chair/chair_front.rgba16.png", "start": 200934, "end": 202596}, {"filename": "/gfx/actors/chair/chair_leg.rgba16.png", "start": 202596, "end": 203831}, {"filename": "/gfx/actors/chair/chair_surface_unused.rgba16.png", "start": 203831, "end": 205252}, {"filename": "/gfx/actors/checkerboard_platform/checkerboard_platform.rgba16.png", "start": 205252, "end": 206429}, {"filename": "/gfx/actors/checkerboard_platform/checkerboard_platform_side.rgba16.png", "start": 206429, "end": 207103}, {"filename": "/gfx/actors/chillychief/chill_bully_eye.rgba16.png", "start": 207103, "end": 207801}, {"filename": "/gfx/actors/chillychief/chill_bully_left_side.rgba16.png", "start": 207801, "end": 210792}, {"filename": "/gfx/actors/chillychief/chill_bully_right_side.rgba16.png", "start": 210792, "end": 214280}, {"filename": "/gfx/actors/chuckya/chuckya_body_arm_left_side.rgba16.png", "start": 214280, "end": 216093}, {"filename": "/gfx/actors/chuckya/chuckya_body_arm_right_side.rgba16.png", "start": 216093, "end": 218340}, {"filename": "/gfx/actors/chuckya/chuckya_eyes.rgba16.png", "start": 218340, "end": 219738}, {"filename": "/gfx/actors/chuckya/chuckya_hand_antenna.rgba16.png", "start": 219738, "end": 220837}, {"filename": "/gfx/actors/clam_shell/clam_shell.rgba16.png", "start": 220837, "end": 223007}, {"filename": "/gfx/actors/clam_shell/clam_shell_mouth.rgba16.png", "start": 223007, "end": 225014}, {"filename": "/gfx/actors/coin/coin_front.ia16.png", "start": 225014, "end": 226533}, {"filename": "/gfx/actors/coin/coin_side.ia16.png", "start": 226533, "end": 227234}, {"filename": "/gfx/actors/coin/coin_tilt_left.ia16.png", "start": 227234, "end": 228599}, {"filename": "/gfx/actors/coin/coin_tilt_right.ia16.png", "start": 228599, "end": 230072}, {"filename": "/gfx/actors/cyan_fish/cyan_fish.rgba16.png", "start": 230072, "end": 232365}, {"filename": "/gfx/actors/dirt/dirt_particle.rgba16.png", "start": 232365, "end": 233239}, {"filename": "/gfx/actors/door/bbh_door.rgba16.png", "start": 233239, "end": 238090}, {"filename": "/gfx/actors/door/bbh_door_overlay.rgba16.png", "start": 238090, "end": 240164}, {"filename": "/gfx/actors/door/door_lock.rgba16.png", "start": 240164, "end": 241341}, {"filename": "/gfx/actors/door/hmc_mural_door.rgba16.png", "start": 241341, "end": 247183}, {"filename": "/gfx/actors/door/hmc_mural_door_overlay.rgba16.png", "start": 247183, "end": 250162}, {"filename": "/gfx/actors/door/metal_door.rgba16.png", "start": 250162, "end": 255627}, {"filename": "/gfx/actors/door/metal_door_overlay.rgba16.png", "start": 255627, "end": 257910}, {"filename": "/gfx/actors/door/one_star_door_sign.rgba16.png", "start": 257910, "end": 259140}, {"filename": "/gfx/actors/door/polished_wooden_door.rgba16.png", "start": 259140, "end": 261891}, {"filename": "/gfx/actors/door/polished_wooden_door_overlay.rgba16.png", "start": 261891, "end": 263528}, {"filename": "/gfx/actors/door/rough_wooden_door.rgba16.png", "start": 263528, "end": 266774}, {"filename": "/gfx/actors/door/rough_wooden_door_overlay.rgba16.png", "start": 266774, "end": 268347}, {"filename": "/gfx/actors/door/three_star_door_sign.rgba16.png", "start": 268347, "end": 269673}, {"filename": "/gfx/actors/door/zero_star_door_sign.rgba16.png", "start": 269673, "end": 270837}, {"filename": "/gfx/actors/dorrie/dorrie_eye.rgba16.png", "start": 270837, "end": 271299}, {"filename": "/gfx/actors/dorrie/dorrie_skin.rgba16.png", "start": 271299, "end": 273668}, {"filename": "/gfx/actors/dorrie/dorrie_tongue.rgba16.png", "start": 273668, "end": 275285}, {"filename": "/gfx/actors/exclamation_box/exclamation_box_front.rgba16.png", "start": 275285, "end": 276052}, {"filename": "/gfx/actors/exclamation_box/exclamation_box_side.rgba16.png", "start": 276052, "end": 276357}, {"filename": "/gfx/actors/exclamation_box/metal_cap_box_front.rgba16.png", "start": 276357, "end": 277104}, {"filename": "/gfx/actors/exclamation_box/metal_cap_box_side.rgba16.png", "start": 277104, "end": 277411}, {"filename": "/gfx/actors/exclamation_box/vanish_cap_box_front.rgba16.png", "start": 277411, "end": 278164}, {"filename": "/gfx/actors/exclamation_box/vanish_cap_box_side.rgba16.png", "start": 278164, "end": 278455}, {"filename": "/gfx/actors/exclamation_box/wing_cap_box_front.rgba16.png", "start": 278455, "end": 279165}, {"filename": "/gfx/actors/exclamation_box/wing_cap_box_side.rgba16.png", "start": 279165, "end": 279459}, {"filename": "/gfx/actors/exclamation_box_outline/exclamation_box_outline.rgba16.png", "start": 279459, "end": 279599}, {"filename": "/gfx/actors/exclamation_box_outline/exclamation_point.rgba16.png", "start": 279599, "end": 280341}, {"filename": "/gfx/actors/explosion/explosion_0.rgba16.png", "start": 280341, "end": 282348}, {"filename": "/gfx/actors/explosion/explosion_1.rgba16.png", "start": 282348, "end": 284796}, {"filename": "/gfx/actors/explosion/explosion_2.rgba16.png", "start": 284796, "end": 287107}, {"filename": "/gfx/actors/explosion/explosion_3.rgba16.png", "start": 287107, "end": 288879}, {"filename": "/gfx/actors/explosion/explosion_4.rgba16.png", "start": 288879, "end": 290814}, {"filename": "/gfx/actors/explosion/explosion_5.rgba16.png", "start": 290814, "end": 292653}, {"filename": "/gfx/actors/explosion/explosion_6.rgba16.png", "start": 292653, "end": 294281}, {"filename": "/gfx/actors/eyerok/eyerok_bricks.rgba16.png", "start": 294281, "end": 296835}, {"filename": "/gfx/actors/eyerok/eyerok_eye_closed.rgba16.png", "start": 296835, "end": 298417}, {"filename": "/gfx/actors/eyerok/eyerok_eye_mostly_closed.rgba16.png", "start": 298417, "end": 300114}, {"filename": "/gfx/actors/eyerok/eyerok_eye_mostly_open.rgba16.png", "start": 300114, "end": 302162}, {"filename": "/gfx/actors/eyerok/eyerok_eye_open.rgba16.png", "start": 302162, "end": 304208}, {"filename": "/gfx/actors/flame/flame_0.ia16.png", "start": 304208, "end": 305488}, {"filename": "/gfx/actors/flame/flame_1.ia16.png", "start": 305488, "end": 306710}, {"filename": "/gfx/actors/flame/flame_2.ia16.png", "start": 306710, "end": 307971}, {"filename": "/gfx/actors/flame/flame_3.ia16.png", "start": 307971, "end": 309215}, {"filename": "/gfx/actors/flame/flame_4.ia16.png", "start": 309215, "end": 310473}, {"filename": "/gfx/actors/flame/flame_5.ia16.png", "start": 310473, "end": 311794}, {"filename": "/gfx/actors/flame/flame_6.ia16.png", "start": 311794, "end": 313062}, {"filename": "/gfx/actors/flame/flame_7.ia16.png", "start": 313062, "end": 314339}, {"filename": "/gfx/actors/flyguy/flyguy_cloth_wrinkle.rgba16.png", "start": 314339, "end": 316691}, {"filename": "/gfx/actors/flyguy/flyguy_face.rgba16.png", "start": 316691, "end": 317887}, {"filename": "/gfx/actors/flyguy/flyguy_propeller.ia16.png", "start": 317887, "end": 318665}, {"filename": "/gfx/actors/fwoosh/fwoosh_face.ia16.png", "start": 318665, "end": 320549}, {"filename": "/gfx/actors/goomba/goomba_body.rgba16.png", "start": 320549, "end": 321851}, {"filename": "/gfx/actors/goomba/goomba_face.rgba16.png", "start": 321851, "end": 324246}, {"filename": "/gfx/actors/goomba/goomba_face_blink.rgba16.png", "start": 324246, "end": 326522}, {"filename": "/gfx/actors/haunted_cage/bbh_cage_bars.rgba16.png", "start": 326522, "end": 327493}, {"filename": "/gfx/actors/haunted_cage/bbh_cage_double_ornament.rgba16.png", "start": 327493, "end": 330259}, {"filename": "/gfx/actors/haunted_cage/bbh_cage_floor.rgba16.png", "start": 330259, "end": 333223}, {"filename": "/gfx/actors/haunted_cage/bbh_cage_garbage.rgba16.png", "start": 333223, "end": 333388}, {"filename": "/gfx/actors/haunted_cage/bbh_cage_ornament.rgba16.png", "start": 333388, "end": 334887}, {"filename": "/gfx/actors/haunted_cage/bbh_cage_wooden_base.rgba16.png", "start": 334887, "end": 336239}, {"filename": "/gfx/actors/heart/spinning_heart.rgba16.png", "start": 336239, "end": 338254}, {"filename": "/gfx/actors/heave_ho/heave-ho_arm_ornament.rgba16.png", "start": 338254, "end": 340306}, {"filename": "/gfx/actors/heave_ho/heave-ho_face.rgba16.png", "start": 340306, "end": 341985}, {"filename": "/gfx/actors/heave_ho/heave-ho_logo.rgba16.png", "start": 341985, "end": 345599}, {"filename": "/gfx/actors/heave_ho/heave-ho_platform.rgba16.png", "start": 345599, "end": 346693}, {"filename": "/gfx/actors/heave_ho/heave-ho_roller.rgba16.png", "start": 346693, "end": 347457}, {"filename": "/gfx/actors/heave_ho/heave-ho_turnkey.rgba16.png", "start": 347457, "end": 349830}, {"filename": "/gfx/actors/hoot/hoot_eyes.rgba16.png", "start": 349830, "end": 350985}, {"filename": "/gfx/actors/hoot/hoot_wing.rgba16.png", "start": 350985, "end": 352159}, {"filename": "/gfx/actors/hoot/hoot_wing_tip.rgba16.png", "start": 352159, "end": 354106}, {"filename": "/gfx/actors/impact_ring/impact_ring_left_side.ia16.png", "start": 354106, "end": 356594}, {"filename": "/gfx/actors/impact_ring/impact_ring_right_side.ia16.png", "start": 356594, "end": 359088}, {"filename": "/gfx/actors/impact_smoke/impact_smoke_0.ia16.png", "start": 359088, "end": 363035}, {"filename": "/gfx/actors/impact_smoke/impact_smoke_1.ia16.png", "start": 363035, "end": 367973}, {"filename": "/gfx/actors/impact_smoke/impact_smoke_2.ia16.png", "start": 367973, "end": 373224}, {"filename": "/gfx/actors/impact_smoke/impact_smoke_3.ia16.png", "start": 373224, "end": 378689}, {"filename": "/gfx/actors/king_bobomb/bob-omb_buddy_body_unused.rgba16.png", "start": 378689, "end": 381750}, {"filename": "/gfx/actors/king_bobomb/bob-omb_buddy_left_side_unused.rgba16.png", "start": 381750, "end": 383163}, {"filename": "/gfx/actors/king_bobomb/bob-omb_buddy_right_side_unused.rgba16.png", "start": 383163, "end": 384877}, {"filename": "/gfx/actors/king_bobomb/king_bob-omb_arm.rgba16.png", "start": 384877, "end": 386358}, {"filename": "/gfx/actors/king_bobomb/king_bob-omb_body_unused.rgba16.png", "start": 386358, "end": 388310}, {"filename": "/gfx/actors/king_bobomb/king_bob-omb_crown_rim.rgba16.png", "start": 388310, "end": 389034}, {"filename": "/gfx/actors/king_bobomb/king_bob-omb_eyes.rgba16.png", "start": 389034, "end": 389252}, {"filename": "/gfx/actors/king_bobomb/king_bob-omb_eyes_blink.rgba16.png", "start": 389252, "end": 389409}, {"filename": "/gfx/actors/king_bobomb/king_bob-omb_hand.rgba16.png", "start": 389409, "end": 390738}, {"filename": "/gfx/actors/king_bobomb/king_bob-omb_left_side.rgba16.png", "start": 390738, "end": 391353}, {"filename": "/gfx/actors/king_bobomb/king_bob-omb_right_side.rgba16.png", "start": 391353, "end": 392214}, {"filename": "/gfx/actors/klepto/klepto_beak.rgba16.png", "start": 392214, "end": 393808}, {"filename": "/gfx/actors/klepto/klepto_chest_tuft.rgba16.png", "start": 393808, "end": 394547}, {"filename": "/gfx/actors/klepto/klepto_eye.rgba16.png", "start": 394547, "end": 396297}, {"filename": "/gfx/actors/klepto/klepto_wing.rgba16.png", "start": 396297, "end": 398149}, {"filename": "/gfx/actors/klepto/klepto_wing_flap.rgba16.png", "start": 398149, "end": 399473}, {"filename": "/gfx/actors/koopa/koopa_eye_border.rgba16.png", "start": 399473, "end": 400187}, {"filename": "/gfx/actors/koopa/koopa_eyes_closed.rgba16.png", "start": 400187, "end": 400594}, {"filename": "/gfx/actors/koopa/koopa_eyes_open.rgba16.png", "start": 400594, "end": 401164}, {"filename": "/gfx/actors/koopa/koopa_nostrils.rgba16.png", "start": 401164, "end": 402385}, {"filename": "/gfx/actors/koopa/koopa_shell_back.rgba16.png", "start": 402385, "end": 404339}, {"filename": "/gfx/actors/koopa/koopa_shell_front.rgba16.png", "start": 404339, "end": 405587}, {"filename": "/gfx/actors/koopa/koopa_shell_front_top.rgba16.png", "start": 405587, "end": 405928}, {"filename": "/gfx/actors/koopa/koopa_shoe.rgba16.png", "start": 405928, "end": 406329}, {"filename": "/gfx/actors/koopa_flag/koopa_flag_banner.rgba16.png", "start": 406329, "end": 408875}, {"filename": "/gfx/actors/koopa_shell/koopa_shell_back.rgba16.png", "start": 408875, "end": 410829}, {"filename": "/gfx/actors/koopa_shell/koopa_shell_front.rgba16.png", "start": 410829, "end": 412077}, {"filename": "/gfx/actors/lakitu_cameraman/lakitu_camera_lens.rgba16.png", "start": 412077, "end": 412744}, {"filename": "/gfx/actors/lakitu_cameraman/lakitu_cameraman_cloud_face_unused.rgba16.png", "start": 412744, "end": 413444}, {"filename": "/gfx/actors/lakitu_cameraman/lakitu_cameraman_eyes_closed.rgba16.png", "start": 413444, "end": 414526}, {"filename": "/gfx/actors/lakitu_cameraman/lakitu_cameraman_eyes_open.rgba16.png", "start": 414526, "end": 415746}, {"filename": "/gfx/actors/lakitu_cameraman/lakitu_cameraman_frown.rgba16.png", "start": 415746, "end": 416227}, {"filename": "/gfx/actors/lakitu_cameraman/lakitu_cameraman_shell.rgba16.png", "start": 416227, "end": 416657}, {"filename": "/gfx/actors/lakitu_enemy/lakitu_enemy_cloud_face_unused.rgba16.png", "start": 416657, "end": 417357}, {"filename": "/gfx/actors/lakitu_enemy/lakitu_enemy_eyes_closed.rgba16.png", "start": 417357, "end": 418439}, {"filename": "/gfx/actors/lakitu_enemy/lakitu_enemy_eyes_open.rgba16.png", "start": 418439, "end": 419659}, {"filename": "/gfx/actors/lakitu_enemy/lakitu_enemy_frown.rgba16.png", "start": 419659, "end": 420140}, {"filename": "/gfx/actors/lakitu_enemy/lakitu_enemy_shell.rgba16.png", "start": 420140, "end": 420570}, {"filename": "/gfx/actors/leaves/leaf.rgba16.png", "start": 420570, "end": 420965}, {"filename": "/gfx/actors/mad_piano/mad_piano_body.rgba16.png", "start": 420965, "end": 421162}, {"filename": "/gfx/actors/mad_piano/mad_piano_keys.rgba16.png", "start": 421162, "end": 422137}, {"filename": "/gfx/actors/mad_piano/mad_piano_keys_corner.rgba16.png", "start": 422137, "end": 422553}, {"filename": "/gfx/actors/mad_piano/mad_piano_keys_edge.rgba16.png", "start": 422553, "end": 423095}, {"filename": "/gfx/actors/mad_piano/mad_piano_mouth.rgba16.png", "start": 423095, "end": 423291}, {"filename": "/gfx/actors/mad_piano/mad_piano_tooth.rgba16.png", "start": 423291, "end": 423544}, {"filename": "/gfx/actors/manta/manta_eye.rgba16.png", "start": 423544, "end": 425118}, {"filename": "/gfx/actors/manta/manta_fin_corner.rgba16.png", "start": 425118, "end": 426002}, {"filename": "/gfx/actors/manta/manta_fin_edge.rgba16.png", "start": 426002, "end": 427238}, {"filename": "/gfx/actors/manta/manta_gills.rgba16.png", "start": 427238, "end": 428625}, {"filename": "/gfx/actors/mario/mario_eyes_center.rgba16.png", "start": 428625, "end": 429870}, {"filename": "/gfx/actors/mario/mario_eyes_closed.rgba16.png", "start": 429870, "end": 430346}, {"filename": "/gfx/actors/mario/mario_eyes_closed_unused_0.rgba16.png", "start": 430346, "end": 430822}, {"filename": "/gfx/actors/mario/mario_eyes_closed_unused_1.rgba16.png", "start": 430822, "end": 431298}, {"filename": "/gfx/actors/mario/mario_eyes_dead.rgba16.png", "start": 431298, "end": 431929}, {"filename": "/gfx/actors/mario/mario_eyes_down_unused.rgba16.png", "start": 431929, "end": 432959}, {"filename": "/gfx/actors/mario/mario_eyes_half_closed.rgba16.png", "start": 432959, "end": 433975}, {"filename": "/gfx/actors/mario/mario_eyes_left_unused.rgba16.png", "start": 433975, "end": 435166}, {"filename": "/gfx/actors/mario/mario_eyes_right_unused.rgba16.png", "start": 435166, "end": 436408}, {"filename": "/gfx/actors/mario/mario_eyes_up_unused.rgba16.png", "start": 436408, "end": 437536}, {"filename": "/gfx/actors/mario/mario_logo.rgba16.png", "start": 437536, "end": 438051}, {"filename": "/gfx/actors/mario/mario_metal.rgba16.png", "start": 438051, "end": 442841}, {"filename": "/gfx/actors/mario/mario_metal_wing_tip_unused.rgba16.png", "start": 442841, "end": 445701}, {"filename": "/gfx/actors/mario/mario_metal_wing_unused.rgba16.png", "start": 445701, "end": 449100}, {"filename": "/gfx/actors/mario/mario_mustache.rgba16.png", "start": 449100, "end": 449339}, {"filename": "/gfx/actors/mario/mario_overalls_button.rgba16.png", "start": 449339, "end": 450236}, {"filename": "/gfx/actors/mario/mario_sideburn.rgba16.png", "start": 450236, "end": 450928}, {"filename": "/gfx/actors/mario/mario_wing.rgba16.png", "start": 450928, "end": 452601}, {"filename": "/gfx/actors/mario/mario_wing_tip.rgba16.png", "start": 452601, "end": 453733}, {"filename": "/gfx/actors/mario_cap/mario_cap_logo.rgba16.png", "start": 453733, "end": 454248}, {"filename": "/gfx/actors/mario_cap/mario_cap_metal.rgba16.png", "start": 454248, "end": 459038}, {"filename": "/gfx/actors/mario_cap/mario_cap_metal_wing_tip_unused.rgba16.png", "start": 459038, "end": 461898}, {"filename": "/gfx/actors/mario_cap/mario_cap_metal_wing_unused.rgba16.png", "start": 461898, "end": 465297}, {"filename": "/gfx/actors/mario_cap/mario_cap_wing.rgba16.png", "start": 465297, "end": 466970}, {"filename": "/gfx/actors/mario_cap/mario_cap_wing_tip.rgba16.png", "start": 466970, "end": 468102}, {"filename": "/gfx/actors/metal_box/metal_box_side.rgba16.png", "start": 468102, "end": 471763}, {"filename": "/gfx/actors/mips/mips_eyes.rgba16.png", "start": 471763, "end": 473063}, {"filename": "/gfx/actors/mist/mist.ia16.png", "start": 473063, "end": 474210}, {"filename": "/gfx/actors/moneybag/moneybag_eyes.rgba16.png", "start": 474210, "end": 474974}, {"filename": "/gfx/actors/moneybag/moneybag_mouth.rgba16.png", "start": 474974, "end": 476790}, {"filename": "/gfx/actors/monty_mole/monty_mole_cheek.rgba16.png", "start": 476790, "end": 478033}, {"filename": "/gfx/actors/monty_mole/monty_mole_claw.rgba16.png", "start": 478033, "end": 479398}, {"filename": "/gfx/actors/monty_mole/monty_mole_eye.rgba16.png", "start": 479398, "end": 479819}, {"filename": "/gfx/actors/monty_mole/monty_mole_nose.rgba16.png", "start": 479819, "end": 480993}, {"filename": "/gfx/actors/monty_mole/monty_mole_tooth.rgba16.png", "start": 480993, "end": 481879}, {"filename": "/gfx/actors/monty_mole_hole/monty_mole_hole.ia16.png", "start": 481879, "end": 482601}, {"filename": "/gfx/actors/mr_i_eyeball/mr_i_eyeball_left_side.rgba16.png", "start": 482601, "end": 484504}, {"filename": "/gfx/actors/mr_i_eyeball/mr_i_eyeball_right_side.rgba16.png", "start": 484504, "end": 486057}, {"filename": "/gfx/actors/mr_i_iris/mr_i_iris_closed.rgba16.png", "start": 486057, "end": 487004}, {"filename": "/gfx/actors/mr_i_iris/mr_i_iris_mostly_closed.rgba16.png", "start": 487004, "end": 487961}, {"filename": "/gfx/actors/mr_i_iris/mr_i_iris_mostly_open.rgba16.png", "start": 487961, "end": 488906}, {"filename": "/gfx/actors/mr_i_iris/mr_i_iris_open.rgba16.png", "start": 488906, "end": 489879}, {"filename": "/gfx/actors/mushroom_1up/1-up_mushroom.rgba16.png", "start": 489879, "end": 493027}, {"filename": "/gfx/actors/peach/peach_chest_jewel.rgba16.png", "start": 493027, "end": 493717}, {"filename": "/gfx/actors/peach/peach_crown_jewel.rgba16.png", "start": 493717, "end": 494239}, {"filename": "/gfx/actors/peach/peach_dress.rgba16.png", "start": 494239, "end": 494679}, {"filename": "/gfx/actors/peach/peach_eye_closed.rgba16.png", "start": 494679, "end": 495702}, {"filename": "/gfx/actors/peach/peach_eye_mostly_closed.rgba16.png", "start": 495702, "end": 496935}, {"filename": "/gfx/actors/peach/peach_eye_mostly_open.rgba16.png", "start": 496935, "end": 498471}, {"filename": "/gfx/actors/peach/peach_eye_open.rgba16.png", "start": 498471, "end": 500118}, {"filename": "/gfx/actors/peach/peach_lips.rgba16.png", "start": 500118, "end": 501408}, {"filename": "/gfx/actors/peach/peach_lips_scrunched.rgba16.png", "start": 501408, "end": 502756}, {"filename": "/gfx/actors/peach/peach_nostril.rgba16.png", "start": 502756, "end": 503115}, {"filename": "/gfx/actors/pebble/pebble.rgba16.png", "start": 503115, "end": 504846}, {"filename": "/gfx/actors/penguin/penguin_beak.rgba16.png", "start": 504846, "end": 505956}, {"filename": "/gfx/actors/penguin/penguin_eye_angry.rgba16.png", "start": 505956, "end": 507640}, {"filename": "/gfx/actors/penguin/penguin_eye_angry_unused.rgba16.png", "start": 507640, "end": 509316}, {"filename": "/gfx/actors/penguin/penguin_eye_closed.rgba16.png", "start": 509316, "end": 510427}, {"filename": "/gfx/actors/penguin/penguin_eye_half_closed.rgba16.png", "start": 510427, "end": 512040}, {"filename": "/gfx/actors/penguin/penguin_eye_open.rgba16.png", "start": 512040, "end": 513711}, {"filename": "/gfx/actors/piranha_plant/piranha_plant_bottom_lip.rgba16.png", "start": 513711, "end": 514524}, {"filename": "/gfx/actors/piranha_plant/piranha_plant_leaf.rgba16.png", "start": 514524, "end": 517027}, {"filename": "/gfx/actors/piranha_plant/piranha_plant_skin.rgba16.png", "start": 517027, "end": 517452}, {"filename": "/gfx/actors/piranha_plant/piranha_plant_stem.rgba16.png", "start": 517452, "end": 517973}, {"filename": "/gfx/actors/piranha_plant/piranha_plant_tongue.rgba16.png", "start": 517973, "end": 519844}, {"filename": "/gfx/actors/piranha_plant/piranha_plant_tooth.rgba16.png", "start": 519844, "end": 520565}, {"filename": "/gfx/actors/pokey/pokey_body.rgba16.png", "start": 520565, "end": 522935}, {"filename": "/gfx/actors/pokey/pokey_face.rgba16.png", "start": 522935, "end": 525411}, {"filename": "/gfx/actors/pokey/pokey_face_blink.rgba16.png", "start": 525411, "end": 527925}, {"filename": "/gfx/actors/poundable_pole/poundable_pole_side.rgba16.png", "start": 527925, "end": 529602}, {"filename": "/gfx/actors/poundable_pole/poundable_pole_top.rgba16.png", "start": 529602, "end": 531488}, {"filename": "/gfx/actors/power_meter/power_meter_five_segments.rgba16.png", "start": 531488, "end": 532907}, {"filename": "/gfx/actors/power_meter/power_meter_four_segments.rgba16.png", "start": 532907, "end": 534501}, {"filename": "/gfx/actors/power_meter/power_meter_full.rgba16.png", "start": 534501, "end": 536124}, {"filename": "/gfx/actors/power_meter/power_meter_left_side.rgba16.png", "start": 536124, "end": 538619}, {"filename": "/gfx/actors/power_meter/power_meter_one_segment.rgba16.png", "start": 538619, "end": 539947}, {"filename": "/gfx/actors/power_meter/power_meter_right_side.rgba16.png", "start": 539947, "end": 542122}, {"filename": "/gfx/actors/power_meter/power_meter_seven_segments.rgba16.png", "start": 542122, "end": 543778}, {"filename": "/gfx/actors/power_meter/power_meter_six_segments.rgba16.png", "start": 543778, "end": 545201}, {"filename": "/gfx/actors/power_meter/power_meter_three_segments.rgba16.png", "start": 545201, "end": 546683}, {"filename": "/gfx/actors/power_meter/power_meter_two_segments.rgba16.png", "start": 546683, "end": 548019}, {"filename": "/gfx/actors/purple_switch/purple_switch_base.rgba16.png", "start": 548019, "end": 548154}, {"filename": "/gfx/actors/purple_switch/purple_switch_exclamation_point.rgba16.png", "start": 548154, "end": 549128}, {"filename": "/gfx/actors/sand/sand_particle.rgba16.png", "start": 549128, "end": 549629}, {"filename": "/gfx/actors/scuttlebug/scuttlebug_eye.rgba16.png", "start": 549629, "end": 550933}, {"filename": "/gfx/actors/scuttlebug/scuttlebug_iris.rgba16.png", "start": 550933, "end": 552201}, {"filename": "/gfx/actors/scuttlebug/scuttlebug_left_side.rgba16.png", "start": 552201, "end": 555095}, {"filename": "/gfx/actors/scuttlebug/scuttlebug_leg.rgba16.png", "start": 555095, "end": 556195}, {"filename": "/gfx/actors/scuttlebug/scuttlebug_right_side.rgba16.png", "start": 556195, "end": 559544}, {"filename": "/gfx/actors/seaweed/seaweed_base.rgba16.png", "start": 559544, "end": 561280}, {"filename": "/gfx/actors/seaweed/seaweed_lower_center.rgba16.png", "start": 561280, "end": 562718}, {"filename": "/gfx/actors/seaweed/seaweed_tip.rgba16.png", "start": 562718, "end": 563811}, {"filename": "/gfx/actors/seaweed/seaweed_upper_center.rgba16.png", "start": 563811, "end": 565414}, {"filename": "/gfx/actors/skeeter/skeeter_eye.rgba16.png", "start": 565414, "end": 566782}, {"filename": "/gfx/actors/skeeter/skeeter_iris.rgba16.png", "start": 566782, "end": 567069}, {"filename": "/gfx/actors/smoke/smoke.ia16.png", "start": 567069, "end": 568753}, {"filename": "/gfx/actors/snowman/mr_blizzard_eye.rgba16.png", "start": 568753, "end": 569483}, {"filename": "/gfx/actors/snowman/mr_blizzard_left_side.rgba16.png", "start": 569483, "end": 571400}, {"filename": "/gfx/actors/snowman/mr_blizzard_mitten.rgba16.png", "start": 571400, "end": 571877}, {"filename": "/gfx/actors/snowman/mr_blizzard_mouth.rgba16.png", "start": 571877, "end": 572501}, {"filename": "/gfx/actors/snowman/mr_blizzard_right_side.rgba16.png", "start": 572501, "end": 574185}, {"filename": "/gfx/actors/snufit/snufit_body.rgba16.png", "start": 574185, "end": 575093}, {"filename": "/gfx/actors/snufit/snufit_eye.rgba16.png", "start": 575093, "end": 575928}, {"filename": "/gfx/actors/snufit/snufit_mask_strap.rgba16.png", "start": 575928, "end": 576130}, {"filename": "/gfx/actors/snufit/snufit_mouth.rgba16.png", "start": 576130, "end": 577191}, {"filename": "/gfx/actors/sparkle/sparkle_0.rgba16.png", "start": 577191, "end": 578039}, {"filename": "/gfx/actors/sparkle/sparkle_1.rgba16.png", "start": 578039, "end": 578657}, {"filename": "/gfx/actors/sparkle/sparkle_2.rgba16.png", "start": 578657, "end": 579710}, {"filename": "/gfx/actors/sparkle/sparkle_3.rgba16.png", "start": 579710, "end": 580627}, {"filename": "/gfx/actors/sparkle/sparkle_4.rgba16.png", "start": 580627, "end": 581578}, {"filename": "/gfx/actors/sparkle/sparkle_5.rgba16.png", "start": 581578, "end": 581758}, {"filename": "/gfx/actors/sparkle_animation/sparkle_animation_0.ia16.png", "start": 581758, "end": 582642}, {"filename": "/gfx/actors/sparkle_animation/sparkle_animation_1.ia16.png", "start": 582642, "end": 583582}, {"filename": "/gfx/actors/sparkle_animation/sparkle_animation_2.ia16.png", "start": 583582, "end": 584518}, {"filename": "/gfx/actors/sparkle_animation/sparkle_animation_3.ia16.png", "start": 584518, "end": 585456}, {"filename": "/gfx/actors/sparkle_animation/sparkle_animation_4.ia16.png", "start": 585456, "end": 586392}, {"filename": "/gfx/actors/spindrift/spindrift_face.rgba16.png", "start": 586392, "end": 586943}, {"filename": "/gfx/actors/spindrift/spindrift_head.rgba16.png", "start": 586943, "end": 588581}, {"filename": "/gfx/actors/spindrift/spindrift_leaf.rgba16.png", "start": 588581, "end": 589255}, {"filename": "/gfx/actors/spindrift/spindrift_petal.rgba16.png", "start": 589255, "end": 590494}, {"filename": "/gfx/actors/springboard/springboard_base_unused.rgba16.png", "start": 590494, "end": 591013}, {"filename": "/gfx/actors/springboard/springboard_top_unused.rgba16.png", "start": 591013, "end": 591143}, {"filename": "/gfx/actors/star/star_eye.rgba16.png", "start": 591143, "end": 591716}, {"filename": "/gfx/actors/star/star_surface.rgba16.png", "start": 591716, "end": 593089}, {"filename": "/gfx/actors/stomp_smoke/stomp_smoke_0.ia16.png", "start": 593089, "end": 593369}, {"filename": "/gfx/actors/stomp_smoke/stomp_smoke_1.ia16.png", "start": 593369, "end": 593874}, {"filename": "/gfx/actors/stomp_smoke/stomp_smoke_2.ia16.png", "start": 593874, "end": 594562}, {"filename": "/gfx/actors/stomp_smoke/stomp_smoke_3.ia16.png", "start": 594562, "end": 595803}, {"filename": "/gfx/actors/stomp_smoke/stomp_smoke_4.ia16.png", "start": 595803, "end": 597186}, {"filename": "/gfx/actors/stomp_smoke/stomp_smoke_5.ia16.png", "start": 597186, "end": 597760}, {"filename": "/gfx/actors/sushi/sushi_eye.rgba16.png", "start": 597760, "end": 598897}, {"filename": "/gfx/actors/sushi/sushi_snout.rgba16.png", "start": 598897, "end": 600582}, {"filename": "/gfx/actors/sushi/sushi_tooth.rgba16.png", "start": 600582, "end": 600757}, {"filename": "/gfx/actors/swoop/swoop_body.rgba16.png", "start": 600757, "end": 602241}, {"filename": "/gfx/actors/swoop/swoop_eye.rgba16.png", "start": 602241, "end": 603110}, {"filename": "/gfx/actors/swoop/swoop_nose.rgba16.png", "start": 603110, "end": 603744}, {"filename": "/gfx/actors/swoop/swoop_wing.rgba16.png", "start": 603744, "end": 605488}, {"filename": "/gfx/actors/thwomp/thwomp_face.rgba16.png", "start": 605488, "end": 610418}, {"filename": "/gfx/actors/thwomp/thwomp_surface.rgba16.png", "start": 610418, "end": 612772}, {"filename": "/gfx/actors/toad/toad_face.rgba16.png", "start": 612772, "end": 614144}, {"filename": "/gfx/actors/toad/toad_head.rgba16.png", "start": 614144, "end": 614790}, {"filename": "/gfx/actors/tornado/tornado.ia16.png", "start": 614790, "end": 618887}, {"filename": "/gfx/actors/treasure_chest/treasure_chest_front.rgba16.png", "start": 618887, "end": 622155}, {"filename": "/gfx/actors/treasure_chest/treasure_chest_lock.rgba16.png", "start": 622155, "end": 624238}, {"filename": "/gfx/actors/treasure_chest/treasure_chest_lock_top.rgba16.png", "start": 624238, "end": 626282}, {"filename": "/gfx/actors/treasure_chest/treasure_chest_side.rgba16.png", "start": 626282, "end": 627614}, {"filename": "/gfx/actors/tree/palm_tree.rgba16.png", "start": 627614, "end": 630003}, {"filename": "/gfx/actors/tree/pine_tree.rgba16.png", "start": 630003, "end": 632437}, {"filename": "/gfx/actors/tree/snowy_pine_tree.rgba16.png", "start": 632437, "end": 635871}, {"filename": "/gfx/actors/tree/tree_left_side.rgba16.png", "start": 635871, "end": 637461}, {"filename": "/gfx/actors/tree/tree_right_side.rgba16.png", "start": 637461, "end": 638987}, {"filename": "/gfx/actors/ukiki/ukiki_butt.rgba16.png", "start": 638987, "end": 640217}, {"filename": "/gfx/actors/ukiki/ukiki_face.rgba16.png", "start": 640217, "end": 643207}, {"filename": "/gfx/actors/ukiki/ukiki_face_blink.rgba16.png", "start": 643207, "end": 646609}, {"filename": "/gfx/actors/ukiki/ukiki_fur.rgba16.png", "start": 646609, "end": 648121}, {"filename": "/gfx/actors/unagi/unagi_body.rgba16.png", "start": 648121, "end": 649148}, {"filename": "/gfx/actors/unagi/unagi_eye.rgba16.png", "start": 649148, "end": 649714}, {"filename": "/gfx/actors/unagi/unagi_head_base.rgba16.png", "start": 649714, "end": 651042}, {"filename": "/gfx/actors/unagi/unagi_mouth.rgba16.png", "start": 651042, "end": 651207}, {"filename": "/gfx/actors/unagi/unagi_tail.rgba16.png", "start": 651207, "end": 653137}, {"filename": "/gfx/actors/unagi/unagi_tooth.rgba16.png", "start": 653137, "end": 653717}, {"filename": "/gfx/actors/walk_smoke/walk_smoke_0.ia16.png", "start": 653717, "end": 655334}, {"filename": "/gfx/actors/walk_smoke/walk_smoke_1.ia16.png", "start": 655334, "end": 657026}, {"filename": "/gfx/actors/walk_smoke/walk_smoke_2.ia16.png", "start": 657026, "end": 658926}, {"filename": "/gfx/actors/walk_smoke/walk_smoke_3.ia16.png", "start": 658926, "end": 660967}, {"filename": "/gfx/actors/walk_smoke/walk_smoke_4.ia16.png", "start": 660967, "end": 663035}, {"filename": "/gfx/actors/walk_smoke/walk_smoke_5.ia16.png", "start": 663035, "end": 665170}, {"filename": "/gfx/actors/walk_smoke/walk_smoke_6.ia16.png", "start": 665170, "end": 667287}, {"filename": "/gfx/actors/warp_pipe/warp_pipe_side.rgba16.png", "start": 667287, "end": 667915}, {"filename": "/gfx/actors/warp_pipe/warp_pipe_top.rgba16.png", "start": 667915, "end": 668416}, {"filename": "/gfx/actors/water_bubble/water_bubble.rgba16.png", "start": 668416, "end": 670119}, {"filename": "/gfx/actors/water_mine/water_mine_left_side_unused.rgba16.png", "start": 670119, "end": 671195}, {"filename": "/gfx/actors/water_mine/water_mine_right_side_unused.rgba16.png", "start": 671195, "end": 672531}, {"filename": "/gfx/actors/water_mine/water_mine_spike_unused.rgba16.png", "start": 672531, "end": 673150}, {"filename": "/gfx/actors/water_ring/water_ring.rgba16.png", "start": 673150, "end": 678911}, {"filename": "/gfx/actors/water_splash/water_splash_0.rgba16.png", "start": 678911, "end": 679566}, {"filename": "/gfx/actors/water_splash/water_splash_1.rgba16.png", "start": 679566, "end": 680750}, {"filename": "/gfx/actors/water_splash/water_splash_2.rgba16.png", "start": 680750, "end": 682211}, {"filename": "/gfx/actors/water_splash/water_splash_3.rgba16.png", "start": 682211, "end": 683543}, {"filename": "/gfx/actors/water_splash/water_splash_4.rgba16.png", "start": 683543, "end": 684783}, {"filename": "/gfx/actors/water_splash/water_splash_5.rgba16.png", "start": 684783, "end": 685674}, {"filename": "/gfx/actors/water_splash/water_splash_6.rgba16.png", "start": 685674, "end": 686587}, {"filename": "/gfx/actors/water_splash/water_splash_7.rgba16.png", "start": 686587, "end": 687608}, {"filename": "/gfx/actors/water_wave/water_wave_0.ia16.png", "start": 687608, "end": 688674}, {"filename": "/gfx/actors/water_wave/water_wave_1.ia16.png", "start": 688674, "end": 689699}, {"filename": "/gfx/actors/water_wave/water_wave_2.ia16.png", "start": 689699, "end": 690613}, {"filename": "/gfx/actors/water_wave/water_wave_3.ia16.png", "start": 690613, "end": 691412}, {"filename": "/gfx/actors/whirlpool/whirlpool.ia16.png", "start": 691412, "end": 695509}, {"filename": "/gfx/actors/white_particle/snow_particle.rgba16.png", "start": 695509, "end": 695930}, {"filename": "/gfx/actors/white_particle_small/small_snow_particle.rgba16.png", "start": 695930, "end": 696380}, {"filename": "/gfx/actors/whomp/whomp_back.rgba16.png", "start": 696380, "end": 702520}, {"filename": "/gfx/actors/whomp/whomp_face.rgba16.png", "start": 702520, "end": 708183}, {"filename": "/gfx/actors/whomp/whomp_hand.rgba16.png", "start": 708183, "end": 710308}, {"filename": "/gfx/actors/whomp/whomp_surface.rgba16.png", "start": 710308, "end": 713063}, {"filename": "/gfx/actors/wiggler/wiggler_eye.rgba16.png", "start": 713063, "end": 713636}, {"filename": "/gfx/actors/wiggler/wiggler_flower.rgba16.png", "start": 713636, "end": 714638}, {"filename": "/gfx/actors/wiggler/wiggler_frown.rgba16.png", "start": 714638, "end": 714956}, {"filename": "/gfx/actors/wiggler/wiggler_nose_left_side.rgba16.png", "start": 714956, "end": 716127}, {"filename": "/gfx/actors/wiggler/wiggler_nose_right_side.rgba16.png", "start": 716127, "end": 717851}, {"filename": "/gfx/actors/wiggler/wiggler_segment_left_side.rgba16.png", "start": 717851, "end": 719504}, {"filename": "/gfx/actors/wiggler/wiggler_segment_right_side.rgba16.png", "start": 719504, "end": 721371}, {"filename": "/gfx/actors/wooden_signpost/wooden_signpost_back.rgba16.png", "start": 721371, "end": 723079}, {"filename": "/gfx/actors/wooden_signpost/wooden_signpost_front.rgba16.png", "start": 723079, "end": 725524}, {"filename": "/gfx/actors/yellow_sphere/yellow_sphere.rgba16.png", "start": 725524, "end": 726853}, {"filename": "/gfx/actors/yellow_sphere_small/small_yellow_sphere.rgba16.png", "start": 726853, "end": 728182}, {"filename": "/gfx/actors/yoshi/yoshi_eye.rgba16.png", "start": 728182, "end": 728615}, {"filename": "/gfx/actors/yoshi/yoshi_eye_blink.rgba16.png", "start": 728615, "end": 728902}, {"filename": "/gfx/actors/yoshi/yoshi_nostril.rgba16.png", "start": 728902, "end": 729312}, {"filename": "/gfx/actors/yoshi_egg/yoshi_egg_0_unused.rgba16.png", "start": 729312, "end": 730835}, {"filename": "/gfx/actors/yoshi_egg/yoshi_egg_1_unused.rgba16.png", "start": 730835, "end": 732349}, {"filename": "/gfx/actors/yoshi_egg/yoshi_egg_2_unused.rgba16.png", "start": 732349, "end": 733826}, {"filename": "/gfx/actors/yoshi_egg/yoshi_egg_3_unused.rgba16.png", "start": 733826, "end": 735324}, {"filename": "/gfx/actors/yoshi_egg/yoshi_egg_4_unused.rgba16.png", "start": 735324, "end": 736762}, {"filename": "/gfx/actors/yoshi_egg/yoshi_egg_5_unused.rgba16.png", "start": 736762, "end": 738186}, {"filename": "/gfx/actors/yoshi_egg/yoshi_egg_6_unused.rgba16.png", "start": 738186, "end": 739572}, {"filename": "/gfx/actors/yoshi_egg/yoshi_egg_7_unused.rgba16.png", "start": 739572, "end": 740940}, {"filename": "/gfx/levels/bbh/0.rgba16.png", "start": 740940, "end": 743384}, {"filename": "/gfx/levels/bbh/1.rgba16.png", "start": 743384, "end": 746085}, {"filename": "/gfx/levels/bbh/2.rgba16.png", "start": 746085, "end": 747489}, {"filename": "/gfx/levels/bbh/3.rgba16.png", "start": 747489, "end": 751497}, {"filename": "/gfx/levels/bbh/4.rgba16.png", "start": 751497, "end": 752269}, {"filename": "/gfx/levels/bbh/5.rgba16.png", "start": 752269, "end": 756411}, {"filename": "/gfx/levels/bbh/6.rgba16.png", "start": 756411, "end": 757622}, {"filename": "/gfx/levels/bitdw/0.rgba16.png", "start": 757622, "end": 759147}, {"filename": "/gfx/levels/bitdw/1.rgba16.png", "start": 759147, "end": 762395}, {"filename": "/gfx/levels/bitdw/2.rgba16.png", "start": 762395, "end": 763749}, {"filename": "/gfx/levels/bitdw/3.rgba16.png", "start": 763749, "end": 765618}, {"filename": "/gfx/levels/bitfs/0.rgba16.png", "start": 765618, "end": 768063}, {"filename": "/gfx/levels/bitfs/1.rgba16.png", "start": 768063, "end": 769059}, {"filename": "/gfx/levels/bitfs/2.rgba16.png", "start": 769059, "end": 771523}, {"filename": "/gfx/levels/bits/0.rgba16.png", "start": 771523, "end": 775235}, {"filename": "/gfx/levels/bits/1.rgba16.png", "start": 775235, "end": 777415}, {"filename": "/gfx/levels/bits/2.rgba16.png", "start": 777415, "end": 779495}, {"filename": "/gfx/levels/bob/0.rgba16.png", "start": 779495, "end": 781447}, {"filename": "/gfx/levels/bob/1.rgba16.png", "start": 781447, "end": 783870}, {"filename": "/gfx/levels/bob/2.rgba16.png", "start": 783870, "end": 786732}, {"filename": "/gfx/levels/bob/3.rgba16.png", "start": 786732, "end": 789110}, {"filename": "/gfx/levels/bob/4.rgba16.png", "start": 789110, "end": 791681}, {"filename": "/gfx/levels/bowser_1/0.rgba16.png", "start": 791681, "end": 796126}, {"filename": "/gfx/levels/bowser_1/1.rgba16.png", "start": 796126, "end": 797731}, {"filename": "/gfx/levels/bowser_1/2.rgba16.png", "start": 797731, "end": 800163}, {"filename": "/gfx/levels/bowser_2/0.rgba16.png", "start": 800163, "end": 802024}, {"filename": "/gfx/levels/bowser_3/0.rgba16.png", "start": 802024, "end": 804849}, {"filename": "/gfx/levels/bowser_3/1.rgba16.png", "start": 804849, "end": 807058}, {"filename": "/gfx/levels/bowser_3/2.rgba16.png", "start": 807058, "end": 810844}, {"filename": "/gfx/levels/castle_grounds/0.rgba16.png", "start": 810844, "end": 813684}, {"filename": "/gfx/levels/castle_grounds/1.rgba16.png", "start": 813684, "end": 819206}, {"filename": "/gfx/levels/castle_grounds/2.rgba16.png", "start": 819206, "end": 824699}, {"filename": "/gfx/levels/castle_grounds/3.rgba16.png", "start": 824699, "end": 828270}, {"filename": "/gfx/levels/castle_grounds/4.rgba16.png", "start": 828270, "end": 831608}, {"filename": "/gfx/levels/castle_grounds/5.ia8.png", "start": 831608, "end": 832036}, {"filename": "/gfx/levels/castle_inside/1.rgba16.png", "start": 832036, "end": 833465}, {"filename": "/gfx/levels/castle_inside/10.rgba16.png", "start": 833465, "end": 835569}, {"filename": "/gfx/levels/castle_inside/11.rgba16.png", "start": 835569, "end": 837808}, {"filename": "/gfx/levels/castle_inside/12.rgba16.png", "start": 837808, "end": 839695}, {"filename": "/gfx/levels/castle_inside/13.rgba16.png", "start": 839695, "end": 841424}, {"filename": "/gfx/levels/castle_inside/14.rgba16.png", "start": 841424, "end": 843716}, {"filename": "/gfx/levels/castle_inside/15.rgba16.png", "start": 843716, "end": 845873}, {"filename": "/gfx/levels/castle_inside/16.ia16.png", "start": 845873, "end": 846991}, {"filename": "/gfx/levels/castle_inside/17.rgba16.png", "start": 846991, "end": 850192}, {"filename": "/gfx/levels/castle_inside/18.rgba16.png", "start": 850192, "end": 853506}, {"filename": "/gfx/levels/castle_inside/19.rgba16.png", "start": 853506, "end": 857458}, {"filename": "/gfx/levels/castle_inside/2.ia16.png", "start": 857458, "end": 858982}, {"filename": "/gfx/levels/castle_inside/20.rgba16.png", "start": 858982, "end": 863003}, {"filename": "/gfx/levels/castle_inside/21.rgba16.png", "start": 863003, "end": 865732}, {"filename": "/gfx/levels/castle_inside/22.rgba16.png", "start": 865732, "end": 870032}, {"filename": "/gfx/levels/castle_inside/23_us.rgba16.png", "start": 870032, "end": 873695}, {"filename": "/gfx/levels/castle_inside/24_us.rgba16.png", "start": 873695, "end": 877318}, {"filename": "/gfx/levels/castle_inside/25.rgba16.png", "start": 877318, "end": 880531}, {"filename": "/gfx/levels/castle_inside/26.rgba16.png", "start": 880531, "end": 883166}, {"filename": "/gfx/levels/castle_inside/27.rgba16.png", "start": 883166, "end": 884904}, {"filename": "/gfx/levels/castle_inside/28.rgba16.png", "start": 884904, "end": 887017}, {"filename": "/gfx/levels/castle_inside/29.rgba16.png", "start": 887017, "end": 889711}, {"filename": "/gfx/levels/castle_inside/3.rgba16.png", "start": 889711, "end": 894347}, {"filename": "/gfx/levels/castle_inside/30.rgba16.png", "start": 894347, "end": 896229}, {"filename": "/gfx/levels/castle_inside/31.rgba16.png", "start": 896229, "end": 901042}, {"filename": "/gfx/levels/castle_inside/32.rgba16.png", "start": 901042, "end": 905900}, {"filename": "/gfx/levels/castle_inside/33.rgba16.png", "start": 905900, "end": 909772}, {"filename": "/gfx/levels/castle_inside/34.rgba16.png", "start": 909772, "end": 913056}, {"filename": "/gfx/levels/castle_inside/35.rgba16.png", "start": 913056, "end": 916944}, {"filename": "/gfx/levels/castle_inside/36.rgba16.png", "start": 916944, "end": 920767}, {"filename": "/gfx/levels/castle_inside/37.rgba16.png", "start": 920767, "end": 926619}, {"filename": "/gfx/levels/castle_inside/38.rgba16.png", "start": 926619, "end": 932218}, {"filename": "/gfx/levels/castle_inside/39.rgba16.png", "start": 932218, "end": 934853}, {"filename": "/gfx/levels/castle_inside/4.rgba16.png", "start": 934853, "end": 936538}, {"filename": "/gfx/levels/castle_inside/40.rgba16.png", "start": 936538, "end": 939479}, {"filename": "/gfx/levels/castle_inside/5.rgba16.png", "start": 939479, "end": 943816}, {"filename": "/gfx/levels/castle_inside/6.rgba16.png", "start": 943816, "end": 948291}, {"filename": "/gfx/levels/castle_inside/7.rgba16.png", "start": 948291, "end": 950344}, {"filename": "/gfx/levels/castle_inside/8.rgba16.png", "start": 950344, "end": 952091}, {"filename": "/gfx/levels/castle_inside/9.rgba16.png", "start": 952091, "end": 954202}, {"filename": "/gfx/levels/castle_inside/castle_light.ia16.png", "start": 954202, "end": 954314}, {"filename": "/gfx/levels/ccm/0.rgba16.png", "start": 954314, "end": 955911}, {"filename": "/gfx/levels/ccm/1.rgba16.png", "start": 955911, "end": 956158}, {"filename": "/gfx/levels/ccm/10.rgba16.png", "start": 956158, "end": 957612}, {"filename": "/gfx/levels/ccm/11.rgba16.png", "start": 957612, "end": 958640}, {"filename": "/gfx/levels/ccm/12.rgba16.png", "start": 958640, "end": 960270}, {"filename": "/gfx/levels/ccm/2.rgba16.png", "start": 960270, "end": 961488}, {"filename": "/gfx/levels/ccm/3.rgba16.png", "start": 961488, "end": 963447}, {"filename": "/gfx/levels/ccm/4.rgba16.png", "start": 963447, "end": 966097}, {"filename": "/gfx/levels/ccm/5.rgba16.png", "start": 966097, "end": 966721}, {"filename": "/gfx/levels/ccm/6.rgba16.png", "start": 966721, "end": 967451}, {"filename": "/gfx/levels/ccm/7.rgba16.png", "start": 967451, "end": 967934}, {"filename": "/gfx/levels/ccm/8.ia16.png", "start": 967934, "end": 968031}, {"filename": "/gfx/levels/ccm/9.ia16.png", "start": 968031, "end": 969566}, {"filename": "/gfx/levels/cotmc/0.rgba16.png", "start": 969566, "end": 973827}, {"filename": "/gfx/levels/cotmc/1.rgba16.png", "start": 973827, "end": 976079}, {"filename": "/gfx/levels/cotmc/2.rgba16.png", "start": 976079, "end": 977539}, {"filename": "/gfx/levels/cotmc/3.rgba16.png", "start": 977539, "end": 980621}, {"filename": "/gfx/levels/cotmc/4.rgba16.png", "start": 980621, "end": 982688}, {"filename": "/gfx/levels/ddd/0.rgba16.png", "start": 982688, "end": 987207}, {"filename": "/gfx/levels/ddd/1.rgba16.png", "start": 987207, "end": 988744}, {"filename": "/gfx/levels/ddd/2.rgba16.png", "start": 988744, "end": 989869}, {"filename": "/gfx/levels/ddd/3.rgba16.png", "start": 989869, "end": 995657}, {"filename": "/gfx/levels/ddd/4.rgba16.png", "start": 995657, "end": 995787}, {"filename": "/gfx/levels/ending/cake.png", "start": 995787, "end": 1128461}, {"filename": "/gfx/levels/hmc/0.rgba16.png", "start": 1128461, "end": 1133314}, {"filename": "/gfx/levels/hmc/1.rgba16.png", "start": 1133314, "end": 1137807}, {"filename": "/gfx/levels/hmc/2.rgba16.png", "start": 1137807, "end": 1143226}, {"filename": "/gfx/levels/hmc/3.rgba16.png", "start": 1143226, "end": 1144026}, {"filename": "/gfx/levels/hmc/4.rgba16.png", "start": 1144026, "end": 1146039}, {"filename": "/gfx/levels/hmc/5.rgba16.png", "start": 1146039, "end": 1147214}, {"filename": "/gfx/levels/hmc/6.rgba16.png", "start": 1147214, "end": 1152955}, {"filename": "/gfx/levels/hmc/7.rgba16.png", "start": 1152955, "end": 1155649}, {"filename": "/gfx/levels/intro/0.rgba16.png", "start": 1155649, "end": 1157399}, {"filename": "/gfx/levels/intro/1.rgba16.png", "start": 1157399, "end": 1158409}, {"filename": "/gfx/levels/intro/2_copyright.rgba16.png", "start": 1158409, "end": 1162004}, {"filename": "/gfx/levels/intro/3_tm.rgba16.png", "start": 1162004, "end": 1162448}, {"filename": "/gfx/levels/jrb/0.rgba16.png", "start": 1162448, "end": 1163985}, {"filename": "/gfx/levels/jrb/1.rgba16.png", "start": 1163985, "end": 1168956}, {"filename": "/gfx/levels/jrb/2.rgba16.png", "start": 1168956, "end": 1170941}, {"filename": "/gfx/levels/jrb/3.rgba16.png", "start": 1170941, "end": 1172511}, {"filename": "/gfx/levels/lll/0.rgba16.png", "start": 1172511, "end": 1175179}, {"filename": "/gfx/levels/lll/1.rgba16.png", "start": 1175179, "end": 1178519}, {"filename": "/gfx/levels/lll/10.rgba16.png", "start": 1178519, "end": 1179503}, {"filename": "/gfx/levels/lll/11.rgba16.png", "start": 1179503, "end": 1180109}, {"filename": "/gfx/levels/lll/12.rgba16.png", "start": 1180109, "end": 1181435}, {"filename": "/gfx/levels/lll/13.rgba16.png", "start": 1181435, "end": 1182959}, {"filename": "/gfx/levels/lll/14.rgba16.png", "start": 1182959, "end": 1184247}, {"filename": "/gfx/levels/lll/15.rgba16.png", "start": 1184247, "end": 1187242}, {"filename": "/gfx/levels/lll/16.rgba16.png", "start": 1187242, "end": 1190109}, {"filename": "/gfx/levels/lll/17.rgba16.png", "start": 1190109, "end": 1191129}, {"filename": "/gfx/levels/lll/18.rgba16.png", "start": 1191129, "end": 1192326}, {"filename": "/gfx/levels/lll/19.rgba16.png", "start": 1192326, "end": 1195154}, {"filename": "/gfx/levels/lll/2.rgba16.png", "start": 1195154, "end": 1196762}, {"filename": "/gfx/levels/lll/20.rgba16.png", "start": 1196762, "end": 1199415}, {"filename": "/gfx/levels/lll/21.rgba16.png", "start": 1199415, "end": 1201229}, {"filename": "/gfx/levels/lll/22.rgba16.png", "start": 1201229, "end": 1201881}, {"filename": "/gfx/levels/lll/23.rgba16.png", "start": 1201881, "end": 1203759}, {"filename": "/gfx/levels/lll/24.rgba16.png", "start": 1203759, "end": 1204747}, {"filename": "/gfx/levels/lll/25.rgba16.png", "start": 1204747, "end": 1205057}, {"filename": "/gfx/levels/lll/26.rgba16.png", "start": 1205057, "end": 1205748}, {"filename": "/gfx/levels/lll/27.ia16.png", "start": 1205748, "end": 1205845}, {"filename": "/gfx/levels/lll/28.rgba16.png", "start": 1205845, "end": 1206551}, {"filename": "/gfx/levels/lll/29.rgba16.png", "start": 1206551, "end": 1208223}, {"filename": "/gfx/levels/lll/3.rgba16.png", "start": 1208223, "end": 1210546}, {"filename": "/gfx/levels/lll/30.rgba16.png", "start": 1210546, "end": 1213493}, {"filename": "/gfx/levels/lll/31.rgba16.png", "start": 1213493, "end": 1215813}, {"filename": "/gfx/levels/lll/32.rgba16.png", "start": 1215813, "end": 1218155}, {"filename": "/gfx/levels/lll/4.rgba16.png", "start": 1218155, "end": 1219353}, {"filename": "/gfx/levels/lll/5.rgba16.png", "start": 1219353, "end": 1222874}, {"filename": "/gfx/levels/lll/6.rgba16.png", "start": 1222874, "end": 1225730}, {"filename": "/gfx/levels/lll/7.rgba16.png", "start": 1225730, "end": 1229337}, {"filename": "/gfx/levels/lll/8.rgba16.png", "start": 1229337, "end": 1232752}, {"filename": "/gfx/levels/lll/9.rgba16.png", "start": 1232752, "end": 1235453}, {"filename": "/gfx/levels/menu/main_menu_seg7.00018.rgba16.png", "start": 1235453, "end": 1237282}, {"filename": "/gfx/levels/menu/main_menu_seg7.00818.rgba16.png", "start": 1237282, "end": 1239090}, {"filename": "/gfx/levels/menu/main_menu_seg7.01018.rgba16.png", "start": 1239090, "end": 1243312}, {"filename": "/gfx/levels/menu/main_menu_seg7.02018.rgba16.png", "start": 1243312, "end": 1247149}, {"filename": "/gfx/levels/menu/main_menu_seg7.03468.rgba16.png", "start": 1247149, "end": 1248809}, {"filename": "/gfx/levels/menu/main_menu_seg7.03C68.rgba16.png", "start": 1248809, "end": 1250230}, {"filename": "/gfx/levels/menu/main_menu_seg7.04468.rgba16.png", "start": 1250230, "end": 1251931}, {"filename": "/gfx/levels/menu/main_menu_seg7.04C68.rgba16.png", "start": 1251931, "end": 1252751}, {"filename": "/gfx/levels/menu/main_menu_seg7.05468.rgba16.png", "start": 1252751, "end": 1254708}, {"filename": "/gfx/levels/menu/main_menu_seg7.06328.rgba16.png", "start": 1254708, "end": 1255680}, {"filename": "/gfx/levels/menu/main_menu_seg7.06B28.rgba16.png", "start": 1255680, "end": 1256603}, {"filename": "/gfx/levels/menu/main_menu_seg7.073D0.rgba16.png", "start": 1256603, "end": 1256962}, {"filename": "/gfx/levels/menu/main_menu_seg7.075D0.rgba16.png", "start": 1256962, "end": 1257246}, {"filename": "/gfx/levels/menu/main_menu_seg7.077D0.rgba16.png", "start": 1257246, "end": 1257583}, {"filename": "/gfx/levels/menu/main_menu_seg7.079D0.rgba16.png", "start": 1257583, "end": 1257960}, {"filename": "/gfx/levels/menu/main_menu_seg7.07BD0.rgba16.png", "start": 1257960, "end": 1258410}, {"filename": "/gfx/levels/menu/main_menu_seg7.07DD0.rgba16.png", "start": 1258410, "end": 1258753}, {"filename": "/gfx/levels/menu/main_menu_seg7.07FD0.rgba16.png", "start": 1258753, "end": 1259134}, {"filename": "/gfx/levels/menu/main_menu_seg7.081D0.rgba16.png", "start": 1259134, "end": 1259529}, {"filename": "/gfx/levels/menu/main_menu_seg7.083D0.rgba16.png", "start": 1259529, "end": 1260019}, {"filename": "/gfx/levels/menu/main_menu_seg7.085D0.rgba16.png", "start": 1260019, "end": 1260325}, {"filename": "/gfx/levels/menu/main_menu_seg7.087D0.rgba16.png", "start": 1260325, "end": 1260816}, {"filename": "/gfx/levels/menu/main_menu_seg7.089D0.rgba16.png", "start": 1260816, "end": 1260999}, {"filename": "/gfx/levels/menu/main_menu_seg7.08BD0.rgba16.png", "start": 1260999, "end": 1261428}, {"filename": "/gfx/levels/menu/main_menu_seg7.08DD0.rgba16.png", "start": 1261428, "end": 1261828}, {"filename": "/gfx/levels/menu/main_menu_seg7.08FD0.rgba16.png", "start": 1261828, "end": 1262286}, {"filename": "/gfx/levels/menu/main_menu_seg7.091D0.rgba16.png", "start": 1262286, "end": 1262680}, {"filename": "/gfx/levels/menu/main_menu_seg7.093D0.rgba16.png", "start": 1262680, "end": 1263041}, {"filename": "/gfx/levels/menu/main_menu_seg7.095D0.rgba16.png", "start": 1263041, "end": 1263479}, {"filename": "/gfx/levels/menu/main_menu_seg7.097D0.rgba16.png", "start": 1263479, "end": 1263842}, {"filename": "/gfx/levels/menu/main_menu_seg7.099D0.rgba16.png", "start": 1263842, "end": 1264208}, {"filename": "/gfx/levels/menu/main_menu_seg7.09BD0.rgba16.png", "start": 1264208, "end": 1264658}, {"filename": "/gfx/levels/menu/main_menu_seg7.09DD0.rgba16.png", "start": 1264658, "end": 1265066}, {"filename": "/gfx/levels/menu/main_menu_seg7.09FD0.rgba16.png", "start": 1265066, "end": 1265506}, {"filename": "/gfx/levels/menu/main_menu_seg7.0A1D0.rgba16.png", "start": 1265506, "end": 1265927}, {"filename": "/gfx/levels/menu/main_menu_seg7.0A3D0.rgba16.png", "start": 1265927, "end": 1266327}, {"filename": "/gfx/levels/menu/main_menu_seg7.0A5D0.rgba16.png", "start": 1266327, "end": 1266664}, {"filename": "/gfx/levels/menu/main_menu_seg7.0A7D0.rgba16.png", "start": 1266664, "end": 1267108}, {"filename": "/gfx/levels/menu/main_menu_seg7.0A9D0.rgba16.png", "start": 1267108, "end": 1267470}, {"filename": "/gfx/levels/menu/main_menu_seg7.0D1A8.rgba16.png", "start": 1267470, "end": 1271951}, {"filename": "/gfx/levels/menu/main_menu_seg7.0E1A8.rgba16.png", "start": 1271951, "end": 1275628}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0AC40.ia8.png", "start": 1275628, "end": 1275730}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0AC80.ia8.png", "start": 1275730, "end": 1275829}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0ACC0.ia8.png", "start": 1275829, "end": 1275931}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0AD00.ia8.png", "start": 1275931, "end": 1276035}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0AD40.ia8.png", "start": 1276035, "end": 1276132}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0AD80.ia8.png", "start": 1276132, "end": 1276229}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0ADC0.ia8.png", "start": 1276229, "end": 1276333}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0AE00.ia8.png", "start": 1276333, "end": 1276432}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0AE40.ia8.png", "start": 1276432, "end": 1276541}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0AE80.ia8.png", "start": 1276541, "end": 1276649}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0AEC0.ia8.png", "start": 1276649, "end": 1276744}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0AF00.ia8.png", "start": 1276744, "end": 1276850}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0AF40.ia8.png", "start": 1276850, "end": 1276947}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0AF80.ia8.png", "start": 1276947, "end": 1277050}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0AFC0.ia8.png", "start": 1277050, "end": 1277154}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0B000.ia8.png", "start": 1277154, "end": 1277253}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0B040.ia8.png", "start": 1277253, "end": 1277356}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0B080.ia8.png", "start": 1277356, "end": 1277455}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0B0C0.ia8.png", "start": 1277455, "end": 1277552}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0B100.ia8.png", "start": 1277552, "end": 1277651}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0B140.ia8.png", "start": 1277651, "end": 1277752}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0B180.ia8.png", "start": 1277752, "end": 1277846}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0B1C0.ia8.png", "start": 1277846, "end": 1277949}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0B200.ia8.png", "start": 1277949, "end": 1278054}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0B240.ia8.png", "start": 1278054, "end": 1278150}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0B280.ia8.png", "start": 1278150, "end": 1278255}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0B2C0.ia8.png", "start": 1278255, "end": 1278357}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0B300.ia8.png", "start": 1278357, "end": 1278466}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0B340.ia8.png", "start": 1278466, "end": 1278559}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0B380.ia8.png", "start": 1278559, "end": 1278650}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0B3C0.ia8.png", "start": 1278650, "end": 1278746}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0B400.ia8.png", "start": 1278746, "end": 1278841}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0B440.ia8.png", "start": 1278841, "end": 1278940}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0B480.ia8.png", "start": 1278940, "end": 1279043}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0B4C0.ia8.png", "start": 1279043, "end": 1279135}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0B500.ia8.png", "start": 1279135, "end": 1279236}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0B540.ia8.png", "start": 1279236, "end": 1279331}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0B580.ia8.png", "start": 1279331, "end": 1279422}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0B5C0.ia8.png", "start": 1279422, "end": 1279534}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0B600.ia8.png", "start": 1279534, "end": 1279612}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0B640.ia8.png", "start": 1279612, "end": 1279692}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0B680.ia8.png", "start": 1279692, "end": 1279774}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0B6C0.ia8.png", "start": 1279774, "end": 1279864}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0B700.ia8.png", "start": 1279864, "end": 1279962}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0B740.ia8.png", "start": 1279962, "end": 1280069}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0B780.ia8.png", "start": 1280069, "end": 1280164}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0B7C0.ia8.png", "start": 1280164, "end": 1280240}, {"filename": "/gfx/levels/menu/main_menu_seg7_us.0B800.ia8.png", "start": 1280240, "end": 1280345}, {"filename": "/gfx/levels/pss/0.rgba16.png", "start": 1280345, "end": 1282953}, {"filename": "/gfx/levels/pss/1.ia16.png", "start": 1282953, "end": 1283818}, {"filename": "/gfx/levels/pss/2.rgba16.png", "start": 1283818, "end": 1284408}, {"filename": "/gfx/levels/rr/1.rgba16.png", "start": 1284408, "end": 1287072}, {"filename": "/gfx/levels/rr/2.rgba16.png", "start": 1287072, "end": 1288380}, {"filename": "/gfx/levels/rr/quarter_flying_carpet.rgba16.png", "start": 1288380, "end": 1290729}, {"filename": "/gfx/levels/sl/0.rgba16.png", "start": 1290729, "end": 1292159}, {"filename": "/gfx/levels/sl/1.rgba16.png", "start": 1292159, "end": 1293912}, {"filename": "/gfx/levels/sl/2.rgba16.png", "start": 1293912, "end": 1297248}, {"filename": "/gfx/levels/sl/3.rgba16.png", "start": 1297248, "end": 1299080}, {"filename": "/gfx/levels/sl/4.rgba16.png", "start": 1299080, "end": 1302647}, {"filename": "/gfx/levels/ssl/0.rgba16.png", "start": 1302647, "end": 1305531}, {"filename": "/gfx/levels/ssl/1.ia16.png", "start": 1305531, "end": 1306022}, {"filename": "/gfx/levels/ssl/10.rgba16.png", "start": 1306022, "end": 1309602}, {"filename": "/gfx/levels/ssl/11.rgba16.png", "start": 1309602, "end": 1312744}, {"filename": "/gfx/levels/ssl/2.rgba16.png", "start": 1312744, "end": 1315102}, {"filename": "/gfx/levels/ssl/3.rgba16.png", "start": 1315102, "end": 1317462}, {"filename": "/gfx/levels/ssl/4.rgba16.png", "start": 1317462, "end": 1318729}, {"filename": "/gfx/levels/ssl/5.rgba16.png", "start": 1318729, "end": 1323683}, {"filename": "/gfx/levels/ssl/6.rgba16.png", "start": 1323683, "end": 1325035}, {"filename": "/gfx/levels/ssl/7.rgba16.png", "start": 1325035, "end": 1327522}, {"filename": "/gfx/levels/ssl/8.rgba16.png", "start": 1327522, "end": 1330097}, {"filename": "/gfx/levels/ssl/9.rgba16.png", "start": 1330097, "end": 1333453}, {"filename": "/gfx/levels/thi/0.rgba16.png", "start": 1333453, "end": 1335881}, {"filename": "/gfx/levels/thi/1.rgba16.png", "start": 1335881, "end": 1339480}, {"filename": "/gfx/levels/totwc/0.rgba16.png", "start": 1339480, "end": 1341825}, {"filename": "/gfx/levels/totwc/1.rgba16.png", "start": 1341825, "end": 1343753}, {"filename": "/gfx/levels/totwc/2.rgba16.png", "start": 1343753, "end": 1344705}, {"filename": "/gfx/levels/totwc/3.ia16.png", "start": 1344705, "end": 1346366}, {"filename": "/gfx/levels/ttc/0.rgba16.png", "start": 1346366, "end": 1348393}, {"filename": "/gfx/levels/ttc/1.rgba16.png", "start": 1348393, "end": 1349930}, {"filename": "/gfx/levels/ttc/2.rgba16.png", "start": 1349930, "end": 1350443}, {"filename": "/gfx/levels/ttm/0.ia16.png", "start": 1350443, "end": 1351037}, {"filename": "/gfx/levels/ttm/1.rgba16.png", "start": 1351037, "end": 1354042}, {"filename": "/gfx/levels/ttm/2.rgba16.png", "start": 1354042, "end": 1355671}, {"filename": "/gfx/levels/ttm/3.rgba16.png", "start": 1355671, "end": 1358051}, {"filename": "/gfx/levels/ttm/4.rgba16.png", "start": 1358051, "end": 1360649}, {"filename": "/gfx/levels/ttm/5.rgba16.png", "start": 1360649, "end": 1363956}, {"filename": "/gfx/levels/ttm/6.rgba16.png", "start": 1363956, "end": 1368202}, {"filename": "/gfx/levels/ttm/7.rgba16.png", "start": 1368202, "end": 1372228}, {"filename": "/gfx/levels/ttm/8.rgba16.png", "start": 1372228, "end": 1372683}, {"filename": "/gfx/levels/vcutm/0.rgba16.png", "start": 1372683, "end": 1373311}, {"filename": "/gfx/levels/vcutm/1.rgba16.png", "start": 1373311, "end": 1378080}, {"filename": "/gfx/levels/vcutm/2.rgba16.png", "start": 1378080, "end": 1383143}, {"filename": "/gfx/levels/vcutm/3.rgba16.png", "start": 1383143, "end": 1384038}, {"filename": "/gfx/levels/wdw/0.rgba16.png", "start": 1384038, "end": 1386353}, {"filename": "/gfx/levels/wdw/1.rgba16.png", "start": 1386353, "end": 1388196}, {"filename": "/gfx/levels/wdw/2.rgba16.png", "start": 1388196, "end": 1389653}, {"filename": "/gfx/levels/wdw/3.rgba16.png", "start": 1389653, "end": 1391985}, {"filename": "/gfx/levels/wdw/4.rgba16.png", "start": 1391985, "end": 1394057}, {"filename": "/gfx/levels/wf/0.rgba16.png", "start": 1394057, "end": 1395310}, {"filename": "/gfx/levels/wf/1.rgba16.png", "start": 1395310, "end": 1397219}, {"filename": "/gfx/levels/wf/2.rgba16.png", "start": 1397219, "end": 1398944}, {"filename": "/gfx/levels/wf/3.rgba16.png", "start": 1398944, "end": 1400869}, {"filename": "/gfx/levels/wf/4.rgba16.png", "start": 1400869, "end": 1403973}, {"filename": "/gfx/levels/wf/5.ia8.png", "start": 1403973, "end": 1404110}, {"filename": "/gfx/levels/wmotr/0.rgba16.png", "start": 1404110, "end": 1405869}, {"filename": "/gfx/levels/wmotr/1.rgba16.png", "start": 1405869, "end": 1406699}, {"filename": "/gfx/levels/wmotr/2.rgba16.png", "start": 1406699, "end": 1407238}, {"filename": "/gfx/levels/wmotr/3.rgba16.png", "start": 1407238, "end": 1407426}, {"filename": "/gfx/levels/wmotr/4.rgba16.png", "start": 1407426, "end": 1407663}, {"filename": "/gfx/textures/cave/hmc_textures.00000.rgba16.png", "start": 1407663, "end": 1411036}, {"filename": "/gfx/textures/cave/hmc_textures.01000.rgba16.png", "start": 1411036, "end": 1412573}, {"filename": "/gfx/textures/cave/hmc_textures.01800.rgba16.png", "start": 1412573, "end": 1417209}, {"filename": "/gfx/textures/cave/hmc_textures.02800.rgba16.png", "start": 1417209, "end": 1418218}, {"filename": "/gfx/textures/cave/hmc_textures.03000.rgba16.png", "start": 1418218, "end": 1419474}, {"filename": "/gfx/textures/cave/hmc_textures.03800.rgba16.png", "start": 1419474, "end": 1422826}, {"filename": "/gfx/textures/cave/hmc_textures.04800.rgba16.png", "start": 1422826, "end": 1426759}, {"filename": "/gfx/textures/cave/hmc_textures.05800.rgba16.png", "start": 1426759, "end": 1430110}, {"filename": "/gfx/textures/cave/hmc_textures.06800.rgba16.png", "start": 1430110, "end": 1432069}, {"filename": "/gfx/textures/cave/hmc_textures.07000.rgba16.png", "start": 1432069, "end": 1433132}, {"filename": "/gfx/textures/cave/hmc_textures.07800.rgba16.png", "start": 1433132, "end": 1436262}, {"filename": "/gfx/textures/cave/hmc_textures.08800.rgba16.png", "start": 1436262, "end": 1441595}, {"filename": "/gfx/textures/cave/hmc_textures.09800.rgba16.png", "start": 1441595, "end": 1443671}, {"filename": "/gfx/textures/cave/hmc_textures.0A000.rgba16.png", "start": 1443671, "end": 1445053}, {"filename": "/gfx/textures/cave/hmc_textures.0A800.rgba16.png", "start": 1445053, "end": 1450179}, {"filename": "/gfx/textures/cave/hmc_textures.0B800.ia16.png", "start": 1450179, "end": 1450291}, {"filename": "/gfx/textures/cave/hmc_textures.0C000.ia16.png", "start": 1450291, "end": 1451150}, {"filename": "/gfx/textures/effect/bubble.06048.rgba16.png", "start": 1451150, "end": 1452267}, {"filename": "/gfx/textures/effect/flower.00008.rgba16.png", "start": 1452267, "end": 1454194}, {"filename": "/gfx/textures/effect/flower.00808.rgba16.png", "start": 1454194, "end": 1456153}, {"filename": "/gfx/textures/effect/flower.01008.rgba16.png", "start": 1456153, "end": 1458051}, {"filename": "/gfx/textures/effect/flower.01808.rgba16.png", "start": 1458051, "end": 1460028}, {"filename": "/gfx/textures/effect/lava_bubble.02020.rgba16.png", "start": 1460028, "end": 1460507}, {"filename": "/gfx/textures/effect/lava_bubble.02820.rgba16.png", "start": 1460507, "end": 1461173}, {"filename": "/gfx/textures/effect/lava_bubble.03020.rgba16.png", "start": 1461173, "end": 1461983}, {"filename": "/gfx/textures/effect/lava_bubble.03820.rgba16.png", "start": 1461983, "end": 1463149}, {"filename": "/gfx/textures/effect/lava_bubble.04020.rgba16.png", "start": 1463149, "end": 1464563}, {"filename": "/gfx/textures/effect/lava_bubble.04820.rgba16.png", "start": 1464563, "end": 1466148}, {"filename": "/gfx/textures/effect/lava_bubble.05020.rgba16.png", "start": 1466148, "end": 1467244}, {"filename": "/gfx/textures/effect/lava_bubble.05820.rgba16.png", "start": 1467244, "end": 1467901}, {"filename": "/gfx/textures/effect/tiny_bubble.0684C.rgba16.png", "start": 1467901, "end": 1468145}, {"filename": "/gfx/textures/effect/tiny_bubble.06AD8.rgba16.png", "start": 1468145, "end": 1468397}, {"filename": "/gfx/textures/fire/lll_textures.00000.rgba16.png", "start": 1468397, "end": 1470523}, {"filename": "/gfx/textures/fire/lll_textures.00800.rgba16.png", "start": 1470523, "end": 1471831}, {"filename": "/gfx/textures/fire/lll_textures.01000.rgba16.png", "start": 1471831, "end": 1472811}, {"filename": "/gfx/textures/fire/lll_textures.01800.rgba16.png", "start": 1472811, "end": 1476418}, {"filename": "/gfx/textures/fire/lll_textures.02000.rgba16.png", "start": 1476418, "end": 1479418}, {"filename": "/gfx/textures/fire/lll_textures.02800.rgba16.png", "start": 1479418, "end": 1483201}, {"filename": "/gfx/textures/fire/lll_textures.03000.rgba16.png", "start": 1483201, "end": 1486504}, {"filename": "/gfx/textures/fire/lll_textures.03800.rgba16.png", "start": 1486504, "end": 1489597}, {"filename": "/gfx/textures/fire/lll_textures.04000.rgba16.png", "start": 1489597, "end": 1492011}, {"filename": "/gfx/textures/fire/lll_textures.04800.rgba16.png", "start": 1492011, "end": 1495289}, {"filename": "/gfx/textures/fire/lll_textures.05000.rgba16.png", "start": 1495289, "end": 1498620}, {"filename": "/gfx/textures/fire/lll_textures.05800.rgba16.png", "start": 1498620, "end": 1501316}, {"filename": "/gfx/textures/fire/lll_textures.06000.rgba16.png", "start": 1501316, "end": 1503189}, {"filename": "/gfx/textures/fire/lll_textures.06800.rgba16.png", "start": 1503189, "end": 1505480}, {"filename": "/gfx/textures/fire/lll_textures.07000.rgba16.png", "start": 1505480, "end": 1509363}, {"filename": "/gfx/textures/fire/lll_textures.07800.rgba16.png", "start": 1509363, "end": 1511393}, {"filename": "/gfx/textures/fire/lll_textures.08000.rgba16.png", "start": 1511393, "end": 1514987}, {"filename": "/gfx/textures/fire/lll_textures.08800.rgba16.png", "start": 1514987, "end": 1517262}, {"filename": "/gfx/textures/fire/lll_textures.09000.rgba16.png", "start": 1517262, "end": 1519165}, {"filename": "/gfx/textures/fire/lll_textures.09800.rgba16.png", "start": 1519165, "end": 1522067}, {"filename": "/gfx/textures/fire/lll_textures.0A000.rgba16.png", "start": 1522067, "end": 1524534}, {"filename": "/gfx/textures/fire/lll_textures.0A800.rgba16.png", "start": 1524534, "end": 1526603}, {"filename": "/gfx/textures/fire/lll_textures.0B000.rgba16.png", "start": 1526603, "end": 1529242}, {"filename": "/gfx/textures/fire/lll_textures.0B800.rgba16.png", "start": 1529242, "end": 1529718}, {"filename": "/gfx/textures/generic/bob_textures.00000.rgba16.png", "start": 1529718, "end": 1530511}, {"filename": "/gfx/textures/generic/bob_textures.00800.rgba16.png", "start": 1530511, "end": 1533065}, {"filename": "/gfx/textures/generic/bob_textures.01000.rgba16.png", "start": 1533065, "end": 1535110}, {"filename": "/gfx/textures/generic/bob_textures.01800.rgba16.png", "start": 1535110, "end": 1538424}, {"filename": "/gfx/textures/generic/bob_textures.02000.rgba16.png", "start": 1538424, "end": 1541776}, {"filename": "/gfx/textures/generic/bob_textures.02800.rgba16.png", "start": 1541776, "end": 1544923}, {"filename": "/gfx/textures/generic/bob_textures.03000.rgba16.png", "start": 1544923, "end": 1546896}, {"filename": "/gfx/textures/generic/bob_textures.03800.rgba16.png", "start": 1546896, "end": 1550173}, {"filename": "/gfx/textures/generic/bob_textures.04000.rgba16.png", "start": 1550173, "end": 1553350}, {"filename": "/gfx/textures/generic/bob_textures.04800.rgba16.png", "start": 1553350, "end": 1555573}, {"filename": "/gfx/textures/generic/bob_textures.05000.rgba16.png", "start": 1555573, "end": 1558829}, {"filename": "/gfx/textures/generic/bob_textures.05800.rgba16.png", "start": 1558829, "end": 1561374}, {"filename": "/gfx/textures/generic/bob_textures.06000.rgba16.png", "start": 1561374, "end": 1564027}, {"filename": "/gfx/textures/generic/bob_textures.07000.rgba16.png", "start": 1564027, "end": 1566277}, {"filename": "/gfx/textures/generic/bob_textures.07800.rgba16.png", "start": 1566277, "end": 1567766}, {"filename": "/gfx/textures/generic/bob_textures.08000.rgba16.png", "start": 1567766, "end": 1570253}, {"filename": "/gfx/textures/generic/bob_textures.08800.rgba16.png", "start": 1570253, "end": 1570404}, {"filename": "/gfx/textures/generic/bob_textures.09000.rgba16.png", "start": 1570404, "end": 1573277}, {"filename": "/gfx/textures/generic/bob_textures.09800.rgba16.png", "start": 1573277, "end": 1576708}, {"filename": "/gfx/textures/generic/bob_textures.0A000.rgba16.png", "start": 1576708, "end": 1580041}, {"filename": "/gfx/textures/generic/bob_textures.0A800.rgba16.png", "start": 1580041, "end": 1582549}, {"filename": "/gfx/textures/generic/bob_textures.0B000.ia16.png", "start": 1582549, "end": 1583648}, {"filename": "/gfx/textures/grass/wf_textures.00000.rgba16.png", "start": 1583648, "end": 1584843}, {"filename": "/gfx/textures/grass/wf_textures.00800.rgba16.png", "start": 1584843, "end": 1587144}, {"filename": "/gfx/textures/grass/wf_textures.01000.rgba16.png", "start": 1587144, "end": 1589429}, {"filename": "/gfx/textures/grass/wf_textures.01800.rgba16.png", "start": 1589429, "end": 1591979}, {"filename": "/gfx/textures/grass/wf_textures.02000.rgba16.png", "start": 1591979, "end": 1595336}, {"filename": "/gfx/textures/grass/wf_textures.02800.rgba16.png", "start": 1595336, "end": 1597993}, {"filename": "/gfx/textures/grass/wf_textures.03000.rgba16.png", "start": 1597993, "end": 1601584}, {"filename": "/gfx/textures/grass/wf_textures.03800.rgba16.png", "start": 1601584, "end": 1605056}, {"filename": "/gfx/textures/grass/wf_textures.04000.rgba16.png", "start": 1605056, "end": 1606117}, {"filename": "/gfx/textures/grass/wf_textures.04800.rgba16.png", "start": 1606117, "end": 1609336}, {"filename": "/gfx/textures/grass/wf_textures.05000.rgba16.png", "start": 1609336, "end": 1612369}, {"filename": "/gfx/textures/grass/wf_textures.05800.rgba16.png", "start": 1612369, "end": 1614077}, {"filename": "/gfx/textures/grass/wf_textures.06000.rgba16.png", "start": 1614077, "end": 1615692}, {"filename": "/gfx/textures/grass/wf_textures.06800.rgba16.png", "start": 1615692, "end": 1617916}, {"filename": "/gfx/textures/grass/wf_textures.07000.rgba16.png", "start": 1617916, "end": 1620677}, {"filename": "/gfx/textures/grass/wf_textures.07800.rgba16.png", "start": 1620677, "end": 1622962}, {"filename": "/gfx/textures/grass/wf_textures.08000.rgba16.png", "start": 1622962, "end": 1626309}, {"filename": "/gfx/textures/grass/wf_textures.08800.rgba16.png", "start": 1626309, "end": 1628156}, {"filename": "/gfx/textures/grass/wf_textures.09000.rgba16.png", "start": 1628156, "end": 1629860}, {"filename": "/gfx/textures/grass/wf_textures.09800.rgba16.png", "start": 1629860, "end": 1633301}, {"filename": "/gfx/textures/grass/wf_textures.0A000.rgba16.png", "start": 1633301, "end": 1634965}, {"filename": "/gfx/textures/grass/wf_textures.0A800.rgba16.png", "start": 1634965, "end": 1635935}, {"filename": "/gfx/textures/grass/wf_textures.0B000.ia16.png", "start": 1635935, "end": 1637034}, {"filename": "/gfx/textures/grass/wf_textures.0B800.ia16.png", "start": 1637034, "end": 1638420}, {"filename": "/gfx/textures/inside/inside_castle_textures.00000.rgba16.png", "start": 1638420, "end": 1644066}, {"filename": "/gfx/textures/inside/inside_castle_textures.01000.rgba16.png", "start": 1644066, "end": 1649560}, {"filename": "/gfx/textures/inside/inside_castle_textures.02000.rgba16.png", "start": 1649560, "end": 1652959}, {"filename": "/gfx/textures/inside/inside_castle_textures.03000.rgba16.png", "start": 1652959, "end": 1655809}, {"filename": "/gfx/textures/inside/inside_castle_textures.03800.rgba16.png", "start": 1655809, "end": 1657474}, {"filename": "/gfx/textures/inside/inside_castle_textures.04000.rgba16.png", "start": 1657474, "end": 1660412}, {"filename": "/gfx/textures/inside/inside_castle_textures.04800.rgba16.png", "start": 1660412, "end": 1662821}, {"filename": "/gfx/textures/inside/inside_castle_textures.05000.rgba16.png", "start": 1662821, "end": 1664031}, {"filename": "/gfx/textures/inside/inside_castle_textures.05800.rgba16.png", "start": 1664031, "end": 1665432}, {"filename": "/gfx/textures/inside/inside_castle_textures.06000.rgba16.png", "start": 1665432, "end": 1669748}, {"filename": "/gfx/textures/inside/inside_castle_textures.07000.rgba16.png", "start": 1669748, "end": 1675438}, {"filename": "/gfx/textures/inside/inside_castle_textures.08000.rgba16.png", "start": 1675438, "end": 1677517}, {"filename": "/gfx/textures/inside/inside_castle_textures.08800.rgba16.png", "start": 1677517, "end": 1678559}, {"filename": "/gfx/textures/inside/inside_castle_textures.09000.rgba16.png", "start": 1678559, "end": 1682265}, {"filename": "/gfx/textures/inside/inside_castle_textures.0A000.rgba16.png", "start": 1682265, "end": 1687239}, {"filename": "/gfx/textures/inside/inside_castle_textures.0B000.rgba16.png", "start": 1687239, "end": 1689847}, {"filename": "/gfx/textures/inside/inside_castle_textures.0B800.rgba16.png", "start": 1689847, "end": 1695474}, {"filename": "/gfx/textures/intro_raw/hand_closed.rgba16.png", "start": 1695474, "end": 1696408}, {"filename": "/gfx/textures/intro_raw/hand_open.rgba16.png", "start": 1696408, "end": 1697378}, {"filename": "/gfx/textures/intro_raw/mario_face_shine.ia8.png", "start": 1697378, "end": 1697547}, {"filename": "/gfx/textures/intro_raw/red_star_0.rgba16.png", "start": 1697547, "end": 1698878}, {"filename": "/gfx/textures/intro_raw/red_star_1.rgba16.png", "start": 1698878, "end": 1700005}, {"filename": "/gfx/textures/intro_raw/red_star_2.rgba16.png", "start": 1700005, "end": 1700565}, {"filename": "/gfx/textures/intro_raw/red_star_3.rgba16.png", "start": 1700565, "end": 1701550}, {"filename": "/gfx/textures/intro_raw/red_star_4.rgba16.png", "start": 1701550, "end": 1702819}, {"filename": "/gfx/textures/intro_raw/red_star_5.rgba16.png", "start": 1702819, "end": 1703893}, {"filename": "/gfx/textures/intro_raw/red_star_6.rgba16.png", "start": 1703893, "end": 1704452}, {"filename": "/gfx/textures/intro_raw/red_star_7.rgba16.png", "start": 1704452, "end": 1705480}, {"filename": "/gfx/textures/intro_raw/sparkle_0.rgba16.png", "start": 1705480, "end": 1705815}, {"filename": "/gfx/textures/intro_raw/sparkle_1.rgba16.png", "start": 1705815, "end": 1706138}, {"filename": "/gfx/textures/intro_raw/sparkle_2.rgba16.png", "start": 1706138, "end": 1706601}, {"filename": "/gfx/textures/intro_raw/sparkle_3.rgba16.png", "start": 1706601, "end": 1707078}, {"filename": "/gfx/textures/intro_raw/sparkle_4.rgba16.png", "start": 1707078, "end": 1707879}, {"filename": "/gfx/textures/intro_raw/sparkle_5.rgba16.png", "start": 1707879, "end": 1708043}, {"filename": "/gfx/textures/intro_raw/white_star_0.rgba16.png", "start": 1708043, "end": 1709064}, {"filename": "/gfx/textures/intro_raw/white_star_1.rgba16.png", "start": 1709064, "end": 1709906}, {"filename": "/gfx/textures/intro_raw/white_star_2.rgba16.png", "start": 1709906, "end": 1710354}, {"filename": "/gfx/textures/intro_raw/white_star_3.rgba16.png", "start": 1710354, "end": 1711174}, {"filename": "/gfx/textures/intro_raw/white_star_4.rgba16.png", "start": 1711174, "end": 1712140}, {"filename": "/gfx/textures/intro_raw/white_star_5.rgba16.png", "start": 1712140, "end": 1712954}, {"filename": "/gfx/textures/intro_raw/white_star_6.rgba16.png", "start": 1712954, "end": 1713387}, {"filename": "/gfx/textures/intro_raw/white_star_7.rgba16.png", "start": 1713387, "end": 1714220}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_00.ia1.png", "start": 1714220, "end": 1717875}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_01.ia1.png", "start": 1717875, "end": 1721538}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_02.ia1.png", "start": 1721538, "end": 1725205}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_03.ia1.png", "start": 1725205, "end": 1728861}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_04.ia1.png", "start": 1728861, "end": 1732442}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_05.ia1.png", "start": 1732442, "end": 1736010}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_06.ia1.png", "start": 1736010, "end": 1739701}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_07.ia1.png", "start": 1739701, "end": 1743249}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_08.ia1.png", "start": 1743249, "end": 1746786}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_09.ia1.png", "start": 1746786, "end": 1750350}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_10.ia1.png", "start": 1750350, "end": 1754044}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_11.ia1.png", "start": 1754044, "end": 1757571}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_12.ia1.png", "start": 1757571, "end": 1761233}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_13.ia1.png", "start": 1761233, "end": 1764891}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_14.ia1.png", "start": 1764891, "end": 1768549}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_15.ia1.png", "start": 1768549, "end": 1772143}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_16.ia1.png", "start": 1772143, "end": 1775826}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_17.ia1.png", "start": 1775826, "end": 1779496}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_18.ia1.png", "start": 1779496, "end": 1783163}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_19.ia1.png", "start": 1783163, "end": 1786698}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_20.ia1.png", "start": 1786698, "end": 1790282}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_21.ia1.png", "start": 1790282, "end": 1793922}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_22.ia1.png", "start": 1793922, "end": 1797552}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_23.ia1.png", "start": 1797552, "end": 1801244}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_24.ia1.png", "start": 1801244, "end": 1804855}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_25.ia1.png", "start": 1804855, "end": 1808500}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_26.ia1.png", "start": 1808500, "end": 1812082}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_27.ia1.png", "start": 1812082, "end": 1815635}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_28.ia1.png", "start": 1815635, "end": 1819308}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_29.ia1.png", "start": 1819308, "end": 1822975}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_30.ia1.png", "start": 1822975, "end": 1826629}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_31.ia1.png", "start": 1826629, "end": 1830303}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_32.ia1.png", "start": 1830303, "end": 1833970}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_33.ia1.png", "start": 1833970, "end": 1837577}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_34.ia1.png", "start": 1837577, "end": 1841224}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_35.ia1.png", "start": 1841224, "end": 1844872}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_36.ia1.png", "start": 1844872, "end": 1848388}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_37.ia1.png", "start": 1848388, "end": 1851934}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_38.ia1.png", "start": 1851934, "end": 1855577}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_39.ia1.png", "start": 1855577, "end": 1859091}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_40.ia1.png", "start": 1859091, "end": 1862738}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_41.ia1.png", "start": 1862738, "end": 1866308}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_42.ia1.png", "start": 1866308, "end": 1869830}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_43.ia1.png", "start": 1869830, "end": 1873349}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_44.ia1.png", "start": 1873349, "end": 1876857}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_45.ia1.png", "start": 1876857, "end": 1880475}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_46.ia1.png", "start": 1880475, "end": 1883989}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_47.ia1.png", "start": 1883989, "end": 1887523}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_48.ia1.png", "start": 1887523, "end": 1891138}, {"filename": "/gfx/textures/ipl3_raw/ipl3_font_49.ia1.png", "start": 1891138, "end": 1894880}, {"filename": "/gfx/textures/machine/ttc_textures.00000.rgba16.png", "start": 1894880, "end": 1895499}, {"filename": "/gfx/textures/machine/ttc_textures.00800.rgba16.png", "start": 1895499, "end": 1897908}, {"filename": "/gfx/textures/machine/ttc_textures.01000.rgba16.png", "start": 1897908, "end": 1898214}, {"filename": "/gfx/textures/machine/ttc_textures.01800.rgba16.png", "start": 1898214, "end": 1898790}, {"filename": "/gfx/textures/machine/ttc_textures.02000.rgba16.png", "start": 1898790, "end": 1899139}, {"filename": "/gfx/textures/machine/ttc_textures.02800.rgba16.png", "start": 1899139, "end": 1900710}, {"filename": "/gfx/textures/machine/ttc_textures.03000.rgba16.png", "start": 1900710, "end": 1901923}, {"filename": "/gfx/textures/machine/ttc_textures.03800.rgba16.png", "start": 1901923, "end": 1902588}, {"filename": "/gfx/textures/machine/ttc_textures.04000.rgba16.png", "start": 1902588, "end": 1905217}, {"filename": "/gfx/textures/machine/ttc_textures.05000.rgba16.png", "start": 1905217, "end": 1905453}, {"filename": "/gfx/textures/machine/ttc_textures.05800.rgba16.png", "start": 1905453, "end": 1905759}, {"filename": "/gfx/textures/machine/ttc_textures.06000.rgba16.png", "start": 1905759, "end": 1906293}, {"filename": "/gfx/textures/machine/ttc_textures.06800.rgba16.png", "start": 1906293, "end": 1907315}, {"filename": "/gfx/textures/machine/ttc_textures.07000.rgba16.png", "start": 1907315, "end": 1908095}, {"filename": "/gfx/textures/machine/ttc_textures.07800.rgba16.png", "start": 1908095, "end": 1909733}, {"filename": "/gfx/textures/machine/ttc_textures.08000.rgba16.png", "start": 1909733, "end": 1910541}, {"filename": "/gfx/textures/machine/ttc_textures.08400.rgba16.png", "start": 1910541, "end": 1912382}, {"filename": "/gfx/textures/mountain/ttm_textures.00000.rgba16.png", "start": 1912382, "end": 1914332}, {"filename": "/gfx/textures/mountain/ttm_textures.00800.rgba16.png", "start": 1914332, "end": 1915346}, {"filename": "/gfx/textures/mountain/ttm_textures.01800.rgba16.png", "start": 1915346, "end": 1915643}, {"filename": "/gfx/textures/mountain/ttm_textures.02800.rgba16.png", "start": 1915643, "end": 1917186}, {"filename": "/gfx/textures/mountain/ttm_textures.03000.rgba16.png", "start": 1917186, "end": 1918750}, {"filename": "/gfx/textures/mountain/ttm_textures.03800.rgba16.png", "start": 1918750, "end": 1922060}, {"filename": "/gfx/textures/mountain/ttm_textures.04000.rgba16.png", "start": 1922060, "end": 1925028}, {"filename": "/gfx/textures/mountain/ttm_textures.04800.rgba16.png", "start": 1925028, "end": 1925725}, {"filename": "/gfx/textures/mountain/ttm_textures.05000.rgba16.png", "start": 1925725, "end": 1928179}, {"filename": "/gfx/textures/mountain/ttm_textures.05800.rgba16.png", "start": 1928179, "end": 1933124}, {"filename": "/gfx/textures/mountain/ttm_textures.06800.rgba16.png", "start": 1933124, "end": 1934659}, {"filename": "/gfx/textures/mountain/ttm_textures.07000.rgba16.png", "start": 1934659, "end": 1936198}, {"filename": "/gfx/textures/mountain/ttm_textures.07800.rgba16.png", "start": 1936198, "end": 1937578}, {"filename": "/gfx/textures/mountain/ttm_textures.08000.rgba16.png", "start": 1937578, "end": 1938580}, {"filename": "/gfx/textures/mountain/ttm_textures.08800.rgba16.png", "start": 1938580, "end": 1940690}, {"filename": "/gfx/textures/mountain/ttm_textures.09800.rgba16.png", "start": 1940690, "end": 1942622}, {"filename": "/gfx/textures/mountain/ttm_textures.0A000.rgba16.png", "start": 1942622, "end": 1944036}, {"filename": "/gfx/textures/mountain/ttm_textures.0A800.rgba16.png", "start": 1944036, "end": 1944491}, {"filename": "/gfx/textures/mountain/ttm_textures.0B000.rgba16.png", "start": 1944491, "end": 1946019}, {"filename": "/gfx/textures/mountain/ttm_textures.0B800.rgba16.png", "start": 1946019, "end": 1947510}, {"filename": "/gfx/textures/mountain/ttm_textures.0C000.rgba16.png", "start": 1947510, "end": 1948586}, {"filename": "/gfx/textures/outside/castle_grounds_textures.00000.rgba16.png", "start": 1948586, "end": 1950783}, {"filename": "/gfx/textures/outside/castle_grounds_textures.00800.rgba16.png", "start": 1950783, "end": 1951699}, {"filename": "/gfx/textures/outside/castle_grounds_textures.01000.rgba16.png", "start": 1951699, "end": 1956111}, {"filename": "/gfx/textures/outside/castle_grounds_textures.02000.rgba16.png", "start": 1956111, "end": 1961102}, {"filename": "/gfx/textures/outside/castle_grounds_textures.03000.rgba16.png", "start": 1961102, "end": 1962758}, {"filename": "/gfx/textures/outside/castle_grounds_textures.03800.rgba16.png", "start": 1962758, "end": 1963903}, {"filename": "/gfx/textures/outside/castle_grounds_textures.04000.rgba16.png", "start": 1963903, "end": 1965632}, {"filename": "/gfx/textures/outside/castle_grounds_textures.04800.rgba16.png", "start": 1965632, "end": 1966670}, {"filename": "/gfx/textures/outside/castle_grounds_textures.05800.rgba16.png", "start": 1966670, "end": 1970421}, {"filename": "/gfx/textures/outside/castle_grounds_textures.06000.rgba16.png", "start": 1970421, "end": 1971623}, {"filename": "/gfx/textures/outside/castle_grounds_textures.06800.rgba16.png", "start": 1971623, "end": 1976283}, {"filename": "/gfx/textures/outside/castle_grounds_textures.07800.rgba16.png", "start": 1976283, "end": 1978497}, {"filename": "/gfx/textures/outside/castle_grounds_textures.08000.rgba16.png", "start": 1978497, "end": 1980346}, {"filename": "/gfx/textures/outside/castle_grounds_textures.08800.rgba16.png", "start": 1980346, "end": 1981602}, {"filename": "/gfx/textures/outside/castle_grounds_textures.09000.rgba16.png", "start": 1981602, "end": 1982663}, {"filename": "/gfx/textures/outside/castle_grounds_textures.09800.rgba16.png", "start": 1982663, "end": 1984199}, {"filename": "/gfx/textures/outside/castle_grounds_textures.0A000.rgba16.png", "start": 1984199, "end": 1986485}, {"filename": "/gfx/textures/outside/castle_grounds_textures.0A800.rgba16.png", "start": 1986485, "end": 1989134}, {"filename": "/gfx/textures/outside/castle_grounds_textures.0B000.rgba16.png", "start": 1989134, "end": 1990401}, {"filename": "/gfx/textures/outside/castle_grounds_textures.0B400.rgba16.png", "start": 1990401, "end": 1991938}, {"filename": "/gfx/textures/outside/castle_grounds_textures.0BC00.ia16.png", "start": 1991938, "end": 1993037}, {"filename": "/gfx/textures/segment2/font_graphics.05900.ia4.png", "start": 1993037, "end": 1993143}, {"filename": "/gfx/textures/segment2/font_graphics.05940.ia4.png", "start": 1993143, "end": 1993247}, {"filename": "/gfx/textures/segment2/font_graphics.05980.ia4.png", "start": 1993247, "end": 1993358}, {"filename": "/gfx/textures/segment2/font_graphics.059C0.ia4.png", "start": 1993358, "end": 1993470}, {"filename": "/gfx/textures/segment2/font_graphics.05A00.ia4.png", "start": 1993470, "end": 1993575}, {"filename": "/gfx/textures/segment2/font_graphics.05A40.ia4.png", "start": 1993575, "end": 1993681}, {"filename": "/gfx/textures/segment2/font_graphics.05A80.ia4.png", "start": 1993681, "end": 1993791}, {"filename": "/gfx/textures/segment2/font_graphics.05AC0.ia4.png", "start": 1993791, "end": 1993887}, {"filename": "/gfx/textures/segment2/font_graphics.05B00.ia4.png", "start": 1993887, "end": 1994002}, {"filename": "/gfx/textures/segment2/font_graphics.05B40.ia4.png", "start": 1994002, "end": 1994115}, {"filename": "/gfx/textures/segment2/font_graphics.05B80.ia4.png", "start": 1994115, "end": 1994217}, {"filename": "/gfx/textures/segment2/font_graphics.05BC0.ia4.png", "start": 1994217, "end": 1994332}, {"filename": "/gfx/textures/segment2/font_graphics.05C00.ia4.png", "start": 1994332, "end": 1994434}, {"filename": "/gfx/textures/segment2/font_graphics.05C40.ia4.png", "start": 1994434, "end": 1994542}, {"filename": "/gfx/textures/segment2/font_graphics.05C80.ia4.png", "start": 1994542, "end": 1994644}, {"filename": "/gfx/textures/segment2/font_graphics.05CC0.ia4.png", "start": 1994644, "end": 1994743}, {"filename": "/gfx/textures/segment2/font_graphics.05D00.ia4.png", "start": 1994743, "end": 1994851}, {"filename": "/gfx/textures/segment2/font_graphics.05D40.ia4.png", "start": 1994851, "end": 1994954}, {"filename": "/gfx/textures/segment2/font_graphics.05D80.ia4.png", "start": 1994954, "end": 1995053}, {"filename": "/gfx/textures/segment2/font_graphics.05DC0.ia4.png", "start": 1995053, "end": 1995156}, {"filename": "/gfx/textures/segment2/font_graphics.05E00.ia4.png", "start": 1995156, "end": 1995258}, {"filename": "/gfx/textures/segment2/font_graphics.05E40.ia4.png", "start": 1995258, "end": 1995354}, {"filename": "/gfx/textures/segment2/font_graphics.05E80.ia4.png", "start": 1995354, "end": 1995465}, {"filename": "/gfx/textures/segment2/font_graphics.05EC0.ia4.png", "start": 1995465, "end": 1995579}, {"filename": "/gfx/textures/segment2/font_graphics.05F00.ia4.png", "start": 1995579, "end": 1995683}, {"filename": "/gfx/textures/segment2/font_graphics.05F40.ia4.png", "start": 1995683, "end": 1995788}, {"filename": "/gfx/textures/segment2/font_graphics.05F80.ia4.png", "start": 1995788, "end": 1995896}, {"filename": "/gfx/textures/segment2/font_graphics.05FC0.ia4.png", "start": 1995896, "end": 1996002}, {"filename": "/gfx/textures/segment2/font_graphics.06000.ia4.png", "start": 1996002, "end": 1996098}, {"filename": "/gfx/textures/segment2/font_graphics.06040.ia4.png", "start": 1996098, "end": 1996194}, {"filename": "/gfx/textures/segment2/font_graphics.06080.ia4.png", "start": 1996194, "end": 1996294}, {"filename": "/gfx/textures/segment2/font_graphics.060C0.ia4.png", "start": 1996294, "end": 1996397}, {"filename": "/gfx/textures/segment2/font_graphics.06100.ia4.png", "start": 1996397, "end": 1996506}, {"filename": "/gfx/textures/segment2/font_graphics.06140.ia4.png", "start": 1996506, "end": 1996618}, {"filename": "/gfx/textures/segment2/font_graphics.06180.ia4.png", "start": 1996618, "end": 1996714}, {"filename": "/gfx/textures/segment2/font_graphics.061C0.ia4.png", "start": 1996714, "end": 1996816}, {"filename": "/gfx/textures/segment2/font_graphics.06200.ia4.png", "start": 1996816, "end": 1996910}, {"filename": "/gfx/textures/segment2/font_graphics.06240.ia4.png", "start": 1996910, "end": 1997014}, {"filename": "/gfx/textures/segment2/font_graphics.06280.ia4.png", "start": 1997014, "end": 1997108}, {"filename": "/gfx/textures/segment2/font_graphics.062C0.ia4.png", "start": 1997108, "end": 1997209}, {"filename": "/gfx/textures/segment2/font_graphics.06300.ia4.png", "start": 1997209, "end": 1997307}, {"filename": "/gfx/textures/segment2/font_graphics.06340.ia4.png", "start": 1997307, "end": 1997402}, {"filename": "/gfx/textures/segment2/font_graphics.06380.ia4.png", "start": 1997402, "end": 1997508}, {"filename": "/gfx/textures/segment2/font_graphics.063C0.ia4.png", "start": 1997508, "end": 1997607}, {"filename": "/gfx/textures/segment2/font_graphics.06400.ia4.png", "start": 1997607, "end": 1997700}, {"filename": "/gfx/textures/segment2/font_graphics.06410.ia1.png", "start": 1997700, "end": 1997780}, {"filename": "/gfx/textures/segment2/font_graphics.06420.ia1.png", "start": 1997780, "end": 1997860}, {"filename": "/gfx/textures/segment2/font_graphics.06440.ia4.png", "start": 1997860, "end": 1997953}, {"filename": "/gfx/textures/segment2/font_graphics.06480.ia4.png", "start": 1997953, "end": 1998051}, {"filename": "/gfx/textures/segment2/font_graphics.064C0.ia4.png", "start": 1998051, "end": 1998137}, {"filename": "/gfx/textures/segment2/font_graphics.06500.ia4.png", "start": 1998137, "end": 1998247}, {"filename": "/gfx/textures/segment2/font_graphics.06540.ia4.png", "start": 1998247, "end": 1998345}, {"filename": "/gfx/textures/segment2/font_graphics.06580.ia4.png", "start": 1998345, "end": 1998439}, {"filename": "/gfx/textures/segment2/font_graphics.065C0.ia4.png", "start": 1998439, "end": 1998534}, {"filename": "/gfx/textures/segment2/font_graphics.06600.ia4.png", "start": 1998534, "end": 1998642}, {"filename": "/gfx/textures/segment2/font_graphics.06640.ia4.png", "start": 1998642, "end": 1998732}, {"filename": "/gfx/textures/segment2/font_graphics.06680.ia4.png", "start": 1998732, "end": 1998828}, {"filename": "/gfx/textures/segment2/font_graphics.066C0.ia4.png", "start": 1998828, "end": 1998920}, {"filename": "/gfx/textures/segment2/font_graphics.06700.ia4.png", "start": 1998920, "end": 1999017}, {"filename": "/gfx/textures/segment2/font_graphics.06740.ia4.png", "start": 1999017, "end": 1999108}, {"filename": "/gfx/textures/segment2/font_graphics.06780.ia4.png", "start": 1999108, "end": 1999217}, {"filename": "/gfx/textures/segment2/font_graphics.067C0.ia4.png", "start": 1999217, "end": 1999314}, {"filename": "/gfx/textures/segment2/font_graphics.06800.ia4.png", "start": 1999314, "end": 1999411}, {"filename": "/gfx/textures/segment2/font_graphics.06840.ia4.png", "start": 1999411, "end": 1999506}, {"filename": "/gfx/textures/segment2/font_graphics.06880.ia4.png", "start": 1999506, "end": 1999609}, {"filename": "/gfx/textures/segment2/font_graphics.068C0.ia4.png", "start": 1999609, "end": 1999708}, {"filename": "/gfx/textures/segment2/font_graphics.06900.ia4.png", "start": 1999708, "end": 1999819}, {"filename": "/gfx/textures/segment2/font_graphics.06940.ia4.png", "start": 1999819, "end": 1999908}, {"filename": "/gfx/textures/segment2/font_graphics.06980.ia4.png", "start": 1999908, "end": 1999995}, {"filename": "/gfx/textures/segment2/font_graphics.069C0.ia4.png", "start": 1999995, "end": 2000093}, {"filename": "/gfx/textures/segment2/font_graphics.06A00.ia4.png", "start": 2000093, "end": 2000187}, {"filename": "/gfx/textures/segment2/font_graphics.06A40.ia4.png", "start": 2000187, "end": 2000272}, {"filename": "/gfx/textures/segment2/font_graphics.06A80.ia4.png", "start": 2000272, "end": 2000351}, {"filename": "/gfx/textures/segment2/font_graphics.06AC0.ia4.png", "start": 2000351, "end": 2000453}, {"filename": "/gfx/textures/segment2/font_graphics.06B00.ia4.png", "start": 2000453, "end": 2000541}, {"filename": "/gfx/textures/segment2/font_graphics.06B40.ia4.png", "start": 2000541, "end": 2000627}, {"filename": "/gfx/textures/segment2/font_graphics.06B80.ia4.png", "start": 2000627, "end": 2000714}, {"filename": "/gfx/textures/segment2/font_graphics.06BC0.ia4.png", "start": 2000714, "end": 2000823}, {"filename": "/gfx/textures/segment2/font_graphics.06C00.ia4.png", "start": 2000823, "end": 2000940}, {"filename": "/gfx/textures/segment2/font_graphics.06C40.ia4.png", "start": 2000940, "end": 2001054}, {"filename": "/gfx/textures/segment2/font_graphics.06C80.ia4.png", "start": 2001054, "end": 2001143}, {"filename": "/gfx/textures/segment2/font_graphics.06CC0.ia4.png", "start": 2001143, "end": 2001230}, {"filename": "/gfx/textures/segment2/font_graphics.06D00.ia4.png", "start": 2001230, "end": 2001312}, {"filename": "/gfx/textures/segment2/font_graphics.06D40.ia4.png", "start": 2001312, "end": 2001392}, {"filename": "/gfx/textures/segment2/font_graphics.06D80.ia4.png", "start": 2001392, "end": 2001507}, {"filename": "/gfx/textures/segment2/font_graphics.06DC0.ia4.png", "start": 2001507, "end": 2001611}, {"filename": "/gfx/textures/segment2/font_graphics.06E00.ia4.png", "start": 2001611, "end": 2001716}, {"filename": "/gfx/textures/segment2/font_graphics.06E40.ia4.png", "start": 2001716, "end": 2001815}, {"filename": "/gfx/textures/segment2/font_graphics.06E80.ia4.png", "start": 2001815, "end": 2001926}, {"filename": "/gfx/textures/segment2/font_graphics.06EC0.ia4.png", "start": 2001926, "end": 2002038}, {"filename": "/gfx/textures/segment2/font_graphics.06F00.ia4.png", "start": 2002038, "end": 2002145}, {"filename": "/gfx/textures/segment2/font_graphics.06F40.ia4.png", "start": 2002145, "end": 2002253}, {"filename": "/gfx/textures/segment2/font_graphics.06F80.ia4.png", "start": 2002253, "end": 2002361}, {"filename": "/gfx/textures/segment2/font_graphics.06FC0.ia4.png", "start": 2002361, "end": 2002461}, {"filename": "/gfx/textures/segment2/segment2.00000.rgba16.png", "start": 2002461, "end": 2002991}, {"filename": "/gfx/textures/segment2/segment2.00200.rgba16.png", "start": 2002991, "end": 2003378}, {"filename": "/gfx/textures/segment2/segment2.00400.rgba16.png", "start": 2003378, "end": 2003885}, {"filename": "/gfx/textures/segment2/segment2.00600.rgba16.png", "start": 2003885, "end": 2004417}, {"filename": "/gfx/textures/segment2/segment2.00800.rgba16.png", "start": 2004417, "end": 2004865}, {"filename": "/gfx/textures/segment2/segment2.00A00.rgba16.png", "start": 2004865, "end": 2005403}, {"filename": "/gfx/textures/segment2/segment2.00C00.rgba16.png", "start": 2005403, "end": 2005898}, {"filename": "/gfx/textures/segment2/segment2.00E00.rgba16.png", "start": 2005898, "end": 2006340}, {"filename": "/gfx/textures/segment2/segment2.01000.rgba16.png", "start": 2006340, "end": 2006860}, {"filename": "/gfx/textures/segment2/segment2.01200.rgba16.png", "start": 2006860, "end": 2007366}, {"filename": "/gfx/textures/segment2/segment2.01400.rgba16.png", "start": 2007366, "end": 2007736}, {"filename": "/gfx/textures/segment2/segment2.01600.rgba16.png", "start": 2007736, "end": 2008172}, {"filename": "/gfx/textures/segment2/segment2.01800.rgba16.png", "start": 2008172, "end": 2008629}, {"filename": "/gfx/textures/segment2/segment2.01A00.rgba16.png", "start": 2008629, "end": 2009038}, {"filename": "/gfx/textures/segment2/segment2.01C00.rgba16.png", "start": 2009038, "end": 2009430}, {"filename": "/gfx/textures/segment2/segment2.01E00.rgba16.png", "start": 2009430, "end": 2009837}, {"filename": "/gfx/textures/segment2/segment2.02000.rgba16.png", "start": 2009837, "end": 2010405}, {"filename": "/gfx/textures/segment2/segment2.02200.rgba16.png", "start": 2010405, "end": 2010833}, {"filename": "/gfx/textures/segment2/segment2.02400.rgba16.png", "start": 2010833, "end": 2011100}, {"filename": "/gfx/textures/segment2/segment2.02800.rgba16.png", "start": 2011100, "end": 2011555}, {"filename": "/gfx/textures/segment2/segment2.02A00.rgba16.png", "start": 2011555, "end": 2011879}, {"filename": "/gfx/textures/segment2/segment2.02C00.rgba16.png", "start": 2011879, "end": 2012352}, {"filename": "/gfx/textures/segment2/segment2.02E00.rgba16.png", "start": 2012352, "end": 2012719}, {"filename": "/gfx/textures/segment2/segment2.03000.rgba16.png", "start": 2012719, "end": 2013103}, {"filename": "/gfx/textures/segment2/segment2.03200.rgba16.png", "start": 2013103, "end": 2013512}, {"filename": "/gfx/textures/segment2/segment2.03600.rgba16.png", "start": 2013512, "end": 2013984}, {"filename": "/gfx/textures/segment2/segment2.03800.rgba16.png", "start": 2013984, "end": 2014413}, {"filename": "/gfx/textures/segment2/segment2.03A00.rgba16.png", "start": 2014413, "end": 2014795}, {"filename": "/gfx/textures/segment2/segment2.03C00.rgba16.png", "start": 2014795, "end": 2015276}, {"filename": "/gfx/textures/segment2/segment2.04000.rgba16.png", "start": 2015276, "end": 2015653}, {"filename": "/gfx/textures/segment2/segment2.04400.rgba16.png", "start": 2015653, "end": 2016050}, {"filename": "/gfx/textures/segment2/segment2.04800.rgba16.png", "start": 2016050, "end": 2016221}, {"filename": "/gfx/textures/segment2/segment2.04A00.rgba16.png", "start": 2016221, "end": 2016434}, {"filename": "/gfx/textures/segment2/segment2.05000.rgba16.png", "start": 2016434, "end": 2016855}, {"filename": "/gfx/textures/segment2/segment2.05600.rgba16.png", "start": 2016855, "end": 2017303}, {"filename": "/gfx/textures/segment2/segment2.05800.rgba16.png", "start": 2017303, "end": 2018056}, {"filename": "/gfx/textures/segment2/segment2.05A00.rgba16.png", "start": 2018056, "end": 2018731}, {"filename": "/gfx/textures/segment2/segment2.05C00.rgba16.png", "start": 2018731, "end": 2019319}, {"filename": "/gfx/textures/segment2/segment2.06200.rgba16.png", "start": 2019319, "end": 2019563}, {"filename": "/gfx/textures/segment2/segment2.06280.rgba16.png", "start": 2019563, "end": 2019779}, {"filename": "/gfx/textures/segment2/segment2.06300.rgba16.png", "start": 2019779, "end": 2020013}, {"filename": "/gfx/textures/segment2/segment2.06380.rgba16.png", "start": 2020013, "end": 2020240}, {"filename": "/gfx/textures/segment2/segment2.06400.rgba16.png", "start": 2020240, "end": 2020487}, {"filename": "/gfx/textures/segment2/segment2.06480.rgba16.png", "start": 2020487, "end": 2020715}, {"filename": "/gfx/textures/segment2/segment2.06500.rgba16.png", "start": 2020715, "end": 2020940}, {"filename": "/gfx/textures/segment2/segment2.06580.rgba16.png", "start": 2020940, "end": 2021186}, {"filename": "/gfx/textures/segment2/segment2.06600.rgba16.png", "start": 2021186, "end": 2021419}, {"filename": "/gfx/textures/segment2/segment2.06680.rgba16.png", "start": 2021419, "end": 2021667}, {"filename": "/gfx/textures/segment2/segment2.06700.rgba16.png", "start": 2021667, "end": 2021917}, {"filename": "/gfx/textures/segment2/segment2.06780.rgba16.png", "start": 2021917, "end": 2022110}, {"filename": "/gfx/textures/segment2/segment2.06800.rgba16.png", "start": 2022110, "end": 2022312}, {"filename": "/gfx/textures/segment2/segment2.06880.rgba16.png", "start": 2022312, "end": 2022564}, {"filename": "/gfx/textures/segment2/segment2.06900.rgba16.png", "start": 2022564, "end": 2022771}, {"filename": "/gfx/textures/segment2/segment2.06980.rgba16.png", "start": 2022771, "end": 2023013}, {"filename": "/gfx/textures/segment2/segment2.06A00.rgba16.png", "start": 2023013, "end": 2023264}, {"filename": "/gfx/textures/segment2/segment2.06A80.rgba16.png", "start": 2023264, "end": 2023502}, {"filename": "/gfx/textures/segment2/segment2.06B00.rgba16.png", "start": 2023502, "end": 2023742}, {"filename": "/gfx/textures/segment2/segment2.06B80.rgba16.png", "start": 2023742, "end": 2023986}, {"filename": "/gfx/textures/segment2/segment2.06C00.rgba16.png", "start": 2023986, "end": 2024237}, {"filename": "/gfx/textures/segment2/segment2.06C80.rgba16.png", "start": 2024237, "end": 2024482}, {"filename": "/gfx/textures/segment2/segment2.06D00.rgba16.png", "start": 2024482, "end": 2024709}, {"filename": "/gfx/textures/segment2/segment2.06D80.rgba16.png", "start": 2024709, "end": 2024931}, {"filename": "/gfx/textures/segment2/segment2.06E00.rgba16.png", "start": 2024931, "end": 2025159}, {"filename": "/gfx/textures/segment2/segment2.06E80.rgba16.png", "start": 2025159, "end": 2025406}, {"filename": "/gfx/textures/segment2/segment2.06F00.rgba16.png", "start": 2025406, "end": 2025636}, {"filename": "/gfx/textures/segment2/segment2.06F80.rgba16.png", "start": 2025636, "end": 2025893}, {"filename": "/gfx/textures/segment2/segment2.07000.rgba16.png", "start": 2025893, "end": 2026137}, {"filename": "/gfx/textures/segment2/segment2.07080.rgba16.png", "start": 2026137, "end": 2026249}, {"filename": "/gfx/textures/segment2/segment2.07340.ia1.png", "start": 2026249, "end": 2026323}, {"filename": "/gfx/textures/segment2/segment2.07B50.rgba16.png", "start": 2026323, "end": 2026784}, {"filename": "/gfx/textures/segment2/segment2.07D50.rgba16.png", "start": 2026784, "end": 2027477}, {"filename": "/gfx/textures/segment2/segment2.07F50.rgba16.png", "start": 2027477, "end": 2028117}, {"filename": "/gfx/textures/segment2/segment2.08150.rgba16.png", "start": 2028117, "end": 2028244}, {"filename": "/gfx/textures/segment2/segment2.081D0.rgba16.png", "start": 2028244, "end": 2028392}, {"filename": "/gfx/textures/segment2/segment2.0F458.ia8.png", "start": 2028392, "end": 2029110}, {"filename": "/gfx/textures/segment2/segment2.0FC58.ia8.png", "start": 2029110, "end": 2029653}, {"filename": "/gfx/textures/segment2/segment2.10458.ia8.png", "start": 2029653, "end": 2030643}, {"filename": "/gfx/textures/segment2/segment2.11458.ia8.png", "start": 2030643, "end": 2031812}, {"filename": "/gfx/textures/segment2/segment2.11C58.rgba16.png", "start": 2031812, "end": 2033449}, {"filename": "/gfx/textures/segment2/segment2.12458.rgba16.png", "start": 2033449, "end": 2036122}, {"filename": "/gfx/textures/segment2/segment2.12C58.rgba16.png", "start": 2036122, "end": 2037495}, {"filename": "/gfx/textures/segment2/segment2.13458.ia16.png", "start": 2037495, "end": 2039511}, {"filename": "/gfx/textures/segment2/segment2.13C58.rgba16.png", "start": 2039511, "end": 2041414}, {"filename": "/gfx/textures/segment2/segment2.14838.ia8.png", "start": 2041414, "end": 2041517}, {"filename": "/gfx/textures/segment2/shadow_quarter_circle.ia8.png", "start": 2041517, "end": 2041714}, {"filename": "/gfx/textures/segment2/shadow_quarter_square.ia8.png", "start": 2041714, "end": 2041851}, {"filename": "/gfx/textures/sky/metal_hole.rgba16.png", "start": 2041851, "end": 2043803}, {"filename": "/gfx/textures/sky/rr_textures.00000.rgba16.png", "start": 2043803, "end": 2045485}, {"filename": "/gfx/textures/sky/rr_textures.00800.rgba16.png", "start": 2045485, "end": 2046375}, {"filename": "/gfx/textures/sky/rr_textures.01000.rgba16.png", "start": 2046375, "end": 2048847}, {"filename": "/gfx/textures/sky/rr_textures.01800.rgba16.png", "start": 2048847, "end": 2052137}, {"filename": "/gfx/textures/sky/rr_textures.02000.rgba16.png", "start": 2052137, "end": 2052368}, {"filename": "/gfx/textures/sky/rr_textures.03000.rgba16.png", "start": 2052368, "end": 2053031}, {"filename": "/gfx/textures/sky/rr_textures.03800.rgba16.png", "start": 2053031, "end": 2055019}, {"filename": "/gfx/textures/sky/rr_textures.04800.rgba16.png", "start": 2055019, "end": 2057515}, {"filename": "/gfx/textures/sky/rr_textures.05000.rgba16.png", "start": 2057515, "end": 2059130}, {"filename": "/gfx/textures/sky/rr_textures.05800.rgba16.png", "start": 2059130, "end": 2059413}, {"filename": "/gfx/textures/sky/rr_textures.06000.rgba16.png", "start": 2059413, "end": 2060827}, {"filename": "/gfx/textures/sky/rr_textures.07000.rgba16.png", "start": 2060827, "end": 2062039}, {"filename": "/gfx/textures/sky/rr_textures.07800.rgba16.png", "start": 2062039, "end": 2063384}, {"filename": "/gfx/textures/sky/rr_textures.08000.rgba16.png", "start": 2063384, "end": 2065046}, {"filename": "/gfx/textures/skybox_tiles/bbh.0.rgba16.png", "start": 2065046, "end": 2065472}, {"filename": "/gfx/textures/skybox_tiles/bbh.1.rgba16.png", "start": 2065472, "end": 2065769}, {"filename": "/gfx/textures/skybox_tiles/bbh.10.rgba16.png", "start": 2065769, "end": 2066256}, {"filename": "/gfx/textures/skybox_tiles/bbh.11.rgba16.png", "start": 2066256, "end": 2066906}, {"filename": "/gfx/textures/skybox_tiles/bbh.12.rgba16.png", "start": 2066906, "end": 2068550}, {"filename": "/gfx/textures/skybox_tiles/bbh.13.rgba16.png", "start": 2068550, "end": 2069691}, {"filename": "/gfx/textures/skybox_tiles/bbh.14.rgba16.png", "start": 2069691, "end": 2070518}, {"filename": "/gfx/textures/skybox_tiles/bbh.15.rgba16.png", "start": 2070518, "end": 2071505}, {"filename": "/gfx/textures/skybox_tiles/bbh.16.rgba16.png", "start": 2071505, "end": 2073490}, {"filename": "/gfx/textures/skybox_tiles/bbh.17.rgba16.png", "start": 2073490, "end": 2075432}, {"filename": "/gfx/textures/skybox_tiles/bbh.18.rgba16.png", "start": 2075432, "end": 2077950}, {"filename": "/gfx/textures/skybox_tiles/bbh.19.rgba16.png", "start": 2077950, "end": 2080091}, {"filename": "/gfx/textures/skybox_tiles/bbh.2.rgba16.png", "start": 2080091, "end": 2080390}, {"filename": "/gfx/textures/skybox_tiles/bbh.20.rgba16.png", "start": 2080390, "end": 2082431}, {"filename": "/gfx/textures/skybox_tiles/bbh.21.rgba16.png", "start": 2082431, "end": 2083714}, {"filename": "/gfx/textures/skybox_tiles/bbh.22.rgba16.png", "start": 2083714, "end": 2085124}, {"filename": "/gfx/textures/skybox_tiles/bbh.23.rgba16.png", "start": 2085124, "end": 2086410}, {"filename": "/gfx/textures/skybox_tiles/bbh.24.rgba16.png", "start": 2086410, "end": 2088880}, {"filename": "/gfx/textures/skybox_tiles/bbh.25.rgba16.png", "start": 2088880, "end": 2091432}, {"filename": "/gfx/textures/skybox_tiles/bbh.26.rgba16.png", "start": 2091432, "end": 2094009}, {"filename": "/gfx/textures/skybox_tiles/bbh.27.rgba16.png", "start": 2094009, "end": 2096414}, {"filename": "/gfx/textures/skybox_tiles/bbh.28.rgba16.png", "start": 2096414, "end": 2099031}, {"filename": "/gfx/textures/skybox_tiles/bbh.29.rgba16.png", "start": 2099031, "end": 2101610}, {"filename": "/gfx/textures/skybox_tiles/bbh.3.rgba16.png", "start": 2101610, "end": 2101929}, {"filename": "/gfx/textures/skybox_tiles/bbh.30.rgba16.png", "start": 2101929, "end": 2104675}, {"filename": "/gfx/textures/skybox_tiles/bbh.31.rgba16.png", "start": 2104675, "end": 2107297}, {"filename": "/gfx/textures/skybox_tiles/bbh.32.rgba16.png", "start": 2107297, "end": 2108116}, {"filename": "/gfx/textures/skybox_tiles/bbh.33.rgba16.png", "start": 2108116, "end": 2108693}, {"filename": "/gfx/textures/skybox_tiles/bbh.34.rgba16.png", "start": 2108693, "end": 2109092}, {"filename": "/gfx/textures/skybox_tiles/bbh.35.rgba16.png", "start": 2109092, "end": 2109691}, {"filename": "/gfx/textures/skybox_tiles/bbh.36.rgba16.png", "start": 2109691, "end": 2110351}, {"filename": "/gfx/textures/skybox_tiles/bbh.37.rgba16.png", "start": 2110351, "end": 2110939}, {"filename": "/gfx/textures/skybox_tiles/bbh.38.rgba16.png", "start": 2110939, "end": 2111566}, {"filename": "/gfx/textures/skybox_tiles/bbh.39.rgba16.png", "start": 2111566, "end": 2112323}, {"filename": "/gfx/textures/skybox_tiles/bbh.4.rgba16.png", "start": 2112323, "end": 2112629}, {"filename": "/gfx/textures/skybox_tiles/bbh.40.rgba16.png", "start": 2112629, "end": 2112743}, {"filename": "/gfx/textures/skybox_tiles/bbh.5.rgba16.png", "start": 2112743, "end": 2113192}, {"filename": "/gfx/textures/skybox_tiles/bbh.6.rgba16.png", "start": 2113192, "end": 2113648}, {"filename": "/gfx/textures/skybox_tiles/bbh.7.rgba16.png", "start": 2113648, "end": 2114140}, {"filename": "/gfx/textures/skybox_tiles/bbh.8.rgba16.png", "start": 2114140, "end": 2115221}, {"filename": "/gfx/textures/skybox_tiles/bbh.9.rgba16.png", "start": 2115221, "end": 2115873}, {"filename": "/gfx/textures/skybox_tiles/ccm.0.rgba16.png", "start": 2115873, "end": 2116585}, {"filename": "/gfx/textures/skybox_tiles/ccm.1.rgba16.png", "start": 2116585, "end": 2117370}, {"filename": "/gfx/textures/skybox_tiles/ccm.10.rgba16.png", "start": 2117370, "end": 2118072}, {"filename": "/gfx/textures/skybox_tiles/ccm.11.rgba16.png", "start": 2118072, "end": 2118882}, {"filename": "/gfx/textures/skybox_tiles/ccm.12.rgba16.png", "start": 2118882, "end": 2119708}, {"filename": "/gfx/textures/skybox_tiles/ccm.13.rgba16.png", "start": 2119708, "end": 2120319}, {"filename": "/gfx/textures/skybox_tiles/ccm.14.rgba16.png", "start": 2120319, "end": 2120897}, {"filename": "/gfx/textures/skybox_tiles/ccm.15.rgba16.png", "start": 2120897, "end": 2121459}, {"filename": "/gfx/textures/skybox_tiles/ccm.16.rgba16.png", "start": 2121459, "end": 2122411}, {"filename": "/gfx/textures/skybox_tiles/ccm.17.rgba16.png", "start": 2122411, "end": 2123406}, {"filename": "/gfx/textures/skybox_tiles/ccm.18.rgba16.png", "start": 2123406, "end": 2124334}, {"filename": "/gfx/textures/skybox_tiles/ccm.19.rgba16.png", "start": 2124334, "end": 2125315}, {"filename": "/gfx/textures/skybox_tiles/ccm.2.rgba16.png", "start": 2125315, "end": 2126041}, {"filename": "/gfx/textures/skybox_tiles/ccm.20.rgba16.png", "start": 2126041, "end": 2127062}, {"filename": "/gfx/textures/skybox_tiles/ccm.21.rgba16.png", "start": 2127062, "end": 2128174}, {"filename": "/gfx/textures/skybox_tiles/ccm.22.rgba16.png", "start": 2128174, "end": 2129211}, {"filename": "/gfx/textures/skybox_tiles/ccm.23.rgba16.png", "start": 2129211, "end": 2130381}, {"filename": "/gfx/textures/skybox_tiles/ccm.24.rgba16.png", "start": 2130381, "end": 2131677}, {"filename": "/gfx/textures/skybox_tiles/ccm.25.rgba16.png", "start": 2131677, "end": 2133120}, {"filename": "/gfx/textures/skybox_tiles/ccm.26.rgba16.png", "start": 2133120, "end": 2134534}, {"filename": "/gfx/textures/skybox_tiles/ccm.27.rgba16.png", "start": 2134534, "end": 2136022}, {"filename": "/gfx/textures/skybox_tiles/ccm.28.rgba16.png", "start": 2136022, "end": 2137333}, {"filename": "/gfx/textures/skybox_tiles/ccm.29.rgba16.png", "start": 2137333, "end": 2138491}, {"filename": "/gfx/textures/skybox_tiles/ccm.3.rgba16.png", "start": 2138491, "end": 2139232}, {"filename": "/gfx/textures/skybox_tiles/ccm.30.rgba16.png", "start": 2139232, "end": 2140424}, {"filename": "/gfx/textures/skybox_tiles/ccm.31.rgba16.png", "start": 2140424, "end": 2141585}, {"filename": "/gfx/textures/skybox_tiles/ccm.32.rgba16.png", "start": 2141585, "end": 2144009}, {"filename": "/gfx/textures/skybox_tiles/ccm.33.rgba16.png", "start": 2144009, "end": 2146236}, {"filename": "/gfx/textures/skybox_tiles/ccm.34.rgba16.png", "start": 2146236, "end": 2148382}, {"filename": "/gfx/textures/skybox_tiles/ccm.35.rgba16.png", "start": 2148382, "end": 2150606}, {"filename": "/gfx/textures/skybox_tiles/ccm.36.rgba16.png", "start": 2150606, "end": 2153003}, {"filename": "/gfx/textures/skybox_tiles/ccm.37.rgba16.png", "start": 2153003, "end": 2155356}, {"filename": "/gfx/textures/skybox_tiles/ccm.38.rgba16.png", "start": 2155356, "end": 2157661}, {"filename": "/gfx/textures/skybox_tiles/ccm.39.rgba16.png", "start": 2157661, "end": 2160016}, {"filename": "/gfx/textures/skybox_tiles/ccm.4.rgba16.png", "start": 2160016, "end": 2160635}, {"filename": "/gfx/textures/skybox_tiles/ccm.40.rgba16.png", "start": 2160635, "end": 2163037}, {"filename": "/gfx/textures/skybox_tiles/ccm.41.rgba16.png", "start": 2163037, "end": 2165521}, {"filename": "/gfx/textures/skybox_tiles/ccm.42.rgba16.png", "start": 2165521, "end": 2167824}, {"filename": "/gfx/textures/skybox_tiles/ccm.43.rgba16.png", "start": 2167824, "end": 2170247}, {"filename": "/gfx/textures/skybox_tiles/ccm.44.rgba16.png", "start": 2170247, "end": 2172613}, {"filename": "/gfx/textures/skybox_tiles/ccm.45.rgba16.png", "start": 2172613, "end": 2174994}, {"filename": "/gfx/textures/skybox_tiles/ccm.46.rgba16.png", "start": 2174994, "end": 2177421}, {"filename": "/gfx/textures/skybox_tiles/ccm.47.rgba16.png", "start": 2177421, "end": 2179832}, {"filename": "/gfx/textures/skybox_tiles/ccm.48.rgba16.png", "start": 2179832, "end": 2182345}, {"filename": "/gfx/textures/skybox_tiles/ccm.49.rgba16.png", "start": 2182345, "end": 2184885}, {"filename": "/gfx/textures/skybox_tiles/ccm.5.rgba16.png", "start": 2184885, "end": 2185615}, {"filename": "/gfx/textures/skybox_tiles/ccm.50.rgba16.png", "start": 2185615, "end": 2188085}, {"filename": "/gfx/textures/skybox_tiles/ccm.51.rgba16.png", "start": 2188085, "end": 2190648}, {"filename": "/gfx/textures/skybox_tiles/ccm.52.rgba16.png", "start": 2190648, "end": 2193237}, {"filename": "/gfx/textures/skybox_tiles/ccm.53.rgba16.png", "start": 2193237, "end": 2195698}, {"filename": "/gfx/textures/skybox_tiles/ccm.54.rgba16.png", "start": 2195698, "end": 2198112}, {"filename": "/gfx/textures/skybox_tiles/ccm.55.rgba16.png", "start": 2198112, "end": 2200627}, {"filename": "/gfx/textures/skybox_tiles/ccm.56.rgba16.png", "start": 2200627, "end": 2203171}, {"filename": "/gfx/textures/skybox_tiles/ccm.57.rgba16.png", "start": 2203171, "end": 2205662}, {"filename": "/gfx/textures/skybox_tiles/ccm.58.rgba16.png", "start": 2205662, "end": 2208020}, {"filename": "/gfx/textures/skybox_tiles/ccm.59.rgba16.png", "start": 2208020, "end": 2210467}, {"filename": "/gfx/textures/skybox_tiles/ccm.6.rgba16.png", "start": 2210467, "end": 2211205}, {"filename": "/gfx/textures/skybox_tiles/ccm.60.rgba16.png", "start": 2211205, "end": 2213862}, {"filename": "/gfx/textures/skybox_tiles/ccm.61.rgba16.png", "start": 2213862, "end": 2216506}, {"filename": "/gfx/textures/skybox_tiles/ccm.62.rgba16.png", "start": 2216506, "end": 2219064}, {"filename": "/gfx/textures/skybox_tiles/ccm.63.rgba16.png", "start": 2219064, "end": 2221629}, {"filename": "/gfx/textures/skybox_tiles/ccm.7.rgba16.png", "start": 2221629, "end": 2222280}, {"filename": "/gfx/textures/skybox_tiles/ccm.8.rgba16.png", "start": 2222280, "end": 2223097}, {"filename": "/gfx/textures/skybox_tiles/ccm.9.rgba16.png", "start": 2223097, "end": 2223906}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.0.rgba16.png", "start": 2223906, "end": 2224086}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.1.rgba16.png", "start": 2224086, "end": 2224262}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.10.rgba16.png", "start": 2224262, "end": 2224676}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.11.rgba16.png", "start": 2224676, "end": 2226091}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.12.rgba16.png", "start": 2226091, "end": 2227145}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.13.rgba16.png", "start": 2227145, "end": 2227507}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.14.rgba16.png", "start": 2227507, "end": 2227708}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.15.rgba16.png", "start": 2227708, "end": 2227844}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.16.rgba16.png", "start": 2227844, "end": 2228032}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.17.rgba16.png", "start": 2228032, "end": 2228226}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.18.rgba16.png", "start": 2228226, "end": 2228587}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.19.rgba16.png", "start": 2228587, "end": 2229498}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.2.rgba16.png", "start": 2229498, "end": 2229712}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.20.rgba16.png", "start": 2229712, "end": 2230437}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.21.rgba16.png", "start": 2230437, "end": 2230700}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.22.rgba16.png", "start": 2230700, "end": 2230915}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.23.rgba16.png", "start": 2230915, "end": 2231077}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.24.rgba16.png", "start": 2231077, "end": 2232239}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.25.rgba16.png", "start": 2232239, "end": 2233135}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.26.rgba16.png", "start": 2233135, "end": 2233917}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.27.rgba16.png", "start": 2233917, "end": 2235384}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.28.rgba16.png", "start": 2235384, "end": 2236547}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.29.rgba16.png", "start": 2236547, "end": 2237101}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.3.rgba16.png", "start": 2237101, "end": 2237661}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.30.rgba16.png", "start": 2237661, "end": 2238552}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.31.rgba16.png", "start": 2238552, "end": 2238926}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.32.rgba16.png", "start": 2238926, "end": 2240696}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.33.rgba16.png", "start": 2240696, "end": 2242445}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.34.rgba16.png", "start": 2242445, "end": 2244097}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.35.rgba16.png", "start": 2244097, "end": 2245885}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.36.rgba16.png", "start": 2245885, "end": 2247741}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.37.rgba16.png", "start": 2247741, "end": 2249519}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.38.rgba16.png", "start": 2249519, "end": 2251320}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.39.rgba16.png", "start": 2251320, "end": 2253117}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.4.rgba16.png", "start": 2253117, "end": 2253612}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.40.rgba16.png", "start": 2253612, "end": 2255536}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.41.rgba16.png", "start": 2255536, "end": 2257527}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.42.rgba16.png", "start": 2257527, "end": 2259348}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.43.rgba16.png", "start": 2259348, "end": 2261282}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.44.rgba16.png", "start": 2261282, "end": 2263061}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.45.rgba16.png", "start": 2263061, "end": 2264781}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.46.rgba16.png", "start": 2264781, "end": 2266614}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.47.rgba16.png", "start": 2266614, "end": 2268428}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.48.rgba16.png", "start": 2268428, "end": 2270120}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.49.rgba16.png", "start": 2270120, "end": 2271905}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.5.rgba16.png", "start": 2271905, "end": 2272135}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.50.rgba16.png", "start": 2272135, "end": 2273960}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.51.rgba16.png", "start": 2273960, "end": 2275794}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.52.rgba16.png", "start": 2275794, "end": 2277466}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.53.rgba16.png", "start": 2277466, "end": 2279162}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.54.rgba16.png", "start": 2279162, "end": 2280863}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.55.rgba16.png", "start": 2280863, "end": 2282229}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.56.rgba16.png", "start": 2282229, "end": 2283773}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.57.rgba16.png", "start": 2283773, "end": 2285672}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.58.rgba16.png", "start": 2285672, "end": 2287471}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.59.rgba16.png", "start": 2287471, "end": 2289118}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.6.rgba16.png", "start": 2289118, "end": 2289312}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.60.rgba16.png", "start": 2289312, "end": 2291064}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.61.rgba16.png", "start": 2291064, "end": 2292867}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.62.rgba16.png", "start": 2292867, "end": 2294708}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.63.rgba16.png", "start": 2294708, "end": 2296323}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.7.rgba16.png", "start": 2296323, "end": 2296465}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.8.rgba16.png", "start": 2296465, "end": 2296607}, {"filename": "/gfx/textures/skybox_tiles/cloud_floor.9.rgba16.png", "start": 2296607, "end": 2296834}, {"filename": "/gfx/textures/skybox_tiles/clouds.0.rgba16.png", "start": 2296834, "end": 2298587}, {"filename": "/gfx/textures/skybox_tiles/clouds.1.rgba16.png", "start": 2298587, "end": 2300239}, {"filename": "/gfx/textures/skybox_tiles/clouds.10.rgba16.png", "start": 2300239, "end": 2302173}, {"filename": "/gfx/textures/skybox_tiles/clouds.11.rgba16.png", "start": 2302173, "end": 2304000}, {"filename": "/gfx/textures/skybox_tiles/clouds.12.rgba16.png", "start": 2304000, "end": 2305925}, {"filename": "/gfx/textures/skybox_tiles/clouds.13.rgba16.png", "start": 2305925, "end": 2307738}, {"filename": "/gfx/textures/skybox_tiles/clouds.14.rgba16.png", "start": 2307738, "end": 2309603}, {"filename": "/gfx/textures/skybox_tiles/clouds.15.rgba16.png", "start": 2309603, "end": 2311515}, {"filename": "/gfx/textures/skybox_tiles/clouds.16.rgba16.png", "start": 2311515, "end": 2313270}, {"filename": "/gfx/textures/skybox_tiles/clouds.17.rgba16.png", "start": 2313270, "end": 2315020}, {"filename": "/gfx/textures/skybox_tiles/clouds.18.rgba16.png", "start": 2315020, "end": 2316723}, {"filename": "/gfx/textures/skybox_tiles/clouds.19.rgba16.png", "start": 2316723, "end": 2318556}, {"filename": "/gfx/textures/skybox_tiles/clouds.2.rgba16.png", "start": 2318556, "end": 2320300}, {"filename": "/gfx/textures/skybox_tiles/clouds.20.rgba16.png", "start": 2320300, "end": 2321940}, {"filename": "/gfx/textures/skybox_tiles/clouds.21.rgba16.png", "start": 2321940, "end": 2323725}, {"filename": "/gfx/textures/skybox_tiles/clouds.22.rgba16.png", "start": 2323725, "end": 2325539}, {"filename": "/gfx/textures/skybox_tiles/clouds.23.rgba16.png", "start": 2325539, "end": 2327175}, {"filename": "/gfx/textures/skybox_tiles/clouds.24.rgba16.png", "start": 2327175, "end": 2328932}, {"filename": "/gfx/textures/skybox_tiles/clouds.25.rgba16.png", "start": 2328932, "end": 2330864}, {"filename": "/gfx/textures/skybox_tiles/clouds.26.rgba16.png", "start": 2330864, "end": 2332839}, {"filename": "/gfx/textures/skybox_tiles/clouds.27.rgba16.png", "start": 2332839, "end": 2334635}, {"filename": "/gfx/textures/skybox_tiles/clouds.28.rgba16.png", "start": 2334635, "end": 2336643}, {"filename": "/gfx/textures/skybox_tiles/clouds.29.rgba16.png", "start": 2336643, "end": 2338675}, {"filename": "/gfx/textures/skybox_tiles/clouds.3.rgba16.png", "start": 2338675, "end": 2340475}, {"filename": "/gfx/textures/skybox_tiles/clouds.30.rgba16.png", "start": 2340475, "end": 2342382}, {"filename": "/gfx/textures/skybox_tiles/clouds.31.rgba16.png", "start": 2342382, "end": 2344297}, {"filename": "/gfx/textures/skybox_tiles/clouds.32.rgba16.png", "start": 2344297, "end": 2345526}, {"filename": "/gfx/textures/skybox_tiles/clouds.33.rgba16.png", "start": 2345526, "end": 2346417}, {"filename": "/gfx/textures/skybox_tiles/clouds.34.rgba16.png", "start": 2346417, "end": 2347506}, {"filename": "/gfx/textures/skybox_tiles/clouds.35.rgba16.png", "start": 2347506, "end": 2348695}, {"filename": "/gfx/textures/skybox_tiles/clouds.36.rgba16.png", "start": 2348695, "end": 2349419}, {"filename": "/gfx/textures/skybox_tiles/clouds.37.rgba16.png", "start": 2349419, "end": 2350209}, {"filename": "/gfx/textures/skybox_tiles/clouds.38.rgba16.png", "start": 2350209, "end": 2350795}, {"filename": "/gfx/textures/skybox_tiles/clouds.39.rgba16.png", "start": 2350795, "end": 2351802}, {"filename": "/gfx/textures/skybox_tiles/clouds.4.rgba16.png", "start": 2351802, "end": 2353768}, {"filename": "/gfx/textures/skybox_tiles/clouds.40.rgba16.png", "start": 2353768, "end": 2353883}, {"filename": "/gfx/textures/skybox_tiles/clouds.5.rgba16.png", "start": 2353883, "end": 2355747}, {"filename": "/gfx/textures/skybox_tiles/clouds.6.rgba16.png", "start": 2355747, "end": 2357379}, {"filename": "/gfx/textures/skybox_tiles/clouds.7.rgba16.png", "start": 2357379, "end": 2359130}, {"filename": "/gfx/textures/skybox_tiles/clouds.8.rgba16.png", "start": 2359130, "end": 2361020}, {"filename": "/gfx/textures/skybox_tiles/clouds.9.rgba16.png", "start": 2361020, "end": 2362853}, {"filename": "/gfx/textures/skybox_tiles/ssl.0.rgba16.png", "start": 2362853, "end": 2363184}, {"filename": "/gfx/textures/skybox_tiles/ssl.1.rgba16.png", "start": 2363184, "end": 2363374}, {"filename": "/gfx/textures/skybox_tiles/ssl.10.rgba16.png", "start": 2363374, "end": 2364607}, {"filename": "/gfx/textures/skybox_tiles/ssl.11.rgba16.png", "start": 2364607, "end": 2365086}, {"filename": "/gfx/textures/skybox_tiles/ssl.12.rgba16.png", "start": 2365086, "end": 2365453}, {"filename": "/gfx/textures/skybox_tiles/ssl.13.rgba16.png", "start": 2365453, "end": 2367035}, {"filename": "/gfx/textures/skybox_tiles/ssl.14.rgba16.png", "start": 2367035, "end": 2368515}, {"filename": "/gfx/textures/skybox_tiles/ssl.15.rgba16.png", "start": 2368515, "end": 2369785}, {"filename": "/gfx/textures/skybox_tiles/ssl.16.rgba16.png", "start": 2369785, "end": 2371700}, {"filename": "/gfx/textures/skybox_tiles/ssl.17.rgba16.png", "start": 2371700, "end": 2373287}, {"filename": "/gfx/textures/skybox_tiles/ssl.18.rgba16.png", "start": 2373287, "end": 2374861}, {"filename": "/gfx/textures/skybox_tiles/ssl.19.rgba16.png", "start": 2374861, "end": 2376256}, {"filename": "/gfx/textures/skybox_tiles/ssl.2.rgba16.png", "start": 2376256, "end": 2376734}, {"filename": "/gfx/textures/skybox_tiles/ssl.20.rgba16.png", "start": 2376734, "end": 2378135}, {"filename": "/gfx/textures/skybox_tiles/ssl.21.rgba16.png", "start": 2378135, "end": 2379818}, {"filename": "/gfx/textures/skybox_tiles/ssl.22.rgba16.png", "start": 2379818, "end": 2381794}, {"filename": "/gfx/textures/skybox_tiles/ssl.23.rgba16.png", "start": 2381794, "end": 2383476}, {"filename": "/gfx/textures/skybox_tiles/ssl.24.rgba16.png", "start": 2383476, "end": 2385137}, {"filename": "/gfx/textures/skybox_tiles/ssl.25.rgba16.png", "start": 2385137, "end": 2386722}, {"filename": "/gfx/textures/skybox_tiles/ssl.26.rgba16.png", "start": 2386722, "end": 2388541}, {"filename": "/gfx/textures/skybox_tiles/ssl.27.rgba16.png", "start": 2388541, "end": 2390055}, {"filename": "/gfx/textures/skybox_tiles/ssl.28.rgba16.png", "start": 2390055, "end": 2391566}, {"filename": "/gfx/textures/skybox_tiles/ssl.29.rgba16.png", "start": 2391566, "end": 2393162}, {"filename": "/gfx/textures/skybox_tiles/ssl.3.rgba16.png", "start": 2393162, "end": 2393392}, {"filename": "/gfx/textures/skybox_tiles/ssl.30.rgba16.png", "start": 2393392, "end": 2395355}, {"filename": "/gfx/textures/skybox_tiles/ssl.31.rgba16.png", "start": 2395355, "end": 2396977}, {"filename": "/gfx/textures/skybox_tiles/ssl.32.rgba16.png", "start": 2396977, "end": 2398483}, {"filename": "/gfx/textures/skybox_tiles/ssl.33.rgba16.png", "start": 2398483, "end": 2400088}, {"filename": "/gfx/textures/skybox_tiles/ssl.34.rgba16.png", "start": 2400088, "end": 2401674}, {"filename": "/gfx/textures/skybox_tiles/ssl.35.rgba16.png", "start": 2401674, "end": 2403367}, {"filename": "/gfx/textures/skybox_tiles/ssl.36.rgba16.png", "start": 2403367, "end": 2404992}, {"filename": "/gfx/textures/skybox_tiles/ssl.37.rgba16.png", "start": 2404992, "end": 2406551}, {"filename": "/gfx/textures/skybox_tiles/ssl.38.rgba16.png", "start": 2406551, "end": 2408306}, {"filename": "/gfx/textures/skybox_tiles/ssl.39.rgba16.png", "start": 2408306, "end": 2409939}, {"filename": "/gfx/textures/skybox_tiles/ssl.4.rgba16.png", "start": 2409939, "end": 2410066}, {"filename": "/gfx/textures/skybox_tiles/ssl.40.rgba16.png", "start": 2410066, "end": 2411046}, {"filename": "/gfx/textures/skybox_tiles/ssl.41.rgba16.png", "start": 2411046, "end": 2411966}, {"filename": "/gfx/textures/skybox_tiles/ssl.42.rgba16.png", "start": 2411966, "end": 2413075}, {"filename": "/gfx/textures/skybox_tiles/ssl.43.rgba16.png", "start": 2413075, "end": 2414178}, {"filename": "/gfx/textures/skybox_tiles/ssl.44.rgba16.png", "start": 2414178, "end": 2415026}, {"filename": "/gfx/textures/skybox_tiles/ssl.45.rgba16.png", "start": 2415026, "end": 2415965}, {"filename": "/gfx/textures/skybox_tiles/ssl.46.rgba16.png", "start": 2415965, "end": 2417016}, {"filename": "/gfx/textures/skybox_tiles/ssl.47.rgba16.png", "start": 2417016, "end": 2418033}, {"filename": "/gfx/textures/skybox_tiles/ssl.48.rgba16.png", "start": 2418033, "end": 2418918}, {"filename": "/gfx/textures/skybox_tiles/ssl.49.rgba16.png", "start": 2418918, "end": 2419990}, {"filename": "/gfx/textures/skybox_tiles/ssl.5.rgba16.png", "start": 2419990, "end": 2420646}, {"filename": "/gfx/textures/skybox_tiles/ssl.50.rgba16.png", "start": 2420646, "end": 2421748}, {"filename": "/gfx/textures/skybox_tiles/ssl.51.rgba16.png", "start": 2421748, "end": 2422599}, {"filename": "/gfx/textures/skybox_tiles/ssl.52.rgba16.png", "start": 2422599, "end": 2423390}, {"filename": "/gfx/textures/skybox_tiles/ssl.53.rgba16.png", "start": 2423390, "end": 2424441}, {"filename": "/gfx/textures/skybox_tiles/ssl.54.rgba16.png", "start": 2424441, "end": 2425490}, {"filename": "/gfx/textures/skybox_tiles/ssl.55.rgba16.png", "start": 2425490, "end": 2426366}, {"filename": "/gfx/textures/skybox_tiles/ssl.56.rgba16.png", "start": 2426366, "end": 2427482}, {"filename": "/gfx/textures/skybox_tiles/ssl.57.rgba16.png", "start": 2427482, "end": 2428603}, {"filename": "/gfx/textures/skybox_tiles/ssl.58.rgba16.png", "start": 2428603, "end": 2429650}, {"filename": "/gfx/textures/skybox_tiles/ssl.59.rgba16.png", "start": 2429650, "end": 2430618}, {"filename": "/gfx/textures/skybox_tiles/ssl.6.rgba16.png", "start": 2430618, "end": 2431729}, {"filename": "/gfx/textures/skybox_tiles/ssl.60.rgba16.png", "start": 2431729, "end": 2432676}, {"filename": "/gfx/textures/skybox_tiles/ssl.61.rgba16.png", "start": 2432676, "end": 2433448}, {"filename": "/gfx/textures/skybox_tiles/ssl.62.rgba16.png", "start": 2433448, "end": 2434422}, {"filename": "/gfx/textures/skybox_tiles/ssl.63.rgba16.png", "start": 2434422, "end": 2435464}, {"filename": "/gfx/textures/skybox_tiles/ssl.7.rgba16.png", "start": 2435464, "end": 2436343}, {"filename": "/gfx/textures/skybox_tiles/ssl.8.rgba16.png", "start": 2436343, "end": 2438012}, {"filename": "/gfx/textures/skybox_tiles/ssl.9.rgba16.png", "start": 2438012, "end": 2438654}, {"filename": "/gfx/textures/skybox_tiles/water.0.rgba16.png", "start": 2438654, "end": 2439537}, {"filename": "/gfx/textures/skybox_tiles/water.1.rgba16.png", "start": 2439537, "end": 2440304}, {"filename": "/gfx/textures/skybox_tiles/water.10.rgba16.png", "start": 2440304, "end": 2441556}, {"filename": "/gfx/textures/skybox_tiles/water.11.rgba16.png", "start": 2441556, "end": 2442781}, {"filename": "/gfx/textures/skybox_tiles/water.12.rgba16.png", "start": 2442781, "end": 2443894}, {"filename": "/gfx/textures/skybox_tiles/water.13.rgba16.png", "start": 2443894, "end": 2444823}, {"filename": "/gfx/textures/skybox_tiles/water.14.rgba16.png", "start": 2444823, "end": 2445875}, {"filename": "/gfx/textures/skybox_tiles/water.15.rgba16.png", "start": 2445875, "end": 2446884}, {"filename": "/gfx/textures/skybox_tiles/water.16.rgba16.png", "start": 2446884, "end": 2448347}, {"filename": "/gfx/textures/skybox_tiles/water.17.rgba16.png", "start": 2448347, "end": 2449663}, {"filename": "/gfx/textures/skybox_tiles/water.18.rgba16.png", "start": 2449663, "end": 2450341}, {"filename": "/gfx/textures/skybox_tiles/water.19.rgba16.png", "start": 2450341, "end": 2451214}, {"filename": "/gfx/textures/skybox_tiles/water.2.rgba16.png", "start": 2451214, "end": 2451413}, {"filename": "/gfx/textures/skybox_tiles/water.20.rgba16.png", "start": 2451413, "end": 2452459}, {"filename": "/gfx/textures/skybox_tiles/water.21.rgba16.png", "start": 2452459, "end": 2453918}, {"filename": "/gfx/textures/skybox_tiles/water.22.rgba16.png", "start": 2453918, "end": 2454881}, {"filename": "/gfx/textures/skybox_tiles/water.23.rgba16.png", "start": 2454881, "end": 2455442}, {"filename": "/gfx/textures/skybox_tiles/water.24.rgba16.png", "start": 2455442, "end": 2456651}, {"filename": "/gfx/textures/skybox_tiles/water.25.rgba16.png", "start": 2456651, "end": 2458128}, {"filename": "/gfx/textures/skybox_tiles/water.26.rgba16.png", "start": 2458128, "end": 2459029}, {"filename": "/gfx/textures/skybox_tiles/water.27.rgba16.png", "start": 2459029, "end": 2460361}, {"filename": "/gfx/textures/skybox_tiles/water.28.rgba16.png", "start": 2460361, "end": 2461498}, {"filename": "/gfx/textures/skybox_tiles/water.29.rgba16.png", "start": 2461498, "end": 2462752}, {"filename": "/gfx/textures/skybox_tiles/water.3.rgba16.png", "start": 2462752, "end": 2463910}, {"filename": "/gfx/textures/skybox_tiles/water.30.rgba16.png", "start": 2463910, "end": 2465125}, {"filename": "/gfx/textures/skybox_tiles/water.31.rgba16.png", "start": 2465125, "end": 2466313}, {"filename": "/gfx/textures/skybox_tiles/water.32.rgba16.png", "start": 2466313, "end": 2467643}, {"filename": "/gfx/textures/skybox_tiles/water.33.rgba16.png", "start": 2467643, "end": 2469033}, {"filename": "/gfx/textures/skybox_tiles/water.34.rgba16.png", "start": 2469033, "end": 2470468}, {"filename": "/gfx/textures/skybox_tiles/water.35.rgba16.png", "start": 2470468, "end": 2471981}, {"filename": "/gfx/textures/skybox_tiles/water.36.rgba16.png", "start": 2471981, "end": 2473368}, {"filename": "/gfx/textures/skybox_tiles/water.37.rgba16.png", "start": 2473368, "end": 2474733}, {"filename": "/gfx/textures/skybox_tiles/water.38.rgba16.png", "start": 2474733, "end": 2476125}, {"filename": "/gfx/textures/skybox_tiles/water.39.rgba16.png", "start": 2476125, "end": 2477440}, {"filename": "/gfx/textures/skybox_tiles/water.4.rgba16.png", "start": 2477440, "end": 2478169}, {"filename": "/gfx/textures/skybox_tiles/water.40.rgba16.png", "start": 2478169, "end": 2479592}, {"filename": "/gfx/textures/skybox_tiles/water.41.rgba16.png", "start": 2479592, "end": 2481015}, {"filename": "/gfx/textures/skybox_tiles/water.42.rgba16.png", "start": 2481015, "end": 2482354}, {"filename": "/gfx/textures/skybox_tiles/water.43.rgba16.png", "start": 2482354, "end": 2483928}, {"filename": "/gfx/textures/skybox_tiles/water.44.rgba16.png", "start": 2483928, "end": 2485405}, {"filename": "/gfx/textures/skybox_tiles/water.45.rgba16.png", "start": 2485405, "end": 2486856}, {"filename": "/gfx/textures/skybox_tiles/water.46.rgba16.png", "start": 2486856, "end": 2488389}, {"filename": "/gfx/textures/skybox_tiles/water.47.rgba16.png", "start": 2488389, "end": 2489914}, {"filename": "/gfx/textures/skybox_tiles/water.48.rgba16.png", "start": 2489914, "end": 2491915}, {"filename": "/gfx/textures/skybox_tiles/water.49.rgba16.png", "start": 2491915, "end": 2494187}, {"filename": "/gfx/textures/skybox_tiles/water.5.rgba16.png", "start": 2494187, "end": 2495169}, {"filename": "/gfx/textures/skybox_tiles/water.50.rgba16.png", "start": 2495169, "end": 2497180}, {"filename": "/gfx/textures/skybox_tiles/water.51.rgba16.png", "start": 2497180, "end": 2498921}, {"filename": "/gfx/textures/skybox_tiles/water.52.rgba16.png", "start": 2498921, "end": 2500757}, {"filename": "/gfx/textures/skybox_tiles/water.53.rgba16.png", "start": 2500757, "end": 2502833}, {"filename": "/gfx/textures/skybox_tiles/water.54.rgba16.png", "start": 2502833, "end": 2504861}, {"filename": "/gfx/textures/skybox_tiles/water.55.rgba16.png", "start": 2504861, "end": 2506789}, {"filename": "/gfx/textures/skybox_tiles/water.56.rgba16.png", "start": 2506789, "end": 2509283}, {"filename": "/gfx/textures/skybox_tiles/water.57.rgba16.png", "start": 2509283, "end": 2511929}, {"filename": "/gfx/textures/skybox_tiles/water.58.rgba16.png", "start": 2511929, "end": 2514336}, {"filename": "/gfx/textures/skybox_tiles/water.59.rgba16.png", "start": 2514336, "end": 2516766}, {"filename": "/gfx/textures/skybox_tiles/water.6.rgba16.png", "start": 2516766, "end": 2517774}, {"filename": "/gfx/textures/skybox_tiles/water.60.rgba16.png", "start": 2517774, "end": 2520065}, {"filename": "/gfx/textures/skybox_tiles/water.61.rgba16.png", "start": 2520065, "end": 2522419}, {"filename": "/gfx/textures/skybox_tiles/water.62.rgba16.png", "start": 2522419, "end": 2524811}, {"filename": "/gfx/textures/skybox_tiles/water.63.rgba16.png", "start": 2524811, "end": 2527314}, {"filename": "/gfx/textures/skybox_tiles/water.7.rgba16.png", "start": 2527314, "end": 2527578}, {"filename": "/gfx/textures/skybox_tiles/water.8.rgba16.png", "start": 2527578, "end": 2529164}, {"filename": "/gfx/textures/skybox_tiles/water.9.rgba16.png", "start": 2529164, "end": 2530692}, {"filename": "/gfx/textures/skybox_tiles/wdw.0.rgba16.png", "start": 2530692, "end": 2531218}, {"filename": "/gfx/textures/skybox_tiles/wdw.1.rgba16.png", "start": 2531218, "end": 2531774}, {"filename": "/gfx/textures/skybox_tiles/wdw.10.rgba16.png", "start": 2531774, "end": 2532590}, {"filename": "/gfx/textures/skybox_tiles/wdw.11.rgba16.png", "start": 2532590, "end": 2534412}, {"filename": "/gfx/textures/skybox_tiles/wdw.12.rgba16.png", "start": 2534412, "end": 2535832}, {"filename": "/gfx/textures/skybox_tiles/wdw.13.rgba16.png", "start": 2535832, "end": 2536461}, {"filename": "/gfx/textures/skybox_tiles/wdw.14.rgba16.png", "start": 2536461, "end": 2537101}, {"filename": "/gfx/textures/skybox_tiles/wdw.15.rgba16.png", "start": 2537101, "end": 2537954}, {"filename": "/gfx/textures/skybox_tiles/wdw.16.rgba16.png", "start": 2537954, "end": 2538635}, {"filename": "/gfx/textures/skybox_tiles/wdw.17.rgba16.png", "start": 2538635, "end": 2539538}, {"filename": "/gfx/textures/skybox_tiles/wdw.18.rgba16.png", "start": 2539538, "end": 2540646}, {"filename": "/gfx/textures/skybox_tiles/wdw.19.rgba16.png", "start": 2540646, "end": 2542717}, {"filename": "/gfx/textures/skybox_tiles/wdw.2.rgba16.png", "start": 2542717, "end": 2543271}, {"filename": "/gfx/textures/skybox_tiles/wdw.20.rgba16.png", "start": 2543271, "end": 2545106}, {"filename": "/gfx/textures/skybox_tiles/wdw.21.rgba16.png", "start": 2545106, "end": 2546269}, {"filename": "/gfx/textures/skybox_tiles/wdw.22.rgba16.png", "start": 2546269, "end": 2547135}, {"filename": "/gfx/textures/skybox_tiles/wdw.23.rgba16.png", "start": 2547135, "end": 2547849}, {"filename": "/gfx/textures/skybox_tiles/wdw.24.rgba16.png", "start": 2547849, "end": 2549321}, {"filename": "/gfx/textures/skybox_tiles/wdw.25.rgba16.png", "start": 2549321, "end": 2550805}, {"filename": "/gfx/textures/skybox_tiles/wdw.26.rgba16.png", "start": 2550805, "end": 2552335}, {"filename": "/gfx/textures/skybox_tiles/wdw.27.rgba16.png", "start": 2552335, "end": 2554542}, {"filename": "/gfx/textures/skybox_tiles/wdw.28.rgba16.png", "start": 2554542, "end": 2556662}, {"filename": "/gfx/textures/skybox_tiles/wdw.29.rgba16.png", "start": 2556662, "end": 2558876}, {"filename": "/gfx/textures/skybox_tiles/wdw.3.rgba16.png", "start": 2558876, "end": 2559709}, {"filename": "/gfx/textures/skybox_tiles/wdw.30.rgba16.png", "start": 2559709, "end": 2561574}, {"filename": "/gfx/textures/skybox_tiles/wdw.31.rgba16.png", "start": 2561574, "end": 2563611}, {"filename": "/gfx/textures/skybox_tiles/wdw.32.rgba16.png", "start": 2563611, "end": 2565915}, {"filename": "/gfx/textures/skybox_tiles/wdw.33.rgba16.png", "start": 2565915, "end": 2568285}, {"filename": "/gfx/textures/skybox_tiles/wdw.34.rgba16.png", "start": 2568285, "end": 2570740}, {"filename": "/gfx/textures/skybox_tiles/wdw.35.rgba16.png", "start": 2570740, "end": 2573428}, {"filename": "/gfx/textures/skybox_tiles/wdw.36.rgba16.png", "start": 2573428, "end": 2576108}, {"filename": "/gfx/textures/skybox_tiles/wdw.37.rgba16.png", "start": 2576108, "end": 2578713}, {"filename": "/gfx/textures/skybox_tiles/wdw.38.rgba16.png", "start": 2578713, "end": 2581323}, {"filename": "/gfx/textures/skybox_tiles/wdw.39.rgba16.png", "start": 2581323, "end": 2583828}, {"filename": "/gfx/textures/skybox_tiles/wdw.4.rgba16.png", "start": 2583828, "end": 2584472}, {"filename": "/gfx/textures/skybox_tiles/wdw.40.rgba16.png", "start": 2584472, "end": 2587140}, {"filename": "/gfx/textures/skybox_tiles/wdw.41.rgba16.png", "start": 2587140, "end": 2589758}, {"filename": "/gfx/textures/skybox_tiles/wdw.42.rgba16.png", "start": 2589758, "end": 2592417}, {"filename": "/gfx/textures/skybox_tiles/wdw.43.rgba16.png", "start": 2592417, "end": 2595223}, {"filename": "/gfx/textures/skybox_tiles/wdw.44.rgba16.png", "start": 2595223, "end": 2597806}, {"filename": "/gfx/textures/skybox_tiles/wdw.45.rgba16.png", "start": 2597806, "end": 2600251}, {"filename": "/gfx/textures/skybox_tiles/wdw.46.rgba16.png", "start": 2600251, "end": 2602861}, {"filename": "/gfx/textures/skybox_tiles/wdw.47.rgba16.png", "start": 2602861, "end": 2605373}, {"filename": "/gfx/textures/skybox_tiles/wdw.48.rgba16.png", "start": 2605373, "end": 2607991}, {"filename": "/gfx/textures/skybox_tiles/wdw.49.rgba16.png", "start": 2607991, "end": 2610576}, {"filename": "/gfx/textures/skybox_tiles/wdw.5.rgba16.png", "start": 2610576, "end": 2611048}, {"filename": "/gfx/textures/skybox_tiles/wdw.50.rgba16.png", "start": 2611048, "end": 2613640}, {"filename": "/gfx/textures/skybox_tiles/wdw.51.rgba16.png", "start": 2613640, "end": 2616206}, {"filename": "/gfx/textures/skybox_tiles/wdw.52.rgba16.png", "start": 2616206, "end": 2618957}, {"filename": "/gfx/textures/skybox_tiles/wdw.53.rgba16.png", "start": 2618957, "end": 2621529}, {"filename": "/gfx/textures/skybox_tiles/wdw.54.rgba16.png", "start": 2621529, "end": 2624193}, {"filename": "/gfx/textures/skybox_tiles/wdw.55.rgba16.png", "start": 2624193, "end": 2626864}, {"filename": "/gfx/textures/skybox_tiles/wdw.56.rgba16.png", "start": 2626864, "end": 2628462}, {"filename": "/gfx/textures/skybox_tiles/wdw.57.rgba16.png", "start": 2628462, "end": 2630052}, {"filename": "/gfx/textures/skybox_tiles/wdw.58.rgba16.png", "start": 2630052, "end": 2631817}, {"filename": "/gfx/textures/skybox_tiles/wdw.59.rgba16.png", "start": 2631817, "end": 2633652}, {"filename": "/gfx/textures/skybox_tiles/wdw.6.rgba16.png", "start": 2633652, "end": 2634211}, {"filename": "/gfx/textures/skybox_tiles/wdw.60.rgba16.png", "start": 2634211, "end": 2635932}, {"filename": "/gfx/textures/skybox_tiles/wdw.61.rgba16.png", "start": 2635932, "end": 2637623}, {"filename": "/gfx/textures/skybox_tiles/wdw.62.rgba16.png", "start": 2637623, "end": 2639203}, {"filename": "/gfx/textures/skybox_tiles/wdw.63.rgba16.png", "start": 2639203, "end": 2640866}, {"filename": "/gfx/textures/skybox_tiles/wdw.7.rgba16.png", "start": 2640866, "end": 2641440}, {"filename": "/gfx/textures/skybox_tiles/wdw.8.rgba16.png", "start": 2641440, "end": 2642223}, {"filename": "/gfx/textures/skybox_tiles/wdw.9.rgba16.png", "start": 2642223, "end": 2642765}, {"filename": "/gfx/textures/skyboxes/bbh.png", "start": 2642765, "end": 2697584}, {"filename": "/gfx/textures/skyboxes/bidw.png", "start": 2697584, "end": 2786169}, {"filename": "/gfx/textures/skyboxes/bitfs.png", "start": 2786169, "end": 2831305}, {"filename": "/gfx/textures/skyboxes/bits.png", "start": 2831305, "end": 2963937}, {"filename": "/gfx/textures/skyboxes/ccm.png", "start": 2963937, "end": 3080726}, {"filename": "/gfx/textures/skyboxes/cloud_floor.png", "start": 3080726, "end": 3156348}, {"filename": "/gfx/textures/skyboxes/clouds.png", "start": 3156348, "end": 3228867}, {"filename": "/gfx/textures/skyboxes/ssl.png", "start": 3228867, "end": 3317250}, {"filename": "/gfx/textures/skyboxes/water.png", "start": 3317250, "end": 3416351}, {"filename": "/gfx/textures/skyboxes/wdw.png", "start": 3416351, "end": 3534820}, {"filename": "/gfx/textures/snow/ccm_textures.00000.rgba16.png", "start": 3534820, "end": 3536943}, {"filename": "/gfx/textures/snow/ccm_textures.00800.rgba16.png", "start": 3536943, "end": 3539888}, {"filename": "/gfx/textures/snow/ccm_textures.01000.rgba16.png", "start": 3539888, "end": 3544623}, {"filename": "/gfx/textures/snow/ccm_textures.02000.rgba16.png", "start": 3544623, "end": 3547783}, {"filename": "/gfx/textures/snow/ccm_textures.02800.rgba16.png", "start": 3547783, "end": 3550041}, {"filename": "/gfx/textures/snow/ccm_textures.03000.rgba16.png", "start": 3550041, "end": 3553302}, {"filename": "/gfx/textures/snow/ccm_textures.03800.rgba16.png", "start": 3553302, "end": 3556118}, {"filename": "/gfx/textures/snow/ccm_textures.04000.rgba16.png", "start": 3556118, "end": 3556336}, {"filename": "/gfx/textures/snow/ccm_textures.04800.rgba16.png", "start": 3556336, "end": 3558798}, {"filename": "/gfx/textures/snow/ccm_textures.05000.rgba16.png", "start": 3558798, "end": 3561489}, {"filename": "/gfx/textures/snow/ccm_textures.05800.rgba16.png", "start": 3561489, "end": 3563026}, {"filename": "/gfx/textures/snow/ccm_textures.06000.rgba16.png", "start": 3563026, "end": 3565430}, {"filename": "/gfx/textures/snow/ccm_textures.06800.rgba16.png", "start": 3565430, "end": 3567071}, {"filename": "/gfx/textures/snow/ccm_textures.07000.rgba16.png", "start": 3567071, "end": 3570936}, {"filename": "/gfx/textures/snow/ccm_textures.08000.rgba16.png", "start": 3570936, "end": 3572782}, {"filename": "/gfx/textures/snow/ccm_textures.08800.rgba16.png", "start": 3572782, "end": 3574226}, {"filename": "/gfx/textures/snow/ccm_textures.09000.ia16.png", "start": 3574226, "end": 3575714}, {"filename": "/gfx/textures/snow/ccm_textures.09800.ia16.png", "start": 3575714, "end": 3576826}, {"filename": "/gfx/textures/spooky/bbh_textures.00000.rgba16.png", "start": 3576826, "end": 3577887}, {"filename": "/gfx/textures/spooky/bbh_textures.00800.rgba16.png", "start": 3577887, "end": 3579675}, {"filename": "/gfx/textures/spooky/bbh_textures.01800.rgba16.png", "start": 3579675, "end": 3583166}, {"filename": "/gfx/textures/spooky/bbh_textures.02800.rgba16.png", "start": 3583166, "end": 3587682}, {"filename": "/gfx/textures/spooky/bbh_textures.03800.rgba16.png", "start": 3587682, "end": 3591610}, {"filename": "/gfx/textures/spooky/bbh_textures.04800.rgba16.png", "start": 3591610, "end": 3593976}, {"filename": "/gfx/textures/spooky/bbh_textures.05000.rgba16.png", "start": 3593976, "end": 3597515}, {"filename": "/gfx/textures/spooky/bbh_textures.06000.rgba16.png", "start": 3597515, "end": 3599901}, {"filename": "/gfx/textures/spooky/bbh_textures.06800.rgba16.png", "start": 3599901, "end": 3601462}, {"filename": "/gfx/textures/spooky/bbh_textures.07000.rgba16.png", "start": 3601462, "end": 3605091}, {"filename": "/gfx/textures/spooky/bbh_textures.08000.rgba16.png", "start": 3605091, "end": 3606712}, {"filename": "/gfx/textures/spooky/bbh_textures.08800.rgba16.png", "start": 3606712, "end": 3608716}, {"filename": "/gfx/textures/spooky/bbh_textures.09000.rgba16.png", "start": 3608716, "end": 3610137}, {"filename": "/gfx/textures/spooky/bbh_textures.0A000.rgba16.png", "start": 3610137, "end": 3613101}, {"filename": "/gfx/textures/spooky/bbh_textures.0A800.ia16.png", "start": 3613101, "end": 3613960}, {"filename": "/gfx/textures/spooky/bbh_textures.0B000.ia16.png", "start": 3613960, "end": 3614072}, {"filename": "/gfx/textures/spooky/bbh_textures.0B800.ia16.png", "start": 3614072, "end": 3615596}, {"filename": "/gfx/textures/title_screen_bg/title_screen_bg.001C0.rgba16.png", "start": 3615596, "end": 3622902}, {"filename": "/gfx/textures/title_screen_bg/title_screen_bg.00E40.rgba16.png", "start": 3622902, "end": 3631707}, {"filename": "/gfx/textures/title_screen_bg/title_screen_bg.01AC0.rgba16.png", "start": 3631707, "end": 3640697}, {"filename": "/gfx/textures/title_screen_bg/title_screen_bg.02740.rgba16.png", "start": 3640697, "end": 3648074}, {"filename": "/gfx/textures/title_screen_bg/title_screen_bg.033C0.rgba16.png", "start": 3648074, "end": 3652744}, {"filename": "/gfx/textures/title_screen_bg/title_screen_bg.04040.rgba16.png", "start": 3652744, "end": 3660432}, {"filename": "/gfx/textures/title_screen_bg/title_screen_bg.04CC0.rgba16.png", "start": 3660432, "end": 3668251}, {"filename": "/gfx/textures/title_screen_bg/title_screen_bg.05940.rgba16.png", "start": 3668251, "end": 3673118}, {"filename": "/gfx/textures/water/jrb_textures.00000.rgba16.png", "start": 3673118, "end": 3674890}, {"filename": "/gfx/textures/water/jrb_textures.00800.rgba16.png", "start": 3674890, "end": 3680141}, {"filename": "/gfx/textures/water/jrb_textures.01800.rgba16.png", "start": 3680141, "end": 3685796}, {"filename": "/gfx/textures/water/jrb_textures.02800.rgba16.png", "start": 3685796, "end": 3689111}, {"filename": "/gfx/textures/water/jrb_textures.03800.rgba16.png", "start": 3689111, "end": 3694386}, {"filename": "/gfx/textures/water/jrb_textures.04800.rgba16.png", "start": 3694386, "end": 3699295}, {"filename": "/gfx/textures/water/jrb_textures.05800.rgba16.png", "start": 3699295, "end": 3702214}, {"filename": "/gfx/textures/water/jrb_textures.06000.rgba16.png", "start": 3702214, "end": 3704409}, {"filename": "/gfx/textures/water/jrb_textures.06800.rgba16.png", "start": 3704409, "end": 3709006}, {"filename": "/gfx/textures/water/jrb_textures.07800.rgba16.png", "start": 3709006, "end": 3711945}, {"filename": "/gfx/textures/water/jrb_textures.08800.rgba16.png", "start": 3711945, "end": 3714961}, {"filename": "/gfx/textures/water/jrb_textures.09000.rgba16.png", "start": 3714961, "end": 3718748}, {"filename": "/gfx/textures/water/jrb_textures.0A000.rgba16.png", "start": 3718748, "end": 3720906}, {"filename": "/gfx/textures/water/jrb_textures.0A800.rgba16.png", "start": 3720906, "end": 3725494}, {"filename": "/gfx/textures/water/jrb_textures.0B800.rgba16.png", "start": 3725494, "end": 3730660}], "remote_package_size": 3730660});

  })();



// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = Object.assign({}, Module);

var arguments_ = [];
var thisProgram = './this.program';
var quit_ = (status, toThrow) => {
  throw toThrow;
};

// Determine the runtime environment we are in. You can customize this by
// setting the ENVIRONMENT setting at compile time (see settings.js).

// Attempt to auto-detect the environment
var ENVIRONMENT_IS_WEB = typeof window == 'object';
var ENVIRONMENT_IS_WORKER = typeof importScripts == 'function';
// N.b. Electron.js environment is simultaneously a NODE-environment, but
// also a web environment.
var ENVIRONMENT_IS_NODE = typeof process == 'object' && typeof process.versions == 'object' && typeof process.versions.node == 'string';
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

// `/` should be present at the end if `scriptDirectory` is not empty
var scriptDirectory = '';
function locateFile(path) {
  if (Module['locateFile']) {
    return Module['locateFile'](path, scriptDirectory);
  }
  return scriptDirectory + path;
}

// Hooks that are implemented differently in different runtime environments.
var read_,
    readAsync,
    readBinary,
    setWindowTitle;

if (ENVIRONMENT_IS_NODE) {

  // `require()` is no-op in an ESM module, use `createRequire()` to construct
  // the require()` function.  This is only necessary for multi-environment
  // builds, `-sENVIRONMENT=node` emits a static import declaration instead.
  // TODO: Swap all `require()`'s with `import()`'s?
  // These modules will usually be used on Node.js. Load them eagerly to avoid
  // the complexity of lazy-loading.
  var fs = require('fs');
  var nodePath = require('path');

  if (ENVIRONMENT_IS_WORKER) {
    scriptDirectory = nodePath.dirname(scriptDirectory) + '/';
  } else {
    scriptDirectory = __dirname + '/';
  }

// include: node_shell_read.js
read_ = (filename, binary) => {
  // We need to re-wrap `file://` strings to URLs. Normalizing isn't
  // necessary in that case, the path should already be absolute.
  filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
  return fs.readFileSync(filename, binary ? undefined : 'utf8');
};

readBinary = (filename) => {
  var ret = read_(filename, true);
  if (!ret.buffer) {
    ret = new Uint8Array(ret);
  }
  return ret;
};

readAsync = (filename, onload, onerror, binary = true) => {
  // See the comment in the `read_` function.
  filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
  fs.readFile(filename, binary ? undefined : 'utf8', (err, data) => {
    if (err) onerror(err);
    else onload(binary ? data.buffer : data);
  });
};

// end include: node_shell_read.js
  if (!Module['thisProgram'] && process.argv.length > 1) {
    thisProgram = process.argv[1].replace(/\\/g, '/');
  }

  arguments_ = process.argv.slice(2);

  if (typeof module != 'undefined') {
    module['exports'] = Module;
  }

  process.on('uncaughtException', (ex) => {
    // suppress ExitStatus exceptions from showing an error
    if (ex !== 'unwind' && !(ex instanceof ExitStatus) && !(ex.context instanceof ExitStatus)) {
      throw ex;
    }
  });

  // Without this older versions of node (< v15) will log unhandled rejections
  // but return 0, which is not normally the desired behaviour.  This is
  // not be needed with node v15 and about because it is now the default
  // behaviour:
  // See https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode
  var nodeMajor = process.versions.node.split(".")[0];
  if (nodeMajor < 15) {
    process.on('unhandledRejection', (reason) => { throw reason; });
  }

  quit_ = (status, toThrow) => {
    process.exitCode = status;
    throw toThrow;
  };

  Module['inspect'] = () => '[Emscripten Module object]';

} else

// Note that this includes Node.js workers when relevant (pthreads is enabled).
// Node.js workers are detected as a combination of ENVIRONMENT_IS_WORKER and
// ENVIRONMENT_IS_NODE.
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  if (ENVIRONMENT_IS_WORKER) { // Check worker, not web, since window could be polyfilled
    scriptDirectory = self.location.href;
  } else if (typeof document != 'undefined' && document.currentScript) { // web
    scriptDirectory = document.currentScript.src;
  }
  // blob urls look like blob:http://site.com/etc/etc and we cannot infer anything from them.
  // otherwise, slice off the final part of the url to find the script directory.
  // if scriptDirectory does not contain a slash, lastIndexOf will return -1,
  // and scriptDirectory will correctly be replaced with an empty string.
  // If scriptDirectory contains a query (starting with ?) or a fragment (starting with #),
  // they are removed because they could contain a slash.
  if (scriptDirectory.indexOf('blob:') !== 0) {
    scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf('/')+1);
  } else {
    scriptDirectory = '';
  }

  // Differentiate the Web Worker from the Node Worker case, as reading must
  // be done differently.
  {
// include: web_or_worker_shell_read.js
read_ = (url) => {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.send(null);
      return xhr.responseText;
  }

  if (ENVIRONMENT_IS_WORKER) {
    readBinary = (url) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.responseType = 'arraybuffer';
        xhr.send(null);
        return new Uint8Array(/** @type{!ArrayBuffer} */(xhr.response));
    };
  }

  readAsync = (url, onload, onerror) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = () => {
      if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
        onload(xhr.response);
        return;
      }
      onerror();
    };
    xhr.onerror = onerror;
    xhr.send(null);
  }

// end include: web_or_worker_shell_read.js
  }

  setWindowTitle = (title) => document.title = title;
} else
{
}

var out = Module['print'] || console.log.bind(console);
var err = Module['printErr'] || console.warn.bind(console);

// Merge back in the overrides
Object.assign(Module, moduleOverrides);
// Free the object hierarchy contained in the overrides, this lets the GC
// reclaim data used e.g. in memoryInitializerRequest, which is a large typed array.
moduleOverrides = null;

// Emit code to handle expected values on the Module object. This applies Module.x
// to the proper local x. This has two benefits: first, we only emit it if it is
// expected to arrive, and second, by using a local everywhere else that can be
// minified.

if (Module['arguments']) arguments_ = Module['arguments'];

if (Module['thisProgram']) thisProgram = Module['thisProgram'];

if (Module['quit']) quit_ = Module['quit'];

// perform assertions in shell.js after we set up out() and err(), as otherwise if an assertion fails it cannot print the message


// end include: shell.js
// include: preamble.js
// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html

var wasmBinary;
if (Module['wasmBinary']) wasmBinary = Module['wasmBinary'];
var noExitRuntime = Module['noExitRuntime'] || true;

if (typeof WebAssembly != 'object') {
  abort('no native wasm support detected');
}

// Wasm globals

var wasmMemory;

//========================================
// Runtime essentials
//========================================

// whether we are quitting the application. no code should run after this.
// set in exit() and abort()
var ABORT = false;

// set by exit() and abort().  Passed to 'onExit' handler.
// NOTE: This is also used as the process return code code in shell environments
// but only when noExitRuntime is false.
var EXITSTATUS;

/** @type {function(*, string=)} */
function assert(condition, text) {
  if (!condition) {
    // This build was created without ASSERTIONS defined.  `assert()` should not
    // ever be called in this configuration but in case there are callers in
    // the wild leave this simple abort() implemenation here for now.
    abort(text);
  }
}

// Memory management

var HEAP,
/** @type {!Int8Array} */
  HEAP8,
/** @type {!Uint8Array} */
  HEAPU8,
/** @type {!Int16Array} */
  HEAP16,
/** @type {!Uint16Array} */
  HEAPU16,
/** @type {!Int32Array} */
  HEAP32,
/** @type {!Uint32Array} */
  HEAPU32,
/** @type {!Float32Array} */
  HEAPF32,
/** @type {!Float64Array} */
  HEAPF64;

function updateMemoryViews() {
  var b = wasmMemory.buffer;
  Module['HEAP8'] = HEAP8 = new Int8Array(b);
  Module['HEAP16'] = HEAP16 = new Int16Array(b);
  Module['HEAP32'] = HEAP32 = new Int32Array(b);
  Module['HEAPU8'] = HEAPU8 = new Uint8Array(b);
  Module['HEAPU16'] = HEAPU16 = new Uint16Array(b);
  Module['HEAPU32'] = HEAPU32 = new Uint32Array(b);
  Module['HEAPF32'] = HEAPF32 = new Float32Array(b);
  Module['HEAPF64'] = HEAPF64 = new Float64Array(b);
}

// include: runtime_init_table.js
// In regular non-RELOCATABLE mode the table is exported
// from the wasm module and this will be assigned once
// the exports are available.
var wasmTable;

// end include: runtime_init_table.js
// include: runtime_stack_check.js
// end include: runtime_stack_check.js
// include: runtime_assertions.js
// end include: runtime_assertions.js
var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the main() is called

var runtimeInitialized = false;

var runtimeKeepaliveCounter = 0;

function keepRuntimeAlive() {
  return noExitRuntime || runtimeKeepaliveCounter > 0;
}

function preRun() {
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
  runtimeInitialized = true;

  
if (!Module["noFSInit"] && !FS.init.initialized)
  FS.init();
FS.ignorePermissions = false;

TTY.init();
  callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
  
  callRuntimeCallbacks(__ATMAIN__);
}

function postRun() {

  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }

  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}

function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}

function addOnExit(cb) {
}

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}

// include: runtime_math.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc

// end include: runtime_math.js
// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// Module.preRun (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled

function getUniqueRunDependency(id) {
  return id;
}

function addRunDependency(id) {
  runDependencies++;

  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }

}

function removeRunDependency(id) {
  runDependencies--;

  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }

  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}

/** @param {string|number=} what */
function abort(what) {
  if (Module['onAbort']) {
    Module['onAbort'](what);
  }

  what = 'Aborted(' + what + ')';
  // TODO(sbc): Should we remove printing and leave it up to whoever
  // catches the exception?
  err(what);

  ABORT = true;
  EXITSTATUS = 1;

  what += '. Build with -sASSERTIONS for more info.';

  // Use a wasm runtime error, because a JS error might be seen as a foreign
  // exception, which means we'd run destructors on it. We need the error to
  // simply make the program stop.
  // FIXME This approach does not work in Wasm EH because it currently does not assume
  // all RuntimeErrors are from traps; it decides whether a RuntimeError is from
  // a trap or not based on a hidden field within the object. So at the moment
  // we don't have a way of throwing a wasm trap from JS. TODO Make a JS API that
  // allows this in the wasm spec.

  // Suppress closure compiler warning here. Closure compiler's builtin extern
  // defintion for WebAssembly.RuntimeError claims it takes no arguments even
  // though it can.
  // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure gets fixed.
  /** @suppress {checkTypes} */
  var e = new WebAssembly.RuntimeError(what);

  // Throw the error whether or not MODULARIZE is set because abort is used
  // in code paths apart from instantiation where an exception is expected
  // to be thrown when abort is called.
  throw e;
}

// include: memoryprofiler.js
// end include: memoryprofiler.js
// include: URIUtils.js
// Prefix of data URIs emitted by SINGLE_FILE and related options.
var dataURIPrefix = 'data:application/octet-stream;base64,';

// Indicates whether filename is a base64 data URI.
function isDataURI(filename) {
  // Prefix of data URIs emitted by SINGLE_FILE and related options.
  return filename.startsWith(dataURIPrefix);
}

// Indicates whether filename is delivered via file protocol (as opposed to http/https)
function isFileURI(filename) {
  return filename.startsWith('file://');
}

// end include: URIUtils.js
// include: runtime_exceptions.js
// end include: runtime_exceptions.js
var wasmBinaryFile;
  wasmBinaryFile = 'sm64.us.wasm';
  if (!isDataURI(wasmBinaryFile)) {
    wasmBinaryFile = locateFile(wasmBinaryFile);
  }

function getBinary(file) {
  try {
    if (file == wasmBinaryFile && wasmBinary) {
      return new Uint8Array(wasmBinary);
    }
    if (readBinary) {
      return readBinary(file);
    }
    throw "both async and sync fetching of the wasm failed";
  }
  catch (err) {
    abort(err);
  }
}

function getBinaryPromise(binaryFile) {
  // If we don't have the binary yet, try to load it asynchronously.
  // Fetch has some additional restrictions over XHR, like it can't be used on a file:// url.
  // See https://github.com/github/fetch/pull/92#issuecomment-140665932
  // Cordova or Electron apps are typically loaded from a file:// url.
  // So use fetch if it is available and the url is not a file, otherwise fall back to XHR.
  if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
    if (typeof fetch == 'function'
      && !isFileURI(binaryFile)
    ) {
      return fetch(binaryFile, { credentials: 'same-origin' }).then((response) => {
        if (!response['ok']) {
          throw "failed to load wasm binary file at '" + binaryFile + "'";
        }
        return response['arrayBuffer']();
      }).catch(() => getBinary(binaryFile));
    }
    else {
      if (readAsync) {
        // fetch is not available or url is file => try XHR (readAsync uses XHR internally)
        return new Promise((resolve, reject) => {
          readAsync(binaryFile, (response) => resolve(new Uint8Array(/** @type{!ArrayBuffer} */(response))), reject)
        });
      }
    }
  }

  // Otherwise, getBinary should be able to get it synchronously
  return Promise.resolve().then(() => getBinary(binaryFile));
}

function instantiateArrayBuffer(binaryFile, imports, receiver) {
  return getBinaryPromise(binaryFile).then((binary) => {
    return WebAssembly.instantiate(binary, imports);
  }).then((instance) => {
    return instance;
  }).then(receiver, (reason) => {
    err('failed to asynchronously prepare wasm: ' + reason);

    abort(reason);
  });
}

function instantiateAsync(binary, binaryFile, imports, callback) {
  if (!binary &&
      typeof WebAssembly.instantiateStreaming == 'function' &&
      !isDataURI(binaryFile) &&
      // Don't use streaming for file:// delivered objects in a webview, fetch them synchronously.
      !isFileURI(binaryFile) &&
      // Avoid instantiateStreaming() on Node.js environment for now, as while
      // Node.js v18.1.0 implements it, it does not have a full fetch()
      // implementation yet.
      //
      // Reference:
      //   https://github.com/emscripten-core/emscripten/pull/16917
      !ENVIRONMENT_IS_NODE &&
      typeof fetch == 'function') {
    return fetch(binaryFile, { credentials: 'same-origin' }).then((response) => {
      // Suppress closure warning here since the upstream definition for
      // instantiateStreaming only allows Promise<Repsponse> rather than
      // an actual Response.
      // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure is fixed.
      /** @suppress {checkTypes} */
      var result = WebAssembly.instantiateStreaming(response, imports);

      return result.then(
        callback,
        function(reason) {
          // We expect the most common failure cause to be a bad MIME type for the binary,
          // in which case falling back to ArrayBuffer instantiation should work.
          err('wasm streaming compile failed: ' + reason);
          err('falling back to ArrayBuffer instantiation');
          return instantiateArrayBuffer(binaryFile, imports, callback);
        });
    });
  } else {
    return instantiateArrayBuffer(binaryFile, imports, callback);
  }
}

// Create the wasm instance.
// Receives the wasm imports, returns the exports.
function createWasm() {
  // prepare imports
  var info = {
    'env': wasmImports,
    'wasi_snapshot_preview1': wasmImports,
  };
  // Load the wasm module and create an instance of using native support in the JS engine.
  // handle a generated wasm instance, receiving its exports and
  // performing other necessary setup
  /** @param {WebAssembly.Module=} module*/
  function receiveInstance(instance, module) {
    var exports = instance.exports;

    Module['asm'] = exports;

    wasmMemory = Module['asm']['memory'];
    updateMemoryViews();

    wasmTable = Module['asm']['__indirect_function_table'];

    addOnInit(Module['asm']['__wasm_call_ctors']);

    removeRunDependency('wasm-instantiate');

    return exports;
  }
  // wait for the pthread pool (if any)
  addRunDependency('wasm-instantiate');

  // Prefer streaming instantiation if available.
  function receiveInstantiationResult(result) {
    // 'result' is a ResultObject object which has both the module and instance.
    // receiveInstance() will swap in the exports (to Module.asm) so they can be called
    // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193, the above line no longer optimizes out down to the following line.
    // When the regression is fixed, can restore the above PTHREADS-enabled path.
    receiveInstance(result['instance']);
  }

  // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
  // to manually instantiate the Wasm module themselves. This allows pages to
  // run the instantiation parallel to any other async startup actions they are
  // performing.
  // Also pthreads and wasm workers initialize the wasm instance through this
  // path.
  if (Module['instantiateWasm']) {

    try {
      return Module['instantiateWasm'](info, receiveInstance);
    } catch(e) {
      err('Module.instantiateWasm callback failed with error: ' + e);
        return false;
    }
  }

  instantiateAsync(wasmBinary, wasmBinaryFile, info, receiveInstantiationResult);
  return {}; // no exports yet; we'll fill them in later
}

// Globals used by JS i64 conversions (see makeSetValue)
var tempDouble;
var tempI64;

// include: runtime_debug.js
// end include: runtime_debug.js
// === Body ===

var ASM_CONSTS = {
  7811776: () => { console.error('[gfx_web] emscripten_webgl_create_context failed'); },  
 7811847: () => { console.error('[gfx_web] emscripten_webgl_make_context_current failed'); },  
 7811924: () => { var g = Module['canvas'] && Module['canvas'].getContext('webgl'); if (g) { console.log('[gfx_web] gl OK: ' + g.getParameter(g.VERSION)); console.log('[gfx_web] renderer: ' + g.getParameter(g.RENDERER)); console.log('[gfx_web] GLSL: ' + g.getParameter(g.SHADING_LANGUAGE_VERSION)); Module['webGLContext'] = g; } },  
 7812239: () => { var c = Module['canvas']; if (c) { c.setAttribute('tabindex', '0'); c.style.outline = 'none'; c.focus(); } window.addEventListener('mousedown', function () { if (Module['canvas']) Module['canvas'].focus(); }); },  
 7812453: ($0) => { var c = Module['canvas']; var base = $0 >> 2; if (c) { HEAP32[base] = c.width; HEAP32[base + 1] = c.height; } else { HEAP32[base] = 0; HEAP32[base + 1] = 0; } },  
 7812616: ($0, $1) => { var c = Module['canvas']; if (c) { c.width = $0; c.height = $1; } },  
 7812686: () => { var c = Module['canvas']; if (c && c.requestFullscreen) { var p = c.requestFullscreen(); if (p && p.catch) p.catch(function (e) { console.warn('fullscreen: ' + e); }); } },  
 7812860: () => { if (document.fullscreenElement && document.exitFullscreen) { var p = document.exitFullscreen(); if (p && p.catch) p.catch(function (e) {}); } },  
 7813006: ($0) => { var r = document.fullscreenElement ? 1 : 0; setValue($0, r, 'i32'); },  
 7813078: ($0) => { if (Module['onWebStage']) Module['onWebStage']($0); },  
 7813134: ($0) => { Module['webFrameCount'] = $0; if (Module['onWebFrame']) Module['onWebFrame']($0); },  
 7813220: ($0) => { var s = localStorage.sm64_save_file; if (s && s.length === 684) { try { var binary = atob(s); if (binary.length === 512) { for (var i = 0; i < 512; i++) { HEAPU8[$0 + i] = binary.charCodeAt(i); } return 1; } } catch (e) { } } return 0; },  
 7813460: ($0) => { var str = ""; for (var i = 0; i < 512; i++) { str += String.fromCharCode(HEAPU8[$0 + i]); } localStorage.sm64_save_file = btoa(str); }
};
function web_audio_init(sample_rate,queue_ptr,cap_frames) { var A = Module.sm64Audio; if (!A) { A = Module.sm64Audio = { queue: queue_ptr, cap: cap_frames, head: 0 }; } if (typeof AudioContext === 'undefined' && typeof webkitAudioContext === 'undefined') { console.warn('Web Audio unavailable; running without sound.'); return; } var Ctx = window.AudioContext || window.webkitAudioContext; if (!A.ctx) { A.ctx = new Ctx({ sampleRate: sample_rate }); } if (!A.node) { var node = A.ctx.createScriptProcessor(2048, 2, 2); node.onaudioprocess = function (e) { var out = e.outputBuffer; var left = out.getChannelData(0); var right = out.getChannelData(1); var n = left.length; for (var i = 0; i < n; i++) { left[i] = 0; right[i] = 0; } var avail = Module['_sm64_audio_available'](n); if (avail <= 0) return; var HEAP = HEAP16; var base = A.queue >> 1; var head = A.head | 0; for (var i = 0; i < avail; i++) { var idx = base + head * 2; left[i] = HEAP[idx] / 32768.0; right[i] = HEAP[idx + 1] / 32768.0; head = (head + 1) % A.cap; } A.head = head; Module['_sm64_audio_consumed'](avail); }; node.connect(A.ctx.destination); A.node = node; } if (A.ctx.state === 'suspended') { A.ctx.resume().catch(function (err) { console.warn(err); }); } }
function web_audio_resume() { var A = Module.sm64Audio; if (A && A.ctx && A.ctx.state === 'suspended') { A.ctx.resume().catch(function (err) {}); } }



// end include: preamble.js

  /** @constructor */
  function ExitStatus(status) {
      this.name = 'ExitStatus';
      this.message = 'Program terminated with exit(' + status + ')';
      this.status = status;
    }

  function callRuntimeCallbacks(callbacks) {
      while (callbacks.length > 0) {
        // Pass the module as the first argument.
        callbacks.shift()(Module);
      }
    }

  
    /**
     * @param {number} ptr
     * @param {string} type
     */
  function getValue(ptr, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': return HEAP8[((ptr)>>0)];
      case 'i8': return HEAP8[((ptr)>>0)];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP32[((ptr)>>2)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      case '*': return HEAPU32[((ptr)>>2)];
      default: abort('invalid type for getValue: ' + type);
    }
  }

  
    /**
     * @param {number} ptr
     * @param {number} value
     * @param {string} type
     */
  function setValue(ptr, value, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': HEAP8[((ptr)>>0)] = value; break;
      case 'i8': HEAP8[((ptr)>>0)] = value; break;
      case 'i16': HEAP16[((ptr)>>1)] = value; break;
      case 'i32': HEAP32[((ptr)>>2)] = value; break;
      case 'i64': (tempI64 = [value>>>0,(tempDouble=value,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[((ptr)>>2)] = tempI64[0],HEAP32[(((ptr)+(4))>>2)] = tempI64[1]); break;
      case 'float': HEAPF32[((ptr)>>2)] = value; break;
      case 'double': HEAPF64[((ptr)>>3)] = value; break;
      case '*': HEAPU32[((ptr)>>2)] = value; break;
      default: abort('invalid type for setValue: ' + type);
    }
  }

  var UTF8Decoder = typeof TextDecoder != 'undefined' ? new TextDecoder('utf8') : undefined;
  
    /**
     * Given a pointer 'idx' to a null-terminated UTF8-encoded string in the given
     * array that contains uint8 values, returns a copy of that string as a
     * Javascript String object.
     * heapOrArray is either a regular array, or a JavaScript typed array view.
     * @param {number} idx
     * @param {number=} maxBytesToRead
     * @return {string}
     */
  function UTF8ArrayToString(heapOrArray, idx, maxBytesToRead) {
      var endIdx = idx + maxBytesToRead;
      var endPtr = idx;
      // TextDecoder needs to know the byte length in advance, it doesn't stop on
      // null terminator by itself.  Also, use the length info to avoid running tiny
      // strings through TextDecoder, since .subarray() allocates garbage.
      // (As a tiny code save trick, compare endPtr against endIdx using a negation,
      // so that undefined means Infinity)
      while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
  
      if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
        return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
      }
      var str = '';
      // If building with TextDecoder, we have already computed the string length
      // above, so test loop end condition against that
      while (idx < endPtr) {
        // For UTF8 byte structure, see:
        // http://en.wikipedia.org/wiki/UTF-8#Description
        // https://www.ietf.org/rfc/rfc2279.txt
        // https://tools.ietf.org/html/rfc3629
        var u0 = heapOrArray[idx++];
        if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
        var u1 = heapOrArray[idx++] & 63;
        if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
        var u2 = heapOrArray[idx++] & 63;
        if ((u0 & 0xF0) == 0xE0) {
          u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
        } else {
          u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heapOrArray[idx++] & 63);
        }
  
        if (u0 < 0x10000) {
          str += String.fromCharCode(u0);
        } else {
          var ch = u0 - 0x10000;
          str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
        }
      }
      return str;
    }
  
  
    /**
     * Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the
     * emscripten HEAP, returns a copy of that string as a Javascript String object.
     *
     * @param {number} ptr
     * @param {number=} maxBytesToRead - An optional length that specifies the
     *   maximum number of bytes to read. You can omit this parameter to scan the
     *   string until the first 0 byte. If maxBytesToRead is passed, and the string
     *   at [ptr, ptr+maxBytesToReadr[ contains a null byte in the middle, then the
     *   string will cut short at that byte index (i.e. maxBytesToRead will not
     *   produce a string of exact length [ptr, ptr+maxBytesToRead[) N.B. mixing
     *   frequent uses of UTF8ToString() with and without maxBytesToRead may throw
     *   JS JIT optimizations off, so it is worth to consider consistently using one
     * @return {string}
     */
  function UTF8ToString(ptr, maxBytesToRead) {
      return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : '';
    }
  function ___assert_fail(condition, filename, line, func) {
      abort(`Assertion failed: ${UTF8ToString(condition)}, at: ` + [filename ? UTF8ToString(filename) : 'unknown filename', line, func ? UTF8ToString(func) : 'unknown function']);
    }

  function setErrNo(value) {
      HEAP32[((___errno_location())>>2)] = value;
      return value;
    }
  
  var PATH = {isAbs:(path) => path.charAt(0) === '/',splitPath:(filename) => {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },normalizeArray:(parts, allowAboveRoot) => {
        // if the path tries to go above the root, `up` ends up > 0
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        // if the path is allowed to go above the root, restore leading ..s
        if (allowAboveRoot) {
          for (; up; up--) {
            parts.unshift('..');
          }
        }
        return parts;
      },normalize:(path) => {
        var isAbsolute = PATH.isAbs(path),
            trailingSlash = path.substr(-1) === '/';
        // Normalize the path
        path = PATH.normalizeArray(path.split('/').filter((p) => !!p), !isAbsolute).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      },dirname:(path) => {
        var result = PATH.splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
          // No dirname whatsoever
          return '.';
        }
        if (dir) {
          // It has a dirname, strip trailing slash
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      },basename:(path) => {
        // EMSCRIPTEN return '/'' for '/', not an empty string
        if (path === '/') return '/';
        path = PATH.normalize(path);
        path = path.replace(/\/$/, "");
        var lastSlash = path.lastIndexOf('/');
        if (lastSlash === -1) return path;
        return path.substr(lastSlash+1);
      },join:function() {
        var paths = Array.prototype.slice.call(arguments);
        return PATH.normalize(paths.join('/'));
      },join2:(l, r) => {
        return PATH.normalize(l + '/' + r);
      }};
  
  function initRandomFill() {
      if (typeof crypto == 'object' && typeof crypto['getRandomValues'] == 'function') {
        // for modern web browsers
        return (view) => crypto.getRandomValues(view);
      } else
      if (ENVIRONMENT_IS_NODE) {
        // for nodejs with or without crypto support included
        try {
          var crypto_module = require('crypto');
          var randomFillSync = crypto_module['randomFillSync'];
          if (randomFillSync) {
            // nodejs with LTS crypto support
            return (view) => crypto_module['randomFillSync'](view);
          }
          // very old nodejs with the original crypto API
          var randomBytes = crypto_module['randomBytes'];
          return (view) => (
            view.set(randomBytes(view.byteLength)),
            // Return the original view to match modern native implementations.
            view
          );
        } catch (e) {
          // nodejs doesn't have crypto support
        }
      }
      // we couldn't find a proper implementation, as Math.random() is not suitable for /dev/random, see emscripten-core/emscripten/pull/7096
      abort("initRandomDevice");
    }
  function randomFill(view) {
      // Lazily init on the first invocation.
      return (randomFill = initRandomFill())(view);
    }
  
  
  
  var PATH_FS = {resolve:function() {
        var resolvedPath = '',
          resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = (i >= 0) ? arguments[i] : FS.cwd();
          // Skip empty and invalid entries
          if (typeof path != 'string') {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            return ''; // an invalid portion invalidates the whole thing
          }
          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = PATH.isAbs(path);
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        resolvedPath = PATH.normalizeArray(resolvedPath.split('/').filter((p) => !!p), !resolvedAbsolute).join('/');
        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
      },relative:(from, to) => {
        from = PATH_FS.resolve(from).substr(1);
        to = PATH_FS.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== '') break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== '') break;
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split('/'));
        var toParts = trim(to.split('/'));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..');
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join('/');
      }};
  
  
  function lengthBytesUTF8(str) {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
        // unit, not a Unicode code point of the character! So decode
        // UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        var c = str.charCodeAt(i); // possibly a lead surrogate
        if (c <= 0x7F) {
          len++;
        } else if (c <= 0x7FF) {
          len += 2;
        } else if (c >= 0xD800 && c <= 0xDFFF) {
          len += 4; ++i;
        } else {
          len += 3;
        }
      }
      return len;
    }
  
  function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
      // Parameter maxBytesToWrite is not optional. Negative values, 0, null,
      // undefined and false each don't write out any bytes.
      if (!(maxBytesToWrite > 0))
        return 0;
  
      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
        // unit, not a Unicode code point of the character! So decode
        // UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description
        // and https://www.ietf.org/rfc/rfc2279.txt
        // and https://tools.ietf.org/html/rfc3629
        var u = str.charCodeAt(i); // possibly a lead surrogate
        if (u >= 0xD800 && u <= 0xDFFF) {
          var u1 = str.charCodeAt(++i);
          u = 0x10000 + ((u & 0x3FF) << 10) | (u1 & 0x3FF);
        }
        if (u <= 0x7F) {
          if (outIdx >= endIdx) break;
          heap[outIdx++] = u;
        } else if (u <= 0x7FF) {
          if (outIdx + 1 >= endIdx) break;
          heap[outIdx++] = 0xC0 | (u >> 6);
          heap[outIdx++] = 0x80 | (u & 63);
        } else if (u <= 0xFFFF) {
          if (outIdx + 2 >= endIdx) break;
          heap[outIdx++] = 0xE0 | (u >> 12);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
        } else {
          if (outIdx + 3 >= endIdx) break;
          heap[outIdx++] = 0xF0 | (u >> 18);
          heap[outIdx++] = 0x80 | ((u >> 12) & 63);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
        }
      }
      // Null-terminate the pointer to the buffer.
      heap[outIdx] = 0;
      return outIdx - startIdx;
    }
  /** @type {function(string, boolean=, number=)} */
  function intArrayFromString(stringy, dontAddNull, length) {
    var len = length > 0 ? length : lengthBytesUTF8(stringy)+1;
    var u8array = new Array(len);
    var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
    if (dontAddNull) u8array.length = numBytesWritten;
    return u8array;
  }
  
  var TTY = {ttys:[],init:function () {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
        //   // device, it always assumes it's a TTY device. because of this, we're forcing
        //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
        //   // with text files until FS.init can be refactored.
        //   process.stdin.setEncoding('utf8');
        // }
      },shutdown:function() {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
        //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
        //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
        //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
        //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
        //   process.stdin.pause();
        // }
      },register:function(dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },stream_ops:{open:function(stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(43);
          }
          stream.tty = tty;
          stream.seekable = false;
        },close:function(stream) {
          // flush any pending line data
          stream.tty.ops.fsync(stream.tty);
        },fsync:function(stream) {
          stream.tty.ops.fsync(stream.tty);
        },read:function(stream, buffer, offset, length, pos /* ignored */) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(60);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(6);
            }
            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset+i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },write:function(stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(60);
          }
          try {
            for (var i = 0; i < length; i++) {
              stream.tty.ops.put_char(stream.tty, buffer[offset+i]);
            }
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        }},default_tty_ops:{get_char:function(tty) {
          if (!tty.input.length) {
            var result = null;
            if (ENVIRONMENT_IS_NODE) {
              // we will read data by chunks of BUFSIZE
              var BUFSIZE = 256;
              var buf = Buffer.alloc(BUFSIZE);
              var bytesRead = 0;
  
              try {
                bytesRead = fs.readSync(process.stdin.fd, buf, 0, BUFSIZE, -1);
              } catch(e) {
                // Cross-platform differences: on Windows, reading EOF throws an exception, but on other OSes,
                // reading EOF returns 0. Uniformize behavior by treating the EOF exception to return 0.
                if (e.toString().includes('EOF')) bytesRead = 0;
                else throw e;
              }
  
              if (bytesRead > 0) {
                result = buf.slice(0, bytesRead).toString('utf-8');
              } else {
                result = null;
              }
            } else
            if (typeof window != 'undefined' &&
              typeof window.prompt == 'function') {
              // Browser.
              result = window.prompt('Input: ');  // returns null on cancel
              if (result !== null) {
                result += '\n';
              }
            } else if (typeof readline == 'function') {
              // Command line.
              result = readline();
              if (result !== null) {
                result += '\n';
              }
            }
            if (!result) {
              return null;
            }
            tty.input = intArrayFromString(result, true);
          }
          return tty.input.shift();
        },put_char:function(tty, val) {
          if (val === null || val === 10) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val); // val == 0 would cut text output off in the middle.
          }
        },fsync:function(tty) {
          if (tty.output && tty.output.length > 0) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        }},default_tty1_ops:{put_char:function(tty, val) {
          if (val === null || val === 10) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        },fsync:function(tty) {
          if (tty.output && tty.output.length > 0) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        }}};
  
  
  function zeroMemory(address, size) {
      HEAPU8.fill(0, address, address + size);
      return address;
    }
  
  function alignMemory(size, alignment) {
      return Math.ceil(size / alignment) * alignment;
    }
  function mmapAlloc(size) {
      abort();
    }
  var MEMFS = {ops_table:null,mount:function(mount) {
        return MEMFS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
      },createNode:function(parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          // no supported
          throw new FS.ErrnoError(63);
        }
        if (!MEMFS.ops_table) {
          MEMFS.ops_table = {
            dir: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                lookup: MEMFS.node_ops.lookup,
                mknod: MEMFS.node_ops.mknod,
                rename: MEMFS.node_ops.rename,
                unlink: MEMFS.node_ops.unlink,
                rmdir: MEMFS.node_ops.rmdir,
                readdir: MEMFS.node_ops.readdir,
                symlink: MEMFS.node_ops.symlink
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek
              }
            },
            file: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek,
                read: MEMFS.stream_ops.read,
                write: MEMFS.stream_ops.write,
                allocate: MEMFS.stream_ops.allocate,
                mmap: MEMFS.stream_ops.mmap,
                msync: MEMFS.stream_ops.msync
              }
            },
            link: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                readlink: MEMFS.node_ops.readlink
              },
              stream: {}
            },
            chrdev: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: FS.chrdev_stream_ops
            }
          };
        }
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.usedBytes = 0; // The actual number of bytes used in the typed array, as opposed to contents.length which gives the whole capacity.
          // When the byte data of the file is populated, this will point to either a typed array, or a normal JS array. Typed arrays are preferred
          // for performance, and used by default. However, typed arrays are not resizable like normal JS arrays are, so there is a small disk size
          // penalty involved for appending file writes that continuously grow a file similar to std::vector capacity vs used -scheme.
          node.contents = null; 
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        // add the new node to the parent
        if (parent) {
          parent.contents[name] = node;
          parent.timestamp = node.timestamp;
        }
        return node;
      },getFileDataAsTypedArray:function(node) {
        if (!node.contents) return new Uint8Array(0);
        if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes); // Make sure to not return excess unused bytes.
        return new Uint8Array(node.contents);
      },expandFileStorage:function(node, newCapacity) {
        var prevCapacity = node.contents ? node.contents.length : 0;
        if (prevCapacity >= newCapacity) return; // No need to expand, the storage was already large enough.
        // Don't expand strictly to the given requested limit if it's only a very small increase, but instead geometrically grow capacity.
        // For small filesizes (<1MB), perform size*2 geometric increase, but for large sizes, do a much more conservative size*1.125 increase to
        // avoid overshooting the allocation cap by a very large margin.
        var CAPACITY_DOUBLING_MAX = 1024 * 1024;
        newCapacity = Math.max(newCapacity, (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2.0 : 1.125)) >>> 0);
        if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256); // At minimum allocate 256b for each file when expanding.
        var oldContents = node.contents;
        node.contents = new Uint8Array(newCapacity); // Allocate new storage.
        if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0); // Copy old data over to the new storage.
      },resizeFileStorage:function(node, newSize) {
        if (node.usedBytes == newSize) return;
        if (newSize == 0) {
          node.contents = null; // Fully decommit when requesting a resize to zero.
          node.usedBytes = 0;
        } else {
          var oldContents = node.contents;
          node.contents = new Uint8Array(newSize); // Allocate new storage.
          if (oldContents) {
            node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes))); // Copy old data over to the new storage.
          }
          node.usedBytes = newSize;
        }
      },node_ops:{getattr:function(node) {
          var attr = {};
          // device numbers reuse inode numbers.
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.usedBytes;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp);
          // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
          //       but this is not required by the standard.
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },setattr:function(node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== undefined) {
            MEMFS.resizeFileStorage(node, attr.size);
          }
        },lookup:function(parent, name) {
          throw FS.genericErrors[44];
        },mknod:function(parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },rename:function(old_node, new_dir, new_name) {
          // if we're overwriting a directory at new_name, make sure it's empty.
          if (FS.isDir(old_node.mode)) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {
            }
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(55);
              }
            }
          }
          // do the internal rewiring
          delete old_node.parent.contents[old_node.name];
          old_node.parent.timestamp = Date.now()
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          new_dir.timestamp = old_node.parent.timestamp;
          old_node.parent = new_dir;
        },unlink:function(parent, name) {
          delete parent.contents[name];
          parent.timestamp = Date.now();
        },rmdir:function(parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(55);
          }
          delete parent.contents[name];
          parent.timestamp = Date.now();
        },readdir:function(node) {
          var entries = ['.', '..'];
          for (var key in node.contents) {
            if (!node.contents.hasOwnProperty(key)) {
              continue;
            }
            entries.push(key);
          }
          return entries;
        },symlink:function(parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511 /* 0777 */ | 40960, 0);
          node.link = oldpath;
          return node;
        },readlink:function(node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(28);
          }
          return node.link;
        }},stream_ops:{read:function(stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= stream.node.usedBytes) return 0;
          var size = Math.min(stream.node.usedBytes - position, length);
          if (size > 8 && contents.subarray) { // non-trivial, and typed array
            buffer.set(contents.subarray(position, position + size), offset);
          } else {
            for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
          }
          return size;
        },write:function(stream, buffer, offset, length, position, canOwn) {
          // If the buffer is located in main memory (HEAP), and if
          // memory can grow, we can't hold on to references of the
          // memory buffer, as they may get invalidated. That means we
          // need to do copy its contents.
          if (buffer.buffer === HEAP8.buffer) {
            canOwn = false;
          }
  
          if (!length) return 0;
          var node = stream.node;
          node.timestamp = Date.now();
  
          if (buffer.subarray && (!node.contents || node.contents.subarray)) { // This write is from a typed array to a typed array?
            if (canOwn) {
              node.contents = buffer.subarray(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (node.usedBytes === 0 && position === 0) { // If this is a simple first write to an empty file, do a fast set since we don't need to care about old data.
              node.contents = buffer.slice(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (position + length <= node.usedBytes) { // Writing to an already allocated and used subrange of the file?
              node.contents.set(buffer.subarray(offset, offset + length), position);
              return length;
            }
          }
  
          // Appending to an existing file and we need to reallocate, or source data did not come as a typed array.
          MEMFS.expandFileStorage(node, position+length);
          if (node.contents.subarray && buffer.subarray) {
            // Use typed array write which is available.
            node.contents.set(buffer.subarray(offset, offset + length), position);
          } else {
            for (var i = 0; i < length; i++) {
             node.contents[position + i] = buffer[offset + i]; // Or fall back to manual write if not.
            }
          }
          node.usedBytes = Math.max(node.usedBytes, position + length);
          return length;
        },llseek:function(stream, offset, whence) {
          var position = offset;
          if (whence === 1) {
            position += stream.position;
          } else if (whence === 2) {
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.usedBytes;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(28);
          }
          return position;
        },allocate:function(stream, offset, length) {
          MEMFS.expandFileStorage(stream.node, offset + length);
          stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
        },mmap:function(stream, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          // Only make a new copy when MAP_PRIVATE is specified.
          if (!(flags & 2) && contents.buffer === HEAP8.buffer) {
            // We can't emulate MAP_SHARED when the file is not backed by the
            // buffer we're mapping to (e.g. the HEAP buffer).
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            // Try to avoid unnecessary slices.
            if (position > 0 || position + length < contents.length) {
              if (contents.subarray) {
                contents = contents.subarray(position, position + length);
              } else {
                contents = Array.prototype.slice.call(contents, position, position + length);
              }
            }
            allocated = true;
            ptr = mmapAlloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(48);
            }
            HEAP8.set(contents, ptr);
          }
          return { ptr: ptr, allocated: allocated };
        },msync:function(stream, buffer, offset, length, mmapFlags) {
          MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
          // should we check if bytesWritten and length are the same?
          return 0;
        }}};
  
  /** @param {boolean=} noRunDep */
  function asyncLoad(url, onload, onerror, noRunDep) {
      var dep = !noRunDep ? getUniqueRunDependency('al ' + url) : '';
      readAsync(url, (arrayBuffer) => {
        assert(arrayBuffer, `Loading data file "${url}" failed (no arrayBuffer).`);
        onload(new Uint8Array(arrayBuffer));
        if (dep) removeRunDependency(dep);
      }, (event) => {
        if (onerror) {
          onerror();
        } else {
          throw `Loading data file "${url}" failed.`;
        }
      });
      if (dep) addRunDependency(dep);
    }
  
  var preloadPlugins = Module['preloadPlugins'] || [];
  function FS_handledByPreloadPlugin(byteArray, fullname, finish, onerror) {
      // Ensure plugins are ready.
      if (typeof Browser != 'undefined') Browser.init();
  
      var handled = false;
      preloadPlugins.forEach(function(plugin) {
        if (handled) return;
        if (plugin['canHandle'](fullname)) {
          plugin['handle'](byteArray, fullname, finish, onerror);
          handled = true;
        }
      });
      return handled;
    }
  function FS_createPreloadedFile(parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) {
      // TODO we should allow people to just pass in a complete filename instead
      // of parent and name being that we just join them anyways
      var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
      var dep = getUniqueRunDependency('cp ' + fullname); // might have several active requests for the same fullname
      function processData(byteArray) {
        function finish(byteArray) {
          if (preFinish) preFinish();
          if (!dontCreateFile) {
            FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
          }
          if (onload) onload();
          removeRunDependency(dep);
        }
        if (FS_handledByPreloadPlugin(byteArray, fullname, finish, () => {
          if (onerror) onerror();
          removeRunDependency(dep);
        })) {
          return;
        }
        finish(byteArray);
      }
      addRunDependency(dep);
      if (typeof url == 'string') {
        asyncLoad(url, (byteArray) => processData(byteArray), onerror);
      } else {
        processData(url);
      }
    }
  
  function FS_modeStringToFlags(str) {
      var flagModes = {
        'r': 0,
        'r+': 2,
        'w': 512 | 64 | 1,
        'w+': 512 | 64 | 2,
        'a': 1024 | 64 | 1,
        'a+': 1024 | 64 | 2,
      };
      var flags = flagModes[str];
      if (typeof flags == 'undefined') {
        throw new Error('Unknown file open mode: ' + str);
      }
      return flags;
    }
  
  function FS_getMode(canRead, canWrite) {
      var mode = 0;
      if (canRead) mode |= 292 | 73;
      if (canWrite) mode |= 146;
      return mode;
    }
  
  
  
  var FS = {root:null,mounts:[],devices:{},streams:[],nextInode:1,nameTable:null,currentPath:"/",initialized:false,ignorePermissions:true,ErrnoError:null,genericErrors:{},filesystems:null,syncFSRequests:0,lookupPath:(path, opts = {}) => {
        path = PATH_FS.resolve(path);
  
        if (!path) return { path: '', node: null };
  
        var defaults = {
          follow_mount: true,
          recurse_count: 0
        };
        opts = Object.assign(defaults, opts)
  
        if (opts.recurse_count > 8) {  // max recursive lookup of 8
          throw new FS.ErrnoError(32);
        }
  
        // split the absolute path
        var parts = path.split('/').filter((p) => !!p);
  
        // start at the root
        var current = FS.root;
        var current_path = '/';
  
        for (var i = 0; i < parts.length; i++) {
          var islast = (i === parts.length-1);
          if (islast && opts.parent) {
            // stop resolving
            break;
          }
  
          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]);
  
          // jump to the mount's root node if this is a mountpoint
          if (FS.isMountpoint(current)) {
            if (!islast || (islast && opts.follow_mount)) {
              current = current.mounted.root;
            }
          }
  
          // by default, lookupPath will not follow a symlink if it is the final path component.
          // setting opts.follow = true will override this behavior.
          if (!islast || opts.follow) {
            var count = 0;
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
  
              var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count + 1 });
              current = lookup.node;
  
              if (count++ > 40) {  // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
                throw new FS.ErrnoError(32);
              }
            }
          }
        }
  
        return { path: current_path, node: current };
      },getPath:(node) => {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length-1] !== '/' ? mount + '/' + path : mount + path;
          }
          path = path ? node.name + '/' + path : node.name;
          node = node.parent;
        }
      },hashName:(parentid, name) => {
        var hash = 0;
  
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
      },hashAddNode:(node) => {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },hashRemoveNode:(node) => {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },lookupNode:(parent, name) => {
        var errCode = FS.mayLookup(parent);
        if (errCode) {
          throw new FS.ErrnoError(errCode, parent);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        // if we failed to find it in the cache, call into the VFS
        return FS.lookup(parent, name);
      },createNode:(parent, name, mode, rdev) => {
        var node = new FS.FSNode(parent, name, mode, rdev);
  
        FS.hashAddNode(node);
  
        return node;
      },destroyNode:(node) => {
        FS.hashRemoveNode(node);
      },isRoot:(node) => {
        return node === node.parent;
      },isMountpoint:(node) => {
        return !!node.mounted;
      },isFile:(mode) => {
        return (mode & 61440) === 32768;
      },isDir:(mode) => {
        return (mode & 61440) === 16384;
      },isLink:(mode) => {
        return (mode & 61440) === 40960;
      },isChrdev:(mode) => {
        return (mode & 61440) === 8192;
      },isBlkdev:(mode) => {
        return (mode & 61440) === 24576;
      },isFIFO:(mode) => {
        return (mode & 61440) === 4096;
      },isSocket:(mode) => {
        return (mode & 49152) === 49152;
      },flagsToPermissionString:(flag) => {
        var perms = ['r', 'w', 'rw'][flag & 3];
        if ((flag & 512)) {
          perms += 'w';
        }
        return perms;
      },nodePermissions:(node, perms) => {
        if (FS.ignorePermissions) {
          return 0;
        }
        // return 0 if any user, group or owner bits are set.
        if (perms.includes('r') && !(node.mode & 292)) {
          return 2;
        } else if (perms.includes('w') && !(node.mode & 146)) {
          return 2;
        } else if (perms.includes('x') && !(node.mode & 73)) {
          return 2;
        }
        return 0;
      },mayLookup:(dir) => {
        var errCode = FS.nodePermissions(dir, 'x');
        if (errCode) return errCode;
        if (!dir.node_ops.lookup) return 2;
        return 0;
      },mayCreate:(dir, name) => {
        try {
          var node = FS.lookupNode(dir, name);
          return 20;
        } catch (e) {
        }
        return FS.nodePermissions(dir, 'wx');
      },mayDelete:(dir, name, isdir) => {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var errCode = FS.nodePermissions(dir, 'wx');
        if (errCode) {
          return errCode;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return 54;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return 10;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return 31;
          }
        }
        return 0;
      },mayOpen:(node, flags) => {
        if (!node) {
          return 44;
        }
        if (FS.isLink(node.mode)) {
          return 32;
        } else if (FS.isDir(node.mode)) {
          if (FS.flagsToPermissionString(flags) !== 'r' || // opening for write
              (flags & 512)) { // TODO: check for O_SEARCH? (== search for dir only)
            return 31;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },MAX_OPEN_FDS:4096,nextfd:(fd_start = 0, fd_end = FS.MAX_OPEN_FDS) => {
        for (var fd = fd_start; fd <= fd_end; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(33);
      },getStream:(fd) => FS.streams[fd],createStream:(stream, fd_start, fd_end) => {
        if (!FS.FSStream) {
          FS.FSStream = /** @constructor */ function() {
            this.shared = { };
          };
          FS.FSStream.prototype = {};
          Object.defineProperties(FS.FSStream.prototype, {
            object: {
              /** @this {FS.FSStream} */
              get: function() { return this.node; },
              /** @this {FS.FSStream} */
              set: function(val) { this.node = val; }
            },
            isRead: {
              /** @this {FS.FSStream} */
              get: function() { return (this.flags & 2097155) !== 1; }
            },
            isWrite: {
              /** @this {FS.FSStream} */
              get: function() { return (this.flags & 2097155) !== 0; }
            },
            isAppend: {
              /** @this {FS.FSStream} */
              get: function() { return (this.flags & 1024); }
            },
            flags: {
              /** @this {FS.FSStream} */
              get: function() { return this.shared.flags; },
              /** @this {FS.FSStream} */
              set: function(val) { this.shared.flags = val; },
            },
            position : {
              /** @this {FS.FSStream} */
              get: function() { return this.shared.position; },
              /** @this {FS.FSStream} */
              set: function(val) { this.shared.position = val; },
            },
          });
        }
        // clone it, so we can return an instance of FSStream
        stream = Object.assign(new FS.FSStream(), stream);
        var fd = FS.nextfd(fd_start, fd_end);
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },closeStream:(fd) => {
        FS.streams[fd] = null;
      },chrdev_stream_ops:{open:(stream) => {
          var device = FS.getDevice(stream.node.rdev);
          // override node's stream ops with the device's
          stream.stream_ops = device.stream_ops;
          // forward the open call
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
        },llseek:() => {
          throw new FS.ErrnoError(70);
        }},major:(dev) => ((dev) >> 8),minor:(dev) => ((dev) & 0xff),makedev:(ma, mi) => ((ma) << 8 | (mi)),registerDevice:(dev, ops) => {
        FS.devices[dev] = { stream_ops: ops };
      },getDevice:(dev) => FS.devices[dev],getMounts:(mount) => {
        var mounts = [];
        var check = [mount];
  
        while (check.length) {
          var m = check.pop();
  
          mounts.push(m);
  
          check.push.apply(check, m.mounts);
        }
  
        return mounts;
      },syncfs:(populate, callback) => {
        if (typeof populate == 'function') {
          callback = populate;
          populate = false;
        }
  
        FS.syncFSRequests++;
  
        if (FS.syncFSRequests > 1) {
          err('warning: ' + FS.syncFSRequests + ' FS.syncfs operations in flight at once, probably just doing extra work');
        }
  
        var mounts = FS.getMounts(FS.root.mount);
        var completed = 0;
  
        function doCallback(errCode) {
          FS.syncFSRequests--;
          return callback(errCode);
        }
  
        function done(errCode) {
          if (errCode) {
            if (!done.errored) {
              done.errored = true;
              return doCallback(errCode);
            }
            return;
          }
          if (++completed >= mounts.length) {
            doCallback(null);
          }
        };
  
        // sync all mounts
        mounts.forEach((mount) => {
          if (!mount.type.syncfs) {
            return done(null);
          }
          mount.type.syncfs(mount, populate, done);
        });
      },mount:(type, opts, mountpoint) => {
        var root = mountpoint === '/';
        var pseudo = !mountpoint;
        var node;
  
        if (root && FS.root) {
          throw new FS.ErrnoError(10);
        } else if (!root && !pseudo) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
          mountpoint = lookup.path;  // use the absolute path
          node = lookup.node;
  
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
  
          if (!FS.isDir(node.mode)) {
            throw new FS.ErrnoError(54);
          }
        }
  
        var mount = {
          type: type,
          opts: opts,
          mountpoint: mountpoint,
          mounts: []
        };
  
        // create a root node for the fs
        var mountRoot = type.mount(mount);
        mountRoot.mount = mount;
        mount.root = mountRoot;
  
        if (root) {
          FS.root = mountRoot;
        } else if (node) {
          // set as a mountpoint
          node.mounted = mount;
  
          // add the new mount to the current mount's children
          if (node.mount) {
            node.mount.mounts.push(mount);
          }
        }
  
        return mountRoot;
      },unmount:(mountpoint) => {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
        if (!FS.isMountpoint(lookup.node)) {
          throw new FS.ErrnoError(28);
        }
  
        // destroy the nodes for this mount, and all its child mounts
        var node = lookup.node;
        var mount = node.mounted;
        var mounts = FS.getMounts(mount);
  
        Object.keys(FS.nameTable).forEach((hash) => {
          var current = FS.nameTable[hash];
  
          while (current) {
            var next = current.name_next;
  
            if (mounts.includes(current.mount)) {
              FS.destroyNode(current);
            }
  
            current = next;
          }
        });
  
        // no longer a mountpoint
        node.mounted = null;
  
        // remove this mount from the child mounts
        var idx = node.mount.mounts.indexOf(mount);
        node.mount.mounts.splice(idx, 1);
      },lookup:(parent, name) => {
        return parent.node_ops.lookup(parent, name);
      },mknod:(path, mode, dev) => {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        if (!name || name === '.' || name === '..') {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.mayCreate(parent, name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },create:(path, mode) => {
        mode = mode !== undefined ? mode : 438 /* 0666 */;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },mkdir:(path, mode) => {
        mode = mode !== undefined ? mode : 511 /* 0777 */;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },mkdirTree:(path, mode) => {
        var dirs = path.split('/');
        var d = '';
        for (var i = 0; i < dirs.length; ++i) {
          if (!dirs[i]) continue;
          d += '/' + dirs[i];
          try {
            FS.mkdir(d, mode);
          } catch(e) {
            if (e.errno != 20) throw e;
          }
        }
      },mkdev:(path, mode, dev) => {
        if (typeof dev == 'undefined') {
          dev = mode;
          mode = 438 /* 0666 */;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },symlink:(oldpath, newpath) => {
        if (!PATH_FS.resolve(oldpath)) {
          throw new FS.ErrnoError(44);
        }
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var newname = PATH.basename(newpath);
        var errCode = FS.mayCreate(parent, newname);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },rename:(old_path, new_path) => {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        // parents must exist
        var lookup, old_dir, new_dir;
  
        // let the errors from non existant directories percolate up
        lookup = FS.lookupPath(old_path, { parent: true });
        old_dir = lookup.node;
        lookup = FS.lookupPath(new_path, { parent: true });
        new_dir = lookup.node;
  
        if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
        // need to be part of the same mount
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(75);
        }
        // source must exist
        var old_node = FS.lookupNode(old_dir, old_name);
        // old path should not be an ancestor of the new path
        var relative = PATH_FS.relative(old_path, new_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(28);
        }
        // new path should not be an ancestor of the old path
        relative = PATH_FS.relative(new_path, old_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(55);
        }
        // see if the new path already exists
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
          // not fatal
        }
        // early out if nothing needs to change
        if (old_node === new_node) {
          return;
        }
        // we'll need to delete the old entry
        var isdir = FS.isDir(old_node.mode);
        var errCode = FS.mayDelete(old_dir, old_name, isdir);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        // need delete permissions if we'll be overwriting.
        // need create permissions if new doesn't already exist.
        errCode = new_node ?
          FS.mayDelete(new_dir, new_name, isdir) :
          FS.mayCreate(new_dir, new_name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
          throw new FS.ErrnoError(10);
        }
        // if we are going to change the parent, check write permissions
        if (new_dir !== old_dir) {
          errCode = FS.nodePermissions(old_dir, 'w');
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        // remove the node from the lookup hash
        FS.hashRemoveNode(old_node);
        // do the underlying fs rename
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
        } catch (e) {
          throw e;
        } finally {
          // add the node back to the hash (in case node_ops.rename
          // changed its name)
          FS.hashAddNode(old_node);
        }
      },rmdir:(path) => {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, true);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
      },readdir:(path) => {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(54);
        }
        return node.node_ops.readdir(node);
      },unlink:(path) => {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, false);
        if (errCode) {
          // According to POSIX, we should map EISDIR to EPERM, but
          // we instead do what Linux does (and we must, as we use
          // the musl linux libc).
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
      },readlink:(path) => {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;
        if (!link) {
          throw new FS.ErrnoError(44);
        }
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(28);
        }
        return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
      },stat:(path, dontFollow) => {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(63);
        }
        return node.node_ops.getattr(node);
      },lstat:(path) => {
        return FS.stat(path, true);
      },chmod:(path, mode, dontFollow) => {
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {
          mode: (mode & 4095) | (node.mode & ~4095),
          timestamp: Date.now()
        });
      },lchmod:(path, mode) => {
        FS.chmod(path, mode, true);
      },fchmod:(fd, mode) => {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        FS.chmod(stream.node, mode);
      },chown:(path, uid, gid, dontFollow) => {
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {
          timestamp: Date.now()
          // we ignore the uid / gid for now
        });
      },lchown:(path, uid, gid) => {
        FS.chown(path, uid, gid, true);
      },fchown:(fd, uid, gid) => {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        FS.chown(stream.node, uid, gid);
      },truncate:(path, len) => {
        if (len < 0) {
          throw new FS.ErrnoError(28);
        }
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.nodePermissions(node, 'w');
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        node.node_ops.setattr(node, {
          size: len,
          timestamp: Date.now()
        });
      },ftruncate:(fd, len) => {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(28);
        }
        FS.truncate(stream.node, len);
      },utime:(path, atime, mtime) => {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, {
          timestamp: Math.max(atime, mtime)
        });
      },open:(path, flags, mode) => {
        if (path === "") {
          throw new FS.ErrnoError(44);
        }
        flags = typeof flags == 'string' ? FS_modeStringToFlags(flags) : flags;
        mode = typeof mode == 'undefined' ? 438 /* 0666 */ : mode;
        if ((flags & 64)) {
          mode = (mode & 4095) | 32768;
        } else {
          mode = 0;
        }
        var node;
        if (typeof path == 'object') {
          node = path;
        } else {
          path = PATH.normalize(path);
          try {
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072)
            });
            node = lookup.node;
          } catch (e) {
            // ignore
          }
        }
        // perhaps we need to create the node
        var created = false;
        if ((flags & 64)) {
          if (node) {
            // if O_CREAT and O_EXCL are set, error out if the node already exists
            if ((flags & 128)) {
              throw new FS.ErrnoError(20);
            }
          } else {
            // node doesn't exist, try to create it
            node = FS.mknod(path, mode, 0);
            created = true;
          }
        }
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        // can't truncate a device
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        // if asked only for a directory, then this must be one
        if ((flags & 65536) && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(54);
        }
        // check permissions, if this is not a file we just created now (it is ok to
        // create and write to a file with read-only permissions; it is read-only
        // for later use)
        if (!created) {
          var errCode = FS.mayOpen(node, flags);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        // do truncation if necessary
        if ((flags & 512) && !created) {
          FS.truncate(node, 0);
        }
        // we've already handled these, don't pass down to the underlying vfs
        flags &= ~(128 | 512 | 131072);
  
        // register the stream with the filesystem
        var stream = FS.createStream({
          node: node,
          path: FS.getPath(node),  // we want the absolute path to the node
          flags: flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          // used by the file family libc calls (fopen, fwrite, ferror, etc.)
          ungotten: [],
          error: false
        });
        // call the new stream's open function
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!FS.readFiles) FS.readFiles = {};
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
          }
        }
        return stream;
      },close:(stream) => {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (stream.getdents) stream.getdents = null; // free readdir state
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
        stream.fd = null;
      },isClosed:(stream) => {
        return stream.fd === null;
      },llseek:(stream, offset, whence) => {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(70);
        }
        if (whence != 0 && whence != 1 && whence != 2) {
          throw new FS.ErrnoError(28);
        }
        stream.position = stream.stream_ops.llseek(stream, offset, whence);
        stream.ungotten = [];
        return stream.position;
      },read:(stream, buffer, offset, length, position) => {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(28);
        }
        var seeking = typeof position != 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },write:(stream, buffer, offset, length, position, canOwn) => {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(28);
        }
        if (stream.seekable && stream.flags & 1024) {
          // seek to the end before writing in append mode
          FS.llseek(stream, 0, 2);
        }
        var seeking = typeof position != 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
        if (!seeking) stream.position += bytesWritten;
        return bytesWritten;
      },allocate:(stream, offset, length) => {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(28);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(138);
        }
        stream.stream_ops.allocate(stream, offset, length);
      },mmap:(stream, length, position, prot, flags) => {
        // User requests writing to file (prot & PROT_WRITE != 0).
        // Checking if we have permissions to write to the file unless
        // MAP_PRIVATE flag is set. According to POSIX spec it is possible
        // to write to file opened in read-only mode with MAP_PRIVATE flag,
        // as all modifications will be visible only in the memory of
        // the current process.
        if ((prot & 2) !== 0
            && (flags & 2) === 0
            && (stream.flags & 2097155) !== 2) {
          throw new FS.ErrnoError(2);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(2);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(43);
        }
        return stream.stream_ops.mmap(stream, length, position, prot, flags);
      },msync:(stream, buffer, offset, length, mmapFlags) => {
        if (!stream.stream_ops.msync) {
          return 0;
        }
        return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
      },munmap:(stream) => 0,ioctl:(stream, cmd, arg) => {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(59);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },readFile:(path, opts = {}) => {
        opts.flags = opts.flags || 0;
        opts.encoding = opts.encoding || 'binary';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === 'utf8') {
          ret = UTF8ArrayToString(buf, 0);
        } else if (opts.encoding === 'binary') {
          ret = buf;
        }
        FS.close(stream);
        return ret;
      },writeFile:(path, data, opts = {}) => {
        opts.flags = opts.flags || 577;
        var stream = FS.open(path, opts.flags, opts.mode);
        if (typeof data == 'string') {
          var buf = new Uint8Array(lengthBytesUTF8(data)+1);
          var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
          FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
        } else if (ArrayBuffer.isView(data)) {
          FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
        } else {
          throw new Error('Unsupported data type');
        }
        FS.close(stream);
      },cwd:() => FS.currentPath,chdir:(path) => {
        var lookup = FS.lookupPath(path, { follow: true });
        if (lookup.node === null) {
          throw new FS.ErrnoError(44);
        }
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(54);
        }
        var errCode = FS.nodePermissions(lookup.node, 'x');
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        FS.currentPath = lookup.path;
      },createDefaultDirectories:() => {
        FS.mkdir('/tmp');
        FS.mkdir('/home');
        FS.mkdir('/home/web_user');
      },createDefaultDevices:() => {
        // create /dev
        FS.mkdir('/dev');
        // setup /dev/null
        FS.registerDevice(FS.makedev(1, 3), {
          read: () => 0,
          write: (stream, buffer, offset, length, pos) => length,
        });
        FS.mkdev('/dev/null', FS.makedev(1, 3));
        // setup /dev/tty and /dev/tty1
        // stderr needs to print output using err() rather than out()
        // so we register a second tty just for it.
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev('/dev/tty', FS.makedev(5, 0));
        FS.mkdev('/dev/tty1', FS.makedev(6, 0));
        // setup /dev/[u]random
        // use a buffer to avoid overhead of individual crypto calls per byte
        var randomBuffer = new Uint8Array(1024), randomLeft = 0;
        var randomByte = () => {
          if (randomLeft === 0) {
            randomLeft = randomFill(randomBuffer).byteLength;
          }
          return randomBuffer[--randomLeft];
        };
        FS.createDevice('/dev', 'random', randomByte);
        FS.createDevice('/dev', 'urandom', randomByte);
        // we're not going to emulate the actual shm device,
        // just create the tmp dirs that reside in it commonly
        FS.mkdir('/dev/shm');
        FS.mkdir('/dev/shm/tmp');
      },createSpecialDirectories:() => {
        // create /proc/self/fd which allows /proc/self/fd/6 => readlink gives the
        // name of the stream for fd 6 (see test_unistd_ttyname)
        FS.mkdir('/proc');
        var proc_self = FS.mkdir('/proc/self');
        FS.mkdir('/proc/self/fd');
        FS.mount({
          mount: () => {
            var node = FS.createNode(proc_self, 'fd', 16384 | 511 /* 0777 */, 73);
            node.node_ops = {
              lookup: (parent, name) => {
                var fd = +name;
                var stream = FS.getStream(fd);
                if (!stream) throw new FS.ErrnoError(8);
                var ret = {
                  parent: null,
                  mount: { mountpoint: 'fake' },
                  node_ops: { readlink: () => stream.path },
                };
                ret.parent = ret; // make it look like a simple root node
                return ret;
              }
            };
            return node;
          }
        }, {}, '/proc/self/fd');
      },createStandardStreams:() => {
        // TODO deprecate the old functionality of a single
        // input / output callback and that utilizes FS.createDevice
        // and instead require a unique set of stream ops
  
        // by default, we symlink the standard streams to the
        // default tty devices. however, if the standard streams
        // have been overwritten we create a unique device for
        // them instead.
        if (Module['stdin']) {
          FS.createDevice('/dev', 'stdin', Module['stdin']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdin');
        }
        if (Module['stdout']) {
          FS.createDevice('/dev', 'stdout', null, Module['stdout']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdout');
        }
        if (Module['stderr']) {
          FS.createDevice('/dev', 'stderr', null, Module['stderr']);
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr');
        }
  
        // open default streams for the stdin, stdout and stderr devices
        var stdin = FS.open('/dev/stdin', 0);
        var stdout = FS.open('/dev/stdout', 1);
        var stderr = FS.open('/dev/stderr', 1);
      },ensureErrnoError:() => {
        if (FS.ErrnoError) return;
        FS.ErrnoError = /** @this{Object} */ function ErrnoError(errno, node) {
          // We set the `name` property to be able to identify `FS.ErrnoError`
          // - the `name` is a standard ECMA-262 property of error objects. Kind of good to have it anyway.
          // - when using PROXYFS, an error can come from an underlying FS
          // as different FS objects have their own FS.ErrnoError each,
          // the test `err instanceof FS.ErrnoError` won't detect an error coming from another filesystem, causing bugs.
          // we'll use the reliable test `err.name == "ErrnoError"` instead
          this.name = 'ErrnoError';
          this.node = node;
          this.setErrno = /** @this{Object} */ function(errno) {
            this.errno = errno;
          };
          this.setErrno(errno);
          this.message = 'FS error';
  
        };
        FS.ErrnoError.prototype = new Error();
        FS.ErrnoError.prototype.constructor = FS.ErrnoError;
        // Some errors may happen quite a bit, to avoid overhead we reuse them (and suffer a lack of stack info)
        [44].forEach((code) => {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = '<generic error, no stack>';
        });
      },staticInit:() => {
        FS.ensureErrnoError();
  
        FS.nameTable = new Array(4096);
  
        FS.mount(MEMFS, {}, '/');
  
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
        FS.createSpecialDirectories();
  
        FS.filesystems = {
          'MEMFS': MEMFS,
        };
      },init:(input, output, error) => {
        FS.init.initialized = true;
  
        FS.ensureErrnoError();
  
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        Module['stdin'] = input || Module['stdin'];
        Module['stdout'] = output || Module['stdout'];
        Module['stderr'] = error || Module['stderr'];
  
        FS.createStandardStreams();
      },quit:() => {
        FS.init.initialized = false;
        // force-flush all streams, so we get musl std streams printed out
        // close all of our streams
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      },findObject:(path, dontResolveLastLink) => {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (!ret.exists) {
          return null;
        }
        return ret.object;
      },analyzePath:(path, dontResolveLastLink) => {
        // operate from within the context of the symlink's target
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {
        }
        var ret = {
          isRoot: false, exists: false, error: 0, name: null, path: null, object: null,
          parentExists: false, parentPath: null, parentObject: null
        };
        try {
          var lookup = FS.lookupPath(path, { parent: true });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === '/';
        } catch (e) {
          ret.error = e.errno;
        };
        return ret;
      },createPath:(parent, path, canRead, canWrite) => {
        parent = typeof parent == 'string' ? parent : FS.getPath(parent);
        var parts = path.split('/').reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {
            // ignore EEXIST
          }
          parent = current;
        }
        return current;
      },createFile:(parent, name, properties, canRead, canWrite) => {
        var path = PATH.join2(typeof parent == 'string' ? parent : FS.getPath(parent), name);
        var mode = FS_getMode(canRead, canWrite);
        return FS.create(path, mode);
      },createDataFile:(parent, name, data, canRead, canWrite, canOwn) => {
        var path = name;
        if (parent) {
          parent = typeof parent == 'string' ? parent : FS.getPath(parent);
          path = name ? PATH.join2(parent, name) : parent;
        }
        var mode = FS_getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data == 'string') {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
            data = arr;
          }
          // make sure we can write to the file
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 577);
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
        return node;
      },createDevice:(parent, name, input, output) => {
        var path = PATH.join2(typeof parent == 'string' ? parent : FS.getPath(parent), name);
        var mode = FS_getMode(!!input, !!output);
        if (!FS.createDevice.major) FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        // Create a fake device that a set of stream ops to emulate
        // the old behavior.
        FS.registerDevice(dev, {
          open: (stream) => {
            stream.seekable = false;
          },
          close: (stream) => {
            // flush any pending line data
            if (output && output.buffer && output.buffer.length) {
              output(10);
            }
          },
          read: (stream, buffer, offset, length, pos /* ignored */) => {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(6);
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset+i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write: (stream, buffer, offset, length, pos) => {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset+i]);
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          }
        });
        return FS.mkdev(path, mode, dev);
      },forceLoadFile:(obj) => {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        if (typeof XMLHttpRequest != 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else if (read_) {
          // Command-line.
          try {
            // WARNING: Can't read binary files in V8's d8 or tracemonkey's js, as
            //          read() will try to parse UTF8.
            obj.contents = intArrayFromString(read_(obj.url), true);
            obj.usedBytes = obj.contents.length;
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
        } else {
          throw new Error('Cannot load without read() or XMLHttpRequest.');
        }
      },createLazyFile:(parent, name, url, canRead, canWrite) => {
        // Lazy chunked Uint8Array (implements get and length from Uint8Array). Actual getting is abstracted away for eventual reuse.
        /** @constructor */
        function LazyUint8Array() {
          this.lengthKnown = false;
          this.chunks = []; // Loaded chunks. Index is the chunk number
        }
        LazyUint8Array.prototype.get = /** @this{Object} */ function LazyUint8Array_get(idx) {
          if (idx > this.length-1 || idx < 0) {
            return undefined;
          }
          var chunkOffset = idx % this.chunkSize;
          var chunkNum = (idx / this.chunkSize)|0;
          return this.getter(chunkNum)[chunkOffset];
        };
        LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
          this.getter = getter;
        };
        LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
          // Find length
          var xhr = new XMLHttpRequest();
          xhr.open('HEAD', url, false);
          xhr.send(null);
          if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
          var datalength = Number(xhr.getResponseHeader("Content-length"));
          var header;
          var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
          var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
  
          var chunkSize = 1024*1024; // Chunk size in bytes
  
          if (!hasByteServing) chunkSize = datalength;
  
          // Function to get a range from the remote URL.
          var doXHR = (from, to) => {
            if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
            if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
  
            // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
  
            // Some hints to the browser that we want binary data.
            xhr.responseType = 'arraybuffer';
            if (xhr.overrideMimeType) {
              xhr.overrideMimeType('text/plain; charset=x-user-defined');
            }
  
            xhr.send(null);
            if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
            if (xhr.response !== undefined) {
              return new Uint8Array(/** @type{Array<number>} */(xhr.response || []));
            }
            return intArrayFromString(xhr.responseText || '', true);
          };
          var lazyArray = this;
          lazyArray.setDataGetter((chunkNum) => {
            var start = chunkNum * chunkSize;
            var end = (chunkNum+1) * chunkSize - 1; // including this byte
            end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
            if (typeof lazyArray.chunks[chunkNum] == 'undefined') {
              lazyArray.chunks[chunkNum] = doXHR(start, end);
            }
            if (typeof lazyArray.chunks[chunkNum] == 'undefined') throw new Error('doXHR failed!');
            return lazyArray.chunks[chunkNum];
          });
  
          if (usesGzip || !datalength) {
            // if the server uses gzip or doesn't supply the length, we have to download the whole file to get the (uncompressed) length
            chunkSize = datalength = 1; // this will force getter(0)/doXHR do download the whole file
            datalength = this.getter(0).length;
            chunkSize = datalength;
            out("LazyFiles on gzip forces download of the whole file when length is accessed");
          }
  
          this._length = datalength;
          this._chunkSize = chunkSize;
          this.lengthKnown = true;
        };
        if (typeof XMLHttpRequest != 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          var lazyArray = new LazyUint8Array();
          Object.defineProperties(lazyArray, {
            length: {
              get: /** @this{Object} */ function() {
                if (!this.lengthKnown) {
                  this.cacheLength();
                }
                return this._length;
              }
            },
            chunkSize: {
              get: /** @this{Object} */ function() {
                if (!this.lengthKnown) {
                  this.cacheLength();
                }
                return this._chunkSize;
              }
            }
          });
  
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
  
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        // This is a total hack, but I want to get this lazy file code out of the
        // core of MEMFS. If we want to keep this lazy file concept I feel it should
        // be its own thin LAZYFS proxying calls to MEMFS.
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        // Add a function that defers querying the file size until it is asked the first time.
        Object.defineProperties(node, {
          usedBytes: {
            get: /** @this {FSNode} */ function() { return this.contents.length; }
          }
        });
        // override each stream op with one that tries to force load the lazy file first
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach((key) => {
          var fn = node.stream_ops[key];
          stream_ops[key] = function forceLoadLazyFile() {
            FS.forceLoadFile(node);
            return fn.apply(null, arguments);
          };
        });
        function writeChunks(stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          if (contents.slice) { // normal array
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) { // LazyUint8Array from sync binary XHR
              buffer[offset + i] = contents.get(position + i);
            }
          }
          return size;
        }
        // use a custom read function
        stream_ops.read = (stream, buffer, offset, length, position) => {
          FS.forceLoadFile(node);
          return writeChunks(stream, buffer, offset, length, position)
        };
        // use a custom mmap function
        stream_ops.mmap = (stream, length, position, prot, flags) => {
          FS.forceLoadFile(node);
          var ptr = mmapAlloc(length);
          if (!ptr) {
            throw new FS.ErrnoError(48);
          }
          writeChunks(stream, HEAP8, ptr, length, position);
          return { ptr: ptr, allocated: true };
        };
        node.stream_ops = stream_ops;
        return node;
      }};
  
  var SYSCALLS = {DEFAULT_POLLMASK:5,calculateAt:function(dirfd, path, allowEmpty) {
        if (PATH.isAbs(path)) {
          return path;
        }
        // relative path
        var dir;
        if (dirfd === -100) {
          dir = FS.cwd();
        } else {
          var dirstream = SYSCALLS.getStreamFromFD(dirfd);
          dir = dirstream.path;
        }
        if (path.length == 0) {
          if (!allowEmpty) {
            throw new FS.ErrnoError(44);;
          }
          return dir;
        }
        return PATH.join2(dir, path);
      },doStat:function(func, path, buf) {
        try {
          var stat = func(path);
        } catch (e) {
          if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
            // an error occurred while trying to look up the path; we should just report ENOTDIR
            return -54;
          }
          throw e;
        }
        HEAP32[((buf)>>2)] = stat.dev;
        HEAP32[(((buf)+(8))>>2)] = stat.ino;
        HEAP32[(((buf)+(12))>>2)] = stat.mode;
        HEAPU32[(((buf)+(16))>>2)] = stat.nlink;
        HEAP32[(((buf)+(20))>>2)] = stat.uid;
        HEAP32[(((buf)+(24))>>2)] = stat.gid;
        HEAP32[(((buf)+(28))>>2)] = stat.rdev;
        (tempI64 = [stat.size>>>0,(tempDouble=stat.size,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((buf)+(40))>>2)] = tempI64[0],HEAP32[(((buf)+(44))>>2)] = tempI64[1]);
        HEAP32[(((buf)+(48))>>2)] = 4096;
        HEAP32[(((buf)+(52))>>2)] = stat.blocks;
        var atime = stat.atime.getTime();
        var mtime = stat.mtime.getTime();
        var ctime = stat.ctime.getTime();
        (tempI64 = [Math.floor(atime / 1000)>>>0,(tempDouble=Math.floor(atime / 1000),(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((buf)+(56))>>2)] = tempI64[0],HEAP32[(((buf)+(60))>>2)] = tempI64[1]);
        HEAPU32[(((buf)+(64))>>2)] = (atime % 1000) * 1000;
        (tempI64 = [Math.floor(mtime / 1000)>>>0,(tempDouble=Math.floor(mtime / 1000),(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((buf)+(72))>>2)] = tempI64[0],HEAP32[(((buf)+(76))>>2)] = tempI64[1]);
        HEAPU32[(((buf)+(80))>>2)] = (mtime % 1000) * 1000;
        (tempI64 = [Math.floor(ctime / 1000)>>>0,(tempDouble=Math.floor(ctime / 1000),(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((buf)+(88))>>2)] = tempI64[0],HEAP32[(((buf)+(92))>>2)] = tempI64[1]);
        HEAPU32[(((buf)+(96))>>2)] = (ctime % 1000) * 1000;
        (tempI64 = [stat.ino>>>0,(tempDouble=stat.ino,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((buf)+(104))>>2)] = tempI64[0],HEAP32[(((buf)+(108))>>2)] = tempI64[1]);
        return 0;
      },doMsync:function(addr, stream, len, flags, offset) {
        if (!FS.isFile(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (flags & 2) {
          // MAP_PRIVATE calls need not to be synced back to underlying fs
          return 0;
        }
        var buffer = HEAPU8.slice(addr, addr + len);
        FS.msync(stream, buffer, offset, len, flags);
      },varargs:undefined,get:function() {
        SYSCALLS.varargs += 4;
        var ret = HEAP32[(((SYSCALLS.varargs)-(4))>>2)];
        return ret;
      },getStr:function(ptr) {
        var ret = UTF8ToString(ptr);
        return ret;
      },getStreamFromFD:function(fd) {
        var stream = FS.getStream(fd);
        if (!stream) throw new FS.ErrnoError(8);
        return stream;
      }};
  function ___syscall_fcntl64(fd, cmd, varargs) {
  SYSCALLS.varargs = varargs;
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      switch (cmd) {
        case 0: {
          var arg = SYSCALLS.get();
          if (arg < 0) {
            return -28;
          }
          var newStream;
          newStream = FS.createStream(stream, arg);
          return newStream.fd;
        }
        case 1:
        case 2:
          return 0;  // FD_CLOEXEC makes no sense for a single process.
        case 3:
          return stream.flags;
        case 4: {
          var arg = SYSCALLS.get();
          stream.flags |= arg;
          return 0;
        }
        case 5:
        /* case 5: Currently in musl F_GETLK64 has same value as F_GETLK, so omitted to avoid duplicate case blocks. If that changes, uncomment this */ {
          
          var arg = SYSCALLS.get();
          var offset = 0;
          // We're always unlocked.
          HEAP16[(((arg)+(offset))>>1)] = 2;
          return 0;
        }
        case 6:
        case 7:
        /* case 6: Currently in musl F_SETLK64 has same value as F_SETLK, so omitted to avoid duplicate case blocks. If that changes, uncomment this */
        /* case 7: Currently in musl F_SETLKW64 has same value as F_SETLKW, so omitted to avoid duplicate case blocks. If that changes, uncomment this */
          
          
          return 0; // Pretend that the locking is successful.
        case 16:
        case 8:
          return -28; // These are for sockets. We don't have them fully implemented yet.
        case 9:
          // musl trusts getown return values, due to a bug where they must be, as they overlap with errors. just return -1 here, so fcntl() returns that, and we set errno ourselves.
          setErrNo(28);
          return -1;
        default: {
          return -28;
        }
      }
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  function ___syscall_ioctl(fd, op, varargs) {
  SYSCALLS.varargs = varargs;
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      switch (op) {
        case 21509:
        case 21505: {
          if (!stream.tty) return -59;
          return 0;
        }
        case 21510:
        case 21511:
        case 21512:
        case 21506:
        case 21507:
        case 21508: {
          if (!stream.tty) return -59;
          return 0; // no-op, not actually adjusting terminal settings
        }
        case 21519: {
          if (!stream.tty) return -59;
          var argp = SYSCALLS.get();
          HEAP32[((argp)>>2)] = 0;
          return 0;
        }
        case 21520: {
          if (!stream.tty) return -59;
          return -28; // not supported
        }
        case 21531: {
          var argp = SYSCALLS.get();
          return FS.ioctl(stream, op, argp);
        }
        case 21523: {
          // TODO: in theory we should write to the winsize struct that gets
          // passed in, but for now musl doesn't read anything on it
          if (!stream.tty) return -59;
          return 0;
        }
        case 21524: {
          // TODO: technically, this ioctl call should change the window size.
          // but, since emscripten doesn't have any concept of a terminal window
          // yet, we'll just silently throw it away as we do TIOCGWINSZ
          if (!stream.tty) return -59;
          return 0;
        }
        default: return -28; // not supported
      }
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  function ___syscall_openat(dirfd, path, flags, varargs) {
  SYSCALLS.varargs = varargs;
  try {
  
      path = SYSCALLS.getStr(path);
      path = SYSCALLS.calculateAt(dirfd, path);
      var mode = varargs ? SYSCALLS.get() : 0;
      return FS.open(path, flags, mode).fd;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  var nowIsMonotonic = true;;
  function __emscripten_get_now_is_monotonic() {
      return nowIsMonotonic;
    }

  function _abort() {
      abort('');
    }

  var readEmAsmArgsArray = [];
  function readEmAsmArgs(sigPtr, buf) {
      readEmAsmArgsArray.length = 0;
      var ch;
      // Most arguments are i32s, so shift the buffer pointer so it is a plain
      // index into HEAP32.
      buf >>= 2;
      while (ch = HEAPU8[sigPtr++]) {
        // Floats are always passed as doubles, and doubles and int64s take up 8
        // bytes (two 32-bit slots) in memory, align reads to these:
        buf += (ch != 105/*i*/) & buf;
        readEmAsmArgsArray.push(
          ch == 105/*i*/ ? HEAP32[buf] :
         HEAPF64[buf++ >> 1]
        );
        ++buf;
      }
      return readEmAsmArgsArray;
    }
  function runEmAsmFunction(code, sigPtr, argbuf) {
      var args = readEmAsmArgs(sigPtr, argbuf);
      return ASM_CONSTS[code].apply(null, args);
    }
  function _emscripten_asm_const_int(code, sigPtr, argbuf) {
      return runEmAsmFunction(code, sigPtr, argbuf);
    }

  function _emscripten_date_now() {
      return Date.now();
    }

  var _emscripten_get_now;if (ENVIRONMENT_IS_NODE) {
    _emscripten_get_now = () => {
      var t = process.hrtime();
      return t[0] * 1e3 + t[1] / 1e6;
    };
  } else _emscripten_get_now = () => performance.now();
  ;

  function _emscripten_memcpy_big(dest, src, num) {
      HEAPU8.copyWithin(dest, src, src + num);
    }

  function getHeapMax() {
      // Stay one Wasm page short of 4GB: while e.g. Chrome is able to allocate
      // full 4GB Wasm memories, the size will wrap back to 0 bytes in Wasm side
      // for any code that deals with heap sizes, which would require special
      // casing all heap size related code to treat 0 specially.
      return 2147483648;
    }
  
  function emscripten_realloc_buffer(size) {
      var b = wasmMemory.buffer;
      try {
        // round size grow request up to wasm page size (fixed 64KB per spec)
        wasmMemory.grow((size - b.byteLength + 65535) >>> 16); // .grow() takes a delta compared to the previous size
        updateMemoryViews();
        return 1 /*success*/;
      } catch(e) {
      }
      // implicit 0 return to save code size (caller will cast "undefined" into 0
      // anyhow)
    }
  function _emscripten_resize_heap(requestedSize) {
      var oldSize = HEAPU8.length;
      requestedSize = requestedSize >>> 0;
      // With multithreaded builds, races can happen (another thread might increase the size
      // in between), so return a failure, and let the caller retry.
  
      // Memory resize rules:
      // 1.  Always increase heap size to at least the requested size, rounded up
      //     to next page multiple.
      // 2a. If MEMORY_GROWTH_LINEAR_STEP == -1, excessively resize the heap
      //     geometrically: increase the heap size according to
      //     MEMORY_GROWTH_GEOMETRIC_STEP factor (default +20%), At most
      //     overreserve by MEMORY_GROWTH_GEOMETRIC_CAP bytes (default 96MB).
      // 2b. If MEMORY_GROWTH_LINEAR_STEP != -1, excessively resize the heap
      //     linearly: increase the heap size by at least
      //     MEMORY_GROWTH_LINEAR_STEP bytes.
      // 3.  Max size for the heap is capped at 2048MB-WASM_PAGE_SIZE, or by
      //     MAXIMUM_MEMORY, or by ASAN limit, depending on which is smallest
      // 4.  If we were unable to allocate as much memory, it may be due to
      //     over-eager decision to excessively reserve due to (3) above.
      //     Hence if an allocation fails, cut down on the amount of excess
      //     growth, in an attempt to succeed to perform a smaller allocation.
  
      // A limit is set for how much we can grow. We should not exceed that
      // (the wasm binary specifies it, so if we tried, we'd fail anyhow).
      var maxHeapSize = getHeapMax();
      if (requestedSize > maxHeapSize) {
        return false;
      }
  
      var alignUp = (x, multiple) => x + (multiple - x % multiple) % multiple;
  
      // Loop through potential heap size increases. If we attempt a too eager
      // reservation that fails, cut down on the attempted size and reserve a
      // smaller bump instead. (max 3 times, chosen somewhat arbitrarily)
      for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
        var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown); // ensure geometric growth
        // but limit overreserving (default to capping at +96MB overgrowth at most)
        overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296 );
  
        var newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
  
        var replacement = emscripten_realloc_buffer(newSize);
        if (replacement) {
  
          return true;
        }
      }
      return false;
    }

  function withStackSave(f) {
      var stack = stackSave();
      var ret = f();
      stackRestore(stack);
      return ret;
    }
  var JSEvents = {inEventHandler:0,removeAllEventListeners:function() {
        for (var i = JSEvents.eventHandlers.length-1; i >= 0; --i) {
          JSEvents._removeHandler(i);
        }
        JSEvents.eventHandlers = [];
        JSEvents.deferredCalls = [];
      },registerRemoveEventListeners:function() {
        if (!JSEvents.removeEventListenersRegistered) {
          __ATEXIT__.push(JSEvents.removeAllEventListeners);
          JSEvents.removeEventListenersRegistered = true;
        }
      },deferredCalls:[],deferCall:function(targetFunction, precedence, argsList) {
        function arraysHaveEqualContent(arrA, arrB) {
          if (arrA.length != arrB.length) return false;
  
          for (var i in arrA) {
            if (arrA[i] != arrB[i]) return false;
          }
          return true;
        }
        // Test if the given call was already queued, and if so, don't add it again.
        for (var i in JSEvents.deferredCalls) {
          var call = JSEvents.deferredCalls[i];
          if (call.targetFunction == targetFunction && arraysHaveEqualContent(call.argsList, argsList)) {
            return;
          }
        }
        JSEvents.deferredCalls.push({
          targetFunction: targetFunction,
          precedence: precedence,
          argsList: argsList
        });
  
        JSEvents.deferredCalls.sort(function(x,y) { return x.precedence < y.precedence; });
      },removeDeferredCalls:function(targetFunction) {
        for (var i = 0; i < JSEvents.deferredCalls.length; ++i) {
          if (JSEvents.deferredCalls[i].targetFunction == targetFunction) {
            JSEvents.deferredCalls.splice(i, 1);
            --i;
          }
        }
      },canPerformEventHandlerRequests:function() {
        return JSEvents.inEventHandler && JSEvents.currentEventHandler.allowsDeferredCalls;
      },runDeferredCalls:function() {
        if (!JSEvents.canPerformEventHandlerRequests()) {
          return;
        }
        for (var i = 0; i < JSEvents.deferredCalls.length; ++i) {
          var call = JSEvents.deferredCalls[i];
          JSEvents.deferredCalls.splice(i, 1);
          --i;
          call.targetFunction.apply(null, call.argsList);
        }
      },eventHandlers:[],removeAllHandlersOnTarget:function(target, eventTypeString) {
        for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
          if (JSEvents.eventHandlers[i].target == target && 
            (!eventTypeString || eventTypeString == JSEvents.eventHandlers[i].eventTypeString)) {
             JSEvents._removeHandler(i--);
           }
        }
      },_removeHandler:function(i) {
        var h = JSEvents.eventHandlers[i];
        h.target.removeEventListener(h.eventTypeString, h.eventListenerFunc, h.useCapture);
        JSEvents.eventHandlers.splice(i, 1);
      },registerOrRemoveHandler:function(eventHandler) {
        var jsEventHandler = function jsEventHandler(event) {
          // Increment nesting count for the event handler.
          ++JSEvents.inEventHandler;
          JSEvents.currentEventHandler = eventHandler;
          // Process any old deferred calls the user has placed.
          JSEvents.runDeferredCalls();
          // Process the actual event, calls back to user C code handler.
          eventHandler.handlerFunc(event);
          // Process any new deferred calls that were placed right now from this event handler.
          JSEvents.runDeferredCalls();
          // Out of event handler - restore nesting count.
          --JSEvents.inEventHandler;
        };
        
        if (eventHandler.callbackfunc) {
          eventHandler.eventListenerFunc = jsEventHandler;
          eventHandler.target.addEventListener(eventHandler.eventTypeString, jsEventHandler, eventHandler.useCapture);
          JSEvents.eventHandlers.push(eventHandler);
          JSEvents.registerRemoveEventListeners();
        } else {
          for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
            if (JSEvents.eventHandlers[i].target == eventHandler.target
             && JSEvents.eventHandlers[i].eventTypeString == eventHandler.eventTypeString) {
               JSEvents._removeHandler(i--);
             }
          }
        }
      },getNodeNameForTarget:function(target) {
        if (!target) return '';
        if (target == window) return '#window';
        if (target == screen) return '#screen';
        return (target && target.nodeName) ? target.nodeName : '';
      },fullscreenEnabled:function() {
        return document.fullscreenEnabled
        // Safari 13.0.3 on macOS Catalina 10.15.1 still ships with prefixed webkitFullscreenEnabled.
        // TODO: If Safari at some point ships with unprefixed version, update the version check above.
        || document.webkitFullscreenEnabled
         ;
      }};
  
  function maybeCStringToJsString(cString) {
      // "cString > 2" checks if the input is a number, and isn't of the special
      // values we accept here, EMSCRIPTEN_EVENT_TARGET_* (which map to 0, 1, 2).
      // In other words, if cString > 2 then it's a pointer to a valid place in
      // memory, and points to a C string.
      return cString > 2 ? UTF8ToString(cString) : cString;
    }
  
  var specialHTMLTargets = [0, typeof document != 'undefined' ? document : 0, typeof window != 'undefined' ? window : 0];
  function findEventTarget(target) {
      target = maybeCStringToJsString(target);
      var domElement = specialHTMLTargets[target] || (typeof document != 'undefined' ? document.querySelector(target) : undefined);
      return domElement;
    }
  
  
  function stringToUTF8(str, outPtr, maxBytesToWrite) {
      return stringToUTF8Array(str, HEAPU8,outPtr, maxBytesToWrite);
    }
  
  var wasmTableMirror = [];
  
  function getWasmTableEntry(funcPtr) {
      var func = wasmTableMirror[funcPtr];
      if (!func) {
        if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1;
        wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
      }
      return func;
    }
  function registerFocusEventCallback(target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) {
      if (!JSEvents.focusEvent) JSEvents.focusEvent = _malloc( 256 );
  
      var focusEventHandlerFunc = function(e = event) {
        var nodeName = JSEvents.getNodeNameForTarget(e.target);
        var id = e.target.id ? e.target.id : '';
  
        var focusEvent = JSEvents.focusEvent;
        stringToUTF8(nodeName, focusEvent + 0, 128);
        stringToUTF8(id, focusEvent + 128, 128);
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, focusEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target: findEventTarget(target),
        eventTypeString: eventTypeString,
        callbackfunc: callbackfunc,
        handlerFunc: focusEventHandlerFunc,
        useCapture: useCapture
      };
      JSEvents.registerOrRemoveHandler(eventHandler);
    }
  function _emscripten_set_blur_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      registerFocusEventCallback(target, userData, useCapture, callbackfunc, 12, "blur", targetThread);
      return 0;
    }

  
  
  
  
  function registerKeyEventCallback(target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) {
      if (!JSEvents.keyEvent) JSEvents.keyEvent = _malloc( 176 );
  
      var keyEventHandlerFunc = function(e) {
  
        var keyEventData = JSEvents.keyEvent;
        HEAPF64[((keyEventData)>>3)] = e.timeStamp;
  
        var idx = keyEventData >> 2;
  
        HEAP32[idx + 2] = e.location;
        HEAP32[idx + 3] = e.ctrlKey;
        HEAP32[idx + 4] = e.shiftKey;
        HEAP32[idx + 5] = e.altKey;
        HEAP32[idx + 6] = e.metaKey;
        HEAP32[idx + 7] = e.repeat;
        HEAP32[idx + 8] = e.charCode;
        HEAP32[idx + 9] = e.keyCode;
        HEAP32[idx + 10] = e.which;
        stringToUTF8(e.key || '', keyEventData + 44, 32);
        stringToUTF8(e.code || '', keyEventData + 76, 32);
        stringToUTF8(e.char || '', keyEventData + 108, 32);
        stringToUTF8(e.locale || '', keyEventData + 140, 32);
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, keyEventData, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target: findEventTarget(target),
        allowsDeferredCalls: true,
        eventTypeString: eventTypeString,
        callbackfunc: callbackfunc,
        handlerFunc: keyEventHandlerFunc,
        useCapture: useCapture
      };
      JSEvents.registerOrRemoveHandler(eventHandler);
    }
  function _emscripten_set_keydown_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      registerKeyEventCallback(target, userData, useCapture, callbackfunc, 2, "keydown", targetThread);
      return 0;
    }

  function _emscripten_set_keyup_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      registerKeyEventCallback(target, userData, useCapture, callbackfunc, 3, "keyup", targetThread);
      return 0;
    }

  
  function handleException(e) {
      // Certain exception types we do not treat as errors since they are used for
      // internal control flow.
      // 1. ExitStatus, which is thrown by exit()
      // 2. "unwind", which is thrown by emscripten_unwind_to_js_event_loop() and others
      //    that wish to return to JS event loop.
      if (e instanceof ExitStatus || e == 'unwind') {
        return EXITSTATUS;
      }
      quit_(1, e);
    }
  
  
  function _proc_exit(code) {
      EXITSTATUS = code;
      if (!keepRuntimeAlive()) {
        if (Module['onExit']) Module['onExit'](code);
        ABORT = true;
      }
      quit_(code, new ExitStatus(code));
    }
  /** @suppress {duplicate } */
  /** @param {boolean|number=} implicit */
  function exitJS(status, implicit) {
      EXITSTATUS = status;
  
      _proc_exit(status);
    }
  var _exit = exitJS;
  
  function maybeExit() {
      if (!keepRuntimeAlive()) {
        try {
          _exit(EXITSTATUS);
        } catch (e) {
          handleException(e);
        }
      }
    }
  function callUserCallback(func) {
      if (ABORT) {
        return;
      }
      try {
        func();
        maybeExit();
      } catch (e) {
        handleException(e);
      }
    }
  
  /** @param {number=} timeout */
  function safeSetTimeout(func, timeout) {
      
      return setTimeout(() => {
        
        callUserCallback(func);
      }, timeout);
    }
  
  function warnOnce(text) {
      if (!warnOnce.shown) warnOnce.shown = {};
      if (!warnOnce.shown[text]) {
        warnOnce.shown[text] = 1;
        if (ENVIRONMENT_IS_NODE) text = 'warning: ' + text;
        err(text);
      }
    }
  
  
  
  var Browser = {mainLoop:{running:false,scheduler:null,method:"",currentlyRunningMainloop:0,func:null,arg:0,timingMode:0,timingValue:0,currentFrameNumber:0,queue:[],pause:function() {
          Browser.mainLoop.scheduler = null;
          // Incrementing this signals the previous main loop that it's now become old, and it must return.
          Browser.mainLoop.currentlyRunningMainloop++;
        },resume:function() {
          Browser.mainLoop.currentlyRunningMainloop++;
          var timingMode = Browser.mainLoop.timingMode;
          var timingValue = Browser.mainLoop.timingValue;
          var func = Browser.mainLoop.func;
          Browser.mainLoop.func = null;
          // do not set timing and call scheduler, we will do it on the next lines
          setMainLoop(func, 0, false, Browser.mainLoop.arg, true);
          _emscripten_set_main_loop_timing(timingMode, timingValue);
          Browser.mainLoop.scheduler();
        },updateStatus:function() {
          if (Module['setStatus']) {
            var message = Module['statusMessage'] || 'Please wait...';
            var remaining = Browser.mainLoop.remainingBlockers;
            var expected = Browser.mainLoop.expectedBlockers;
            if (remaining) {
              if (remaining < expected) {
                Module['setStatus'](message + ' (' + (expected - remaining) + '/' + expected + ')');
              } else {
                Module['setStatus'](message);
              }
            } else {
              Module['setStatus']('');
            }
          }
        },runIter:function(func) {
          if (ABORT) return;
          if (Module['preMainLoop']) {
            var preRet = Module['preMainLoop']();
            if (preRet === false) {
              return; // |return false| skips a frame
            }
          }
          callUserCallback(func);
          if (Module['postMainLoop']) Module['postMainLoop']();
        }},isFullscreen:false,pointerLock:false,moduleContextCreatedCallbacks:[],workers:[],init:function() {
        if (Browser.initted) return;
        Browser.initted = true;
  
        // Support for plugins that can process preloaded files. You can add more of these to
        // your app by creating and appending to preloadPlugins.
        //
        // Each plugin is asked if it can handle a file based on the file's name. If it can,
        // it is given the file's raw data. When it is done, it calls a callback with the file's
        // (possibly modified) data. For example, a plugin might decompress a file, or it
        // might create some side data structure for use later (like an Image element, etc.).
  
        var imagePlugin = {};
        imagePlugin['canHandle'] = function imagePlugin_canHandle(name) {
          return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name);
        };
        imagePlugin['handle'] = function imagePlugin_handle(byteArray, name, onload, onerror) {
          var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
          if (b.size !== byteArray.length) { // Safari bug #118630
            // Safari's Blob can only take an ArrayBuffer
            b = new Blob([(new Uint8Array(byteArray)).buffer], { type: Browser.getMimetype(name) });
          }
          var url = URL.createObjectURL(b);
          var img = new Image();
          img.onload = () => {
            assert(img.complete, 'Image ' + name + ' could not be decoded');
            var canvas = /** @type {!HTMLCanvasElement} */ (document.createElement('canvas'));
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            preloadedImages[name] = canvas;
            URL.revokeObjectURL(url);
            if (onload) onload(byteArray);
          };
          img.onerror = (event) => {
            out('Image ' + url + ' could not be decoded');
            if (onerror) onerror();
          };
          img.src = url;
        };
        preloadPlugins.push(imagePlugin);
  
        var audioPlugin = {};
        audioPlugin['canHandle'] = function audioPlugin_canHandle(name) {
          return !Module.noAudioDecoding && name.substr(-4) in { '.ogg': 1, '.wav': 1, '.mp3': 1 };
        };
        audioPlugin['handle'] = function audioPlugin_handle(byteArray, name, onload, onerror) {
          var done = false;
          function finish(audio) {
            if (done) return;
            done = true;
            preloadedAudios[name] = audio;
            if (onload) onload(byteArray);
          }
          function fail() {
            if (done) return;
            done = true;
            preloadedAudios[name] = new Audio(); // empty shim
            if (onerror) onerror();
          }
          var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
          var url = URL.createObjectURL(b); // XXX we never revoke this!
          var audio = new Audio();
          audio.addEventListener('canplaythrough', () => finish(audio), false); // use addEventListener due to chromium bug 124926
          audio.onerror = function audio_onerror(event) {
            if (done) return;
            err('warning: browser could not fully decode audio ' + name + ', trying slower base64 approach');
            function encode64(data) {
              var BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
              var PAD = '=';
              var ret = '';
              var leftchar = 0;
              var leftbits = 0;
              for (var i = 0; i < data.length; i++) {
                leftchar = (leftchar << 8) | data[i];
                leftbits += 8;
                while (leftbits >= 6) {
                  var curr = (leftchar >> (leftbits-6)) & 0x3f;
                  leftbits -= 6;
                  ret += BASE[curr];
                }
              }
              if (leftbits == 2) {
                ret += BASE[(leftchar&3) << 4];
                ret += PAD + PAD;
              } else if (leftbits == 4) {
                ret += BASE[(leftchar&0xf) << 2];
                ret += PAD;
              }
              return ret;
            }
            audio.src = 'data:audio/x-' + name.substr(-3) + ';base64,' + encode64(byteArray);
            finish(audio); // we don't wait for confirmation this worked - but it's worth trying
          };
          audio.src = url;
          // workaround for chrome bug 124926 - we do not always get oncanplaythrough or onerror
          safeSetTimeout(() => {
            finish(audio); // try to use it even though it is not necessarily ready to play
          }, 10000);
        };
        preloadPlugins.push(audioPlugin);
  
        // Canvas event setup
  
        function pointerLockChange() {
          Browser.pointerLock = document['pointerLockElement'] === Module['canvas'] ||
                                document['mozPointerLockElement'] === Module['canvas'] ||
                                document['webkitPointerLockElement'] === Module['canvas'] ||
                                document['msPointerLockElement'] === Module['canvas'];
        }
        var canvas = Module['canvas'];
        if (canvas) {
          // forced aspect ratio can be enabled by defining 'forcedAspectRatio' on Module
          // Module['forcedAspectRatio'] = 4 / 3;
  
          canvas.requestPointerLock = canvas['requestPointerLock'] ||
                                      canvas['mozRequestPointerLock'] ||
                                      canvas['webkitRequestPointerLock'] ||
                                      canvas['msRequestPointerLock'] ||
                                      (() => {});
          canvas.exitPointerLock = document['exitPointerLock'] ||
                                   document['mozExitPointerLock'] ||
                                   document['webkitExitPointerLock'] ||
                                   document['msExitPointerLock'] ||
                                   (() => {}); // no-op if function does not exist
          canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
  
          document.addEventListener('pointerlockchange', pointerLockChange, false);
          document.addEventListener('mozpointerlockchange', pointerLockChange, false);
          document.addEventListener('webkitpointerlockchange', pointerLockChange, false);
          document.addEventListener('mspointerlockchange', pointerLockChange, false);
  
          if (Module['elementPointerLock']) {
            canvas.addEventListener("click", (ev) => {
              if (!Browser.pointerLock && Module['canvas'].requestPointerLock) {
                Module['canvas'].requestPointerLock();
                ev.preventDefault();
              }
            }, false);
          }
        }
      },createContext:function(/** @type {HTMLCanvasElement} */ canvas, useWebGL, setInModule, webGLContextAttributes) {
        if (useWebGL && Module.ctx && canvas == Module.canvas) return Module.ctx; // no need to recreate GL context if it's already been created for this canvas.
  
        var ctx;
        var contextHandle;
        if (useWebGL) {
          // For GLES2/desktop GL compatibility, adjust a few defaults to be different to WebGL defaults, so that they align better with the desktop defaults.
          var contextAttributes = {
            antialias: false,
            alpha: false,
            majorVersion: 1,
          };
  
          if (webGLContextAttributes) {
            for (var attribute in webGLContextAttributes) {
              contextAttributes[attribute] = webGLContextAttributes[attribute];
            }
          }
  
          // This check of existence of GL is here to satisfy Closure compiler, which yells if variable GL is referenced below but GL object is not
          // actually compiled in because application is not doing any GL operations. TODO: Ideally if GL is not being used, this function
          // Browser.createContext() should not even be emitted.
          if (typeof GL != 'undefined') {
            contextHandle = GL.createContext(canvas, contextAttributes);
            if (contextHandle) {
              ctx = GL.getContext(contextHandle).GLctx;
            }
          }
        } else {
          ctx = canvas.getContext('2d');
        }
  
        if (!ctx) return null;
  
        if (setInModule) {
          if (!useWebGL) assert(typeof GLctx == 'undefined', 'cannot set in module if GLctx is used, but we are a non-GL context that would replace it');
  
          Module.ctx = ctx;
          if (useWebGL) GL.makeContextCurrent(contextHandle);
          Module.useWebGL = useWebGL;
          Browser.moduleContextCreatedCallbacks.forEach((callback) => callback());
          Browser.init();
        }
        return ctx;
      },destroyContext:function(canvas, useWebGL, setInModule) {},fullscreenHandlersInstalled:false,lockPointer:undefined,resizeCanvas:undefined,requestFullscreen:function(lockPointer, resizeCanvas) {
        Browser.lockPointer = lockPointer;
        Browser.resizeCanvas = resizeCanvas;
        if (typeof Browser.lockPointer == 'undefined') Browser.lockPointer = true;
        if (typeof Browser.resizeCanvas == 'undefined') Browser.resizeCanvas = false;
  
        var canvas = Module['canvas'];
        function fullscreenChange() {
          Browser.isFullscreen = false;
          var canvasContainer = canvas.parentNode;
          if ((document['fullscreenElement'] || document['mozFullScreenElement'] ||
               document['msFullscreenElement'] || document['webkitFullscreenElement'] ||
               document['webkitCurrentFullScreenElement']) === canvasContainer) {
            canvas.exitFullscreen = Browser.exitFullscreen;
            if (Browser.lockPointer) canvas.requestPointerLock();
            Browser.isFullscreen = true;
            if (Browser.resizeCanvas) {
              Browser.setFullscreenCanvasSize();
            } else {
              Browser.updateCanvasDimensions(canvas);
            }
          } else {
            // remove the full screen specific parent of the canvas again to restore the HTML structure from before going full screen
            canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
            canvasContainer.parentNode.removeChild(canvasContainer);
  
            if (Browser.resizeCanvas) {
              Browser.setWindowedCanvasSize();
            } else {
              Browser.updateCanvasDimensions(canvas);
            }
          }
          if (Module['onFullScreen']) Module['onFullScreen'](Browser.isFullscreen);
          if (Module['onFullscreen']) Module['onFullscreen'](Browser.isFullscreen);
        }
  
        if (!Browser.fullscreenHandlersInstalled) {
          Browser.fullscreenHandlersInstalled = true;
          document.addEventListener('fullscreenchange', fullscreenChange, false);
          document.addEventListener('mozfullscreenchange', fullscreenChange, false);
          document.addEventListener('webkitfullscreenchange', fullscreenChange, false);
          document.addEventListener('MSFullscreenChange', fullscreenChange, false);
        }
  
        // create a new parent to ensure the canvas has no siblings. this allows browsers to optimize full screen performance when its parent is the full screen root
        var canvasContainer = document.createElement("div");
        canvas.parentNode.insertBefore(canvasContainer, canvas);
        canvasContainer.appendChild(canvas);
  
        // use parent of canvas as full screen root to allow aspect ratio correction (Firefox stretches the root to screen size)
        canvasContainer.requestFullscreen = canvasContainer['requestFullscreen'] ||
                                            canvasContainer['mozRequestFullScreen'] ||
                                            canvasContainer['msRequestFullscreen'] ||
                                           (canvasContainer['webkitRequestFullscreen'] ? () => canvasContainer['webkitRequestFullscreen'](Element['ALLOW_KEYBOARD_INPUT']) : null) ||
                                           (canvasContainer['webkitRequestFullScreen'] ? () => canvasContainer['webkitRequestFullScreen'](Element['ALLOW_KEYBOARD_INPUT']) : null);
  
        canvasContainer.requestFullscreen();
      },exitFullscreen:function() {
        // This is workaround for chrome. Trying to exit from fullscreen
        // not in fullscreen state will cause "TypeError: Document not active"
        // in chrome. See https://github.com/emscripten-core/emscripten/pull/8236
        if (!Browser.isFullscreen) {
          return false;
        }
  
        var CFS = document['exitFullscreen'] ||
                  document['cancelFullScreen'] ||
                  document['mozCancelFullScreen'] ||
                  document['msExitFullscreen'] ||
                  document['webkitCancelFullScreen'] ||
            (() => {});
        CFS.apply(document, []);
        return true;
      },nextRAF:0,fakeRequestAnimationFrame:function(func) {
        // try to keep 60fps between calls to here
        var now = Date.now();
        if (Browser.nextRAF === 0) {
          Browser.nextRAF = now + 1000/60;
        } else {
          while (now + 2 >= Browser.nextRAF) { // fudge a little, to avoid timer jitter causing us to do lots of delay:0
            Browser.nextRAF += 1000/60;
          }
        }
        var delay = Math.max(Browser.nextRAF - now, 0);
        setTimeout(func, delay);
      },requestAnimationFrame:function(func) {
        if (typeof requestAnimationFrame == 'function') {
          requestAnimationFrame(func);
          return;
        }
        var RAF = Browser.fakeRequestAnimationFrame;
        RAF(func);
      },safeSetTimeout:function(func, timeout) {
        // Legacy function, this is used by the SDL2 port so we need to keep it
        // around at least until that is updated.
        // See https://github.com/libsdl-org/SDL/pull/6304
        return safeSetTimeout(func, timeout);
      },safeRequestAnimationFrame:function(func) {
        
        return Browser.requestAnimationFrame(() => {
          
          callUserCallback(func);
        });
      },getMimetype:function(name) {
        return {
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'png': 'image/png',
          'bmp': 'image/bmp',
          'ogg': 'audio/ogg',
          'wav': 'audio/wav',
          'mp3': 'audio/mpeg'
        }[name.substr(name.lastIndexOf('.')+1)];
      },getUserMedia:function(func) {
        if (!window.getUserMedia) {
          window.getUserMedia = navigator['getUserMedia'] ||
                                navigator['mozGetUserMedia'];
        }
        window.getUserMedia(func);
      },getMovementX:function(event) {
        return event['movementX'] ||
               event['mozMovementX'] ||
               event['webkitMovementX'] ||
               0;
      },getMovementY:function(event) {
        return event['movementY'] ||
               event['mozMovementY'] ||
               event['webkitMovementY'] ||
               0;
      },getMouseWheelDelta:function(event) {
        var delta = 0;
        switch (event.type) {
          case 'DOMMouseScroll':
            // 3 lines make up a step
            delta = event.detail / 3;
            break;
          case 'mousewheel':
            // 120 units make up a step
            delta = event.wheelDelta / 120;
            break;
          case 'wheel':
            delta = event.deltaY
            switch (event.deltaMode) {
              case 0:
                // DOM_DELTA_PIXEL: 100 pixels make up a step
                delta /= 100;
                break;
              case 1:
                // DOM_DELTA_LINE: 3 lines make up a step
                delta /= 3;
                break;
              case 2:
                // DOM_DELTA_PAGE: A page makes up 80 steps
                delta *= 80;
                break;
              default:
                throw 'unrecognized mouse wheel delta mode: ' + event.deltaMode;
            }
            break;
          default:
            throw 'unrecognized mouse wheel event: ' + event.type;
        }
        return delta;
      },mouseX:0,mouseY:0,mouseMovementX:0,mouseMovementY:0,touches:{},lastTouches:{},calculateMouseEvent:function(event) { // event should be mousemove, mousedown or mouseup
        if (Browser.pointerLock) {
          // When the pointer is locked, calculate the coordinates
          // based on the movement of the mouse.
          // Workaround for Firefox bug 764498
          if (event.type != 'mousemove' &&
              ('mozMovementX' in event)) {
            Browser.mouseMovementX = Browser.mouseMovementY = 0;
          } else {
            Browser.mouseMovementX = Browser.getMovementX(event);
            Browser.mouseMovementY = Browser.getMovementY(event);
          }
  
          // check if SDL is available
          if (typeof SDL != "undefined") {
            Browser.mouseX = SDL.mouseX + Browser.mouseMovementX;
            Browser.mouseY = SDL.mouseY + Browser.mouseMovementY;
          } else {
            // just add the mouse delta to the current absolut mouse position
            // FIXME: ideally this should be clamped against the canvas size and zero
            Browser.mouseX += Browser.mouseMovementX;
            Browser.mouseY += Browser.mouseMovementY;
          }
        } else {
          // Otherwise, calculate the movement based on the changes
          // in the coordinates.
          var rect = Module["canvas"].getBoundingClientRect();
          var cw = Module["canvas"].width;
          var ch = Module["canvas"].height;
  
          // Neither .scrollX or .pageXOffset are defined in a spec, but
          // we prefer .scrollX because it is currently in a spec draft.
          // (see: http://www.w3.org/TR/2013/WD-cssom-view-20131217/)
          var scrollX = ((typeof window.scrollX != 'undefined') ? window.scrollX : window.pageXOffset);
          var scrollY = ((typeof window.scrollY != 'undefined') ? window.scrollY : window.pageYOffset);
  
          if (event.type === 'touchstart' || event.type === 'touchend' || event.type === 'touchmove') {
            var touch = event.touch;
            if (touch === undefined) {
              return; // the "touch" property is only defined in SDL
  
            }
            var adjustedX = touch.pageX - (scrollX + rect.left);
            var adjustedY = touch.pageY - (scrollY + rect.top);
  
            adjustedX = adjustedX * (cw / rect.width);
            adjustedY = adjustedY * (ch / rect.height);
  
            var coords = { x: adjustedX, y: adjustedY };
  
            if (event.type === 'touchstart') {
              Browser.lastTouches[touch.identifier] = coords;
              Browser.touches[touch.identifier] = coords;
            } else if (event.type === 'touchend' || event.type === 'touchmove') {
              var last = Browser.touches[touch.identifier];
              if (!last) last = coords;
              Browser.lastTouches[touch.identifier] = last;
              Browser.touches[touch.identifier] = coords;
            }
            return;
          }
  
          var x = event.pageX - (scrollX + rect.left);
          var y = event.pageY - (scrollY + rect.top);
  
          // the canvas might be CSS-scaled compared to its backbuffer;
          // SDL-using content will want mouse coordinates in terms
          // of backbuffer units.
          x = x * (cw / rect.width);
          y = y * (ch / rect.height);
  
          Browser.mouseMovementX = x - Browser.mouseX;
          Browser.mouseMovementY = y - Browser.mouseY;
          Browser.mouseX = x;
          Browser.mouseY = y;
        }
      },resizeListeners:[],updateResizeListeners:function() {
        var canvas = Module['canvas'];
        Browser.resizeListeners.forEach((listener) => listener(canvas.width, canvas.height));
      },setCanvasSize:function(width, height, noUpdates) {
        var canvas = Module['canvas'];
        Browser.updateCanvasDimensions(canvas, width, height);
        if (!noUpdates) Browser.updateResizeListeners();
      },windowedWidth:0,windowedHeight:0,setFullscreenCanvasSize:function() {
        // check if SDL is available
        if (typeof SDL != "undefined") {
          var flags = HEAPU32[((SDL.screen)>>2)];
          flags = flags | 0x00800000; // set SDL_FULLSCREEN flag
          HEAP32[((SDL.screen)>>2)] = flags;
        }
        Browser.updateCanvasDimensions(Module['canvas']);
        Browser.updateResizeListeners();
      },setWindowedCanvasSize:function() {
        // check if SDL is available
        if (typeof SDL != "undefined") {
          var flags = HEAPU32[((SDL.screen)>>2)];
          flags = flags & ~0x00800000; // clear SDL_FULLSCREEN flag
          HEAP32[((SDL.screen)>>2)] = flags;
        }
        Browser.updateCanvasDimensions(Module['canvas']);
        Browser.updateResizeListeners();
      },updateCanvasDimensions:function(canvas, wNative, hNative) {
        if (wNative && hNative) {
          canvas.widthNative = wNative;
          canvas.heightNative = hNative;
        } else {
          wNative = canvas.widthNative;
          hNative = canvas.heightNative;
        }
        var w = wNative;
        var h = hNative;
        if (Module['forcedAspectRatio'] && Module['forcedAspectRatio'] > 0) {
          if (w/h < Module['forcedAspectRatio']) {
            w = Math.round(h * Module['forcedAspectRatio']);
          } else {
            h = Math.round(w / Module['forcedAspectRatio']);
          }
        }
        if (((document['fullscreenElement'] || document['mozFullScreenElement'] ||
             document['msFullscreenElement'] || document['webkitFullscreenElement'] ||
             document['webkitCurrentFullScreenElement']) === canvas.parentNode) && (typeof screen != 'undefined')) {
           var factor = Math.min(screen.width / w, screen.height / h);
           w = Math.round(w * factor);
           h = Math.round(h * factor);
        }
        if (Browser.resizeCanvas) {
          if (canvas.width  != w) canvas.width  = w;
          if (canvas.height != h) canvas.height = h;
          if (typeof canvas.style != 'undefined') {
            canvas.style.removeProperty( "width");
            canvas.style.removeProperty("height");
          }
        } else {
          if (canvas.width  != wNative) canvas.width  = wNative;
          if (canvas.height != hNative) canvas.height = hNative;
          if (typeof canvas.style != 'undefined') {
            if (w != wNative || h != hNative) {
              canvas.style.setProperty( "width", w + "px", "important");
              canvas.style.setProperty("height", h + "px", "important");
            } else {
              canvas.style.removeProperty( "width");
              canvas.style.removeProperty("height");
            }
          }
        }
      }};
  function _emscripten_set_main_loop_timing(mode, value) {
      Browser.mainLoop.timingMode = mode;
      Browser.mainLoop.timingValue = value;
  
      if (!Browser.mainLoop.func) {
        return 1; // Return non-zero on failure, can't set timing mode when there is no main loop.
      }
  
      if (!Browser.mainLoop.running) {
        
        Browser.mainLoop.running = true;
      }
      if (mode == 0 /*EM_TIMING_SETTIMEOUT*/) {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setTimeout() {
          var timeUntilNextTick = Math.max(0, Browser.mainLoop.tickStartTime + value - _emscripten_get_now())|0;
          setTimeout(Browser.mainLoop.runner, timeUntilNextTick); // doing this each time means that on exception, we stop
        };
        Browser.mainLoop.method = 'timeout';
      } else if (mode == 1 /*EM_TIMING_RAF*/) {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_rAF() {
          Browser.requestAnimationFrame(Browser.mainLoop.runner);
        };
        Browser.mainLoop.method = 'rAF';
      } else if (mode == 2 /*EM_TIMING_SETIMMEDIATE*/) {
        if (typeof setImmediate == 'undefined') {
          // Emulate setImmediate. (note: not a complete polyfill, we don't emulate clearImmediate() to keep code size to minimum, since not needed)
          var setImmediates = [];
          var emscriptenMainLoopMessageId = 'setimmediate';
          /** @param {Event} event */
          var Browser_setImmediate_messageHandler = (event) => {
            // When called in current thread or Worker, the main loop ID is structured slightly different to accommodate for --proxy-to-worker runtime listening to Worker events,
            // so check for both cases.
            if (event.data === emscriptenMainLoopMessageId || event.data.target === emscriptenMainLoopMessageId) {
              event.stopPropagation();
              setImmediates.shift()();
            }
          };
          addEventListener("message", Browser_setImmediate_messageHandler, true);
          setImmediate = /** @type{function(function(): ?, ...?): number} */(function Browser_emulated_setImmediate(func) {
            setImmediates.push(func);
            if (ENVIRONMENT_IS_WORKER) {
              if (Module['setImmediates'] === undefined) Module['setImmediates'] = [];
              Module['setImmediates'].push(func);
              postMessage({target: emscriptenMainLoopMessageId}); // In --proxy-to-worker, route the message via proxyClient.js
            } else postMessage(emscriptenMainLoopMessageId, "*"); // On the main thread, can just send the message to itself.
          })
        }
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setImmediate() {
          setImmediate(Browser.mainLoop.runner);
        };
        Browser.mainLoop.method = 'immediate';
      }
      return 0;
    }
  
  
  
    /**
     * @param {number=} arg
     * @param {boolean=} noSetTiming
     */
  function setMainLoop(browserIterationFunc, fps, simulateInfiniteLoop, arg, noSetTiming) {
      assert(!Browser.mainLoop.func, 'emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.');
  
      Browser.mainLoop.func = browserIterationFunc;
      Browser.mainLoop.arg = arg;
  
      var thisMainLoopId = Browser.mainLoop.currentlyRunningMainloop;
      function checkIsRunning() {
        if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) {
          
          return false;
        }
        return true;
      }
  
      // We create the loop runner here but it is not actually running until
      // _emscripten_set_main_loop_timing is called (which might happen a
      // later time).  This member signifies that the current runner has not
      // yet been started so that we can call runtimeKeepalivePush when it
      // gets it timing set for the first time.
      Browser.mainLoop.running = false;
      Browser.mainLoop.runner = function Browser_mainLoop_runner() {
        if (ABORT) return;
        if (Browser.mainLoop.queue.length > 0) {
          var start = Date.now();
          var blocker = Browser.mainLoop.queue.shift();
          blocker.func(blocker.arg);
          if (Browser.mainLoop.remainingBlockers) {
            var remaining = Browser.mainLoop.remainingBlockers;
            var next = remaining%1 == 0 ? remaining-1 : Math.floor(remaining);
            if (blocker.counted) {
              Browser.mainLoop.remainingBlockers = next;
            } else {
              // not counted, but move the progress along a tiny bit
              next = next + 0.5; // do not steal all the next one's progress
              Browser.mainLoop.remainingBlockers = (8*remaining + next)/9;
            }
          }
          out('main loop blocker "' + blocker.name + '" took ' + (Date.now() - start) + ' ms'); //, left: ' + Browser.mainLoop.remainingBlockers);
          Browser.mainLoop.updateStatus();
  
          // catches pause/resume main loop from blocker execution
          if (!checkIsRunning()) return;
  
          setTimeout(Browser.mainLoop.runner, 0);
          return;
        }
  
        // catch pauses from non-main loop sources
        if (!checkIsRunning()) return;
  
        // Implement very basic swap interval control
        Browser.mainLoop.currentFrameNumber = Browser.mainLoop.currentFrameNumber + 1 | 0;
        if (Browser.mainLoop.timingMode == 1/*EM_TIMING_RAF*/ && Browser.mainLoop.timingValue > 1 && Browser.mainLoop.currentFrameNumber % Browser.mainLoop.timingValue != 0) {
          // Not the scheduled time to render this frame - skip.
          Browser.mainLoop.scheduler();
          return;
        } else if (Browser.mainLoop.timingMode == 0/*EM_TIMING_SETTIMEOUT*/) {
          Browser.mainLoop.tickStartTime = _emscripten_get_now();
        }
  
        // Signal GL rendering layer that processing of a new frame is about to start. This helps it optimize
        // VBO double-buffering and reduce GPU stalls.
  
        Browser.mainLoop.runIter(browserIterationFunc);
  
        // catch pauses from the main loop itself
        if (!checkIsRunning()) return;
  
        // Queue new audio data. This is important to be right after the main loop invocation, so that we will immediately be able
        // to queue the newest produced audio samples.
        // TODO: Consider adding pre- and post- rAF callbacks so that GL.newRenderingFrameStarted() and SDL.audio.queueNewAudioData()
        //       do not need to be hardcoded into this function, but can be more generic.
        if (typeof SDL == 'object' && SDL.audio && SDL.audio.queueNewAudioData) SDL.audio.queueNewAudioData();
  
        Browser.mainLoop.scheduler();
      }
  
      if (!noSetTiming) {
        if (fps && fps > 0) _emscripten_set_main_loop_timing(0/*EM_TIMING_SETTIMEOUT*/, 1000.0 / fps);
        else _emscripten_set_main_loop_timing(1/*EM_TIMING_RAF*/, 1); // Do rAF by rendering each frame (no decimating)
  
        Browser.mainLoop.scheduler();
      }
  
      if (simulateInfiniteLoop) {
        throw 'unwind';
      }
    }
  
  
  function _emscripten_set_main_loop(func, fps, simulateInfiniteLoop) {
      var browserIterationFunc = getWasmTableEntry(func);
      setMainLoop(browserIterationFunc, fps, simulateInfiniteLoop);
    }

  function webgl_enable_ANGLE_instanced_arrays(ctx) {
      // Extension available in WebGL 1 from Firefox 26 and Google Chrome 30 onwards. Core feature in WebGL 2.
      var ext = ctx.getExtension('ANGLE_instanced_arrays');
      if (ext) {
        ctx['vertexAttribDivisor'] = function(index, divisor) { ext['vertexAttribDivisorANGLE'](index, divisor); };
        ctx['drawArraysInstanced'] = function(mode, first, count, primcount) { ext['drawArraysInstancedANGLE'](mode, first, count, primcount); };
        ctx['drawElementsInstanced'] = function(mode, count, type, indices, primcount) { ext['drawElementsInstancedANGLE'](mode, count, type, indices, primcount); };
        return 1;
      }
    }
  
  function webgl_enable_OES_vertex_array_object(ctx) {
      // Extension available in WebGL 1 from Firefox 25 and WebKit 536.28/desktop Safari 6.0.3 onwards. Core feature in WebGL 2.
      var ext = ctx.getExtension('OES_vertex_array_object');
      if (ext) {
        ctx['createVertexArray'] = function() { return ext['createVertexArrayOES'](); };
        ctx['deleteVertexArray'] = function(vao) { ext['deleteVertexArrayOES'](vao); };
        ctx['bindVertexArray'] = function(vao) { ext['bindVertexArrayOES'](vao); };
        ctx['isVertexArray'] = function(vao) { return ext['isVertexArrayOES'](vao); };
        return 1;
      }
    }
  
  function webgl_enable_WEBGL_draw_buffers(ctx) {
      // Extension available in WebGL 1 from Firefox 28 onwards. Core feature in WebGL 2.
      var ext = ctx.getExtension('WEBGL_draw_buffers');
      if (ext) {
        ctx['drawBuffers'] = function(n, bufs) { ext['drawBuffersWEBGL'](n, bufs); };
        return 1;
      }
    }
  
  function webgl_enable_WEBGL_multi_draw(ctx) {
      // Closure is expected to be allowed to minify the '.multiDrawWebgl' property, so not accessing it quoted.
      return !!(ctx.multiDrawWebgl = ctx.getExtension('WEBGL_multi_draw'));
    }
  
  
  var GL = {counter:1,buffers:[],programs:[],framebuffers:[],renderbuffers:[],textures:[],shaders:[],vaos:[],contexts:[],offscreenCanvases:{},queries:[],stringCache:{},unpackAlignment:4,recordError:function recordError(errorCode) {
        if (!GL.lastError) {
          GL.lastError = errorCode;
        }
      },getNewId:function(table) {
        var ret = GL.counter++;
        for (var i = table.length; i < ret; i++) {
          table[i] = null;
        }
        return ret;
      },getSource:function(shader, count, string, length) {
        var source = '';
        for (var i = 0; i < count; ++i) {
          var len = length ? HEAP32[(((length)+(i*4))>>2)] : -1;
          source += UTF8ToString(HEAP32[(((string)+(i*4))>>2)], len < 0 ? undefined : len);
        }
        return source;
      },createContext:function(/** @type {HTMLCanvasElement} */ canvas, webGLContextAttributes) {
  
        // BUG: Workaround Safari WebGL issue: After successfully acquiring WebGL context on a canvas,
        // calling .getContext() will always return that context independent of which 'webgl' or 'webgl2'
        // context version was passed. See https://bugs.webkit.org/show_bug.cgi?id=222758 and
        // https://github.com/emscripten-core/emscripten/issues/13295.
        // TODO: Once the bug is fixed and shipped in Safari, adjust the Safari version field in above check.
        if (!canvas.getContextSafariWebGL2Fixed) {
          canvas.getContextSafariWebGL2Fixed = canvas.getContext;
          /** @type {function(this:HTMLCanvasElement, string, (Object|null)=): (Object|null)} */
          function fixedGetContext(ver, attrs) {
            var gl = canvas.getContextSafariWebGL2Fixed(ver, attrs);
            return ((ver == 'webgl') == (gl instanceof WebGLRenderingContext)) ? gl : null;
          }
          canvas.getContext = fixedGetContext;
        }
  
        var ctx =
          (canvas.getContext("webgl", webGLContextAttributes)
            // https://caniuse.com/#feat=webgl
            );
  
        if (!ctx) return 0;
  
        var handle = GL.registerContext(ctx, webGLContextAttributes);
  
        return handle;
      },registerContext:function(ctx, webGLContextAttributes) {
        // without pthreads a context is just an integer ID
        var handle = GL.getNewId(GL.contexts);
  
        var context = {
          handle: handle,
          attributes: webGLContextAttributes,
          version: webGLContextAttributes.majorVersion,
          GLctx: ctx
        };
  
        // Store the created context object so that we can access the context given a canvas without having to pass the parameters again.
        if (ctx.canvas) ctx.canvas.GLctxObject = context;
        GL.contexts[handle] = context;
        if (typeof webGLContextAttributes.enableExtensionsByDefault == 'undefined' || webGLContextAttributes.enableExtensionsByDefault) {
          GL.initExtensions(context);
        }
  
        return handle;
      },makeContextCurrent:function(contextHandle) {
  
        GL.currentContext = GL.contexts[contextHandle]; // Active Emscripten GL layer context object.
        Module.ctx = GLctx = GL.currentContext && GL.currentContext.GLctx; // Active WebGL context object.
        return !(contextHandle && !GLctx);
      },getContext:function(contextHandle) {
        return GL.contexts[contextHandle];
      },deleteContext:function(contextHandle) {
        if (GL.currentContext === GL.contexts[contextHandle]) GL.currentContext = null;
        if (typeof JSEvents == 'object') JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas); // Release all JS event handlers on the DOM element that the GL context is associated with since the context is now deleted.
        if (GL.contexts[contextHandle] && GL.contexts[contextHandle].GLctx.canvas) GL.contexts[contextHandle].GLctx.canvas.GLctxObject = undefined; // Make sure the canvas object no longer refers to the context object so there are no GC surprises.
        GL.contexts[contextHandle] = null;
      },initExtensions:function(context) {
        // If this function is called without a specific context object, init the extensions of the currently active context.
        if (!context) context = GL.currentContext;
  
        if (context.initExtensionsDone) return;
        context.initExtensionsDone = true;
  
        var GLctx = context.GLctx;
  
        // Detect the presence of a few extensions manually, this GL interop layer itself will need to know if they exist.
  
        // Extensions that are only available in WebGL 1 (the calls will be no-ops if called on a WebGL 2 context active)
        webgl_enable_ANGLE_instanced_arrays(GLctx);
        webgl_enable_OES_vertex_array_object(GLctx);
        webgl_enable_WEBGL_draw_buffers(GLctx);
  
        {
          GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query");
        }
  
        webgl_enable_WEBGL_multi_draw(GLctx);
  
        // .getSupportedExtensions() can return null if context is lost, so coerce to empty array.
        var exts = GLctx.getSupportedExtensions() || [];
        exts.forEach(function(ext) {
          // WEBGL_lose_context, WEBGL_debug_renderer_info and WEBGL_debug_shaders are not enabled by default.
          if (!ext.includes('lose_context') && !ext.includes('debug')) {
            // Call .getExtension() to enable that extension permanently.
            GLctx.getExtension(ext);
          }
        });
      }};
  
  
  var emscripten_webgl_power_preferences = ['default', 'low-power', 'high-performance'];
  
  
  function findCanvasEventTarget(target) { return findEventTarget(target); }
  
  /** @suppress {duplicate } */
  function _emscripten_webgl_do_create_context(target, attributes) {
      var a = attributes >> 2;
      var powerPreference = HEAP32[a + (24>>2)];
      var contextAttributes = {
        'alpha': !!HEAP32[a + (0>>2)],
        'depth': !!HEAP32[a + (4>>2)],
        'stencil': !!HEAP32[a + (8>>2)],
        'antialias': !!HEAP32[a + (12>>2)],
        'premultipliedAlpha': !!HEAP32[a + (16>>2)],
        'preserveDrawingBuffer': !!HEAP32[a + (20>>2)],
        'powerPreference': emscripten_webgl_power_preferences[powerPreference],
        'failIfMajorPerformanceCaveat': !!HEAP32[a + (28>>2)],
        // The following are not predefined WebGL context attributes in the WebGL specification, so the property names can be minified by Closure.
        majorVersion: HEAP32[a + (32>>2)],
        minorVersion: HEAP32[a + (36>>2)],
        enableExtensionsByDefault: HEAP32[a + (40>>2)],
        explicitSwapControl: HEAP32[a + (44>>2)],
        proxyContextToMainThread: HEAP32[a + (48>>2)],
        renderViaOffscreenBackBuffer: HEAP32[a + (52>>2)]
      };
  
      var canvas = findCanvasEventTarget(target);
  
      if (!canvas) {
        return 0;
      }
  
      if (contextAttributes.explicitSwapControl) {
        return 0;
      }
  
      var contextHandle = GL.createContext(canvas, contextAttributes);
      return contextHandle;
    }
  var _emscripten_webgl_create_context = _emscripten_webgl_do_create_context;

  function _emscripten_webgl_init_context_attributes(attributes) {
      var a = attributes >> 2;
      for (var i = 0; i < (56>>2); ++i) {
        HEAP32[a+i] = 0;
      }
  
      HEAP32[a + (0>>2)] =
      HEAP32[a + (4>>2)] = 
      HEAP32[a + (12>>2)] = 
      HEAP32[a + (16>>2)] = 
      HEAP32[a + (32>>2)] = 
      HEAP32[a + (40>>2)] = 1;
  
    }

  function _emscripten_webgl_make_context_current(contextHandle) {
      var success = GL.makeContextCurrent(contextHandle);
      return success ? 0 : -5;
    }


  function _fd_close(fd) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      FS.close(stream);
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }

  /** @param {number=} offset */
  function doReadv(stream, iov, iovcnt, offset) {
      var ret = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[((iov)>>2)];
        var len = HEAPU32[(((iov)+(4))>>2)];
        iov += 8;
        var curr = FS.read(stream, HEAP8,ptr, len, offset);
        if (curr < 0) return -1;
        ret += curr;
        if (curr < len) break; // nothing more to read
        if (typeof offset !== 'undefined') {
          offset += curr;
        }
      }
      return ret;
    }
  
  function _fd_read(fd, iov, iovcnt, pnum) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = doReadv(stream, iov, iovcnt);
      HEAPU32[((pnum)>>2)] = num;
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }

  function convertI32PairToI53Checked(lo, hi) {
      return ((hi + 0x200000) >>> 0 < 0x400001 - !!lo) ? (lo >>> 0) + hi * 4294967296 : NaN;
    }
  
  
  
  
  function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
  try {
  
      var offset = convertI32PairToI53Checked(offset_low, offset_high); if (isNaN(offset)) return 61;
      var stream = SYSCALLS.getStreamFromFD(fd);
      FS.llseek(stream, offset, whence);
      (tempI64 = [stream.position>>>0,(tempDouble=stream.position,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[((newOffset)>>2)] = tempI64[0],HEAP32[(((newOffset)+(4))>>2)] = tempI64[1]);
      if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null; // reset readdir state
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }

  /** @param {number=} offset */
  function doWritev(stream, iov, iovcnt, offset) {
      var ret = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[((iov)>>2)];
        var len = HEAPU32[(((iov)+(4))>>2)];
        iov += 8;
        var curr = FS.write(stream, HEAP8,ptr, len, offset);
        if (curr < 0) return -1;
        ret += curr;
        if (typeof offset !== 'undefined') {
          offset += curr;
        }
      }
      return ret;
    }
  
  function _fd_write(fd, iov, iovcnt, pnum) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = doWritev(stream, iov, iovcnt);
      HEAPU32[((pnum)>>2)] = num;
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }

  function _glActiveTexture(x0) { GLctx.activeTexture(x0) }

  function _glAttachShader(program, shader) {
      GLctx.attachShader(GL.programs[program], GL.shaders[shader]);
    }

  function _glBindBuffer(target, buffer) {
  
      GLctx.bindBuffer(target, GL.buffers[buffer]);
    }

  function _glBindTexture(target, texture) {
      GLctx.bindTexture(target, GL.textures[texture]);
    }

  function _glBlendFunc(x0, x1) { GLctx.blendFunc(x0, x1) }

  function _glBufferData(target, size, data, usage) {
  
        // N.b. here first form specifies a heap subarray, second form an integer size, so the ?: code here is polymorphic. It is advised to avoid
        // randomly mixing both uses in calling code, to avoid any potential JS engine JIT issues.
        GLctx.bufferData(target, data ? HEAPU8.subarray(data, data+size) : size, usage);
    }

  function _glClear(x0) { GLctx.clear(x0) }

  function _glClearColor(x0, x1, x2, x3) { GLctx.clearColor(x0, x1, x2, x3) }

  function _glCompileShader(shader) {
      GLctx.compileShader(GL.shaders[shader]);
    }

  function _glCreateProgram() {
      var id = GL.getNewId(GL.programs);
      var program = GLctx.createProgram();
      // Store additional information needed for each shader program:
      program.name = id;
      // Lazy cache results of glGetProgramiv(GL_ACTIVE_UNIFORM_MAX_LENGTH/GL_ACTIVE_ATTRIBUTE_MAX_LENGTH/GL_ACTIVE_UNIFORM_BLOCK_MAX_NAME_LENGTH)
      program.maxUniformLength = program.maxAttributeLength = program.maxUniformBlockNameLength = 0;
      program.uniformIdCounter = 1;
      GL.programs[id] = program;
      return id;
    }

  function _glCreateShader(shaderType) {
      var id = GL.getNewId(GL.shaders);
      GL.shaders[id] = GLctx.createShader(shaderType);
  
      return id;
    }

  function _glDepthFunc(x0) { GLctx.depthFunc(x0) }

  function _glDepthMask(flag) {
      GLctx.depthMask(!!flag);
    }

  function _glDisable(x0) { GLctx.disable(x0) }

  function _glDisableVertexAttribArray(index) {
      GLctx.disableVertexAttribArray(index);
    }

  function _glDrawArrays(mode, first, count) {
  
      GLctx.drawArrays(mode, first, count);
  
    }

  function _glEnable(x0) { GLctx.enable(x0) }

  function _glEnableVertexAttribArray(index) {
      GLctx.enableVertexAttribArray(index);
    }

  function __glGenObject(n, buffers, createFunction, objectTable
      ) {
      for (var i = 0; i < n; i++) {
        var buffer = GLctx[createFunction]();
        var id = buffer && GL.getNewId(objectTable);
        if (buffer) {
          buffer.name = id;
          objectTable[id] = buffer;
        } else {
          GL.recordError(0x502 /* GL_INVALID_OPERATION */);
        }
        HEAP32[(((buffers)+(i*4))>>2)] = id;
      }
    }
  
  function _glGenBuffers(n, buffers) {
      __glGenObject(n, buffers, 'createBuffer', GL.buffers
        );
    }

  
  function _glGenTextures(n, textures) {
      __glGenObject(n, textures, 'createTexture', GL.textures
        );
    }

  
  function _glGetAttribLocation(program, name) {
      return GLctx.getAttribLocation(GL.programs[program], UTF8ToString(name));
    }

  
  function _glGetShaderInfoLog(shader, maxLength, length, infoLog) {
      var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
      if (log === null) log = '(unknown error)';
      var numBytesWrittenExclNull = (maxLength > 0 && infoLog) ? stringToUTF8(log, infoLog, maxLength) : 0;
      if (length) HEAP32[((length)>>2)] = numBytesWrittenExclNull;
    }

  function _glGetShaderiv(shader, pname, p) {
      if (!p) {
        // GLES2 specification does not specify how to behave if p is a null pointer. Since calling this function does not make sense
        // if p == null, issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      if (pname == 0x8B84) { // GL_INFO_LOG_LENGTH
        var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
        if (log === null) log = '(unknown error)';
        // The GLES2 specification says that if the shader has an empty info log,
        // a value of 0 is returned. Otherwise the log has a null char appended.
        // (An empty string is falsey, so we can just check that instead of
        // looking at log.length.)
        var logLength = log ? log.length + 1 : 0;
        HEAP32[((p)>>2)] = logLength;
      } else if (pname == 0x8B88) { // GL_SHADER_SOURCE_LENGTH
        var source = GLctx.getShaderSource(GL.shaders[shader]);
        // source may be a null, or the empty string, both of which are falsey
        // values that we report a 0 length for.
        var sourceLength = source ? source.length + 1 : 0;
        HEAP32[((p)>>2)] = sourceLength;
      } else {
        HEAP32[((p)>>2)] = GLctx.getShaderParameter(GL.shaders[shader], pname);
      }
    }

  /** @suppress {checkTypes} */
  function jstoi_q(str) {
      return parseInt(str);
    }
  
  /** @noinline */
  function webglGetLeftBracePos(name) {
      return name.slice(-1) == ']' && name.lastIndexOf('[');
    }
  
  function webglPrepareUniformLocationsBeforeFirstUse(program) {
      var uniformLocsById = program.uniformLocsById, // Maps GLuint -> WebGLUniformLocation
        uniformSizeAndIdsByName = program.uniformSizeAndIdsByName, // Maps name -> [uniform array length, GLuint]
        i, j;
  
      // On the first time invocation of glGetUniformLocation on this shader program:
      // initialize cache data structures and discover which uniforms are arrays.
      if (!uniformLocsById) {
        // maps GLint integer locations to WebGLUniformLocations
        program.uniformLocsById = uniformLocsById = {};
        // maps integer locations back to uniform name strings, so that we can lazily fetch uniform array locations
        program.uniformArrayNamesById = {};
  
        for (i = 0; i < GLctx.getProgramParameter(program, 0x8B86/*GL_ACTIVE_UNIFORMS*/); ++i) {
          var u = GLctx.getActiveUniform(program, i);
          var nm = u.name;
          var sz = u.size;
          var lb = webglGetLeftBracePos(nm);
          var arrayName = lb > 0 ? nm.slice(0, lb) : nm;
  
          // Assign a new location.
          var id = program.uniformIdCounter;
          program.uniformIdCounter += sz;
          // Eagerly get the location of the uniformArray[0] base element.
          // The remaining indices >0 will be left for lazy evaluation to
          // improve performance. Those may never be needed to fetch, if the
          // application fills arrays always in full starting from the first
          // element of the array.
          uniformSizeAndIdsByName[arrayName] = [sz, id];
  
          // Store placeholder integers in place that highlight that these
          // >0 index locations are array indices pending population.
          for(j = 0; j < sz; ++j) {
            uniformLocsById[id] = j;
            program.uniformArrayNamesById[id++] = arrayName;
          }
        }
      }
    }
  
  
  
  function _glGetUniformLocation(program, name) {
  
      name = UTF8ToString(name);
  
      if (program = GL.programs[program]) {
        webglPrepareUniformLocationsBeforeFirstUse(program);
        var uniformLocsById = program.uniformLocsById; // Maps GLuint -> WebGLUniformLocation
        var arrayIndex = 0;
        var uniformBaseName = name;
  
        // Invariant: when populating integer IDs for uniform locations, we must maintain the precondition that
        // arrays reside in contiguous addresses, i.e. for a 'vec4 colors[10];', colors[4] must be at location colors[0]+4.
        // However, user might call glGetUniformLocation(program, "colors") for an array, so we cannot discover based on the user
        // input arguments whether the uniform we are dealing with is an array. The only way to discover which uniforms are arrays
        // is to enumerate over all the active uniforms in the program.
        var leftBrace = webglGetLeftBracePos(name);
  
        // If user passed an array accessor "[index]", parse the array index off the accessor.
        if (leftBrace > 0) {
          arrayIndex = jstoi_q(name.slice(leftBrace + 1)) >>> 0; // "index]", coerce parseInt(']') with >>>0 to treat "foo[]" as "foo[0]" and foo[-1] as unsigned out-of-bounds.
          uniformBaseName = name.slice(0, leftBrace);
        }
  
        // Have we cached the location of this uniform before?
        var sizeAndId = program.uniformSizeAndIdsByName[uniformBaseName]; // A pair [array length, GLint of the uniform location]
  
        // If an uniform with this name exists, and if its index is within the array limits (if it's even an array),
        // query the WebGLlocation, or return an existing cached location.
        if (sizeAndId && arrayIndex < sizeAndId[0]) {
          arrayIndex += sizeAndId[1]; // Add the base location of the uniform to the array index offset.
          if ((uniformLocsById[arrayIndex] = uniformLocsById[arrayIndex] || GLctx.getUniformLocation(program, name))) {
            return arrayIndex;
          }
        }
      }
      else {
        // N.b. we are currently unable to distinguish between GL program IDs that never existed vs GL program IDs that have been deleted,
        // so report GL_INVALID_VALUE in both cases.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
      }
      return -1;
    }

  function _glLinkProgram(program) {
      program = GL.programs[program];
      GLctx.linkProgram(program);
      // Invalidate earlier computed uniform->ID mappings, those have now become stale
      program.uniformLocsById = 0; // Mark as null-like so that glGetUniformLocation() knows to populate this again.
      program.uniformSizeAndIdsByName = {};
  
    }

  function _glPolygonOffset(x0, x1) { GLctx.polygonOffset(x0, x1) }

  function _glScissor(x0, x1, x2, x3) { GLctx.scissor(x0, x1, x2, x3) }

  function _glShaderSource(shader, count, string, length) {
      var source = GL.getSource(shader, count, string, length);
  
      GLctx.shaderSource(GL.shaders[shader], source);
    }

  function computeUnpackAlignedImageSize(width, height, sizePerPixel, alignment) {
      function roundedToNextMultipleOf(x, y) {
        return (x + y - 1) & -y;
      }
      var plainRowSize = width * sizePerPixel;
      var alignedRowSize = roundedToNextMultipleOf(plainRowSize, alignment);
      return height * alignedRowSize;
    }
  
  function colorChannelsInGlTextureFormat(format) {
      // Micro-optimizations for size: map format to size by subtracting smallest enum value (0x1902) from all values first.
      // Also omit the most common size value (1) from the list, which is assumed by formats not on the list.
      var colorChannels = {
        // 0x1902 /* GL_DEPTH_COMPONENT */ - 0x1902: 1,
        // 0x1906 /* GL_ALPHA */ - 0x1902: 1,
        5: 3,
        6: 4,
        // 0x1909 /* GL_LUMINANCE */ - 0x1902: 1,
        8: 2,
        29502: 3,
        29504: 4,
      };
      return colorChannels[format - 0x1902]||1;
    }
  
  function heapObjectForWebGLType(type) {
      // Micro-optimization for size: Subtract lowest GL enum number (0x1400/* GL_BYTE */) from type to compare
      // smaller values for the heap, for shorter generated code size.
      // Also the type HEAPU16 is not tested for explicitly, but any unrecognized type will return out HEAPU16.
      // (since most types are HEAPU16)
      type -= 0x1400;
  
      if (type == 1) return HEAPU8;
  
      if (type == 4) return HEAP32;
  
      if (type == 6) return HEAPF32;
  
      if (type == 5
        || type == 28922
        )
        return HEAPU32;
  
      return HEAPU16;
    }
  
  function heapAccessShiftForWebGLHeap(heap) {
      return 31 - Math.clz32(heap.BYTES_PER_ELEMENT);
    }
  
  function emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat) {
      var heap = heapObjectForWebGLType(type);
      var shift = heapAccessShiftForWebGLHeap(heap);
      var byteSize = 1<<shift;
      var sizePerPixel = colorChannelsInGlTextureFormat(format) * byteSize;
      var bytes = computeUnpackAlignedImageSize(width, height, sizePerPixel, GL.unpackAlignment);
      return heap.subarray(pixels >> shift, pixels + bytes >> shift);
    }
  
  function _glTexImage2D(target, level, internalFormat, width, height, border, format, type, pixels) {
      GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat) : null);
    }

  function _glTexParameteri(x0, x1, x2) { GLctx.texParameteri(x0, x1, x2) }

  function webglGetUniformLocation(location) {
      var p = GLctx.currentProgram;
  
      if (p) {
        var webglLoc = p.uniformLocsById[location];
        // p.uniformLocsById[location] stores either an integer, or a WebGLUniformLocation.
  
        // If an integer, we have not yet bound the location, so do it now. The integer value specifies the array index
        // we should bind to.
        if (typeof webglLoc == 'number') {
          p.uniformLocsById[location] = webglLoc = GLctx.getUniformLocation(p, p.uniformArrayNamesById[location] + (webglLoc > 0 ? '[' + webglLoc + ']' : ''));
        }
        // Else an already cached WebGLUniformLocation, return it.
        return webglLoc;
      } else {
        GL.recordError(0x502/*GL_INVALID_OPERATION*/);
      }
    }
  
  function _glUniform1i(location, v0) {
      GLctx.uniform1i(webglGetUniformLocation(location), v0);
    }

  function _glUseProgram(program) {
      program = GL.programs[program];
      GLctx.useProgram(program);
      // Record the currently active program so that we can access the uniform
      // mapping table of that program.
      GLctx.currentProgram = program;
    }

  function _glVertexAttribPointer(index, size, type, normalized, stride, ptr) {
      GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr);
    }

  function _glViewport(x0, x1, x2, x3) { GLctx.viewport(x0, x1, x2, x3) }





  
  function stringToUTF8OnStack(str) {
      var size = lengthBytesUTF8(str) + 1;
      var ret = stackAlloc(size);
      stringToUTF8(str, ret, size);
      return ret;
    }




  var FSNode = /** @constructor */ function(parent, name, mode, rdev) {
    if (!parent) {
      parent = this;  // root node sets parent to itself
    }
    this.parent = parent;
    this.mount = parent.mount;
    this.mounted = null;
    this.id = FS.nextInode++;
    this.name = name;
    this.mode = mode;
    this.node_ops = {};
    this.stream_ops = {};
    this.rdev = rdev;
  };
  var readMode = 292/*292*/ | 73/*73*/;
  var writeMode = 146/*146*/;
  Object.defineProperties(FSNode.prototype, {
   read: {
    get: /** @this{FSNode} */function() {
     return (this.mode & readMode) === readMode;
    },
    set: /** @this{FSNode} */function(val) {
     val ? this.mode |= readMode : this.mode &= ~readMode;
    }
   },
   write: {
    get: /** @this{FSNode} */function() {
     return (this.mode & writeMode) === writeMode;
    },
    set: /** @this{FSNode} */function(val) {
     val ? this.mode |= writeMode : this.mode &= ~writeMode;
    }
   },
   isFolder: {
    get: /** @this{FSNode} */function() {
     return FS.isDir(this.mode);
    }
   },
   isDevice: {
    get: /** @this{FSNode} */function() {
     return FS.isChrdev(this.mode);
    }
   }
  });
  FS.FSNode = FSNode;
  FS.createPreloadedFile = FS_createPreloadedFile;
  FS.staticInit();Module["FS_createPath"] = FS.createPath;Module["FS_createDataFile"] = FS.createDataFile;Module["FS_createPreloadedFile"] = FS.createPreloadedFile;Module["FS_unlink"] = FS.unlink;Module["FS_createLazyFile"] = FS.createLazyFile;Module["FS_createDevice"] = FS.createDevice;;

      // exports
      Module["requestFullscreen"] = function Module_requestFullscreen(lockPointer, resizeCanvas) { Browser.requestFullscreen(lockPointer, resizeCanvas) };
      Module["requestAnimationFrame"] = function Module_requestAnimationFrame(func) { Browser.requestAnimationFrame(func) };
      Module["setCanvasSize"] = function Module_setCanvasSize(width, height, noUpdates) { Browser.setCanvasSize(width, height, noUpdates) };
      Module["pauseMainLoop"] = function Module_pauseMainLoop() { Browser.mainLoop.pause() };
      Module["resumeMainLoop"] = function Module_resumeMainLoop() { Browser.mainLoop.resume() };
      Module["getUserMedia"] = function Module_getUserMedia() { Browser.getUserMedia() };
      Module["createContext"] = function Module_createContext(canvas, useWebGL, setInModule, webGLContextAttributes) { return Browser.createContext(canvas, useWebGL, setInModule, webGLContextAttributes) };
      var preloadedImages = {};
      var preloadedAudios = {};;
var GLctx;;
// include: base64Utils.js
// Copied from https://github.com/strophe/strophejs/blob/e06d027/src/polyfills.js#L149

// This code was written by Tyler Akins and has been placed in the
// public domain.  It would be nice if you left this header intact.
// Base64 code from Tyler Akins -- http://rumkin.com

/**
 * Decodes a base64 string.
 * @param {string} input The string to decode.
 */
var decodeBase64 = typeof atob == 'function' ? atob : function (input) {
  var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  var output = '';
  var chr1, chr2, chr3;
  var enc1, enc2, enc3, enc4;
  var i = 0;
  // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
  do {
    enc1 = keyStr.indexOf(input.charAt(i++));
    enc2 = keyStr.indexOf(input.charAt(i++));
    enc3 = keyStr.indexOf(input.charAt(i++));
    enc4 = keyStr.indexOf(input.charAt(i++));

    chr1 = (enc1 << 2) | (enc2 >> 4);
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    chr3 = ((enc3 & 3) << 6) | enc4;

    output = output + String.fromCharCode(chr1);

    if (enc3 !== 64) {
      output = output + String.fromCharCode(chr2);
    }
    if (enc4 !== 64) {
      output = output + String.fromCharCode(chr3);
    }
  } while (i < input.length);
  return output;
};

// Converts a string of base64 into a byte array.
// Throws error on invalid input.
function intArrayFromBase64(s) {
  if (typeof ENVIRONMENT_IS_NODE == 'boolean' && ENVIRONMENT_IS_NODE) {
    var buf = Buffer.from(s, 'base64');
    return new Uint8Array(buf['buffer'], buf['byteOffset'], buf['byteLength']);
  }

  try {
    var decoded = decodeBase64(s);
    var bytes = new Uint8Array(decoded.length);
    for (var i = 0 ; i < decoded.length ; ++i) {
      bytes[i] = decoded.charCodeAt(i);
    }
    return bytes;
  } catch (_) {
    throw new Error('Converting base64 string to bytes failed.');
  }
}

// If filename is a base64 data URI, parses and returns data (Buffer on node,
// Uint8Array otherwise). If filename is not a base64 data URI, returns undefined.
function tryParseAsDataURI(filename) {
  if (!isDataURI(filename)) {
    return;
  }

  return intArrayFromBase64(filename.slice(dataURIPrefix.length));
}


// end include: base64Utils.js
var wasmImports = {
  "__assert_fail": ___assert_fail,
  "__syscall_fcntl64": ___syscall_fcntl64,
  "__syscall_ioctl": ___syscall_ioctl,
  "__syscall_openat": ___syscall_openat,
  "_emscripten_get_now_is_monotonic": __emscripten_get_now_is_monotonic,
  "abort": _abort,
  "emscripten_asm_const_int": _emscripten_asm_const_int,
  "emscripten_date_now": _emscripten_date_now,
  "emscripten_get_now": _emscripten_get_now,
  "emscripten_memcpy_big": _emscripten_memcpy_big,
  "emscripten_resize_heap": _emscripten_resize_heap,
  "emscripten_set_blur_callback_on_thread": _emscripten_set_blur_callback_on_thread,
  "emscripten_set_keydown_callback_on_thread": _emscripten_set_keydown_callback_on_thread,
  "emscripten_set_keyup_callback_on_thread": _emscripten_set_keyup_callback_on_thread,
  "emscripten_set_main_loop": _emscripten_set_main_loop,
  "emscripten_webgl_create_context": _emscripten_webgl_create_context,
  "emscripten_webgl_init_context_attributes": _emscripten_webgl_init_context_attributes,
  "emscripten_webgl_make_context_current": _emscripten_webgl_make_context_current,
  "exit": _exit,
  "fd_close": _fd_close,
  "fd_read": _fd_read,
  "fd_seek": _fd_seek,
  "fd_write": _fd_write,
  "glActiveTexture": _glActiveTexture,
  "glAttachShader": _glAttachShader,
  "glBindBuffer": _glBindBuffer,
  "glBindTexture": _glBindTexture,
  "glBlendFunc": _glBlendFunc,
  "glBufferData": _glBufferData,
  "glClear": _glClear,
  "glClearColor": _glClearColor,
  "glCompileShader": _glCompileShader,
  "glCreateProgram": _glCreateProgram,
  "glCreateShader": _glCreateShader,
  "glDepthFunc": _glDepthFunc,
  "glDepthMask": _glDepthMask,
  "glDisable": _glDisable,
  "glDisableVertexAttribArray": _glDisableVertexAttribArray,
  "glDrawArrays": _glDrawArrays,
  "glEnable": _glEnable,
  "glEnableVertexAttribArray": _glEnableVertexAttribArray,
  "glGenBuffers": _glGenBuffers,
  "glGenTextures": _glGenTextures,
  "glGetAttribLocation": _glGetAttribLocation,
  "glGetShaderInfoLog": _glGetShaderInfoLog,
  "glGetShaderiv": _glGetShaderiv,
  "glGetUniformLocation": _glGetUniformLocation,
  "glLinkProgram": _glLinkProgram,
  "glPolygonOffset": _glPolygonOffset,
  "glScissor": _glScissor,
  "glShaderSource": _glShaderSource,
  "glTexImage2D": _glTexImage2D,
  "glTexParameteri": _glTexParameteri,
  "glUniform1i": _glUniform1i,
  "glUseProgram": _glUseProgram,
  "glVertexAttribPointer": _glVertexAttribPointer,
  "glViewport": _glViewport,
  "web_audio_init": web_audio_init,
  "web_audio_resume": web_audio_resume
};
var asm = createWasm();
/** @type {function(...*):?} */
var ___wasm_call_ctors = function() {
  return (___wasm_call_ctors = Module["asm"]["__wasm_call_ctors"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _free = function() {
  return (_free = Module["asm"]["free"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _malloc = function() {
  return (_malloc = Module["asm"]["malloc"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _sm64_audio_available = Module["_sm64_audio_available"] = function() {
  return (_sm64_audio_available = Module["_sm64_audio_available"] = Module["asm"]["sm64_audio_available"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _sm64_audio_consumed = Module["_sm64_audio_consumed"] = function() {
  return (_sm64_audio_consumed = Module["_sm64_audio_consumed"] = Module["asm"]["sm64_audio_consumed"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _main = Module["_main"] = function() {
  return (_main = Module["_main"] = Module["asm"]["__main_argc_argv"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var ___errno_location = function() {
  return (___errno_location = Module["asm"]["__errno_location"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var stackSave = function() {
  return (stackSave = Module["asm"]["stackSave"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var stackRestore = function() {
  return (stackRestore = Module["asm"]["stackRestore"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var stackAlloc = function() {
  return (stackAlloc = Module["asm"]["stackAlloc"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var dynCall_jiji = Module["dynCall_jiji"] = function() {
  return (dynCall_jiji = Module["dynCall_jiji"] = Module["asm"]["dynCall_jiji"]).apply(null, arguments);
};

var ___start_em_js = Module['___start_em_js'] = 7810416;
var ___stop_em_js = Module['___stop_em_js'] = 7811776;

// include: postamble.js
// === Auto-generated postamble setup entry stuff ===

Module["addRunDependency"] = addRunDependency;
Module["removeRunDependency"] = removeRunDependency;
Module["FS_createPath"] = FS.createPath;
Module["FS_createDataFile"] = FS.createDataFile;
Module["FS_createLazyFile"] = FS.createLazyFile;
Module["FS_createDevice"] = FS.createDevice;
Module["FS_unlink"] = FS.unlink;
Module["callMain"] = callMain;
Module["FS_createPreloadedFile"] = FS.createPreloadedFile;
Module["FS"] = FS;


var calledRun;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!calledRun) run();
  if (!calledRun) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
};

function callMain(args = []) {

  var entryFunction = _main;

  args.unshift(thisProgram);

  var argc = args.length;
  var argv = stackAlloc((argc + 1) * 4);
  var argv_ptr = argv >> 2;
  args.forEach((arg) => {
    HEAP32[argv_ptr++] = stringToUTF8OnStack(arg);
  });
  HEAP32[argv_ptr] = 0;

  try {

    var ret = entryFunction(argc, argv);

    // if we're not running an evented main loop, it's time to exit
    exitJS(ret, /* implicit = */ true);
    return ret;
  }
  catch (e) {
    return handleException(e);
  }
}

function run(args = arguments_) {

  if (runDependencies > 0) {
    return;
  }

  preRun();

  // a preRun added a dependency, run will be called later
  if (runDependencies > 0) {
    return;
  }

  function doRun() {
    // run may have just been called through dependencies being fulfilled just in this very frame,
    // or while the async setStatus time below was happening
    if (calledRun) return;
    calledRun = true;
    Module['calledRun'] = true;

    if (ABORT) return;

    initRuntime();

    preMain();

    if (Module['onRuntimeInitialized']) Module['onRuntimeInitialized']();

    if (shouldRunNow) callMain(args);

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      doRun();
    }, 1);
  } else
  {
    doRun();
  }
}

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}

// shouldRunNow refers to calling main(), not run().
var shouldRunNow = true;

if (Module['noInitialRun']) shouldRunNow = false;

run();


// end include: postamble.js
