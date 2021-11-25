# 密码学

Cryptography 

[TOC]

## reference

[阮一峰-密码学笔记](https://www.ruanyifeng.com/blog/2006/12/notes_on_cryptography.html)

## 对称加密 / 单钥加密

对称密钥，采用单钥加密，加密和解密都用一个密钥。

常见的单钥加密算法：

* DES（Data Encryption Standard）
* SM4 商密

## 非对称加密 / 双钥加密

双钥加密，加密和解密的密钥不同。

常见的双钥加密算法：

* RSA（ Rivest-Shamir-Adleman）
* DSA（Digital Signature Algorithm）
* SM2 商密2

公钥可以解密私钥加密的数据，私钥也可以解密公钥加密的数据。私钥加密也叫做签名，私钥只有本人拥有，具有唯一性（注意摘要和签名是两回事）。

公钥用来做加密信息，私钥用来做数字签名。通常用 hash 函数生成摘要，然后再用私钥对摘要进行数字签名。

因为任何人都可以生成自己的（公钥，私钥）对，所以为了防止有人散布伪造的公钥骗取信任，就需要一个可靠的第三方机构来生成经过认证的（公钥，私钥）对。目前，世界上最主要的数字服务认证商是位于美国加州的[Verisign](https://www.verisign.com/)公司，它的主要业务就是分发RSA数字证书。

### 生成公钥私钥

生成属于自己的公钥和私钥

```shell
ssh-keygen

# 指定密钥的加密算法，通常会选择 dsa 或 rsa 算法
ssh-keygen -t dsa

# -t 选择加密算法
# -b 设置密钥长度
# -C 设置密钥文件的注释
ssh-keygen -t rsa -b 4096 -C "your_email@domain.com"

# -f 指定生成的文件名，生成 mykey 和 mykey.pub
ssh-keygen -t dsa -f mykey
c
# 检查某个主机名是否在 known_hosts 中
ssh-keygen -F example.com

# 将服务器的公钥指纹移出 known_hosts
ssh-keygen -R example.com
```

### 用公钥加密文件

convert your ssh public key to PEM format. 将公钥转换 pem 格式。

```shell
ssh-keygen -f ~/.ssh/id_rsa.pub -e -m PKCS8 > id_rsa.pem.pub

# -f filename: Specifies the filename of the key file.

# -e export: This option will read a private or public OpenSSH key file and print to stdout a public key in one of the formats specified by the -m option.  The default export format is “RFC4716”.  This option allows exporting OpenSSH keys for use by other programs, including several commercial SSH implementations.

# -m key_format: Specify a key format for key generation, the -i (import), -e (export) conversion options, and the -p change passphrase operation.  The latter may be used to convert between OpenSSH private key and PEM private key formats. The supported key formats are: “RFC4716” (RFC 4716/SSH2public or private key), “PKCS8” (PKCS8 public or private key) or “PEM” (PEM public key).  By default OpenSSH will write newly-generated private keys in its own format, but when converting public keys for export the default format is “RFC4716”.  Setting a format of “PEM” when generating or updating a supported private key type will cause the key to be stored in the legacy PEM private key format.

# PEM: Privacy Enhanced Mail 的缩写，一种非常常见的数字证书和密钥的容器格式。PEM格式的私钥将具有扩展名 .key 和页眉和页脚：
# -----BEGIN RSA PRIVATE KEY----- 以及 -----END RSA PRIVATE KEY-----

```

ssh-keygen 只能用来生成密钥，想要加密的话，需要用 openssl，里面封装了很多密码学的工具。

```shell
openssl rsautl -encrypt -pubin -inkey id_rsa.pem.pub -ssl -in myMessage.txt -out myEncryptedMessage.txt

# The rsautl command can be used to sign, verify, encrypt and decrypt data using the RSA algorithm.

# -pubin: The input file is an RSA public key.

# -inkey file: The input key file; by default an RSA private key.

# -in file: The input file to read from, or standard input if not specified.

# -out file: The output file to write to, or standard output if not specified.

# -ssl: use SSL v2 padding

```

对加密后的文本，用私钥解密

```shell
openssl rsautl -decrypt -inkey ~/.ssh/id_rsa -in myEncryptedMessage.txt -out myDecryptedMessage.txt
```

## Message Digest

hash 算法通常用于生成消息的**摘要**，这个摘要能代表这个消息，是独一无二的。hash 函数是不可逆的。

作用：

* 用于表示这条消息没有被修改过
* 单向加密，例如用户密码存储

常见的 hash 函数：

* MD5（Message Digest）
* SM3 商密
* SHA 家族（Secure Hash Algorithm）



## OpenSSL

[OpenSSL 中文手册](https://www.openssl.net.cn/)

Secure Sockets Layer. OpenSSL 是一个安全工具箱。

The OpenSSL Project develops and maintains the OpenSSL software - a robust, commercial-grade, full-featured toolkit for general-purpose cryptography and secure communication. 

openssl 包含的工具：

```
标准命令
Standard commands
asn1parse         ca                ciphers           cms
crl               crl2pkcs7         dgst              dh
dhparam           dsa               dsaparam          ec
ecparam           enc               engine            errstr
gendh             gendsa            genpkey           genrsa
nseq              ocsp              passwd            pkcs12
pkcs7             pkcs8             pkey              pkeyparam
pkeyutl           prime             rand              req
rsa               rsautl            s_client          s_server
s_time            sess_id           smime             speed
spkac             ts                verify            version
x509

签名命令
Message Digest commands (see the `dgst' command for more details)
md2               md4               md5               rmd160
sha               sha1

加密命令
Cipher commands (see the `enc' command for more details) 
aes-128-cbc       aes-128-ecb       aes-192-cbc       aes-192-ecb
aes-256-cbc       aes-256-ecb       base64            bf
bf-cbc            bf-cfb            bf-ecb            bf-ofb
camellia-128-cbc  camellia-128-ecb  camellia-192-cbc  camellia-192-ecb
camellia-256-cbc  camellia-256-ecb  cast              cast-cbc
cast5-cbc         cast5-cfb         cast5-ecb         cast5-ofb
des               des-cbc           des-cfb           des-ecb
des-ede           des-ede-cbc       des-ede-cfb       des-ede-ofb
des-ede3          des-ede3-cbc      des-ede3-cfb      des-ede3-ofb
des-ofb           des3              desx              idea
idea-cbc          idea-cfb          idea-ecb          idea-ofb
rc2               rc2-40-cbc        rc2-64-cbc        rc2-cbc
rc2-cfb           rc2-ecb           rc2-ofb           rc4
rc4-40            rc5               rc5-cbc           rc5-cfb
rc5-ecb           rc5-ofb           seed              seed-cbc
seed-cfb          seed-ecb          seed-ofb          zlib
```

查看每个命令具体怎么使用：

```shell
openssl rasutil --help
```



### standard commands

标准命令

### message digest commands



### cipher commands

加密命令

base64 加密

```shell
openssl base64 -in crypt-test.txt -out test.txt
```

## 数字签名与数字证书

数字签名，重点在于签名二字，不在数字。签名，顾名思义，就是证明这份文件是我的。

那么数字签名，是怎么证明，这个文件是我的呢，不是被人掉包过的，或者改动过的呢？

甲写了一个文档，用 md5 生成摘要，md5 只能保证文档没有被修改过，如果只把文档和摘要发送给乙的话，不能证明这个文档没有被掉包。

那么怎么证明文档没有被掉包呢，证明文件是甲的呢，这就需要对文件进行签名了，生活中我们用笔给文件进行签名，在虚拟世界，我们用私钥给文件进行签名，因为 md5 摘要可以完全代表这个文档，我们只需要用私钥对 md5 摘要进行加密签名就可以了，然后把这个签名和文档一起发给乙。

乙收到文档和签名后，用甲给的公钥解密签名，得到 md5 摘要，然后再用 md5 算法计算文档摘要，如果两个摘要一样，说明这个文档确实是甲发的，而且内容没有被改过。

但是数字签名还是有漏洞的，乙全程持有的都是甲的公钥，如果这个公钥被偷换成了丙的公钥，那么丙就可以冒充甲。

那么怎么证明乙持有的公钥就是甲的公钥呢？这就需要一个公正处（certificate authority，简称CA）来公证了，每次都从公证处获取甲的公钥，然后再解密。这样乙就不要总是持有甲的公钥了。

证书中心用自己的私钥，对甲的公钥和甲的相关信息进行签名，生成甲的数字证书。然后把文档 + 数字签名 + 数字证书一起发给乙。乙收到后，用证书中心的公钥，对数字证书进行解密，获取里面包含的甲的公钥，就能保证公钥的安全了。

![image-20211115084236450](assets/image-20211115084236450.png)

## 查表备忘

### PKCS

The Public-Key Cryptography Standards (PKCS) 公钥密码学标准

| PKCS                                                         | 版本 | 介绍                                                         | 详解                                                         |
| ------------------------------------------------------------ | ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| [PKCS #1](https://zh.wikipedia.org/w/index.php?title=PKCS_1&action=edit&redlink=1) | 2.1  | RSA密码编译标准（RSA Cryptography Standard）                 | 定义了RSA的数理基础、公/私钥格式，以及加/解密、签/验章的流程。1.5版本曾经遭到攻击[[1\]](https://zh.wikipedia.org/wiki/公钥密码学标准#cite_note-1)。 |
| PKCS #2                                                      | -    | *弃用*                                                       | 原本是用以规范RSA加密摘要的转换方式，现已被纳入PKCS#1之中。  |
| PKCS #3                                                      | 1.4  | [DH密钥协议](https://zh.wikipedia.org/wiki/迪菲-赫爾曼密鑰交換)标准（Diffie-Hellman key agreement Standard） | 规范以DH密钥协议为基础的密钥协议标准。其功能，可以让两方透过金议协议，拟定一把会议密钥(Session key)。 |
| PKCS #4                                                      | -    | *弃用*                                                       | 原本用以规范转换RSA密钥的流程。已被纳入PKCS#1之中。          |
| PKCS #5                                                      | 2.0  | 密码基植加密标准（Password-based Encryption Standard）       | 参见RFC 2898与[PBKDF2](https://zh.wikipedia.org/w/index.php?title=PBKDF2&action=edit&redlink=1)。 |
| PKCS #6                                                      | 1.5  | 证书扩展语法标准（Extended-Certificate Syntax Standard）     | 将原本X.509的证书格式标准加以扩展。                          |
| PKCS #7                                                      | 1.5  | 密码消息语法标准（Cryptographic Message Syntax Standard）    | 参见RFC 2315。规范了以[公开密钥基础设施](https://zh.wikipedia.org/w/index.php?title=公開金鑰基礎設施&action=edit&redlink=1)（PKI）所产生之签名/密文之格式。其目的一样是为了拓展数字证书的应用。其中，包含了[S/MIME](https://zh.wikipedia.org/wiki/S/MIME)与[CMS](https://zh.wikipedia.org/w/index.php?title=密碼訊息語法&action=edit&redlink=1)。 |
| [PKCS #8](https://zh.wikipedia.org/w/index.php?title=PKCS_8&action=edit&redlink=1) | 1.2  | 私钥消息表示标准（Private-Key Information Syntax Standard）. | Apache读取证书私钥的标准。                                   |
| PKCS #9                                                      | 2.0  | 选择属性格式（Selected Attribute Types）                     | 定义PKCS#6、7、8、10的选择属性格式。                         |
| [PKCS #10](https://zh.wikipedia.org/w/index.php?title=PKCS_10&action=edit&redlink=1) | 1.7  | 证书申请标准（Certification Request Standard）               | 参见RFC 2986。规范了向证书中心申请证书之CSR（certificate signing request）的格式。 |
| [PKCS #11](https://zh.wikipedia.org/wiki/PKCS11)             | 2.20 | 密码设备标准接口（Cryptographic Token Interface (Cryptoki)） | 定义了密码设备的应用程序接口（API）之规格。                  |
| [PKCS #12](https://zh.wikipedia.org/wiki/PKCS_12)            | 1.0  | 个人消息交换标准（Personal Information Exchange Syntax Standard） | 定义了包含私钥与[公钥证书](https://zh.wikipedia.org/wiki/公開金鑰認證)（public key certificate）的文件格式。私钥采密码(password)保护。常见的PFX就履行了PKCS#12。 |
| PKCS #13                                                     | –    | [椭圆曲线密码学](https://zh.wikipedia.org/wiki/椭圆曲线密码学)标准（Elliptic curve cryptography Standard） | 制定中。规范以椭圆曲线密码学为基础所发展之密码技术应用。椭圆曲线密码学是新的密码学技术，其强度与效率皆比现行以指数运算为基础之密码学算法来的优秀。然而，该算法的应用尚不普及。 |
| PKCS #14                                                     | –    | [拟随机数产生器](https://zh.wikipedia.org/w/index.php?title=擬亂數產生器&action=edit&redlink=1)标准（Pseudo-random Number Generation） | 制定中。规范拟随机数产生器的使用与设计。                     |
| PKCS #15                                                     | 1.1  | 密码设备消息格式标准（Cryptographic Token Information Format Standard） | 定义了密码设备内部数据的组织结构。                           |

