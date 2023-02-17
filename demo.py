from taipy.gui import Gui
# Import extension library fromt the package directory name
# from <package_dir_name> import Library
from taipy_gui_ext_library import Library

# The page contains the element from the custom extension library:
# the full name of the element type is
#     <extension_library_name>.<element_name>
page = """
# Extension library

<|My element content|library.element|>
"""
gui = Gui(page=page)
gui.add_library(Library())

if __name__ == "__main__":
    # Run main app
    gui.run()
