---
outline: deep
prev:
  text: 'Docker'
  link: '/guide/docker'
next:
  text: 'Redis'
  link: '/guide/redis'
---
# Linux基础命令笔记

## Linux基础命令

### Linux的目录结构

- `/`，根目录是最顶级的目录了
- Linux只有一个顶级目录：`/`
- 路径描述的层次关系同样适用`/`来表示
- /home/itheima/a.txt，表示根目录下的home文件夹内有itheima文件夹，内有a.txt

### ls命令

功能：列出文件夹信息

语法：`ls [-l -h -a] [参数]`

- 参数：被查看的文件夹，不提供参数，表示查看当前工作目录
- -l，以列表形式查看
- -h，配合-l，以更加人性化的方式显示文件大小
- -a，显示隐藏文件

### 隐藏文件、文件夹

在Linux中以`.`开头的，均是隐藏的。

默认不显示出来，需要`-a`选项才可查看到。

### pwd命令

功能：展示当前工作目录

语法：`pwd`

### cd命令

功能：切换工作目录

语法：`cd [目标目录]`

参数：目标目录，要切换去的地方，不提供默认切换到`当前登录用户HOME目录`

### HOME目录

每一个用户在Linux系统中都有自己的专属工作目录，称之为HOME目录。

- 普通用户的HOME目录，默认在：`/home/用户名`
- root用户的HOME目录，在：`/root`

FinalShell登陆终端后，默认的工作目录就是用户的HOME目录

### 相对路径、绝对路径

- 相对路径，==非==`/`开头的称之为相对路径
- 相对路径表示以`当前目录`作为起点，去描述路径，如`test/a.txt`，表示当前工作目录内的test文件夹内的a.txt文件
- 绝对路径，==以==`/`开头的称之为绝对路径
- 绝对路径从`根`开始描述路径

### 特殊路径符

- `.`，表示当前，比如./a.txt，表示当前文件夹内的`a.txt`文件
- `..`，表示上级目录，比如`../`表示上级目录，`../../`表示上级的上级目录
- `~`，表示用户的HOME目录，比如`cd ~`，即可切回用户HOME目录

### mkdir命令

功能：创建文件夹

语法：`mkdir [-p] 参数`

- 参数：被创建文件夹的路径
- 选项：-p，可选，表示创建前置路径

### touch命令

功能：创建文件

语法：`touch 参数`

- 参数：被创建的文件路径

### cat命令

功能：查看文件内容

语法：`cat 参数`

- 参数：被查看的文件路径

### more命令

功能：查看文件，可以支持翻页查看

语法：`more 参数`

- 参数：被查看的文件路径
- 在查看过程中：
  - `空格`键翻页
  - `q`退出查看

### cp命令

功能：复制文件、文件夹

语法：`cp [-r] 参数1 参数2`

- 参数1，被复制的
- 参数2，要复制去的地方
- 选项：-r，可选，复制文件夹使用

示例：

- cp a.txt b.txt，复制当前目录下a.txt为b.txt
- cp a.txt test/，复制当前目录a.txt到test文件夹内
- cp -r test test2，复制文件夹test到当前文件夹内为test2存在

### mv命令

功能：移动文件、文件夹

语法：`mv 参数1 参数2`

- 参数1：被移动的
- 参数2：要移动去的地方，参数2如果不存在，则会进行改名

### rm命令

功能：删除文件、文件夹

语法：`rm [-r -f] 参数...参数`

- 参数：支持多个，每一个表示被删除的，空格进行分隔
- 选项：-r，删除文件夹使用
- 选项：-f，强制删除，不会给出确认提示，一般root用户会用到

rm命令很危险，一定要注意，特别是切换到root用户的时候。

### which命令

功能：查看命令的程序本体文件路径

语法：`which 参数`

- 参数：被查看的命令

### find命令

功能：搜索文件

语法1按文件名搜索：`find 路径 -name 参数`

- 路径，搜索的起始路径
- 参数，搜索的关键字，支持通配符*， 比如：`*`test表示搜索任意以test结尾的文件

