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
    name="guiext-library",
    description="My taipy-gui extension demo",
    long_description="This package contains a demonstration of using the Taipy GUI Extension API.",
    keywords="taipy",
    packages=find_packages(include=["demo_lib", "demo_lib.*"]),
    version="1.0.0",
    zip_safe=False
)
