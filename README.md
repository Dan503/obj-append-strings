# obj-append-strings

``````
npm install obj-append-strings --save
``````

This is a tiny function for bulk appending strings to other strings through the use of objects.

So basically instead of doing this:

````js
function functionName(settings){

  //This is ugly
  settings = settings || {};
  settings.setting_1 = settings.setting_1 + ' c';
  settings.setting_2 = settings.setting_2 || {};
  settings.setting_2.alpha = settings.setting_2.alpha  + ' d';

  return settings;
}

var variable = functionName({
  setting_1: 'a',
  setting_2: {
    alpha: 'b'
  },
});

//variable = { setting_1 : 'a c', setting_2 : { alpha: 'b d' } }
````

You can avoid the ugly repetition by doing this instead:

````js
var appendStrings = require('obj-append-strings');

function functionName(settings){

  //This is pretty
  settings = appendStrings(settings, {
    setting_1: ' c',
    setting_2: {
      alpha: ' d'
    },
  });

  return settings;
}

var variable = functionName({
  setting_1: 'a',
  setting_2: {
    alpha: 'b'
  },
});

//variable = { setting_1 : 'a c', setting_2 : { alpha: 'b d' } }
````

Or if you want to prep-end the strings instead:

````js
var appendStrings = require('obj-append-strings');

function functionName(settings){

  //This adds the strings before the original value
  settings = appendStrings(settings, {
    setting_1: 'c ',
    setting_2: {
      alpha: 'd ',
    },
  }, 'before');

  return settings;
}

var variable = functionName({
  setting_1: 'a',
  setting_2: {
    alpha: 'b'
  },
});


//variable = { setting_1 : 'c a', setting_2 : alpha: { 'd b' } }
````

If you can 100% guarantee that the object having the strings appended to it is an already defined object (not "undefined") then you can leave off the `settings = ` bit:

`````````js
  //leave off the "settings =" bit if you can 100% guarantee that "settings" is already defined
  appendStrings(settings, {
    setting_1: 'c ',
    setting_2: {
      alpha: 'd ',
    },
  });

`````````

If there are values that are undefined, it will just use the values that are available

````js
var appendStrings = require('obj-append-strings');

function functionName(settings){

  //This adds the strings before the original value
  settings = appendStrings(settings, {
    setting_1: 'c ',
    setting_2: {
      alpha: 'd ',
    },
  });

  return settings;
}

var variable_1 = functionName({
  setting_2: {
    alpha: 'b'
  },
});


var variable_2 = functionName({
  setting_1: 'a',
});


//variable_1 = { setting_1 : 'c ', setting_2 : alpha: { 'd b' } }
//variable_2 = { setting_1 : 'a c', setting_2 : alpha: { 'd ' } }
````

It also works the other way around (yeah the code in this example is a bit silly)

````js
var appendStrings = require('obj-append-strings');

function functionName(settings){

  //This adds the strings before the original value
  settings = appendStrings(settings, {
  });

  return settings;
}

var variable = functionName({
  setting_1: 'a',
  setting_2: {
    alpha: 'b'
  },
});

//variable = { setting_1 : 'a', setting_2 : alpha: { 'b' } }
````

## Pug usage

I primarily built this function for use in [Pug](https://pugjs.org/api/getting-started.html) templates as a way of assigning permanent classes to sub modules.

To use the function in pug you will need to parse the `require` function from node.js into the Pug `locals` object.

If you're using Gulp, then this is a simplified version of the setup you would use to compile Pug templates that have support for the `require` node.js function:

```````````js
gulp.src('**/*.pug')
  .pipe(plugins.pug({
    locals: {
      //this bit gives access to the "require" function from inside pug templates
      require: require,
    }
  }))
```````````

Once you have the `require` function available inside your pug templates, you can use the function in pug mixins like this to assign permanent classes to sub modules. The below example uses [default-to](https://www.npmjs.com/package/default-to) to make the syntax simpler.

```````````pug
include path/to/subModule1
include path/to/subModule2

- var defaultTo = require('default-to').default;
- var appendStrings = require('obj-append-strings');

mixin example(spec)
  -
    //Any classes in here will be lost if the user defines their own classes
    defaultTo(spec, {
      classes : '',
      subModule1 : {
        classes : 'overridable-classes'
      },
      subModule2 : {
        classes : 'overridable-classes'
      }
    });

    //classes that are placed here are impossible for the user to override remotely
    spec = appendStrings(spec, {
      subModule1: {
        classes: ' permanent-classes'
      },
      subModule2: {
        classes: ' permanent-classes'
      }
    })

  .example(class=spec.classes)&attributes(attributes)
    +subModule1(spec.subModule1)
    +subModule2(spec.subModule2)

```````````

This is how that would look when calling the Pug mixin

`````````pug
include path/to/example

+example({
  classes: 'module-classes',
  subModule1: {
    classes: 'subModule1-overide-classes',
  },
  subModule2: {
    classes: 'subModule2-overide-classes',
  }
})
`````````