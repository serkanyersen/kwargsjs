(function(exports){
    var success = 0;
    var fail = 0;
    exports.showComplete = function(){
        if(fail === 0){
            console.log('%c %s tests completed, all successful ', 'background:green;color:white;font-size:16px;font-weight:bold;', success);
        }else{
            console.log('%c %s tests completed, %s failed ', 'background:red;color:white;font-size:16px;font-weight:bold;', success, fail);
        }
        return fail === 0;
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

    /**
     * Figure out how long it takes for a method to execute.
     *
     * @param {Function} method to test
     * @param {number} iterations number of executions.
     * @param {Array} args to pass in.
     * @param {T} context the context to call the method in.
     * @return {number} the time it took, in milliseconds to execute.
     */
    exports.bench = function (method, iterations, args, context) {

        var time = 0;
        var timer = function (action) {
            var d = Date.now();
            if (time < 1 || action === 'start') {
                time = d;
                return 0;
            } else if (action === 'stop') {
                var t = d - time;
                time = 0;
                return t;
            } else {
                return d - time;
            }
        };

        var result = [];
        var i = 0;
        timer('start');
        while (i < iterations) {
            result.push(method.apply(context, args));
            i++;
        }

        var execTime = timer('stop');

        if ( typeof console === "object") {
            console.log("Mean execution time was: ", execTime / iterations);
            console.log("Sum execution time was: ", execTime);
            console.log("Result of the method call was:", result[0]);
        }

        return execTime;
    };

})(this);



/* regular arguments */
var test1 = kwargs(function(arg1, arg2, arg3){
    return arg1 + arg2 + arg3;
});

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
var greeting = kwargs(function(name){
    return "Hello " + name;
},{ name: 'World' });

assert(greeting('Frank'), "Hello Frank", 'Defaults with argument');
assert(greeting(), "Hello World", 'Defaults without arguments');

/* complex example */
var printname = kwargs(function(firstName, lastName, middleName, prefix, suffix){
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

assert(printname('John', 'Doe', { suffix:'Ph.D.' }), "John Doe Ph.D.", "Complex example 1");
assert(printname('Max', 'Fightmaster', { prefix: 'Staff Sgt.' }), "Staff Sgt. Max Fightmaster", "Complex example 2");
assert(printname('Isaac', 'Newton', { prefix: 'Sir', suffix: 'PRS MP'}), "Sir Isaac Newton PRS MP", "Complex example 3");

var syntaxTest = kwargs(function/* I'm breaking you baby (arg1, arg2, arg3)  */( /* a comment here */ arg1,
    // A comment here too
    arg2,
/* line comment */
arg3,




        arg4, /* another one */
    arg5 // a comment too
    // this is the last
    /* nope jk */
    ){
    return [arg1, arg2, arg3, arg4, arg5].join('');
});

assert(syntaxTest(1,2,3,4,5), '12345', 'Check the syntax');

function testRegular/* I'm breaking you baby function(arg1, arg2, arg3)  */(name, lastname, middlename){
    return name + (middlename? (" " + middlename) : "") + (lastname? (" " + lastname) : "");
}
var testRegularKwargs = kwargs(testRegular, {lastname: 'Doe'});

assert(testRegularKwargs('John'), "John Doe", 'Regular test 1');
assert(testRegularKwargs('Jack', 'White'), "Jack White", 'Regular test 2');
assert(testRegularKwargs('Arthur', 'Clark', 'C.'), "Arthur C. Clark", 'Regular test 3');
assert(testRegularKwargs('Arthur', {
    lastname: 'Clark',
    middlename: 'C.'
}), "Arthur C. Clark", 'Regular test 4');

if(showComplete()){
    /* Make a performance test */
    var iteration = 100000;

    console.log("%c Test normal version %s iterations ", 'background:lightblue; font-size: 14px', iteration);
    bench(function(arg1, arg2, arg3){
        return arg1 + arg2 + arg3;
    }, iteration, [1,2,3], this);

    console.log("%c Test kwargs version %s iterations ", 'background:lightblue; font-size: 14px', iteration);
    bench(kwargs(function(arg1, arg2, arg3){
        return arg1 + arg2 + arg3;
    }), iteration, [1,2, {arg3: 3}], this);
}


