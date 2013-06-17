(function(exports){
    var success = 0;
    var fail = 0;
    exports.showComplete = function(){
        if(fail === 0){
            console.log('%c %s tests completed, all successful ', 'background:green;color:white;font-size:16px;font-weight:bold;', success);
        }else{
            console.log('%c %s tests completed, %s failed ', 'background:red;color:white;font-size:16px;font-weight:bold;', success, fail);
        }
    };

    exports.assert = function(value, check, name){
        if(value != check){
            console.error('"%s" != "%s" Assertion Error on %s', value, check, name);
            fail++;
        }else{
            console.log('Passed: "%s".', name);
            success++;
        }
    };

})(this);

/* regular arguments */
var test1 = function(arg1, arg2, arg3){
    return arg1 + arg2 + arg3;
}.kwargs();

assert(test1('a','b','c'), 'abc', 'Regular arguments');
assert(test1({
    arg1: 'a',
    arg2: 'b',
    arg3: 'c'
}), 'abc', 'Options method');
assert(test1('a', {
    arg2: 'b',
    arg3: 'c'
}), 'abc', 'Both regular and kwargs');


/* Defaults without kwargs */
var greeting = function(name){
    return "Hello " + name;
}.kwargs({ name: 'World' });

assert(greeting('Frank'), "Hello Frank", 'Defaults with argument');
assert(greeting(), "Hello World", 'Defaults without arguments');

/* complex example */
var printname = function(firstName, lastName, middleName, prefix, suffix){
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
}.kwargs();

assert(printname('John', 'Doe', { suffix:'Ph.D.' }), "John Doe Ph.D.", "Complex example 1");
assert(printname('Max', 'Fightmaster', { prefix: 'Staff Sgt.' }), "Staff Sgt. Max Fightmaster", "Complex example 2");
assert(printname('Isaac', 'Newton', { prefix: 'Sir', suffix: 'PRS MP'}), "Sir Isaac Newton PRS MP", "Complex example 3");

showComplete();
