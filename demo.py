from taipy.gui import Gui
from library import Library

page = """
# Extension library

<|library.element|>
"""
gui = Gui(page=page)
gui.add_library(Library())

if __name__ == "__main__":
    # Run main app
    gui.run()