### grep命令

功能：过滤关键字

语法：`grep [-n] 关键字 文件路径`

- 选项-n，可选，表示在结果中显示匹配的行的行号。
- 参数，关键字，必填，表示过滤的关键字，带有空格或其它特殊符号，建议使用””将关键字包围起来
- 参数，文件路径，必填，表示要过滤内容的文件路径，可作为内容输入端口

参数文件路径，可以作为管道符的输入

### wc命令

功能：统计

语法：`wc [-c -m -l -w] 文件路径`

- 选项，-c，统计bytes数量
- 选项，-m，统计字符数量
- 选项，-l，统计行数
- 选项，-w，统计单词数量
- 参数，文件路径，被统计的文件，可作为内容输入端口

参数文件路径，可作为管道符的输入

### 管道符|

写法：`|`

功能：将符号左边的结果，作为符号右边的输入

示例：

`cat a.txt | grep itheima`，将cat a.txt的结果，作为grep命令的输入，用来过滤`itheima`关键字

可以支持嵌套：

```
cat a.txt | grep itheima | grep itcast
```

### echo命令

功能：输出内容

语法：`echo 参数`

- 参数：被输出的内容

### `反引号

功能：被两个反引号包围的内容，会作为命令执行

示例：

- echo `pwd`，会输出当前工作目录

### tail命令

功能：查看文件尾部内容

语法：`tail [-f] 参数`

- 参数：被查看的文件
- 选项：-f，持续跟踪文件修改

### head命令

功能：查看文件头部内容

语法：`head [-n] 参数`

- 参数：被查看的文件
- 选项：-n，查看的行数

### 重定向符

功能：将符号左边的结果，输出到右边指定的文件中去

- ，表示覆盖输出
- ，表示追加输出

### vi编辑器

### 命令模式快捷键

