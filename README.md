# guiext-template

A simple Github template that lets you create a [Taipy GUI](https://github.com/Avaiga/taipy-gui)
extension library that contains visual elements with dynamic properties therefore coded
with React.

## How to use

Click [![Here](https://img.shields.io/badge/-here-orange)](https://github.com/Avaiga/guiext-template/generate)
to create a new repository initialized from this template.

You need to modify the generated file structure as follows:

- Library name

  The library name is the string that is returned by the method
  [`get_name()`](https://docs.taipy.io/en/latest/manuals/reference/taipy.gui.extension.ElementLibrary/#taipy.gui.extension.library.ElementLibrary.get_name)
  of the `ElementLibrary` you are building.<br/>
  This is defined in [library/library.py](library/library.py).

  This is used when Taipy GUI searches for the code involved in the implementation
  of a visual element: custom element types use the library name as a prefix
  for their name.

- Element name(s)

- JavaScript bundle name

  The name of the JavaScript bundle that holds the frontend code for
  this extension library must be updated:

  - In the method `get_scripts()` of the `ElementLibrary` subclass, defined in
    [library/library.py](library/library.py).<br/>
    This method must return an array of strings that must contain the path to the bundle
    path, relative to the repository directory.

  - In the [webpack configuration](library\frontend\webpack.config.js).<br/>
    The filename of the bundle must be set as the *filename* property value
    of the *output* property of the dictionary returned by the function
    set to *module.exports*.

- Python package name

  The name of the Python package that holds both the Python and JavaScript code
  for the extension library. This package is autonomous and can be imported from
  any Taipy GUI application that needs to use the defined elements.</br>

  This name appears in the [`setup.py`](setup.py) file, as the value for the `name`
  parameter of the invocation of *setup()*.

## Repository structure

- `README.md`: this file.
- `demo.py`: Python script demonstrating the usage of the elements provided in the
   [`ElementLibrary`](https://docs.taipy.io/en/latest/manuals/reference/taipy.gui.extension.ElementLibrary/).
- `setup.py`: Setup script for the extension library package.
- `library/`: The directory where all the Python and TypeScript code for the extension
   library can be found:
   - `frontend/`: The directory where all the frontend code is located:
      - `src/`: Where the source file for components are located.
         - `index.ts`: the entry point for the frontend bundle.<br/>
           This file typically just exports all the component classes so they
           can be used by Taipy.
         - `*Element*.tsx`: TypeScript source for for each defined element.
      - `package.json`: Holds the meta-data for the Node project.
