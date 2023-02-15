from pathlib import Path
from taipy.gui.extension import ElementLibrary, Element, ElementProperty, PropertyType


class Library(ElementLibrary):
    elts = {
        # Declare the elements of the library here, as key/value pairs of
        # a dictionary.
        # - The key is used as the element name.
        # - The value must be an instance of taipy.gui.extension.Element
        #
        # Ex:
        # "element_name": Element(
        #    "default_property_name"
        #    {
        #      "property_name": ElementProperty(...)
        #    },
        #    react_component="ElementComponent"
        # ),
    }

    def get_name(self) -> str:
        return "library"

    def get_elements(self) -> dict:
        return Library.elts

    def get_scripts(self) -> list[str]:
        # Only one JavaScript bundle for this library.
        return ["library/frontend/dist/library.js"]

    def get_resource(self, name: str) -> Path:
        return super().get_resource(name)
