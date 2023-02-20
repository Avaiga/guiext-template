# guiext-template

A simple GitHub template that lets you create a [Taipy GUI](https://github.com/Avaiga/taipy-gui)
extension library that contains visual elements with dynamic properties therefore coded
with React.

You can find the Taipy GUI Extension Libraries documentation in
[this section](https://docs.taipy.io/en/latest/manuals/gui/extension/)
of the Taipy GUI User Manual.

This template contains all the code that lets you build a Taipy GUI Extension Library
containing a single element and use this library in a tiny Taipy GUI application.<br/>
This code is meant to be modified so you can add your custom visual elements.

## Prerequisites

To build Taipy GUI Extension Libraries, you need to have installed:

- Python 3.8 or above
- Node 18.2 or above (and npm)
- Taipy GUI 2.0 or above

## How to use this template

Click [![this link](https://img.shields.io/badge/-this%20link-orange)](https://github.com/Avaiga/guiext-template/generate)
to create a new repository initialized from this template.

## Repository structure

- `README.md`: this file.
- `demo.py`: Python script demonstrating the usage of the elements provided in the
   [`ElementLibrary`](https://docs.taipy.io/en/latest/manuals/reference/taipy.gui.extension.ElementLibrary/).
- `pyproject.toml`: Python project settings file for the extension library package.
- `MANIFEST.in`: This file lists the commands to be executed when the Python package
  is built as a source distribution. See [this section](#packaging-the-extension-library)
  for more details.
- `taipy_gui_ext_library/`: The directory where all the Python and TypeScript code for
   the extension library can be found.<br/>
   Note that this repository's name is ultimately the root directory of the Python
   package that you will build.<br/>
   This directory contains the following:
   - `frontend/`: The directory where all the frontend code is located.<br/>
      This directory contains the following:
      - `src/`: Where the source files for components are located.
         - `index.ts`: the entry point for the frontend bundle.<br/>
           This file typically just exports all the component classes so they can be used
           by Taipy GUI.
         - `Element.tsx`: TypeScript source for the React component associated with
           the custom element called "element", as defined in the method
           `get_elements()` of the `ElementLibrary` subclass.
      - `scripts/install.js`: a JavaScript script used by `npm` when installing the
        dependencies for building the main JavaScript bundle of the extension library.
      - `package.json`: Holds the meta-data for the Node project.
      - `tsconfig.json`: Holds the options to compile the TypeScript project.<br/>
        The two important settings for the project configuration are:
        - The value of *compilerOptions.outDir*"*: This indicates where the JavaScript
          bundle is ultimately created.<br/>
          If you wish to change this, you must also update the value of *output.path*
          in the [webpack configuration file](taipy_gui_ext_library/frontend/webpack.config.js) and
          the script path in the [library Python module file](taipy_gui_ext_library/library.py)
          (see the `get_scripts()` method of the `ElementLibrary` subclass).<br/>
          The value in the template is "./dist/".
        - The value of *compilerOptions.include*: Holds the list of directories that
          are scanned for TypeScript source files. This must include the directory where
          our sources files are located, which in the template is the "src" directory.<br/>
          The template value is "["src"]", since that is the only directory where our
          source files are located.

## Building the extension library

There are several steps to take to build the Python package that holds the extension library
and the JavaScript code it uses.

### Customizing the extension library settings

Although the settings will work for the extension library defined in this template,
you need to modify some files to match your specific settings.

Here are the parameters to watch and where they are referenced:

- Python package directory name

  The name of the Python package that holds both the Python and JavaScript code
  for the extension library. This package is autonomous and can be imported from
  any Taipy GUI application that needs to use the defined elements.</br>
  It is important that this package name be unique because it gets installed next
  to all the other packages of your Python installation (or virtual environment).<br/>
  The value for the Python package directory name in the template is
  "taipy_gui_ext_library" and is referred to as '<package_dir_name>'.

  The name of the package appears in several places:

  - As the name of the directory that holds all the code for this extension library.<br/>
    This directory is located at the top level of this repository.<br/>
    Note that in all this document, we use the default value of "taipy_gui_ext_library"
    although your settings will change that.
  - In the [`pyproject.toml`](pyproject.toml) file, as the value for the `name` key of the
    *[project]* table.
  - In the `get_scripts()` method of the `ElementLibrary` subclass defined in
    [<package_dir_name>/library.py](taipy_gui_ext_library/library.py).<br/>
    The path to the JavaScript bundle, relative to the root of the repository,
    should be updated.
  - In the [`demo.py`](demo.py) file, where the library is imported.
  - In the [`MANIFEST`](MANIFEST.in) file that is used for building the Python package.</br>
    This file contains an instruction to package the JavaScript bundle, which is located
    using the package directory name.

  The source code comments refer to this value as '<package_dir_name>'.

- Extension library name

  The library name is the string that is returned by the method
  [`get_name()`](https://docs.taipy.io/en/latest/manuals/reference/taipy.gui.extension.ElementLibrary/#taipy.gui.extension.library.ElementLibrary.get_name)
  of the `ElementLibrary` you are building.<br/>
  The name "taipy" is reserved by Taipy GUI.<br/>
  This name usually identifies the extension library author.<br/>
  It is defined in [<package_dir_name>/library.py](taipy_gui_ext_library/library.py).

  This is used when Taipy GUI searches for the code involved in implementing
  of a visual element: custom element types use the library name as a prefix
  for their name (i.e., `<|extension_library_name.element_name|>` in a Markdown page). 

  The value in the template is "library".<br/>
  The source code comments refer to this value as '<extension_library_name>'.

- Elements

  The [library definition source file](taipy_gui_ext_library/library.py) contains a single
  element called "element" that should ultimately be removed from your extension library.

  This element is declared as using the "Element" React component defined in the
  [TypeScript source file](taipy_gui_ext_library/frontend/src/Element.tsx) and referenced in
  the [JavaScript bundle entry point](taipy_gui_ext_library/frontend/src/index.ts).<br/>
  These will have to be removed as well from your final project.

- JavaScript bundle name

  The name of the JavaScript bundle that holds the frontend code for
  this extension library.<br/>
  You don't have to change the base name of this bundle file, but in case
  you want to change this, make sure it is updated in these two locations:

  - In the method `get_scripts()` of the `ElementLibrary` subclass, defined in
    [<package_dir_name>/library.py](taipy_gui_ext_library/library.py).<br/>
    This method must return an array of strings that must contain the path to the bundle
    path relative to the repository directory.<br/>
    The value in the template is "taipy_gui_ext_library/frontend/dist/library.js".
  - In the [webpack configuration](taipy_gui_ext_library/frontend/webpack.config.js).<br/>
    The filename of the bundle must be set as the *filename* property value
    of the *output* property of the dictionary returned by the function
    assigned to *module.exports*.<br/>
    The value in the template is "library.js"

- Packaging information

  The [Python project settings file](pyproject.toml) defines a handful of information that
  is bundled in the Python package to help people find or learn about your project when
  it is deployed.<br/>
  You can look at the
  [setuptools documentation](https://setuptools.pypa.io/en/latest/)
  for more information.<br/>
  Here is a quick summary of what you can customize in the *[project]* table:

  - The *name* key already mentioned above must be set to the project's name;
  - The *version* key can be used to identify the version of your package;
  - The *authors* keys can be set to identify you, your company, or any other
    individual that is part of authoring this extension library;
  - The *description* key provides a short text string that describes your package;
  - The *readme* key can be set to locate a file with all the details for the
    extension library;
  - The *keywords* key can be used to facilitate finding your package in package
    repositories that provide a search capability.

### Setting up the JavaScript build

Before the bundle can be built, you must install the Node modules that are needed
and resolve JavaScript bundle dependencies. One of those dependencies is the Taipy
GUI JavaScript bundle that provides the Taipy GUI Extension API.

To set up to build, you must set the environment variable "TAIPY_GUI_DIR" to the
full path of the directory where Taipy GUI is installed.<br/>
To get this information, you can type:
```
pip show taipy-gui
```
This will print the information relevant to the installed Taipy GUI package. You must set
the environment variable "TAIPY_GUI_DIR" to the value indicated at the "Location:" line.<br/>
You can verify that this setting is correct by confirming that there is a directory at the
location `$TAIPY_GUI_DIR/taipy/gui/webapp`.

Once the environment variable "TAIPY_GUI_DIR" is set, here are the steps to setup the build:

- Change your directory to where the frontend code is located:<br/>
  `cd taipy_gui_ext_library/frontend`
- Install the packages that your library depends on:<br/>
  `npm install`<br/>
  This will run a JavaScript script that installs the Taipy GUI Extension API library.

The 'frontend' directory will have an additional subdirectory called 'node_modules' where
all dependent libraries are copied.

### Building the JavaScript bundle

To build the JavaScript bundle that holds the code for the frontend part of the extension
library, you must still be in the 'frontend' directory and run:
`npm run build`

Note that you can use `npm run build:dev` to keep debugging information to
spot and fix potential problems in your TypeScript code.

An additional directory called 'dist' is created in the 'frontend' directory, where
your JavaScript bundle was created.

### Testing the extension library

Now that the JavaScript bundle of the extension library is built, you can run the
[test application](demo.py) to verify it works properly.<br/>
Your current directory must be set to the root directory of the repository.

Assuming your Python environment is properly setup (that is, Taipy GUI is installed),
you can run the following:

```
python demo.py
```

A Taipy GUI application is launched, and your browser opens on the test page that
displays the custom visual element.

### Packaging the extension library

If you wish to use your custom Taipy GUI extension library in several projects or share
it with other users of Taipy GUI, you can turn it into a standalone Python package.

From the root directory of this repository, run:

```
pip install build
python -m build
```

This creates a directory called 'dist' where the Taipy GUI extension library
has been packaged into a file called `taipy_gui_ext_library-1.0.0.tar.gz`.<br/>
You can distribute this file as a regular Python package archive.
