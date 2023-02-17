from pathlib import Path
from taipy.gui.extension import ElementLibrary, Element, ElementProperty, PropertyType


class Library(ElementLibrary):

    def get_name(self) -> str:
        # <extension_library_name>
        return "library"

    def get_elements(self) -> dict:
        return {
            # Declare the elements of the library here, as key/value pairs of
            # a dictionary.
            # - The key is used as the element name.
            # - The value must be an instance of taipy.gui.extension.Element
            #
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
        return ["taipy_gui_ext_library/frontend/dist/library.js"]

    def get_resource(self, name: str) -> Path:
        return super().get_resource(name)
