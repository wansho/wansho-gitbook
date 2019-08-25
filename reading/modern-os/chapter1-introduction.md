# Introduction

## 如何学习操作系统

* 结合生活，结合实践
* 结合 Linux / Windows 系统
* 学操作系统，可以沿着操作系统提供的系统调用这条线来学习

## 1.7 Operating System Structure

### MicroKernels

The basic idea behind the microkernel design is to achieve high reliability by splitting the operating system up into small, well-defined modules, only one of which—the microkernel—runs in kernel mode and the rest run as relatively powerless ordinary user processes.

微内核通常具有较高的**可靠性和安全性**，其内核精简，特别的，其将输入输出设备的**驱动程序**都作为用户进程来执行，单个驱动程序的崩溃并不会影响内核的运行。微内核的可靠性决定了其通常应用于**工业级或军用级领域**。

[Mach microkernel](<https://en.wikipedia.org/wiki/Mach_(kernel)>) 通常被公认为最早的微内核实现，由卡耐基梅隆大学研发，主要用于分布式和并行计算。Mach 的最著名的衍生品为 MacOS X，也就是说，苹果电脑的操作系统采用了微内核。采用 MicroKernel 的操作系统有：Symbian，MacOS，[MINIX 3](www.minix3.org) 

