# 数据结构与算法 Python 实现思路

[TOC]

## Introduction

Python 标准库提供了很多高级数据结构的实现，大多数写 Python 的人，由于对 Python 的标准库了解得不深入，没有使用这些现成的标准库，这么做有几个缺点：

* 重复造轮子

  标准库提供的高级数据结构都是经过高度优化的， 更节省计算资源

* 代码不够 Pythonic

  使用标准库能够使得写出的代码更 Pythonic，更加简洁易读

为了更好的利用标准库写出 Pythonic 的代码，我将对 Python 标准库应用于数据结构和算法的情景进行总结。

## deque

deque 是双向队列，可以用于

### BinaryTree Level Order Traversal

[leetcode: 102](https://leetcode.com/problems/binary-tree-level-order-traversal/ )

```Python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def levelOrder(self, root: TreeNode) -> List[List[int]]:
        from collections import deque # 导入 deque
        result = []
        if root is None:
            return result
        queue = deque()
        queue.append(root)
        while len(queue) > 0:
            level_node_nums = len(queue)
            level_nodes = []
            for _ in range(level_node_nums):
                node = queue.popleft() # popright
                level_nodes.append(node.val) # append 默认从右边插入，等价于 appendright
                if node.left is not None:
                    queue.append(node.left)
                if node.right is not None:
                    queue.append(node.right)
            result.append(level_nodes)
        return result
```

