seajs.config({
    base: "http://xxx.com/chang/js/v_08/",
    alias: {
        jquery: "core/jquery/1.8.3/jquery",
        zepto: "core/zepto/zepto",
        underscore: "core/underscore/underscore",
        backbone: "core/backbone/backbone"
    },
    //preload: ["seajs/plugin/text"],
    map: [
        [".js", (".js?" + (+new Date()))]
        //, [/(\/chang\/)(?=js)/, "$1" + '/v_08' + "/"]
    ]
});

// (function(VERS){
//     var flag = true, path = '/script/', base = 'http://xxx.com/chang/' + VERS;
//     console.log('base===', base);
//     seajs.config({
//         base : base + path,
//         alias: {
//             jquery: "core/jquery/1.8.3/jquery",
//             zepto: "core/zepto/zepto",
//             underscore: "core/underscore/underscore",
//             backbone: "core/backbone/backbone"
//         },
//         map : [
//             [".js", (".js?" + (+new Date()))]
//             //, [/(\/chang\/)(?=script)/, "$1" + path + '/asdfasd/']
//         ]
//     });
//     if(!flag){ document.write('<script src="' + base + '/js/app/sea-config.js"><\/script>');}

// })('v_06');
