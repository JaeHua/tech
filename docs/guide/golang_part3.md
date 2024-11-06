---
outline: deep
prev:
  text: 'Golang核心技能'
  link: '/guide/golang_part2'
next:
  text: 'Golang设计模式'
  link: '/guide/golang_part4'
---
## 数据结构

### 切片

**切片**是 Go 中最常用的数据结构之一。它是基于数组的一个抽象，提供了更灵活且动态的数组操作。切片本质上是一个包含三个元素的结构体：指向底层数组的指针、长度和容量。

```Go
// 定义一个切片
numbers := []int{1, 2, 3, 4, 5}

// 切片操作
subSlice := numbers[1:4] // 结果 [2, 3, 4]

// 增加元素
numbers = append(numbers, 6) // 结果 [1, 2, 3, 4, 5, 6]

// 切片的长度和容量
fmt.Println(len(numbers)) // 6
fmt.Println(cap(numbers)) // 10（具体值取决于底层数组的扩展）
```

### 集合

Go 语言没有内置的集合类型，但可以使用 `map` 来实现集合。集合中的元素是唯一的，因此可以通过 `map` 的键来确保这一点。

```Go
// 使用 map 实现集合
set := make(map[int]struct{})

// 添加元素
set[1] = struct{}{}
set[2] = struct{}{}

// 删除元素
delete(set, 1)

// 检查元素是否存在
_, exists := set[1]
fmt.Println(exists) // false
```

使用 `struct{}` 作为值是因为它不占额外的空间。

### 链表

Go 的标准库中没有直接提供链表（Linked List），但可以使用 `container/list` 包来实现双向链表。链表是一种动态的数据结构，元素之间通过指针连接。

```Go
package main

import (
    "container/list"
    "fmt"
)

func main() {
    // 创建一个链表
    l := list.New()

    // 添加元素
    l.PushBack(1)
    l.PushBack(2)
    l.PushFront(0) // 在链表前端添加元素

    // 遍历链表
    for e := l.Front(); e != nil; e = e.Next() {
        fmt.Println(e.Value)
    }
}
```

`container/list` 提供了双向链表的操作，但如果需要单向链表，则需要自行实现。

### 队列

队列是一种先进先出（FIFO）的数据结构。Go 没有内置的队列类型，但可以使用切片或链表来实现。

```Go
package main

import "fmt"

// 使用切片实现队列
type Queue []int

func (q *Queue) Enqueue(val int) {
    *q = append(*q, val)
}

func (q *Queue) Dequeue() int {
    val := (*q)[0]
    *q = (*q)[1:]
    return val
}

func main() {
    var q Queue
    q.Enqueue(1)
    q.Enqueue(2)
    q.Enqueue(3)
    
    fmt.Println(q.Dequeue()) // 1
    fmt.Println(q.Dequeue()) // 2
}
```

### 栈

栈是一种后进先出（LIFO）的数据结构。Go 也没有内置的栈类型，但可以使用切片来实现。

```Go
package main

import "fmt"

// 使用切片实现栈
type Stack []int

func (s *Stack) Push(val int) {
    *s = append(*s, val)
}

func (s *Stack) Pop() int {
    n := len(*s) - 1
    val := (*s)[n]
    *s = (*s)[:n]
    return val
}

func main() {
    var s Stack
    s.Push(1)
    s.Push(2)
    s.Push(3)
    
    fmt.Println(s.Pop()) // 3
    fmt.Println(s.Pop()) // 2
}
```

### 二叉查找树

Go 没有内置的二叉搜索树，但可以通过结构体和递归来实现。

```Go
package main

import "fmt"

// 定义二叉树节点
type TreeNode struct {
    Value int
    Left  *TreeNode
    Right *TreeNode
}

// 插入节点
func (n *TreeNode) Insert(val int) {
    if val < n.Value {
        if n.Left == nil {
            n.Left = &TreeNode{Value: val}
        } else {
            n.Left.Insert(val)
        }
    } else {
        if n.Right == nil {
            n.Right = &TreeNode{Value: val}
        } else {
            n.Right.Insert(val)
        }
    }
}

// 中序遍历
func (n *TreeNode) InOrderTraversal() {
    if n.Left != nil {
        n.Left.InOrderTraversal()
    }
    fmt.Println(n.Value)
    if n.Right != nil {
        n.Right.InOrderTraversal()
    }
}

func main() {
    root := &TreeNode{Value: 5}
    root.Insert(3)
    root.Insert(7)
    root.Insert(1)
    root.Insert(4)

    // 中序遍历: 1, 3, 4, 5, 7
    root.InOrderTraversal()
}
```

## 常见算法

### 冒泡

冒泡排序是一种简单的排序算法，通过多次遍历列表，相邻元素比较并交换来排序。

```Go
func BubbleSort(arr []int) {
    n := len(arr)
    for i := 0; i < n-1; i++ {
        for j := 0; j < n-i-1; j++ {
            if arr[j] > arr[j+1] {
                arr[j], arr[j+1] = arr[j+1], arr[j]
            }
        }
    }
}
```

### 选择

选择排序通过多次选择最小（或最大）元素并将其放在正确位置来排序。

```Go
func SelectionSort(arr []int) {
    n := len(arr)
    for i := 0; i < n-1; i++ {
        minIdx := i
        for j := i + 1; j < n; j++ {
            if arr[j] < arr[minIdx] {
                minIdx = j
            }
        }
        arr[i], arr[minIdx] = arr[minIdx], arr[i]
    }
}
```

### 插入

插入排序通过逐步将元素插入到已经排序的部分中来实现排序。

```Go
func InsertionSort(arr []int) {
    for i := 1; i < len(arr); i++ {
        key := arr[i]
        j := i - 1
        for j >= 0 && arr[j] > key {
            arr[j+1] = arr[j]
            j--
        }
        arr[j+1] = key
    }
}
```

### 快排

快速排序是一种分治算法，通过选择一个基准元素，将数组分为两部分，递归排序

```Go
func QuickSort(arr []int) {
    if len(arr) < 2 {
        return
    }
    pivot := arr[0]
    low, high := 1, len(arr)-1
    for low <= high {
        if arr[low] <= pivot {
            low++
        } else {
            arr[low], arr[high] = arr[high], arr[low]
            high--
        }
    }
    arr[0], arr[high] = arr[high], arr[0]
    QuickSort(arr[:high])
    QuickSort(arr[high+1:])
}
```

### 二分

二分查找要求数组有序，算法通过反复将搜索区间减半来查找目标元素。

```Go
func BinarySearch(arr []int, target int) int {
    left, right := 0, len(arr)-1
    for left <= right {
        mid := left + (right-left)/2
        if arr[mid] == target {
            return mid
        }
        if arr[mid] < target {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return -1
}
```

### 哈希

哈希是一种用于映射数据的算法。Go 中的哈希主要通过 `map` 来实现。

```Go
m := make(map[string]int)
m["apple"] = 5
m["banana"] = 3

fmt.Println(m["apple"]) // 输出 5
```