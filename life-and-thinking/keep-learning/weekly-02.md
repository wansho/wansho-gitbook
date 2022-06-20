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