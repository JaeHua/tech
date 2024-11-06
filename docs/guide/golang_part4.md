---
outline: deep
prev:
  text: 'Golang常见数据结构和算法'
  link: '/guide/golang_part3'
---
## 创建型模式

### 简单工厂模式

go 语言没有[构造函数](https://so.csdn.net/so/search?q=构造函数&spm=1001.2101.3001.7020)，所以我们一般是通过 NewXXX 函数来初始化相关类。 NewXXX 函数返回接口时就是简单工厂模式，也就是说 Golang 的一般推荐做法就是简单工厂。

- 不同协议生成不同的downloader

```Go
package main

/*
        封装NewXXX函数
*/

type Protocol string

var (
        SmbProtocol Protocol = "smb"
        NfsProtocol Protocol = "nfs"
)

type IDownload interface {
        Download()
}

type SmbDownloader struct{}

func (s *SmbDownloader) Download() {
        println("smb download")
}

type NfsDownloader struct{}

func (n *NfsDownloader) Download() {
        println("nfs download")
}

func NewDownloader(t Protocol) IDownload {
        switch t {
        case SmbProtocol:
                return &SmbDownloader{}
        case NfsProtocol:
                return &NfsDownloader{}
        }
        return nil
}

func main() {
        //测试：根据协议类型，创建不同类型的下载器
        smbDownloader := NewDownloader(SmbProtocol)
        smbDownloader.Download()

        nfsDownloader := NewDownloader(NfsProtocol)
        nfsDownloader.Download()
}
```

### 工厂方法模式

工厂方法模式使用子类的方式延迟生成对象到子类中实现。 Go中不存在继承 所以使用匿名组合来实现

- 简单工厂：唯一工厂类，一个产品抽象类，工厂类的创建方法依据入参判断并创建具体产品对象。
- 工厂方法：多个工厂类，一个产品抽象类，利用多态创建不同的产品对象，避免了大量的if-else判断。

```Go
package main

import "fmt"

/*
> - 简单工厂：唯一工厂类，一个产品抽象类，工厂类的创建方法依据入参判断并创建具体产品对象。
> - 工厂方法：多个工厂类，一个产品抽象类，利用多态创建不同的产品对象，避免了大量的if-else判断。
> - 抽象工厂：多个工厂类，多个产品抽象类，产品子类分组，同一个工厂实现类创建同组中的不同产品，减少了工厂子类的数量。
*/

// Operator 被封装的实际接口
type Operator interface {
        SetA(int)
        SetB(int)
        Result() int
}

// OperatorFactory 是工厂接口
type OperatorFactory interface {
        Create() Operator
}

// OperatorBase 是Operator 接口实现的基类，封装公用方法
type OperatorBase struct {
        a, b int
}

func (o *OperatorBase) SetA(a int) {
        o.a = a
}

func (o *OperatorBase) SetB(b int) {
        o.b = b
}

// PlusOperatorFactory  加法运算的工厂类
type PlusOperatorFactory struct{}

type PlusOperator struct {
        *OperatorBase
}

func (p *PlusOperator) Result() int {
        return p.a + p.b
}

func (p PlusOperatorFactory) Create() Operator {
        return &PlusOperator{
                OperatorBase: &OperatorBase{},
        }
}

// MinusOperatorFactory  减法运算的工厂类
type MinusOperatorFactory struct {
        *OperatorBase
}

func (p *MinusOperatorFactory) Result() int {
        return p.a - p.b
}

func (p *MinusOperatorFactory) Create() Operator {
        return &MinusOperatorFactory{
                OperatorBase: &OperatorBase{},
        }
}

func main() {
        //加法
        plusFactory := PlusOperatorFactory{}
        plusOperator := plusFactory.Create()
        plusOperator.SetA(10)
        plusOperator.SetB(20)
        result := plusOperator.Result()
        fmt.Println("plusOperator=", result)

        //减法
        minusFactory := MinusOperatorFactory{}
        minusOperator := minusFactory.Create()
        minusOperator.SetA(10)
        minusOperator.SetB(5)
        result = minusOperator.Result()
        fmt.Println("minusOperator=", result)
}
```

### 抽象工厂模式

- 抽象工厂：多个工厂类，多个产品抽象类，产品子类分组，同一个工厂实现类创建同组中的不同产品，减少了工厂子类的数量。

### 创建者模式

将build一个物品拆分为几个部分

1. 定义接口type goodsBuilder interface
   1. setName
   2. setPrice
   3. setCount
   4. *Goods
2. 定义具体实现结构体type ConcreteBuilder struct
3. 实现goodsBuilder接口
4. 提供NewGoodsBuilder接口，返回ConcreteBuilder实现类

```Go
package main

import "fmt"

// Goods 构建的对象
type Goods struct {
        Name  string
        Price float64
        Count int
}

// GoodsBuilder 构建器
type GoodsBuilder interface {
        SetName(name string) GoodsBuilder
        SetPrice(price float64) GoodsBuilder
        SetCount(count int) GoodsBuilder
        Build() *Goods
}

// ConcreteBuilder 具体构建器
type ConcreteBuilder struct {
        goods *Goods
}

func (g ConcreteBuilder) Build() *Goods {
        return g.goods
}

func (g ConcreteBuilder) SetName(name string) GoodsBuilder {
        g.goods.Name = name
        return g
}

func (g ConcreteBuilder) SetPrice(price float64) GoodsBuilder {
        g.goods.Price = price
        return g
}

func (g ConcreteBuilder) SetCount(count int) GoodsBuilder {
        g.goods.Count = count
        return g
}

func NewGoodsBuilder() GoodsBuilder {
        return &ConcreteBuilder{
                goods: &Goods{},
        }
}

func main() {
        builder := NewGoodsBuilder()
        goods := builder.SetName("apple").SetCount(2).SetPrice(65.0).Build()
        fmt.Println(goods)
}
```

### 原型模式

原型模式使对象能复制自身，并且暴露到接口中，使客户端面向接口编程时，不知道接口实际对象的情况下生成新的对象。

> 原型模式配合原型管理器使用，使得客户端在不知道具体类的情况下，通过接口管理器得到新的实例，并且包含部分预设定配置。

- 示例步骤：

1. 定义接口type Prototype interface
2. 包含clone方法：Clone() Prototype
3. 定义结构体type ConcretePrototype struct
4. 实现clone方法：Clone() Prototype

```Go
package main

import "fmt"

// Prototype 定于原型接口
type Prototype interface {
        Clone() Prototype
}

// ConcretePrototype 定义具体原型结构体
type ConcretePrototype struct {
        name string
}

// Clone 提供clone方法
func (c ConcretePrototype) Clone() Prototype {
        return &ConcretePrototype{
                name: c.name,
        }
}

func main() {
        //创建原型对象
        prototypeObj := &ConcretePrototype{name: "test"}
        //使用原型对象创建新对象
        cloneObject := prototypeObj.Clone()
        fmt.Println(cloneObject.(*ConcretePrototype).name)
        //prototypeObj=0x1400000e028
        //cloneObject=0x14000010280
        fmt.Printf("prototypeObj=%v\n", &prototypeObj)
        fmt.Printf("cloneObject=%p\n", cloneObject)
}
```

### 单例模式

一个类只有一个实例

使用懒惰模式的单例模式，使用once.Do加锁保证线程安全保证只有单个实例

单例模式：

1. 懒汉式：用到时才实例化（GetInstance），通过once.Do保证只加载一次
2. 饿汉式：一开始就实例化（init）

```Go
package main

import (
        "fmt"
        "sync"
)

// 懒汉式：用到才加载【饿汉式：直接放在init方法里，程序一启动就创建好】
var (
        instance *Singleton
        once     = sync.Once{}
)

type Singleton struct {
}

func GetInstance() *Singleton {
        once.Do(func() {
                instance = &Singleton{}
        })
        return instance
}

func main() {
        one := GetInstance()
        two := GetInstance()
        //one=0x100f54088
        //two=0x100f54088
        fmt.Printf("one=%p\n", one)
        fmt.Printf("two=%p\n", two)
}
```

## 结构型模式

### 外观模式

外观模式也叫门面模式，是一种结构型设计模式，它提供了一个统一的接口来访问子系统中的一组接口。这种模式通过定义一个高层接口来隐藏子系统的复杂性，使子系统更容易使用。 在Go语言中，我们可以使用结构体和接口来实现外观模式。

```Go
package main

import "fmt"

/*
        定义两个及以上子系统，合成为一个整体系统，整体系统可以独立运行
        - 定义修复器，将多个子系统组合在一起
                - AudioMixer：修复音频
                - VideoMixer：修复视频
*/
// AudioMixer Subsystem 1：修复音频
type AudioMixer struct {
}

func (a *AudioMixer) Fix(name string) {
        fmt.Println(fmt.Sprintf("%s (audio fixed)", name))
}

// VideoMixer Subsystem 2：修复视频
type VideoMixer struct {
}

func (v *VideoMixer) Fix(name string) {
        fmt.Println(fmt.Sprintf("%s (video fixed)", name))
}

// MediaMixer Facade：将多个子系统组合在一起
type MediaMixer struct {
        audioMixer *AudioMixer
        videoMixer *VideoMixer
}

func (m *MediaMixer) Fix(name string) {
        m.audioMixer.Fix(name)
        m.videoMixer.Fix(name)
}

func NewMediaMixer() *MediaMixer {
        return &MediaMixer{
                audioMixer: &AudioMixer{},
                videoMixer: &VideoMixer{},
        }
}

func main() {
        mixer := NewMediaMixer()
        mixer.Fix("电视机")
}
```

### 适配器模式

> 适配器适合用于解决新旧系统（或新旧接口）之间的兼容问题，而不建议在一开始就直接使用

- 适配器模式将一个类的接口，转换成客户期望的另一个接口。适配器让原本接口不兼容的类可以合作无间

关键代码: **适配器****中持有旧接口对象，并实现新接口**

```Go
package main

import "fmt"

// AlipayInterface 支付宝SDK
type AlipayInterface interface {
        Pay(money int)
}

type AlipayPay struct {
}

func (a *AlipayPay) Pay(money int) {
        fmt.Println("这里是支付宝支付：", "费用是：", money)
}

type WeixinPayInterface interface {
        Pay(money int)
}
type WeixinPay struct {
}

func (a *WeixinPay) Pay(money int) {
        fmt.Println("这里是微信支付：", "费用是：", money)
}

// TargetPayInterface 目标接口，能支持传入支付宝或者微信支付进行支付
type TargetPayInterface interface {
        DealPay(payType string, money int)
}

// 自己的adapter，实现微信和支付宝支付，
type NewAdapter struct {
        AlipayInterface
        WeixinPayInterface
}

func (n *NewAdapter) DealPay(payType string, money int) {
        switch payType {
        case "weixinpay":
                n.WeixinPayInterface.Pay(money)
        case "alipay":
                n.AlipayInterface.Pay(money)
        default:
                fmt.Println("不支持的支付方式")
        }
}

func main() {
        // 同时调用支付宝和微信支付
        t := &NewAdapter{
                AlipayInterface:    &AlipayPay{},
                WeixinPayInterface: &WeixinPay{},
        }
        // 这里业务中基于一个用户同时只能调用一种支付方式。
        t.DealPay("weixinpay", 35)
        t.DealPay("alipay", 101)
}
```

### 代理模式

代理模式用于延迟处理操作或者在进行实际操作前后进行其它处理。

```Go
package main

import (
        "fmt"
)

type PaymentService interface {
        pay(order string) string
}

// AliPay 阿里支付类
type AliPay struct {
}

/**
 * @Description: 阿里支付类，从阿里获取支付token
 * @receiver a
 * @param order
 * @return string
 */
func (a *AliPay) pay(order string) string {
        return "从阿里获取支付token"
}

type PaymentProxy struct {
        realPay PaymentService
}

/**
 * @Description: 做校验签名、初始化订单数据、参数检查、记录日志、组装这种通用性操作，调用真正支付类获取token
 * @receiver p
 * @param order
 * @return string
 */
func (p *PaymentProxy) pay(order string) string {
        fmt.Println("处理" + order)
        fmt.Println("1校验签名")
        fmt.Println("2格式化订单数据")
        fmt.Println("3参数检查")
        fmt.Println("4记录请求日志")
        token := p.realPay.pay(order)
        return "http://组装" + token + "然后跳转到第三方支付"
}
func main() {
        proxy := &PaymentProxy{
                realPay: &AliPay{},
        }
        url := proxy.pay("阿里订单")
        fmt.Println(url)
}
```

### 组合模式

组合模式统一对象和对象集，使得使用相同接口使用对象和对象集。

```
组合模式常用于树状结构，用于统一叶子节点和树节点的访问，并且可以用于应用某一操作到所有子节点
```

- 示例：以飞书文档接口为例，一个目录下面可以包含多个子文件

我们最先想到的做法就是：将文件和目录放在一个类中，新增一个字段，用于判断是文件还是目录。但这样并不优雅。因为文件和目录是不同的，各自有各自的特性，将特有的内容放到一个类里，不满足单一职责原则。

下面将展示通过组合模式来实现文档管理结构

```Go
package main

import "fmt"

const Separator = "--"

// FileSystemNode 文件系统接口：文件和目录都要实现该接口
type FileSystemNode interface {
        Display(separator string)
}

// FileCommonFunc 文件通用功能
type FileCommonFunc struct {
        fileName string
}

func (f *FileCommonFunc) SetFileName(fileName string) {
        f.fileName = fileName
}

// FileNode 文件类
type FileNode struct {
        FileCommonFunc
}

// Display 文件类显示文件内容
func (f *FileNode) Display(separator string) {
        fmt.Println(separator + f.fileName + "   文件内容为：Hello，world")
}

// DirectoryNode 目录类
type DirectoryNode struct {
        FileCommonFunc
        nodes []FileSystemNode
}

// Display 目录类展示文件名
func (d *DirectoryNode) Display(separator string) {
        fmt.Println(separator + d.fileName)
        for _, node := range d.nodes {
                node.Display(separator + Separator)
        }
}

func (d *DirectoryNode) Add(f FileSystemNode) {
        d.nodes = append(d.nodes, f)
}

func main() {
        //初始化
        biji := DirectoryNode{}
        biji.SetFileName("笔记")

        huiyi := DirectoryNode{}
        huiyi.SetFileName("会议")

        chenhui := FileNode{}
        chenhui.SetFileName("晨会.md")

        zhouhui := FileNode{}
        zhouhui.SetFileName("周会.md")
        //组装
        biji.Add(&huiyi)
        huiyi.Add(&chenhui)
        huiyi.Add(&zhouhui)
        //显示
        biji.Display(Separator)
}
```

### 享元模式

享元模式从对象中剥离出不发生改变且多个实例需要的重复数据，独立出一个享元，使多个对象共享，从而节省内存以及减少对象数量。

```Go
package main

import "fmt"

type ImageFlyweightFactory struct {
        maps map[string]*ImageFlyweight
}

var imageFactory *ImageFlyweightFactory

func GetImageFlyweightFactory() *ImageFlyweightFactory {
        if imageFactory == nil {
                imageFactory = &ImageFlyweightFactory{
                        maps: make(map[string]*ImageFlyweight),
                }
        }
        return imageFactory
}

func (f *ImageFlyweightFactory) Get(filename string) *ImageFlyweight {
        image := f.maps[filename]
        if image == nil {
                image = NewImageFlyweight(filename)
                f.maps[filename] = image
        }

        return image
}

type ImageFlyweight struct {
        data string
}

func NewImageFlyweight(filename string) *ImageFlyweight {
        // Load image file
        data := fmt.Sprintf("image data %s", filename)
        return &ImageFlyweight{
                data: data,
        }
}

func (i *ImageFlyweight) Data() string {
        return i.data
}

type ImageViewer struct {
        *ImageFlyweight
}

func NewImageViewer(filename string) *ImageViewer {
        image := GetImageFlyweightFactory().Get(filename)
        return &ImageViewer{
                ImageFlyweight: image,
        }
}

func (i *ImageViewer) Display() {
        fmt.Printf("Display: %s\n", i.Data())
}

func main() {
        factory := GetImageFlyweightFactory()
        redViewer := factory.Get("red")
        redViewer2 := factory.Get("red")
        greenViewer := factory.Get("green")
        //true
        fmt.Println(redViewer == greenViewer)
        fmt.Println(redViewer == redViewer2)
}
```

### 装饰模式

装饰模式使用对象组合的方式动态改变或增加对象行为。

Go语言借助于匿名组合和非入侵式接口可以很方便实现装饰模式。使用匿名组合，在装饰器中不必显式定义转调原对象方法。

```Go
package main

import "fmt"

type Car struct {
        Brand string
        Price float64
}

// PriceDecorator 定义装饰器接口
type PriceDecorator interface {
        DecoratePrice(c Car) Car
}

// ExtraPriceDecorator 实现装饰器
type ExtraPriceDecorator struct {
        ExtraPrice float64
}

func (d ExtraPriceDecorator) DecoratePrice(car Car) Car {
        car.Price += d.ExtraPrice
        return car
}

func main() {
        toyota := Car{Brand: "Toyota", Price: 10000}
        decorator := ExtraPriceDecorator{ExtraPrice: 500}
        decoratedCar := decorator.DecoratePrice(toyota)
        fmt.Printf("%+v\n", decoratedCar)
}
```

### 桥模式

桥接模式分离抽象部分和实现部分。使得两部分独立扩展。

- 如果你想要拆分或重组一个具有多重功能的庞杂类（例如能与多个数据库服务器进行交互的类），可以使用桥接模式。
- 如果你希望在几个独立维度上扩展一个类，可使用该模式。
-  如果你需要在运行时切换不同实现方法，可使用桥接模式。

```Go
package main

import "fmt"

type Printer interface {
        PrintFile()
}

type Epson struct{}

func (p *Epson) PrintFile() {
        fmt.Println("Printing by a EPSON Printer")
}

type Hp struct{}

func (p *Hp) PrintFile() {
        fmt.Println("Printing by a HP Printer")
}

type Computer interface {
        Print()
        SetPrinter(Printer)
}

type Mac struct {
        printer Printer
}

func (m *Mac) Print() {
        fmt.Println("Print request for mac")
        m.printer.PrintFile()
}

func (m *Mac) SetPrinter(p Printer) {
        m.printer = p
}

type Windows struct {
        printer Printer
}

func (w *Windows) Print() {
        fmt.Println("Print request for windows")
        w.printer.PrintFile()
}

func (w *Windows) SetPrinter(p Printer) {
        w.printer = p
}

func main() {
        hpPrinter := &Hp{}
        epsonPrinter := &Epson{}

        macComputer := &Mac{}

        macComputer.SetPrinter(hpPrinter)
        macComputer.Print()
        fmt.Println()

        macComputer.SetPrinter(epsonPrinter)
        macComputer.Print()
        fmt.Println()

        winComputer := &Windows{}

        winComputer.SetPrinter(hpPrinter)
        winComputer.Print()
        fmt.Println()

        winComputer.SetPrinter(epsonPrinter)
        winComputer.Print()
        fmt.Println()

}
```

## 行为型模式

### 中介者模式

中介者模式封装对象之间互交，使依赖变的简单，并且使复杂互交简单化，封装在中介者中

**使用场景：**

1. 当一些对象和其他对象紧密耦合以致难以对其进行修改时，可使用中介者模式。
2. 当组件因过于依赖其他组件而无法在不同应用中复用时，可使用中介者模式。
3. 如果为了能在不同情景下复用一些基本行为，导致你需要被迫创建大量组件子类时，可使用中介者模式。

```Go
package main

import "fmt"

/*
   1. 定义三个类型：Mediator（中介者接口）、ChatRoom（具体中介者）和 User（用户类）。
      ChatRoom 实现了 Mediator 接口，负责协调用户之间的交互。
      User 类有一个 Mediator 类型的属性，用于和中介者对象进行交互。

   2. 在 main() 函数中，创建了一个中介者对象 chatRoom，
   3. 创建了两个用户对象 user1 和 user2，并将中介者对象设置给它们。
   4. 用户对象分别调用 sendMessage() 方法向其他用户发送消息。

*/

// Mediator 中介者接口
type Mediator interface {
        sendMessage(msg string, user User)
        receiveMessage() string
}

// ChatRoom 具体中介者
type ChatRoom struct {
        Message string
}

func (c *ChatRoom) sendMessage(msg string, user User) {
        c.Message = fmt.Sprintf("（通过chatRoom） %s 发送消息: %s\n", user.name, msg)
}

func (c *ChatRoom) receiveMessage() string {
        return c.Message
}

// User 用户类
type User struct {
        name     string
        mediator Mediator
}

func (u *User) getName() string {
        return u.name
}

func (u *User) setMediator(mediator Mediator) {
        u.mediator = mediator
}

func (u *User) sendMessage(msg string) {
        u.mediator.sendMessage(msg, *u)
}

func (u *User) receiveMessage() string {
        return u.mediator.receiveMessage()
}

func main() {
        // 创建中介者对象
        chatRoom := &ChatRoom{}

        // 创建用户对象，并设置中介者
        user1 := &User{name: "User1"}
        user2 := &User{name: "User2"}
        user1.setMediator(chatRoom)
        user2.setMediator(chatRoom)

        // 用户发送消息
        user1.sendMessage("Hello World!")
        fmt.Println(user2.receiveMessage())
        user2.sendMessage("Hi!")
        fmt.Println(user1.receiveMessage())
}
```

### 观察者模式

一个对象的改变会触发其它观察者的相关动作，而此对象无需关心连动对象的具体实现。 **关键**：被观察者持有了集合存放观察者 (收通知的为观察者)；类比消息队列的发布订阅，你订阅了此类消息，当有消息来时，我就通知。

### 命令模式

命令模式本质是把某个对象的方法调用封装到对象中，方便传递、存储、调用。

```Go
package main

import "fmt"

// Invoker 调用者
type Invoker struct {
        commands []ICommand
}

func NewInvoker() *Invoker {
        invoker := new(Invoker)
        return invoker
}

func (i *Invoker) AddCommand(cmd ICommand) {
        i.commands = append(i.commands, cmd)
}

func (i *Invoker) Call() {
        if len(i.commands) == 0 {
                return
        }
        for _, command := range i.commands {
                command.Execute()
        }
}

// ICommand 命令接口
type ICommand interface {
        Execute()
}

type ShutdownCommand struct {
        tv *TV
}

func (s *ShutdownCommand) Execute() {
        s.tv.ShutDown()
}

type TurnOnCommand struct {
        tv *TV
}

func (t *TurnOnCommand) Execute() {
        t.tv.TurnOn()
}

type TV struct {
        Name string
}

func NewTV() *TV {
        return new(TV)
}

func (t *TV) ShutDown() {
        fmt.Printf("关闭%s电视\n", t.Name)
}

func (t *TV) TurnOn() {
        fmt.Printf("打开%s电视\n", t.Name)
}

// 命令模式，客户端通过调用者，传递不同的命令，然后不同的接受者对此进行处理
func main() {
        invoker := NewInvoker()
        tv := &TV{Name: "长虹"}
        shutdownCommand := &ShutdownCommand{tv: tv}
        turnOnCommand := &TurnOnCommand{tv: tv}
        invoker.AddCommand(shutdownCommand)
        invoker.AddCommand(turnOnCommand)
        invoker.AddCommand(shutdownCommand)
        invoker.Call()
}
```

### 迭代器模式

> 迭代器模式用于使用相同方式送代不同类型集合或者隐藏集合类型的具体实现。

可以使用迭代器模式使遍历同时应用送代策略，如请求新对象、过滤、处理对象等。

```Go
package main

import "fmt"

/*
迭代器模式（Iterator Pattern）：遍历一个聚合对象的元素而无需暴露其内部实现。
迭代器模式提供了一种方式来顺序访问一个聚合对象中的各个元素，而不暴露聚合对象的内部实现细节。

实现细节：
1. 通过定义一个 Iterator 接口来实现迭代器模式。
2. 该Iterator接口需要定义两个方法：Next 和 HasNext。
  - Next 方法用于获取下一个元素
  - HasNext 方法用于判断是否还有下一个元素。

3. 将定义一个 Aggregate 接口和一个具体的聚合对象类型来实现迭代器模式。
*/
// Iterator 迭代器接口
type Iterator interface {
        Next() interface{}
        HasNext() bool
}

// 具体的聚合对象类型
type Numbers struct {
        numbers []int
}

func (n *Numbers) Iterator() Iterator {
        return &NumberIterator{
                numbers: n.numbers,
                index:   0,
        }
}

// NumberIterator 数字迭代器
type NumberIterator struct {
        numbers []int
        index   int
}

func (ni *NumberIterator) Next() interface{} {
        number := ni.numbers[ni.index]
        ni.index++
        return number
}

func (ni *NumberIterator) HasNext() bool {
        if ni.index >= len(ni.numbers) {
                return false
        }
        return true
}

func main() {
        numbers := &Numbers{
                numbers: []int{1, 2, 3, 4, 5},
        }
        iterator := numbers.Iterator()

        for iterator.HasNext() {
                fmt.Println(iterator.Next())
        }
}
```

### 模板方法模式

定义一个操作中的算法的骨架，而将一些步骤延迟到子类中。模板方法使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤。

- 通用步骤在抽象类中实现，变化的步骤在具体的子类中实现
- 做饭，打开煤气，开火，（做饭）， 关火，关闭煤气。除了做饭其他步骤都是相同的，抽到抽象类中实现

```Go
package main

import "fmt"

/*
        关键：通用步骤在抽象类中实现，变化的步骤在具体的子类中实现
        例：做饭，打开煤气，开火，（做饭）， 关火，关闭煤气。除了做饭其他步骤都是相同的，抽到抽象类中实现
        1. 定义接口，包含做饭的全部步骤
        2. 定义抽象类type CookMenu struct，实现做饭的通用步骤，打开煤气、开火...
        3. 定义具体子类XiHongShi、ChaoJiDan struct，重写cook方法（不同的子类有不同的实现）
*/

type Cooker interface {
        open()
        fire()
        cook()
        closefire()
        close()
}

// 类似于一个抽象类
type CookMenu struct {
}

func (CookMenu) open() {
        fmt.Println("打开开关")
}

func (CookMenu) fire() {
        fmt.Println("开火")
}

// 做菜，交给具体的子类实现
func (CookMenu) cooke() {
}

func (CookMenu) closefire() {
        fmt.Println("关火")
}

func (CookMenu) close() {
        fmt.Println("关闭开关")
}

// 封装具体步骤
func doCook(cook Cooker) {
        cook.open()
        cook.fire()
        cook.cook()
        cook.closefire()
        cook.close()
}

type XiHongShi struct {
        CookMenu
}

func (*XiHongShi) cook() {
        fmt.Println("做西红柿")
}

type ChaoJiDan struct {
        CookMenu
}

func (ChaoJiDan) cook() {
        fmt.Println("做炒鸡蛋")
}

func main() {
        x := &XiHongShi{}
        doCook(x)
        fmt.Println("============")
        y := &ChaoJiDan{}
        doCook(y)
}
```

### 策略模式

定义一系列算法，让这些算法在运行时可以互换，使得分离算法，符合开闭原则。

```Go
package main

import "fmt"

// PaymentStrategy 定义策略接口
type PaymentStrategy interface {
        Pay(amount float64) error
}

// CreditCardStrategy 实现具体的支付策略：信用卡支付
type CreditCardStrategy struct {
        name     string
        cardNum  string
        password string
}

func (c *CreditCardStrategy) Pay(amount float64) error {
        fmt.Printf("Paying %0.2f using credit card\n", amount)
        return nil
}

// CashStrategy 实现具体的支付策略：现金支付
type CashStrategy struct {
        name string
}

func (c *CashStrategy) Pay(amount float64) error {
        fmt.Printf("Paying %0.2f by cash \n", amount)
        return nil
}

// PaymentContext 定义上下文类
type PaymentContext struct {
        amount   float64
        strategy PaymentStrategy
}

// Pay 封装pay方法：通过调用strategy的pay方法
func (p *PaymentContext) Pay() error {
        return p.strategy.Pay(p.amount)
}

func NewPaymentContext(amount float64, strategy PaymentStrategy) *PaymentContext {
        return &PaymentContext{
                amount:   amount,
                strategy: strategy,
        }
}

func main() {
        creditCardStrategy := &CreditCardStrategy{
                name:    "John Doe",
                cardNum: "1234 5678 9012 3456",
        }
        paymentContext := NewPaymentContext(20.0, creditCardStrategy)
        paymentContext.Pay()
        cashStrategy := &CashStrategy{
                name: "Juicy",
        }
        cashPaymentContext := NewPaymentContext(110.0, cashStrategy)
        cashPaymentContext.Pay()
}
```

### 状态模式

状态模式用于分离状态和行为。

```Go
package main

import "fmt"

// ActionState 定义状态接口：每个状态可以对应那些动作
type ActionState interface {
        View()
        Comment()
        Post()
}

// Account 定义账户结构体：包含当前账户状态State、HealthValue账号健康值
type Account struct {
        State       ActionState
        HealthValue int
}

func NewAccount(health int) *Account {
        a := new(Account)
        a.SetHealth(health)
        a.changeState()
        return a
}

func (a *Account) Post() {
        a.State.Post()
}

func (a *Account) View() {
        a.State.View()
}

func (a *Account) Comment() {
        a.State.Comment()
}

type NormalState struct {
}

func (n *NormalState) Post() {
        fmt.Println("正常发帖")
}

func (n *NormalState) View() {
        fmt.Println("正常看帖")
}

func (n *NormalState) Comment() {
        fmt.Println("正常评论")
}

type RestrictState struct {
}

func (r *RestrictState) Post() {
        fmt.Println("抱歉，你的健康值小于0，不能发帖")
}

func (r *RestrictState) View() {
        fmt.Println("正常看帖")
}

func (r *RestrictState) Comment() {
        fmt.Println("正常评论")
}

type CloseState struct {
}

func (c *CloseState) Post() {
        fmt.Println("抱歉，你的健康值小于0，不能发帖")
}

func (c *CloseState) View() {
        fmt.Println("账号被封，无法看帖")
}

func (c *CloseState) Comment() {
        fmt.Println("抱歉，你的健康值小于-10，不能评论")
}

func (a *Account) SetHealth(value int) {
        a.HealthValue = value
        a.changeState()
}

func (a *Account) changeState() {
        if a.HealthValue <= -10 {
                a.State = &CloseState{}
        } else if a.HealthValue > -10 && a.HealthValue <= 0 {
                a.State = &RestrictState{}
        } else if a.HealthValue > 0 {
                a.State = &NormalState{}
        }
}

func main() {
        fmt.Println("===========正常账户===========")
        //正常账户：可发帖、评论、查看
        account := NewAccount(10)
        account.Post()
        account.View()
        account.Comment()
        fmt.Println("===========受限账户===========")
        //受限账户：不能发帖、可以评论和查看
        account.SetHealth(-5)
        account.Post()
        account.View()
        account.Comment()
        fmt.Println("===========被封号账户===========")
        //被封号账户：不能发帖、不能评论、不能查看
        account.SetHealth(-11)
        account.Post()
        account.View()
        account.Comment()
}
```

### 备忘录模式

备忘录模式用于保存程序内部状态到外部，又不希望暴露内部状态的情形。

允许在不破坏封装性的前提下保存和恢复对象的内部状态，程序内部状态使用窄接口传递给外部进行存储，从而不暴露程序实现细节。

**备忘录模式****同时可以离线保存内部状态，如保存到数据库，文件等。**

该模式涉及三个主要角色：

- Originator（发起人）：Originator 是拥有内部状态的对象
- Memento（备忘录）：Memento 是 Originator 的快照
- Caretaker（负责人）：Caretaker 负责备份和恢复 Memento。

```Go
package main

import "fmt"

type Originator interface {
        Save() Memento
        Restore(m Memento)
}

type Memento interface {
        GetState() string
}

type TextEditor struct {
        state string
}

func (t *TextEditor) Save() Memento {
        return &textMemento{state: t.state}
}

func (t *TextEditor) Restore(m Memento) {
        t.state = m.GetState()
}

func (t *TextEditor) SetState(state string) {
        t.state = state
}

func (t *TextEditor) GetState() string {
        return t.state
}

type textMemento struct {
        state string
}

func (t *textMemento) GetState() string {
        return t.state
}

type Caretaker struct {
        mementos     []Memento
        currentIndex int
}

func (c *Caretaker) AddMemento(m Memento) {
        c.mementos = append(c.mementos, m)
        c.currentIndex = len(c.mementos) - 1
}

func (c *Caretaker) Undo(t *TextEditor) {
        if c.currentIndex > 0 {
                c.currentIndex--
                m := c.mementos[c.currentIndex]
                t.Restore(m)
        }
}

func (c *Caretaker) Redo(t *TextEditor) {
        if c.currentIndex < len(c.mementos)-1 {
                c.currentIndex++
                m := c.mementos[c.currentIndex]
                t.Restore(m)
        }
}

func main() {
        editor := &TextEditor{}
        caretaker := &Caretaker{}

        editor.SetState("State #1")
        caretaker.AddMemento(editor.Save())

        editor.SetState("State #2")
        caretaker.AddMemento(editor.Save())

        editor.SetState("State #3")
        caretaker.AddMemento(editor.Save())

        caretaker.Undo(editor)
        caretaker.Undo(editor)
        fmt.Println(editor.GetState())

        caretaker.Redo(editor)
        fmt.Println(editor.GetState())
}
```

### 解释器模式

解释器模式（Interpreter Pattern）是一种行为设计模式，它定义了一种语言，用于解释一些特定的领域问题。 在该模式中，将语言中的元素映射到类中，并定义它们之间的关系。然后，可以使用这些类来解释表达式，以解决特定的问题。

```Go
package main

import (
        "fmt"
        "log"
        "strconv"
        "strings"
)

type Expression interface {
        Interpret() int
}

type NumberExpression struct {
        val int
}

func (n *NumberExpression) Interpret() int {
        return n.val
}

type AdditionExpression struct {
        left, right Expression
}

func (a *AdditionExpression) Interpret() int {
        return a.left.Interpret() + a.right.Interpret()
}

type SubtractionExpression struct {
        left, right Expression
}

func (a *SubtractionExpression) Interpret() int {
        return a.left.Interpret() - a.right.Interpret()
}

type Parser struct {
        exp   []string
        index int
        prev  Expression
}

func (p *Parser) Parse(exp string) {
        p.exp = strings.Split(exp, " ")
        for {
                if p.index >= len(p.exp) {
                        return
                }
                switch p.exp[p.index] {
                case "+":
                        p.prev = p.newAdditionExpression()
                case "-":
                        p.prev = p.newSubtractionExpression()
                default:
                        p.prev = p.newNumberExpression()

                }
        }
}

func (p *Parser) newAdditionExpression() Expression {
        p.index++
        return &AdditionExpression{
                left:  p.prev,
                right: p.newNumberExpression(),
        }
}

func (p *Parser) newSubtractionExpression() Expression {
        p.index++
        return &SubtractionExpression{
                left:  p.prev,
                right: p.newNumberExpression(),
        }
}

func (p *Parser) newNumberExpression() Expression {
        v, _ := strconv.Atoi(p.exp[p.index])
        p.index++
        return &NumberExpression{
                val: v,
        }
}

func (p *Parser) Result() Expression {
        return p.prev
}

func main() {
        p := &Parser{}
        p.Parse("1 + 3 + 3 + 3 - 3")
        res := p.Result().Interpret()
        expect := 7
        if res != expect {
                log.Fatalf("error: expect %d got %d", expect, res)
        }

        fmt.Printf("expect: %d, got: %d", expect, res)
}
```

### 职责链模式

职责链模式是一种行为设计模式，定义了一系列对象，每个对象可以选择处理某个请求，也可以将该请求传给链中的下一个对象

```Go
package main

import "fmt"

/*
        抽象处理器（Handler）：定义出一个处理请求的接口。
        具体处理器（ConcreteHandler）：实现抽象处理器的接口，处理它所负责的请求。如果不处理该请求，则把请求转发给它的后继者。
        客户端（Client）：创建处理器对象，并将请求发送到某个处理器。

        案例：我们在处理一些法律案件时，是层层上报，如果乡镇处理不了就交给市区处理，如果市区处理不了就交给省处理，如果省处理不了就交给国家处理...
*/

type Handler interface {
        SetNext(handler Handler) //设置下一个处理器
        Handle(request int)      //处理请求
}

type TownHandler struct {
        NextHandler Handler
}

func (t *TownHandler) SetNext(handler Handler) {
        t.NextHandler = handler
}

func (t *TownHandler) Handle(request int) {
        //处理刑事案件，案件级别小于20
        if request <= 20 {
                fmt.Println("TownHandler: 小于等于20，我来处理。")
        } else {
                if t.NextHandler != nil {
                        t.NextHandler.Handle(request)
                }
        }
}

type CityHandler struct {
        NextHandler Handler
}

func (c *CityHandler) SetNext(handler Handler) {
        c.NextHandler = handler
}

func (c *CityHandler) Handle(request int) {
        if request > 20 && request <= 100 {
                fmt.Println("CityHandler: 大于20小于等于100，我来处理。")
        } else {
                if c.NextHandler != nil {
                        c.NextHandler.Handle(request)
                }
        }
}

type ProvinceHandler struct {
        NextHandler Handler
}

func (p *ProvinceHandler) SetNext(handler Handler) {
        p.NextHandler = handler
}

func (p *ProvinceHandler) Handle(request int) {
        if request > 100 {
                fmt.Println("ProvinceHandler: 大于100，我来处理。")
        } else {
                if p.NextHandler != nil {
                        p.NextHandler.Handle(request)
                }
        }
}

func main() {
        townHandler := &TownHandler{}
        cityHandler := &CityHandler{}
        provinceHandler := &ProvinceHandler{}

        townHandler.SetNext(cityHandler)
        cityHandler.SetNext(provinceHandler)

        // 处理请求
        requests := []int{5, 50, 300}
        for _, request := range requests {
                townHandler.Handle(request)
        }
}
```

### 访问者模式

访问者模式是一种操作一组对象的操作，它的目的是不改变对象的定义，但可以新增不同的访问者来定义新的操作。

访问者的核心思想是为了访问比较复杂的数据结构，不去改变原数据结构，而是把对数据的操作抽象出来，在访问的过程中以回调形式在访问者中处理逻辑操作。

如果要新增一组操作，那么只需要增加一个新的访问者。

```Go
package main

import "fmt"

/*
        通过访问者模式实现在生产环境和开发环境中打印处不同的内容
*/

type IVisitor interface {
        Visit() //访问者的访问方法
}

type ProductionVisitor struct {
        env string
}

func (p *ProductionVisitor) Visit() {
        if p.env == "pro" {
                fmt.Println("这是生产环境的输出")
        }
}

type DevelopmentVisitor struct {
        env string
}

func (d *DevelopmentVisitor) Visit() {
        if d.env == "dev" {
                fmt.Println("这是开发环境的输出")
        }
}

// IElement IElement接口，在其中声明一个accept()操作，它以一个抽象访问者作为参数
type IElement interface {
        Accept(visitor IVisitor)
}

// Element 具体元素，它实现了accept()操作，在accept()中调用访问者的访问方法以便完成对一个元素的操作
type Element struct {
        visitors []IVisitor
}

func (p *Element) Accept(visitor IVisitor) {
        p.visitors = append(p.visitors, visitor)
}

type ExampleLog struct {
        Element
}

func (e *ExampleLog) Print() {
        for _, visitor := range e.visitors {
                visitor.Visit()
        }
}

func main() {
        ele := Element{}
        env := "dev"
        ele.Accept(&ProductionVisitor{env: env})
        ele.Accept(&DevelopmentVisitor{env: env})

        example := &ExampleLog{Element: ele}
        example.Print()
}
```