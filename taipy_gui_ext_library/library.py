from taipy.gui.extension import ElementLibrary, Element, ElementProperty, PropertyType


class Library(ElementLibrary):

    def get_name(self) -> str:
        # Provide the name of this extension library.
        #       <extension_library_name>
        # This name is used when looking for visual elements in the page
        # content (searching <|library_name.element_name|> in Markdown).
        #
        # Note that if this extension library contains dynamic elements,
        # then this name is used for building the name of the JavaScript
        # module that holds the front-end code (if 'get_js_module_name()'
        # is not overloaded).
        # The name of the JavaScript module file is used in the front-end/webpack.config.js
        # file, as the value of the output.library.name key.
        #
        # In our situation, the JavaScript library name is a camel case version of this
        # string.
        return "library"

    def get_elements(self) -> dict:
        return {
            # Declare the elements of the library here, as key/value pairs of
            # a dictionary.
            # - The key is used as the element name.
            # - The value must be an instance of taipy.gui.extension.Element
            "element": Element(
                "text",
                {
                    "text": ElementProperty(PropertyType.dynamic_string)
                },
                react_component="Element"
            )
        }

    def get_scripts(self) -> list[str]:
        # This must contains, at least, the path to the extension JavaScript
        # bundle:
        #   <package_dir_name>/<frontend_code_dir>/<build_dir>/<js_bundle_name>.js
        return ["taipy_gui_ext_library/front-end/dist/library.js"]
