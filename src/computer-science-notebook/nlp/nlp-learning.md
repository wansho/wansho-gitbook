# NLP Learning

[TOC]

## API

### NLPCloud

[如何用自然语言处理（NLP）推送广告？](https://netlabe.com/real-time-context-targeting-using-nlp-baceb4324fc4)（英文）

经过测试，只支持中文。

### OpenAI GPT-3 API

[OpenAI API](https://openai.com/blog/openai-api/)

2020-06-11，openAi 公司发布其基于 GPT-3 模型的接口，GPT-3 是耗费上千万训练出来的顶级自然语言处理模型，包含有 1750 亿个参数。

该接口是，`Text in，Text out` 类型的接口，我已申请使用该接口。等有空玩一玩。

相关的项目：[awesome-gpt3](https://github.com/elyase/awesome-gpt3)，[gpt3-sandbox](https://github.com/shreyashankar/gpt3-sandbox)，[gpt-3-experiments](https://github.com/minimaxir/gpt-3-experiments) [品玩 gpt-3](https://www.pingwest.com/a/214772)

### 其他

百度云、阿里云

## 学术会议

* ACL: Association for Computational Linguistics() 国际计算语言协会
  * AACL 亚太分会
* EMNLP: Empirical Methods in Natural Language Processing
* IJCNLP: International Joint Conference on Natural Language Processing, EMNLP 和 IJCNLP 合并
* NLPCC: Natural Language Processing and Chinese Computing

## 书籍和视频

* [Speech and Language Processing](<https://web.stanford.edu/~jurafsky/slp3/>)
* [Natural Language Processing with PyTorch](<https://www.pdfdrive.com/natural-language-processing-with-pytorch-build-intelligent-language-applications-using-deep-learning-e188037921.html>)
* [Stanford NLP CS224N](<https://www.bilibili.com/video/av13383754>)

## 会议 Deadline 查看工具

[aideadline](<https://aideadlin.es/?sub=ML,CV,NLP,RO,SP,DM>)

## 知识图谱与智能问答

[东南大学王萌](https://pan.baidu.com/s/1pxIN7KiFooyL1tUdSZFeSw)

1. 第一阶段：TBSL 手动定义问题模板 2012

   TBSL Template-Based Model 的两个核心贡献：

   * Constructs a query template that directly mirrors thelinguistic structure of the question
   * Instantiates the template by matching natural language expressions with ontology concepts  

   TBSL的模板定义为SPARQL query模板， 将其直接与自然语言相映射。

2. 第二阶段：Semantic Parsing-Based Model   自动生成模板 2017

   * 提出了QUINT，能够根据utterance-answer对，根据依存树自动学习utterance-query模板
   * 利用自然语言的组成特点， 可以使用从简单问题中学到的模板来解决复杂问题  

## 模型介绍

### Bert vs GPT-3

[GPT-3「全面」开放，变现模式开启！](https://mp.weixin.qq.com/s/Rm7t7YRCnJPwZ9BlkLsClg)

BERT虽然是个划时代的模型，但它真正应用起来却无法避免finetune步骤，只能通过两种方式盈利：

1. 买方提需求，卖方出人力精调，赚这个需求的钱。但之后每个需求还是要付出一样的人力，边际成本不能很好递减
2. 买方直接购买基模型，做一次性生意，无法持续获利

以上两种方式都不够理想，使得BERT不能成为一个长期产品。而GPT-3的NB之处，就在于它的zero-shot能力，在不精调、或者利用prompt的情况下就有一定效果，显著减少了第一种模式的边际成本，可以通过卖服务长期捞金。



