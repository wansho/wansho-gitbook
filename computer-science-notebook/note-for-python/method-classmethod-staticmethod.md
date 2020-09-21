# method-classmethod-static-method

[[The definitive guide on how to use static, class or abstract methods in Python]](https://julien.danjou.info/guide-python-static-class-abstract-methods/)

## How methods work in Python

A method is a function that is stored as a class attribute. 

method 其实也是类的属性：

```python
class Pizza(object):
    def __init__(self, size):
        self.size = size
    def get_size(self):
        return self.size


if __name__ == "__main__":
    print(Pizza.get_size) 
    # <function Pizza.get_size at 0x0C2265C8>
    # get_size 是类的一个属性
```



