from setuptools import find_packages, setup

setup(
    author="You Name",
    author_email="your@email.domain",
    python_requires=">=3.8",
    classifiers=[
        "Intended Audience :: Developers",
        # "License :: OSI Approved :: Apache Software License",
        "Natural Language :: English",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
    ],
    # license="Apache License 2.0",
    install_requires=["taipy-gui>=2.0"],
    include_package_data=True,
    name="taipy-gui-library",
    description="Description of the Taipy GUI library.",
    long_description="A longer description of what this Taipy GUI Extension library does.",
    keywords="taipy",
    packages=find_packages(include=["library", "library.*"]),
    version="1.0.0",
    zip_safe=False
)
