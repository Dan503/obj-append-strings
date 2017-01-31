# obj-append-strings

``````
npm install obj-append-strings --save
``````

So basically instead of doing this:

````js
function functionName(settings){

  //This is ugly
  settings.setting_1 = settings.setting_1 + ' c';
  settings.setting_2 = settings.setting_2 + ' d';

  return settings;
}

var variable = functionName({
  setting_1: ' a',
  setting_2: ' b',
});

//variable = { setting_1 : 'a c', setting_2 : 'b d' }
````

You can avoid the ugly repetition by doing this instead:

````js
var appendStrings = require('obj-append-strings')

function functionName(settings){

  //This is pretty
  settings = appendStrings(settings, {
    setting_1: ' c',
    setting_2: ' d',
  });

  return settings;
}

var variable = functionName({
  setting_1: 'a',
  setting_2: 'b',
});

//variable = { setting_1 : 'a c', setting_2 : 'b d' }
````

I primarily built this function for use in [Pug](https://pugjs.org/api/getting-started.html) templates as a way of assigning permanent classes to sub modules.

To use the function in pug you will need to parse the `require` function into the pug locals.

If you're using Gulp, then this is a simplified version of compiling Pug templates that have support for the `require` node.js function

```````````
gulp.src('**/*.pug')
  .pipe(plugins.pug({
    locals: {
      require: require,
    }
  }))
```````````

Once you have the `require` function available inside your pug templates, you can use the function in pug mixins like this to assign permanent classes to sub modules:

```````````
include path/to/a/subModule

- var appendStrings = require('obj-append-strings');

mixin example(spec)
  -
    Object.assign(spec, {
      classes : '',
      subModule : Object.assign(this.subModule, {
        classes : 'overridable-classes'
      })
    });

    spec.subModule = appendStrings(spec.subModule, {
      classes: ' permenant-classes'
    })

  .example(class=spec.classes)&attributes(attributes)
    +subModule(spec.subModule)

```````````