![img](https://bqlvnd032q7.feishu.cn/space/api/box/stream/download/asynccode/?code=OTlmMjliYjRkMTlkNGM5MzI3NzNlYTA5NzlhMzQ1YTdfcXl1ZGcwcEZoMEk2TkVKRTR4OGk5SDJPQ0RqZlRTSG9fVG9rZW46QlBJcmJIS3dZbzFHcVN4bUQ1cmNVTXBRbmRYXzE3MTkyOTU5NDM6MTcxOTI5OTU0M19WNA)

![img](https://bqlvnd032q7.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2YwZjlkNDY1NWRlZDUxY2UwYWRjZmZiNmU1OWMzMWZfWHpoTTR5SDZVZnBpbDFlMkVxdlI3MWxnSExmVzkwaUNfVG9rZW46SkpyeGJUQkxCb2pQV3J4OXRnM2N1VWZ2bnY3XzE3MTkyOTU5NDM6MTcxOTI5OTU0M19WNA)

### 底线命令快捷键

![img](https://bqlvnd032q7.feishu.cn/space/api/box/stream/download/asynccode/?code=MmQ4NDU0NjI5M2E3NmU5M2E3MDI4ODIwMWVlNTJjYzRfZzJjbEZEdTZaY2lGZUVoY1o5UENGOFVFamJJdDhVQ2pfVG9rZW46SnZIY2J2aHphb0dlbTB4OXpXWGNjWGhwbm1UXzE3MTkyOTU5NDM6MTcxOTI5OTU0M19WNA)

### 命令的选项

我们学习的一系列Linux命令，它们所拥有的选项都是非常多的。

比如，简单的ls命令就有：-a -A -b -c -C -d -D -f -F -g -G -h -H -i -I -k -l -L -m -n -N -o -p -q -Q -r-R -s -S -t -T -u -U -v -w -x -X -1等选项，可以发现选项是极其多的。

课程中， 并不会将全部的选项都进行讲解，否则，一个ls命令就可能讲解2小时之久。

课程中，会对常见的选项进行讲解， 足够满足绝大多数的学习、工作场景。

### 查看命令的帮助

可以通过：`命令 --help`查看命令的帮助手册

![img](https://bqlvnd032q7.feishu.cn/space/api/box/stream/download/asynccode/?code=M2ZmZmExMWNmMjY3MGYxNDQ3NTVhZWZjMjU1NzI1ZDhfN1dwako3TVRNTG9LQmR5MVpqUGJoZ1J4RHppd1k4UHFfVG9rZW46WDJieGJIMmxYb3o5UHF4d2NuRWM2Wml5bk5mXzE3MTkyOTU5NDM6MTcxOTI5OTU0M19WNA)

### 查看命令的详细手册

可以通过：`man 命令`查看某命令的详细手册

![img](https://bqlvnd032q7.feishu.cn/space/api/box/stream/download/asynccode/?code=MGIyMWRhZjMxMzRjMDlkZGE0YTFjZTk0NzFjZjgxNDNfcGtUbnRjTGVXdDVmWlhJeXJXaVNRTzEycVdGZDNOMndfVG9rZW46VzloTGJuZ3c5bzZYSFJ4YlRiUWNLVHVLbm5iXzE3MTkyOTU5NDM6MTcxOTI5OTU0M19WNA)

## Linux常用操作

### 软件安装

- CentOS系统使用：
  - yum [install remove search] [-y] 软件名称
    - install 安装
    - remove 卸载
    - search 搜索
    - -y，自动确认
- Ubuntu系统使用
  - apt [install remove search] [-y] 软件名称
    - install 安装
    - remove 卸载
    - search 搜索
    - -y，自动确认

yum 和 apt 均需要root权限

### systemctl

功能：控制系统服务的启动关闭等

语法：`systemctl start | stop | restart | disable | enable | status 服务名`

- start，启动
- stop，停止
- status，查看状态
- disable，关闭开机自启
- enable，开启开机自启
- restart，重启

### 软链接

功能：创建文件、文件夹软链接（快捷方式）

语法：`ln -s 参数1 参数2`

- 参数1：被链接的
- 参数2：要链接去的地方（快捷方式的名称和存放位置）

### 日期

语法：`date [-d] [+格式化字符串]`

- -d 按照给定的字符串显示日期，一般用于日期计算
- 格式化字符串：通过特定的字符串标记，来控制显示的日期格式
  - %Y   年%y   年份后两位数字 (00..99)
  - %m   月份 (01..12)
  - %d   日 (01..31)
  - %H   小时 (00..23)
  - %M   分钟 (00..59)
  - %S   秒 (00..60)
  - %s   自 1970-01-01 00:00:00 UTC 到现在的秒数

示例：

- 按照2022-01-01的格式显示日期

![img](https://bqlvnd032q7.feishu.cn/space/api/box/stream/download/asynccode/?code=ODI3MTNiMTA0ZTgyZDNhOWNhNTFkM2JmZjRmZTMyMmVfM3ZMZWppbDRmUnFFVkg3NThXeFFtQU9XQ3ZaZGNYOHJfVG9rZW46VWdheWJRcVRrb2lmTkR4Q0NBTGNZdEx1bk9lXzE3MTkyOTU5NDM6MTcxOTI5OTU0M19WNA)

- 按照2022-01-01 10:00:00的格式显示日期

![img](https://bqlvnd032q7.feishu.cn/space/api/box/stream/download/asynccode/?code=MWViYjA3YzAyNWUzMjEyYmZmM2JiOGFjNzUzYTI2ZDhfMm4xcHd2SUpYcVFHNDFPQ2hyWVpIb2lDQlVHT0YxTHJfVG9rZW46WndBQWJMQTlNb0x2QjN4cUVSZ2NxaHBKbkRoXzE3MTkyOTU5NDM6MTcxOTI5OTU0M19WNA)

- -d选项日期计算

![img](https://bqlvnd032q7.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDM0YTE0YTg5ZjhkMmFmNDRkZWZmMzRmNTg0NGNlZjlfaFR5bGVaR1ZRbnZpejNXV2c3YTlJdEhCOTdXYWRCenJfVG9rZW46VkRzb2JPSHZDb05YRTh4d0xzeWNVS01RblNkXzE3MTkyOTU5NDM6MTcxOTI5OTU0M19WNA)

### 时区

修改时区为中国时区

![img](https://bqlvnd032q7.feishu.cn/space/api/box/stream/download/asynccode/?code=MDkyYWQ5MGQ2MTgzOTFlMzgyN2U2OGVlYzBiN2ZkYzdfYlJONDhmVVVxTnRzMmsyT2dLekJvWmMxSFdGSTQxbUVfVG9rZW46U2wydmI0cnFzb3lReFF4RlljOGNVUEJyblBUXzE3MTkyOTU5NDM6MTcxOTI5OTU0M19WNA)

### ntp

功能：同步时间

安装：`yum install -y ntp`

启动管理：`systemctl start | stop | restart | status | disable | enable ntpd`

手动校准时间：`ntpdate -u ntp.aliyun.com`

### ip地址

格式：a.b.c.d

- abcd为0~255的数字

特殊IP：

- 127.0.0.1，表示本机
- 0.0.0.0
  - 可以表示本机
  - 也可以表示任意IP（看使用场景）

查看ip：`ifconfig`

### 主机名

功能：Linux系统的名称

查看：`hostname`

设置：`hostnamectl set-hostname 主机名`

## 配置VMware固定IP

1. 修改VMware网络，参阅PPT，图太多
2. 设置Linux内部固定IP
3. 修改文件：`/etc/sysconfig/network-scripts/ifcfg-ens33`
4. 示例文件内容：

```Bash
TYPE="Ethernet"
PROXY_METHOD="none"
BROWSER_ONLY="no"
BOOTPROTO="static"          改为static，固定IP
DEFROUTE="yes"
IPV4_FAILURE_FATAL="no"
IPV6INIT="yes"
IPV6_AUTOCONF="yes"
IPV6_DEFROUTE="yes"
IPV6_FAILURE_FATAL="no"
IPV6_ADDR_GEN_MODE="stable-privacy"
NAME="ens33"
UUID="1b0011cb-0d2e-4eaa-8a11-af7d50ebc876"
DEVICE="ens33"
ONBOOT="yes"
IPADDR="192.168.88.131"     IP地址，自己设置，要匹配网络范围
NETMASK="255.255.255.0"     子网掩码，固定写法255.255.255.0
GATEWAY="192.168.88.2"      网关，要和VMware中配置的一致
DNS1="192.168.88.2"         DNS1服务器，和网关一致即可
```

### ps命令

功能：查看进程信息

语法：`ps -ef`，查看全部进程信息，可以搭配grep做过滤：`ps -ef | grep xxx`

### kill命令

![img](https://bqlvnd032q7.feishu.cn/space/api/box/stream/download/asynccode/?code=YmM3OWU5ZTFiZGNlNTEzODI0OWNjNTU2OTk3NDc4N2ZfSGhMVldIT0tKZWk1MWZSN0U5aXgweHdacTVFMGROcE1fVG9rZW46T0hhZ2JYWHlab2R0aWF4UEtTdWM3Rmpabk9iXzE3MTkyOTU5NDM6MTcxOTI5OTU0M19WNA)

### nmap命令

![img](https://bqlvnd032q7.feishu.cn/space/api/box/stream/download/asynccode/?code=ODdmMmNjNzMxYmI0M2E4ZTVjZGZlYTNjOTc0NGU0MWFfa0lTdkZFT3lET1p1M3A2NHlONXdWTlNLNFlVakJod3NfVG9rZW46U0I4YmJQSmx6b0s1VVB4UVZHMWNBTWVrbkRmXzE3MTkyOTU5NDM6MTcxOTI5OTU0M19WNA)

### netstat命令

功能：查看端口占用

用法：`netstat -anp | grep xxx`

### ping命令

测试网络是否联通

语法：`ping [-c num] 参数`

![img](https://bqlvnd032q7.feishu.cn/space/api/box/stream/download/asynccode/?code=M2NmYjJmOWIwOGJmM2YxZWY4ZjI2ZDY3ZjVlOWI0M2JfdVZqa05uSkFpdU1rMFAxam51TVRjWVZ4V2NEQjZYcFVfVG9rZW46TUQ5SGIza3cwbzVRVE14aVJTV2NFSTRzbkxjXzE3MTkyOTU5NDM6MTcxOTI5OTU0M19WNA)

### wget命令

![img](https://bqlvnd032q7.feishu.cn/space/api/box/stream/download/asynccode/?code=YTA0NmJkNzZkNDAyNTcwNzQyYjM3ZWNiMTgzYmJmNGVfQWR4cWt0Y3RkVHFuNHpMdTZLTFdWMUdWS2hNZzBqbjhfVG9rZW46S2VNc2IzZ3BVbzhySzd4NmpuTGNiY1BSbkJlXzE3MTkyOTU5NDM6MTcxOTI5OTU0M19WNA)

### curl命令

![img](https://bqlvnd032q7.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjhlOTJlZTUwNmFjODljOTMxMTQyNTEzYmNmMzVmYWFfRk5jWUN5NnZ4SnVtN0FXREQyOGg4N2tsOGxCYWZjQkpfVG9rZW46VnRxbGJKU2lObzFUT254MXhGTmMyeUk0bjNmXzE3MTkyOTU5NDM6MTcxOTI5OTU0M19WNA)

![img](https://bqlvnd032q7.feishu.cn/space/api/box/stream/download/asynccode/?code=NzZlN2Q4Njk3YTAzZjg1NjU1MmFiNDlhNTdkN2YzNWFfWHNmbjBLRm5LWXRWREZseFlkNDBtVXR3eUlBYVFNcFJfVG9rZW46SGpMTWJjcmVDb1lFWXV4NmRJYmM0OEpUbnJiXzE3MTkyOTU5NDM6MTcxOTI5OTU0M19WNA)

### top命令

功能：查看主机运行状态

语法：`top`，查看基础信息

可用选项：

交互式模式中，可用快捷键：

![img](https://bqlvnd032q7.feishu.cn/space/api/box/stream/download/asynccode/?code=MDFiNGI1NmQ3MGYyYjk5MmE0NDVhMTRmOTA4N2ExYThfcG8yemhQSEh1NjBpZXYweUhJOHpPRTQ1Q2ZoYURUTDRfVG9rZW46TDFmVGJtcHJvb3I2TlV4YndxdWNqMmFTbjJmXzE3MTkyOTU5NDM6MTcxOTI5OTU0M19WNA)

### df命令

查看磁盘占用

![img](https://bqlvnd032q7.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDhhNjJlZGQ1NjNhMTRkMTQ1MjJjMDc1NDVjYmQ2ZDNfZ3dnS0gwdzBOamJTdkhpcTVleGpoamh2TVNOVEpBRG9fVG9rZW46WDhVVGI4Tkxob2pjbDR4a1FpeGN2dDFFbmtjXzE3MTkyOTU5NDM6MTcxOTI5OTU0M19WNA)

### iostat命令

查看CPU、磁盘的相关信息

![img](https://bqlvnd032q7.feishu.cn/space/api/box/stream/download/asynccode/?code=MGQzM2NhNWUxNTJiYWZkYWMzYjk4NmVmMDVkMDE0ZjZfR255M09vVDFEVlN6UEVQRHE5ODl2ZEEzQTFPVklwNUtfVG9rZW46RVdRWmJIQjNnb2pnNUR4NEkwQ2M3OE1Gbk1FXzE3MTkyOTU5NDM6MTcxOTI5OTU0M19WNA)

![img](https://bqlvnd032q7.feishu.cn/space/api/box/stream/download/asynccode/?code=MWQzMDZlNzYyMjE1ZjE2ZDFkNjE3MTY2ZjIzNzQxODFfbENZY05TMGtPMDcxenJvZVVneTZlODVwZUJscmpHZDRfVG9rZW46QW5HeGJIVzNPb3NJVG54YUpramNVNThobjVlXzE3MTkyOTU5NDM6MTcxOTI5OTU0M19WNA)

### sar命令

查看网络统计

![img](https://bqlvnd032q7.feishu.cn/space/api/box/stream/download/asynccode/?code=MjdmZDI0ZWFhYWJmMzcwNjQxNzJhMmQ2MzE1ZmRjNjhfVmd5SWNEMktkV2tZV2FKQkZxTE9zQ0VxV1VhSG5oOXpfVG9rZW46RGlIMWJKYzZMb0RxTnd4alE3cGNEalFpblVjXzE3MTkyOTU5NDM6MTcxOTI5OTU0M19WNA)

### 环境变量

- 临时设置：export 变量名=变量值
- 永久设置：
  - 针对用户，设置用户HOME目录内：`.bashrc`文件
  - 针对全局，设置`/etc/profile`

### PATH变量

记录了执行程序的搜索路径

可以将自定义路径加入PATH内，实现自定义命令在任意地方均可执行的效果·

### ‘$‘’符号

可以取出指定的环境变量的值

语法：`$变量名`

示例：

`echo $PATH`，输出PATH环境变量的值

`echo ${PATH}ABC`，输出PATH环境变量的值以及ABC

如果变量名和其它内容混淆在一起，可以使用${}

### 压缩

```
tar -zcvf 压缩包 被压缩1...被压缩2...被压缩N
```

- -z表示使用gzip，可以不写

```
zip [-r] 参数1 参数2 参数N
```

![img](https://bqlvnd032q7.feishu.cn/space/api/box/stream/download/asynccode/?code=ZWYyMDQyNDMwZGM0OGY0NTc4NjY1ZTA1Yzg4YzM3MWNfUzVGZElzMmY3RjFHaUdGOXczQUpuMDZ4S1BlTkE2ekJfVG9rZW46T1ptN2JJdTR6b3VZaU54dGpDa2NUR0E3bkFlXzE3MTkyOTU5NDM6MTcxOTI5OTU0M19WNA)

### 解压

```
tar -zxvf 被解压的文件 -C 要解压去的地方
```

- -z表示使用gzip，可以省略
- -C，可以省略，指定要解压去的地方，不写解压到当前目录

```
unzip [-d] 参数
```

![img](https://bqlvnd032q7.feishu.cn/space/api/box/stream/download/asynccode/?code=YmVlYTNkMDI3ODE0MGZjZDNlZGViOGFjY2FhYjY5ZjVfUG9HTExZRXB1OWF6enE3OUozVnhhdnhCVzVqRHZaV2xfVG9rZW46VVRxM2IxbWhFbzVPamp4WHk4bWNSQW9xbm5mXzE3MTkyOTU5NDM6MTcxOTI5OTU0M19WNA)

### su命令

切换用户

语法：`su [-] [用户]`

![img](https://bqlvnd032q7.feishu.cn/space/api/box/stream/download/asynccode/?code=ZmFjMDU0YTMwNmQyZmNiM2QwNTZkNmRmNTUzMjVkYjVfNGQxa1AzOEpNcTNjajhFQ3J6V2pNWWZOVjREZjVZNWJfVG9rZW46WjQ2Y2JWUG9Bb29lZmJ4OVpjemNCdWNpbldiXzE3MTkyOTU5NDM6MTcxOTI5OTU0M19WNA)

## sudo命令

![img](https://bqlvnd032q7.feishu.cn/space/api/box/stream/download/asynccode/?code=MmU2ZWUyZGVkZDNhNzBlMjM4Mzc4ZDM2MWQ2MzZhZjJfdDgyUDJCM2pYaWxZUjFoclJLR3dHWllwRzZlN1FERm5fVG9rZW46Q0VybGJoMVFabzI2TXd4dFpTYmN3Mm55bmVlXzE3MTkyOTU5NDM6MTcxOTI5OTU0M19WNA)

比如：

itheima ALL=(ALL)       NOPASSWD: ALL

在visudo内配置如上内容，可以让itheima用户，无需密码直接使用`sudo`

### chmod命令

修改文件、文件夹权限

语法：`chmod [-R] 权限 参数`

- 权限，要设置的权限，比如755，表示：`rwxr-xr-x`

![img](https://bqlvnd032q7.feishu.cn/space/api/box/stream/download/asynccode/?code=MDA1ZmRiOTIxYWI1NWRiZjAyNTcwYTkwN2VjMWI1YWNfTjc1UGFlV1pOQzFEdHo5VEdLTkNkOXl2MGNFSE82SFBfVG9rZW46TTY1dGJMRmxhb0pld2p4Nnp1amNNNWtlbnZlXzE3MTkyOTU5NDM6MTcxOTI5OTU0M19WNA)

- 参数，被修改的文件、文件夹
- 选项-R，设置文件夹和其内部全部内容一样生效

### chown命令

修改文件、文件夹所属用户、组

语法：`chown [-R] [用户][:][用户组] 文件或文件夹`

![img](https://bqlvnd032q7.feishu.cn/space/api/box/stream/download/asynccode/?code=YTgzMWQ1YWJlYzMyZDNlYzJmYmUyODQyYzMwZmQzN2ZfclJiZTRPTjhRNXZXNVg1WGx4T1l1MTBvTzYzVXVXa0ZfVG9rZW46SEFPSGJJTU5Kb0QyRmh4MkEzaWNVWHNMbk5mXzE3MTkyOTU5NDM6MTcxOTI5OTU0M19WNA)

## 用户组管理

![img](https://bqlvnd032q7.feishu.cn/space/api/box/stream/download/asynccode/?code=MGM1MDQwNDgzMDVmYzY2YmVkNTZjZjc3OTBiOTEzMWVfcHY3dnpxR1RkQUk0YTd5UUd5NnpEMUdGSnMwOTBNT0lfVG9rZW46TzBHa2JaSDdKb2YxdlV4R0NhZGNqY2pxbkxiXzE3MTkyOTU5NDM6MTcxOTI5OTU0M19WNA)

## 用户管理

![img](https://bqlvnd032q7.feishu.cn/space/api/box/stream/download/asynccode/?code=MTkzMDQzYmI1YjEyN2UwNzZkMmEwNmU3N2M1NWY2ZGNfejQxNjVsOXJjYXc1YmNuWGt1REg3NERHY0U2QUQ0MTJfVG9rZW46WlM1ZmJCZ3pOb2xIaUt4cXdlcmMwMDl6bm1jXzE3MTkyOTU5NDM6MTcxOTI5OTU0M19WNA)

## genenv命令

- `getenv group`，查看系统全部的用户组

![img](https://bqlvnd032q7.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2UzYzM1OTFjOTIwZmJjNTUyMDQ5YTZiYjUwMWRhOGNfOEtKVEdLdU8yV1lUM0Z6WW83RHRyWHA3Yk1tUjJvaENfVG9rZW46Uko2cmJ4WTMzb1NWbFR4ejAwUWNVbUlubkNkXzE3MTkyOTU5NDM6MTcxOTI5OTU0M19WNA)

- `getenv passwd`，查看系统全部的用户

![img](https://bqlvnd032q7.feishu.cn/space/api/box/stream/download/asynccode/?code=NmQ5N2E1MGMyODIwOTdiNTE2NmMzOGE2OTdkYzE4NzBfRDdKNnZtVFlDTmRrRUxvck91dHVyU2t4V3pKYkd2dXNfVG9rZW46TlBGTGJFMUVXb2g5ell4SmpuRGM2OGlLbjRlXzE3MTkyOTU5NDM6MTcxOTI5OTU0M19WNA)

## env命令

查看系统全部的环境变量

语法：`env`