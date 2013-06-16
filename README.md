# Keyword arguments for Javascript. Similar to python's kwargs

This little tool gives you to ability to have keyword arguments support for your functions so you can either specify each argument without order or use it as it is, intact you can do both at the same time.

Another feature is to have the ability to set default values for your function arguments without changing or adding any code to your function.
## Usage
Just include the script on your site. That's it.


## Examples
You can have separate arguments in your function but it won't stop you to use single argument `options` method.

```javascript
var test = function(arg1, arg2, arg3){
	// Your code
}.kwargs();
```

and use it as single argument function

```javascript
test({
	arg3: 'val3',
	arg1: 'val1',
	arg2: 'val2'
});
```
you can also use it regularly

```javascript
test('val1', 'val2', 'val3');
```
or you can do both

```javascript
test('val1', {
	arg3: 'val3',
	arg1: 'val1',
});
```
### Using Defaults
Let's say we have this function that says Hello to a given name.

```javascript
var greeting = function(name){
	return "Hello " + name;
};
greeting('Frank'); // -> Hello Frank
```
If no name is given we want it to return "Hello World", usually you would have to add conditions to your function and check for existence of `name` argument, with `kwargs` you don't.

```javascript
var greeting = function(name){
	return "Hello " + name;
}.kwargs({name: 'World'});

greeting('Frank'); // -> Hello Frank
greeting(); // -> Hello World
```

## A real example
Let's say we have a function that receives lots of arguments and generates a name with prefixes and suffixes when provided.

```javascript
var name = function(firstName, lastName, middleName, prefix, suffix){
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
}.kwargs();
```
So now when we want create a name with only a suffix, all we have to do is to provide the name and suffix.

```javascript
name('John', 'Doe', { suffix:'Ph.D.' });
// -> John Doe Ph.D.
name('Max', 'Fightmaster', { prefix: 'Staff Sgt.' })
// -> Staff Sgt. Max Fightmaster
name('Isaac', 'Newton', { prefix: 'Sir', suffix: 'PRS MP'});
// -> Sir Isaac Newton PRS MP
```
