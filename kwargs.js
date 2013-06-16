var kwargs = function(func, defaults) {
    'use strict';

    var removeComments = new RegExp('(\\/\\*[\\w\\\'\\s\\r\\n\\*]*\\*\\/)|(\\/\\/[\\w\\s\\\'][^\\n\\r]*$)|(<![\\-\\-\\s\\w\\>\\/]*>)', 'gim');
    var removeWhitespc = new RegExp('\\s+', 'gim');
    var matchSignature = new RegExp('function.*?\\((.*?)\\)', 'i');

    return function() {
        var args = Array.prototype.slice.call(arguments),
            kwargs = args[args.length - 1],
            name;

        if(defaults !== Object(defaults)){
            defaults = {};
        }

        if (kwargs === Object(kwargs)) {
            args.pop();
            var names = func.toString()
                            .replace(removeComments, '')
                            .replace(removeWhitespc, '')
                            .match(matchSignature)[1]
                            .split(',');

            for (var i = 0; i < names.length; i++) {
                name = names[i];
                if (name in kwargs) {
                    args[i] = kwargs[name];
                }else if(name in defaults && args[i] === undefined){
                    args[i] = defaults[name];
                }
            }
        }
        return func.apply(this, args);
    };
};


var printName = kwargs(function(
    // yes yes it is
    firstName, /* hello world */ lastName,
// oh yea
    middleName,
    prefix, // Shit baby
    suffix){
    'use strict';
    var name = [];
    if(prefix){
        name.push(prefix);
    }
    name.push(firstName);
    if(middleName){
        name.push(middleName);
    }
    name.push(lastName);
    if(suffix){
        name.push(suffix);
    }
    return name.join(' ');
});

var output = printName('John', 'Doe', { suffix:'M.D.' });
console.log(output);
