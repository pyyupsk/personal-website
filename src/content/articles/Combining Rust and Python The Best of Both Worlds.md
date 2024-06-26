---
title: 'Combining Rust and Python: The Best of Both Worlds?'
published: 2024-06-26
categories: ['Python', 'Rust', 'Programming']
description: 'Explore how integrating Rust with Python can bring out the best in both languages. Discover step-by-step guides, from setting up your project to leveraging tools like PyO3 and Maturin for seamless interoperability. Learn practical examples and advanced features to optimize your Python projects with Rust’s high performance and memory safety.'
---

Python is known for its simplicity and ease of use, making it a favorite among developers for quick scripting and prototyping. However, it's not renowned for its speed or type safety. On the other hand, Rust is a language that excels in performance, stability, and type safety. Imagine harnessing the power of both languages in your projects. Today, we'll explore how you can combine Python and Rust to get the best of both worlds.

## Why Combine Python and Rust?

Python’s limitations in speed and type safety can sometimes hinder the performance of computationally intensive applications. Rust, with its focus on high performance and memory safety, can fill this gap. By integrating Rust into Python, you can delegate performance-critical tasks to Rust while retaining Python's flexibility and ease of use.

## Setting Up Your Project

To get started with combining Python and Rust, you need a basic project setup:

1. **lib.rs file**: This is your Rust file where you define your functions.
2. **cargo.toml file**: This file contains the dependencies needed for your Rust project. For our purposes, we’ll be using the `pyo3` library.
3. **pyproject.toml file**: This file configures the build system for your project.

### Example Project Structure

```
my_project/
├── src/
│   └── lib.rs
├── Cargo.toml
└── pyproject.toml
```

### Writing Rust Functions

In your `lib.rs` file, you can define functions that will be exposed to Python. For example, a simple function to add two numbers and return the result as a string:

```rust:src/lib.rs
use pyo3::prelude::*;

// Define a function that takes two integers and returns their sum as a string
#[pyfunction]
fn sum_as_string(a: i32, b: i32) -> PyResult<String> {
    Ok((a + b).to_string())
}

// Export the function to Python
#[pymodule]
fn my_module(py: Python, m: &PyModule) -> PyResult<()> {
    m.add_function(wrap_pyfunction!(sum_as_string, m)?)?;
    Ok(())
}
```

### Building the Module

To build the Rust module and make it available in Python, you can use `Maturin`. Maturin simplifies the process of building and deploying Rust-based Python modules.

1. **Install Maturin**: You can install Maturin via pip.

    ```
    pip install maturin
    ```

2. **Build the Module**: Use Maturin to compile your Rust code into a Python module.

    ```
    maturin develop
    ```

3. **Using the Module in Python**: After building, you can import and use the Rust functions in your Python script.

    ```python:main.py
    from my_module import sum_as_string

    def main():
        result = sum_as_string(1, 2)
        print(result) # prints "3"

    if __name__ == "__main__":
        main()
    ```

## Advanced Features with PyO3

Beyond simple functions, PyO3 allows you to export more complex Rust constructs like enumerations and structs to Python. This is particularly useful for more sophisticated applications.

### Example: Exporting Rust Structs

You can define and expose Rust structs and methods to Python using `pyclass` and `PyMethods`.

```rust:src/lib.rs
use pyo3::prelude::*;

// Define a struct that contains an email address
#[pyclass]
struct Email {
    address: String,
}

// Define a method that sends an email
#[pymethods]
impl Email {
    #[new]
    fn new(address: String) -> Self {
        Email { address }
    }

    fn send(&self) -> PyResult<()> {
        println!("Sending email to {}", self.address);
        Ok(())
    }
}

// Export the Email struct to Python
#[pymodule]
fn my_module(py: Python, m: &PyModule) -> PyResult<()> {
    m.add_class::<Email>()?;
    Ok(())
}
```

In your Python script, you can now create and use instances of the `Email` class.

```python:main.py
from my_module import Email

def main():
    email = Email("example@example.com")
    email.send()

if __name__ == "__main__":
    main()
```

## Publishing Your Module

Once your module is built and tested, you might want to publish it to PyPy. With Maturin, this is straightforward:

```
maturin publish
```

This command will handle the process of publishing your module, making it available for others to install via pip.

## An Alternative: Rust Import Module

If you only need to integrate a small amount of Rust code and don’t want to create a full module, you can use the `Rust import` module. This allows you to dynamically import Rust code directly into your Python script.

1. **Install Rust Import**:

    ```
    pip install rustimport
    ```

2. **Using Rust Import**:

    ```python:main.py
    import rustimport.import_hook
    from pyo3_rustimport import Email

    def main():
        email = Email("example@example.com")
        email.send()

    if __name__ == "__main__":
        main()
    ```

This method is ideal for quick prototypes or when you need to integrate a small snippet of Rust code.

## Conclusion

Combining Python and Rust allows you to leverage the strengths of both languages. With tools like PyO3 and Maturin, integrating Rust into your Python projects is easier than ever. Whether you need to optimize performance-critical sections of your code or simply enjoy the benefits of Rust’s safety features, this hybrid approach can significantly enhance your development process.

Have you used Rust in your Python projects? What has your experience been like? Let us know in the comments below or join our community on Discord. Happy coding!
