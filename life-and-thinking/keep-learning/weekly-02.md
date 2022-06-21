# weekly

[TOC]

## week-25



### 一个开源项目 PyScript

[PyScript 官网](https://pyscript.net/)

只需要引入一个样式文件，和一个 js 库，就可以在前端运行 Python 脚本！

给大家看一下，一个简单的 html + python，能实现的效果：

```html
<html>
  <head>
    <title>Matplotlib</title>
    <meta charset="utf-8">
    <link rel="icon" type="image/x-icon" href="./favicon.png">
    <link rel="stylesheet" href="https://pyscript.net/alpha/pyscript.css" />
    <script defer src="https://pyscript.net/alpha/pyscript.js"></script>
    <py-env>
      - matplotlib
    </py-env>
    <script src="index.js"></script>
    </head>
    <body>
      <div id="mpl"></div>
      <py-script output="mpl">
      import matplotlib.pyplot as plt
      import matplotlib.tri as tri
      import numpy as np

      # First create the x and y coordinates of the points.
      n_angles = 36
      n_radii = 8
      min_radius = 0.25
      radii = np.linspace(min_radius, 0.95, n_radii)

      angles = np.linspace(0, 2 * np.pi, n_angles, endpoint=False)
      angles = np.repeat(angles[..., np.newaxis], n_radii, axis=1)
      angles[:, 1::2] += np.pi / n_angles

      x = (radii * np.cos(angles)).flatten()
      y = (radii * np.sin(angles)).flatten()
      z = (np.cos(radii) * np.cos(3 * angles)).flatten()

      # Create the Triangulation; no triangles so Delaunay triangulation created.
      triang = tri.Triangulation(x, y)

      # Mask off unwanted triangles.
      triang.set_mask(np.hypot(x[triang.triangles].mean(axis=1),
                              y[triang.triangles].mean(axis=1))
                      < min_radius)

      fig1, ax1 = plt.subplots()
      ax1.set_aspect('equal')
      tpc = ax1.tripcolor(triang, z, shading='flat')
      fig1.colorbar(tpc)
      ax1.set_title('tripcolor of Delaunay triangulation, flat shading')

      fig1
      </py-script>
    </body>
</html>
```

![image-20220620141155388](assets/image-20220620141155388.png)



### wasm

看到上面 pyscript 项目，我很好奇，pyscript 是用的什么技术，实现的在 html 中写 Python 代码。

经过一番调研，发现其使用的就是大名鼎鼎的 web assembly（wasm） 技术。通过 wasm，可以将其他编程语言（例如 C++，Rust，Python）的代码，编译成 wasm，然后由浏览器执行 wasm 文件。

wasm 是 web 端一种偏底层的技术，其执行效率，要高于 JavaScript。

这里是我查到的一些资料：

* [wasm org](https://webassembly.org/getting-started/developers-guide/)
* python -> wasm: [Pyodide](https://pyodide.org/en/stable/), a Python distribution for the browser and Node.js based on WebAssembly.
* python -> wasm: [PyScript](https://pyscript.net/) Run Python in Your HTML 
* C++ -> wasm 的在线工具：https://mbebenita.github.io/WasmExplorer/
* Bilibili 视频介绍：https://www.bilibili.com/video/BV13i4y1n74s



### 新概念英语

逛知乎看到有人评价《新概念英语》英语这本书是学习英语的最好教材。

不明觉厉。
