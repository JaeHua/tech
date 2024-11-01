---
outline: deep
next:
  text: 'Docker'
  link: '/guide/docker'
---
## 重要例子
### 最大子数组
- 基本步骤

对原数组进行二分，也就是将数组划分为左右相等（或者相差一个元素）的两个子数组。

对两个子问题进行递归，得到的解分别是LeftMax和RightMax.但是会出现横跨两个数组的情况，最后应该返回的是
```bash
Max{LeftMax,RightMax,CrossMax}
```
- 复杂度

T(n) = 2T(n/2) + cn.可得T(n) = O(nlog(n))
![alt text](algorithm/divide/image.png)
- 伪代码

![alt text](algorithm/divide/image-1.png)

- C++代码实现

```C++
#include <iostream>
#include <algorithm> // for std::max
using namespace std;

#define MAXN 100000
int n; // Number of elements
int a[MAXN];

// Find the maximum subarray sum that crosses the midpoint
int getCrossMax(int nums[], int m, int left, int right) {
    // Left half sum (including mid element)
    int leftMax = nums[m];
    int sum = leftMax;
    for (int i = m - 1; i >= left; i--) {
        sum += nums[i];
        leftMax = max(leftMax, sum);
    }

    // Right half sum (starting from m+1)
    int rightMax = 0; // Initialize to 0 in case there's no right half
    if (m + 1 <= right) {
        rightMax = nums[m + 1];
        sum = rightMax;
        for (int i = m + 2; i <= right; i++) { // Start from m + 2
            sum += nums[i];
            rightMax = max(rightMax, sum);
        }
    }
    
    return leftMax + rightMax;
}

// Recursive function to find the maximum subarray sum
int getMaxSubSum(int nums[], int left, int right) {
    if (left == right) {
        return nums[left];
    }
    int m = left + (right - left) / 2;
    int leftMax = getMaxSubSum(nums, left, m);
    int rightMax = getMaxSubSum(nums, m + 1, right);
    int crossMax = getCrossMax(nums, m, left, right);
    return max(leftMax, max(rightMax, crossMax));
}

// Main function to find the maximum subarray sum
int maxSubArraySum(int a[], int n) {
    return getMaxSubSum(a, 0, n - 1);
}

int main() {
    cin >> n; 
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    cout << maxSubArraySum(a, n) << endl;
    return 0;
}
```