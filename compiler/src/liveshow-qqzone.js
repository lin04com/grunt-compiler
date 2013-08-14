
(function(){
var Cookie = {
    set: function (name, value) {
        document.cookie = name + '=' + encodeURIComponent(value) + '; ; path=/; domain=local.com;';
    },
    get: function (name) {
        var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
        if(arr !== null) return decodeURIComponent(arr[2]); return null;
    }
};
Cookie.set('test', 'AAA');
Cookie.get('test');
})();
