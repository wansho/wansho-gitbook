# Machine-Learning

[TOC]

## Books

* [machine-learning-yearning](<https://github.com/deeplearning-ai/machine-learning-yearning-cn>)

## 算法

### Latent Dirichlet Allocation

[隐含狄利克雷分布](<https://en.wikipedia.org/wiki/Latent_Dirichlet_allocation>)，是一种非监督的文档主题生成模型，其本质上是一个三层的贝叶斯概率图模型。

## 好玩的模型

### DeepFake

* [[慈禧的痛生成软件]](https://github.com/anandpawara/Real_Time_Image_Animation)
* [[deepfake中文站]](https://www.deepfaker.xyz/)
* [[DeepfaceLab]](https://github.com/iperov/DeepFaceLab)

### 效果爆炸的开源漫画变身 AI

**在线 Demo：**

https://huggingface.co/spaces/akhaliq/AnimeGANv2

**Colab 版本：**

https://colab.research.google.com/drive/1jCqcKekdtKzW7cxiw_bjbbfLsPh-dEds?usp=sharing#scrollTo=niSP_i7FVC3c

**GitHub 地址：**

https://github.com/TachibanaYoshino/AnimeGANv2

https://github.com/bryandlee/animegan2-pytorch

## Keep Learning

### Pipeline vs End2End (流水线 vs 端到端)

流水线，顾名思义，要经过一条流水线进行处理，数据从输入到输出，要经过多个模块，**工业界**的应用通常是流水线；

端到端，是只有输入输出，没有中间过程。很多神经网络算法，都是端到端的，**学术届**的研究通常是端到端的。

|          | 流水线                                                       | 端到端                               |
| -------- | ------------------------------------------------------------ | ------------------------------------ |
| Demo1    | ![流水线](assets/1565605359908.png)                          | ![端到端](assets/1565605288693.png)  |
| 面向群体 | 工业界                                                       | 学术界                               |
| 优缺点   | 需要进行特征工程，适合小数据量的机器学习；将一个复杂的任务拆解成一个个子任务，每一个子任务都相对简单，需要较少的数据量就可以完成。 | 需要大量的标注数据，但是效果往往很好 |