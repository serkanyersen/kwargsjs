# Keyword arguments for Javascript. Similar to python's kwargs

This little tool gives you the ability to use keyword arguments support for your functions. So you can either specify each argument as you wish or use the arguments regularly. In fact you can do both at the same time.

Another feature is to have the ability to set default values for your function arguments without changing or adding any code to your function.

[![Build Status](https://travis-ci.org/serkanyersen/kwargsjs.png?branch=master)](https://travis-ci.org/serkanyersen/kwargsjs)

## Usage
Just include the script on your site. That's it. When included it will add a new method called `kwargs` to Function prototype and you can use it like this:

```javascript
var functionName = function(arg1, arg2){
	// code
}.kwargs([defaults]);
```

## Examples
Just write your function as you would normally, and don't worry about the arguments size. just call `.kwargs()` and rest will be handled.

```javascript
var test = function(arg1, arg2, arg3){
	// Your code
}.kwargs();
```

Now, if you want you can pass all arguments in a single object and they all will be mapped to their correct places

```javascript
test({
	arg3: 'val3',
	arg1: 'val1',
	arg2: 'val2'
});
```

You can also use your function like you would normally use

```javascript
test('val1', 'val2', 'val3');
```

the best part is that you can do both

```javascript
test('val1', {
	arg3: 'val3',
	arg1: 'val1',
});
```

### Using Default values for arguments

Let's say we have this function that says Hello to a given name.

```javascript
var greeting = function(name){
	return "Hello " + name;
};
greeting('Frank'); // -> Hello Frank
```
If no name is given, we want it to return "Hello World", usually you would have to add conditions to your function and check for existence of `name` argument. kwargs automatically handles that for you.

```javascript
var greeting = function(name){
	return "Hello " + name;
}.kwargs({name: 'World'}); // Set a default value for your argument and 
                           // it will be used when this argument is empty
// Here are the results
greeting('Frank'); // -> Hello Frank
greeting(); // -> Hello World
```

## A real example
Let's say we have a function that receives a lot of arguments and generates a name with prefixes and suffixes when provided.

```javascript
var name = function(firstName, lastName, middleName, prefix, suffix){
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
Now, when we want create a name with only a suffix, all we have to do is to provide the name and suffix. You can only pass required arguments without changing anything on your function code.

```javascript
name('John', 'Doe', { suffix:'Ph.D.' });
// -> John Doe Ph.D.
name('Max', 'Fightmaster', { prefix: 'Staff Sgt.' })
// -> Staff Sgt. Max Fightmaster
name('Isaac', 'Newton', { prefix: 'Sir', suffix: 'PRS MP'});
// -> Sir Isaac Newton PRS MP
```

## Important Note
If last argument passed is an object, code assumes it's a `kwargs` object, if your function accepts objects as arguments
you should be careful about this, here is an example.

```javascript
// in both cases, `anObject` argument will be interpreted as `kwargs` object and be ignored
myFunc(anObject);
myFunc('val', anObject);
```

to avoid this problem you have two solutions

```javascript
myFunc(anObject, {}); // passing last argument as an empty object
// or using the options method and passing your object in kwargs
myFunc({
  arg1: anObject
});
```

## LICENSE
MIT License
