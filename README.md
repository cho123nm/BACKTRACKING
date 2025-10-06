# THUẬT TOÁN BACKTRACKING - TÀI LIỆU CHI TIẾT

## 📚 MỤC LỤC
1. [Giới thiệu về Backtracking](#giới-thiệu)
2. [Điểm mạnh và Điểm yếu](#điểm-mạnh-và-điểm-yếu)
3. [Khi nào nên dùng Backtracking](#khi-nào-nên-dùng)
4. [Hoạt động tốt nhất và xấu nhất](#hoạt-động-tốt-nhất-và-xấu-nhất)
5. [Phân tích độ phức tạp](#phân-tích-độ-phức-tạp)
6. [Các bài toán kinh điển](#các-bài-toán-kinh-điển)
7. [So sánh với các thuật toán khác](#so-sánh-với-các-thuật-toán-khác)
8. [Bài toán N-Queens chi tiết](#bài-toán-n-queens-chi-tiết)
9. [Mô phỏng N=4 từng bước](#mô-phỏng-n4-từng-bước)

---

## 🎯 GIỚI THIỆU

**Backtracking (Quay lui)** là một kỹ thuật thuật toán dùng để tìm kiếm lời giải cho các bài toán bằng cách:
1. Xây dựng lời giải từng bước một
2. Nếu phát hiện bước hiện tại không dẫn đến lời giải → **Quay lui** (backtrack) và thử phương án khác
3. Tiếp tục cho đến khi tìm được lời giải hoặc đã thử hết mọi khả năng

### Ý tưởng cốt lõi:
```
Backtracking = Thử (Try) + Kiểm tra (Check) + Quay lui (Undo)
```

### Cấu trúc tổng quát:
```javascript
function backtrack(state, options) {
    if (isGoal(state)) {
        // Tìm được lời giải!
        recordSolution(state);
        return;
    }
    
    for (let option of options) {
        if (isValid(state, option)) {
            // Thử đặt option vào state
            makeChoice(state, option);
            
            // Đệ quy tiếp
            backtrack(state, newOptions);
            
            // Quay lui - hủy bỏ lựa chọn
            undoChoice(state, option);
        }
    }
}
```

---

## ⚖️ ĐIỂM MẠNH VÀ ĐIỂM YẾU

### ✅ ĐIỂM MẠNH:

1. **Đơn giản và trực quan**
   - Dễ hiểu, dễ cài đặt
   - Phản ánh cách con người giải quyết vấn đề

2. **Tìm được mọi lời giải**
   - Duyệt toàn bộ không gian tìm kiếm
   - Đảm bảo tìm được lời giải nếu nó tồn tại

3. **Tiết kiệm bộ nhớ**
   - Chỉ lưu trữ đường đi hiện tại trong ngăn xếp đệ quy
   - Không cần lưu toàn bộ cây tìm kiếm

4. **Cắt tỉa hiệu quả**
   - Có thể loại bỏ cả nhánh không khả thi ngay từ đầu
   - Giảm đáng kể số lượng trạng thái cần kiểm tra

5. **Linh hoạt**
   - Áp dụng được cho nhiều loại bài toán khác nhau
   - Dễ dàng thêm điều kiện ràng buộc

### ❌ ĐIỂM YẾU:

1. **Độ phức tạp thời gian cao**
   - Trường hợp xấu nhất: Mũ hoặc giai thừa
   - Không phù hợp với dữ liệu lớn

2. **Có thể chậm với bài toán lớn**
   - Duyệt nhiều trạng thái không cần thiết
   - Tốc độ phụ thuộc vào thứ tự thử các lựa chọn

3. **Không đảm bảo tối ưu**
   - Chỉ tìm lời giải khả thi, không đảm bảo tốt nhất
   - Cần thêm logic để tìm lời giải tối ưu

4. **Stack overflow với đệ quy sâu**
   - Có thể gây tràn ngăn xếp với bài toán lớn
   - Cần chuyển sang iterative nếu độ sâu quá lớn

5. **Khó tối ưu hóa**
   - Hiệu suất phụ thuộc nhiều vào heuristic
   - Khó song song hóa (parallelize)

---

## 🤔 KHI NÀO NÊN DÙNG

### Sử dụng Backtracking khi:

1. **Bài toán có cấu trúc đệ quy rõ ràng**
   - Có thể chia nhỏ thành các bước tương tự nhau
   - Ví dụ: Đặt từng quân cờ, điền từng ô Sudoku

2. **Cần tìm TẤT CẢ các lời giải**
   - Không chỉ một lời giải mà cần liệt kê hết
   - Ví dụ: Tất cả cách xếp N-Queens

3. **Có ràng buộc phức tạp**
   - Nhiều điều kiện kiểm tra
   - Dễ cắt tỉa nhánh không khả thi sớm

4. **Không gian tìm kiếm không quá lớn**
   - N ≤ 20-25 (phụ thuộc bài toán)
   - Có thể cắt tỉa hiệu quả

5. **Lời giải xây dựng từng bước**
   - Permutations, Combinations
   - Subset generation

### KHÔNG nên dùng khi:

1. **Dữ liệu quá lớn** (N > 30-40)
2. **Cần tối ưu hóa** (dùng DP, Greedy, Branch & Bound)
3. **Có cấu trúc đặc biệt** (Graph → BFS/DFS, Array → Two Pointers)
4. **Yêu cầu thời gian thực** (Real-time systems)

---

## 🚀 HOẠT ĐỘNG TỐT NHẤT VÀ XẤU NHẤT

### ✅ HOẠT ĐỘNG TỐT NHẤT KHI:

1. **Lời giải nằm gần gốc cây tìm kiếm**
   - Tìm được sớm → dừng sớm
   - Ít phải backtrack

2. **Có heuristic tốt**
   - Sắp xếp lựa chọn thông minh
   - Thử các khả năng có triển vọng trước

3. **Điều kiện cắt tỉa mạnh**
   - Loại bỏ nhiều nhánh sớm
   - Giảm không gian tìm kiếm đáng kể

4. **Ràng buộc nghiêm ngặt**
   - Nhiều điều kiện → ít trạng thái hợp lệ
   - Ví dụ: N-Queens với N lớn

5. **Bài toán có cấu trúc đối xứng**
   - Có thể tận dụng đối xứng để giảm tìm kiếm

### ❌ HOẠT ĐỘNG XẤU NHẤT KHI:

1. **Không có lời giải HOẶC lời giải ở cuối**
   - Phải duyệt gần như toàn bộ không gian
   - Không có cơ hội dừng sớm

2. **Ràng buộc yếu**
   - Nhiều trạng thái hợp lệ
   - Ít cơ hội cắt tỉa

3. **Không gian tìm kiếm lớn**
   - Factorial hoặc exponential states
   - Không có pattern để tối ưu

4. **Thứ tự thử tệ**
   - Thử các lựa chọn không triển vọng trước
   - Lãng phí thời gian

5. **Bài toán không có cấu trúc**
   - Random constraints
   - Khó dự đoán nhánh tốt

---

## 📊 PHÂN TÍCH ĐỘ PHỨC TẠP

### 1. ĐỘ PHỨC TẠP THỜI GIAN:

#### **Trường hợp TỐT NHẤT:** O(b^d)
- **b**: Branching factor (số lựa chọn mỗi bước)
- **d**: Depth tìm được lời giải
- Khi lời giải nằm ở độ sâu nhỏ

**Ví dụ:** N-Queens n=4, tìm được ngay ở nhánh đầu tiên
```
Thời gian: O(4^4) = O(256) operations
```

#### **Trường hợp TRUNG BÌNH:** O(b^(d/2)) đến O(b^d)
- Phụ thuộc vào hiệu quả của pruning
- Với pruning tốt: có thể giảm xuống nhiều

**Ví dụ:** N-Queens với heuristic
```
Không pruning: O(n!)
Với pruning: O(n^n) hoặc tốt hơn
```

#### **Trường hợp XẤU NHẤT:** O(b^n) hoặc O(n!)

**Các bài toán điển hình:**

1. **N-Queens:** O(n!)
   - Thử n vị trí cho hàng đầu
   - (n-1) cho hàng thứ 2
   - ... 
   - = n!

2. **Sudoku:** O(9^m)
   - m: số ô trống
   - Mỗi ô có tối đa 9 lựa chọn

3. **Subset Sum:** O(2^n)
   - Mỗi phần tử: chọn hoặc không
   - 2 lựa chọn cho n phần tử

4. **Permutations:** O(n! × n)
   - n! permutations
   - n để xây dựng mỗi permutation

5. **Graph Coloring:** O(m^n)
   - n đỉnh, m màu
   - Mỗi đỉnh thử m màu

### 2. ĐỘ PHỨC TẠP KHÔNG GIAN:

**O(d)** - Độ sâu của đệ quy

- Chỉ lưu stack trace của đệ quy
- Không lưu toàn bộ cây tìm kiếm

**Ví dụ:**
- N-Queens: O(n) - chỉ lưu n hàng
- Sudoku: O(81) = O(1) - kích thước cố định
- Subset: O(n) - độ sâu tối đa n

### 3. BẢNG SO SÁNH ĐỘ PHỨC TẠP:

| Bài toán | Không pruning | Với pruning | Không gian |
|----------|---------------|-------------|------------|
| N-Queens | O(n^n) | O(n!) | O(n) |
| Sudoku 9×9 | O(9^81) | O(9^m) | O(1) |
| Subset Sum | O(2^n) | O(2^n) | O(n) |
| Permutations | O(n! × n) | O(n! × n) | O(n) |
| Combinations | O(2^n) | O(C(n,k)) | O(k) |
| Graph k-coloring | O(k^n) | Depends | O(n) |
| Hamiltonian Path | O(n!) | O(n!) | O(n) |

---

## 🏆 CÁC BÀI TOÁN KINH ĐIỂN

### 1. **N-Queens Problem** ⭐⭐⭐⭐⭐
**Mô tả:** Đặt N quân hậu trên bàn cờ N×N sao cho không quân nào ăn nhau

**Độ phức tạp:** O(n!)
```javascript
function solveNQueens(n) {
    const board = Array(n).fill(-1);
    const solutions = [];
    
    function isSafe(row, col) {
        for (let i = 0; i < row; i++) {
            // Kiểm tra cột và đường chéo
            if (board[i] === col || 
                Math.abs(board[i] - col) === Math.abs(i - row))
                return false;
        }
        return true;
    }
    
    function backtrack(row) {
        if (row === n) {
            solutions.push([...board]);
            return;
        }
        
        for (let col = 0; col < n; col++) {
            if (isSafe(row, col)) {
                board[row] = col;
                backtrack(row + 1);
                board[row] = -1; // Backtrack
            }
        }
    }
    
    backtrack(0);
    return solutions;
}
```

### 2. **Sudoku Solver** ⭐⭐⭐⭐⭐
**Mô tả:** Điền số vào ô trống sao cho thỏa quy tắc Sudoku

**Độ phức tạp:** O(9^m) với m là số ô trống
```javascript
function solveSudoku(board) {
    function isValid(row, col, num) {
        // Kiểm tra hàng
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num) return false;
        }
        
        // Kiểm tra cột
        for (let i = 0; i < 9; i++) {
            if (board[i][col] === num) return false;
        }
        
        // Kiểm tra ô 3×3
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[startRow + i][startCol + j] === num)
                    return false;
            }
        }
        
        return true;
    }
    
    function backtrack() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === '.') {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(row, col, num.toString())) {
                            board[row][col] = num.toString();
                            
                            if (backtrack()) return true;
                            
                            board[row][col] = '.'; // Backtrack
                        }
                    }
                    return false;
                }
            }
        }
        return true; // Đã điền hết
    }
    
    backtrack();
}
```

### 3. **Subset Sum** ⭐⭐⭐⭐
**Mô tả:** Tìm tập con có tổng bằng target

**Độ phức tạp:** O(2^n)
```javascript
function subsetSum(nums, target) {
    const solutions = [];
    
    function backtrack(start, current, sum) {
        if (sum === target) {
            solutions.push([...current]);
            return;
        }
        
        if (sum > target) return; // Pruning
        
        for (let i = start; i < nums.length; i++) {
            current.push(nums[i]);
            backtrack(i + 1, current, sum + nums[i]);
            current.pop(); // Backtrack
        }
    }
    
    backtrack(0, [], 0);
    return solutions;
}
```

### 4. **Permutations** ⭐⭐⭐⭐
**Mô tả:** Tạo tất cả hoán vị của mảng

**Độ phức tạp:** O(n! × n)
```javascript
function permute(nums) {
    const result = [];
    const used = Array(nums.length).fill(false);
    
    function backtrack(current) {
        if (current.length === nums.length) {
            result.push([...current]);
            return;
        }
        
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            
            current.push(nums[i]);
            used[i] = true;
            backtrack(current);
            current.pop();
            used[i] = false; // Backtrack
        }
    }
    
    backtrack([]);
    return result;
}
```

### 5. **Combinations** ⭐⭐⭐
**Mô tả:** Tìm tất cả tổ hợp k phần tử từ n phần tử

**Độ phức tạp:** O(C(n,k))
```javascript
function combine(n, k) {
    const result = [];
    
    function backtrack(start, current) {
        if (current.length === k) {
            result.push([...current]);
            return;
        }
        
        for (let i = start; i <= n; i++) {
            current.push(i);
            backtrack(i + 1, current);
            current.pop(); // Backtrack
        }
    }
    
    backtrack(1, []);
    return result;
}
```

### 6. **Word Search** ⭐⭐⭐⭐
**Mô tả:** Tìm từ trong lưới chữ cái 2D

**Độ phức tạp:** O(m × n × 4^L) với L là độ dài từ
```javascript
function wordSearch(board, word) {
    const rows = board.length;
    const cols = board[0].length;
    
    function backtrack(row, col, index) {
        if (index === word.length) return true;
        
        if (row < 0 || row >= rows || col < 0 || col >= cols ||
            board[row][col] !== word[index]) {
            return false;
        }
        
        const temp = board[row][col];
        board[row][col] = '#'; // Đánh dấu đã dùng
        
        const found = backtrack(row + 1, col, index + 1) ||
                     backtrack(row - 1, col, index + 1) ||
                     backtrack(row, col + 1, index + 1) ||
                     backtrack(row, col - 1, index + 1);
        
        board[row][col] = temp; // Backtrack
        return found;
    }
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (backtrack(i, j, 0)) return true;
        }
    }
    return false;
}
```

### 7. **Graph Coloring** ⭐⭐⭐⭐
**Mô tả:** Tô màu đồ thị sao cho 2 đỉnh kề nhau khác màu

**Độ phức tạp:** O(m^n) với m màu, n đỉnh
```javascript
function graphColoring(graph, m) {
    const n = graph.length;
    const colors = Array(n).fill(0);
    
    function isSafe(node, color) {
        for (let i = 0; i < n; i++) {
            if (graph[node][i] && colors[i] === color) {
                return false;
            }
        }
        return true;
    }
    
    function backtrack(node) {
        if (node === n) return true;
        
        for (let color = 1; color <= m; color++) {
            if (isSafe(node, color)) {
                colors[node] = color;
                
                if (backtrack(node + 1)) return true;
                
                colors[node] = 0; // Backtrack
            }
        }
        return false;
    }
    
    return backtrack(0) ? colors : null;
}
```

### 8. **Palindrome Partitioning** ⭐⭐⭐
**Mô tả:** Chia chuỗi thành các substring là palindrome

**Độ phức tạp:** O(n × 2^n)
```javascript
function partition(s) {
    const result = [];
    
    function isPalindrome(str, left, right) {
        while (left < right) {
            if (str[left++] !== str[right--]) return false;
        }
        return true;
    }
    
    function backtrack(start, current) {
        if (start === s.length) {
            result.push([...current]);
            return;
        }
        
        for (let end = start; end < s.length; end++) {
            if (isPalindrome(s, start, end)) {
                current.push(s.substring(start, end + 1));
                backtrack(end + 1, current);
                current.pop(); // Backtrack
            }
        }
    }
    
    backtrack(0, []);
    return result;
}
```

---

## 🔄 SO SÁNH VỚI CÁC THUẬT TOÁN KHÁC

### 1. **Backtracking vs Dynamic Programming (DP)**

| Tiêu chí | Backtracking | Dynamic Programming |
|----------|--------------|---------------------|
| **Mục đích** | Tìm tất cả lời giải | Tìm lời giải tối ưu |
| **Cách tiếp cận** | Thử và quay lui | Lưu kết quả con |
| **Thời gian** | O(b^n), O(n!) | O(n^2), O(n^3) |
| **Không gian** | O(n) | O(n), O(n^2) |
| **Subproblems** | Không overlap | Overlap |
| **Khi nào dùng** | Liệt kê, tổ hợp | Tối ưu hóa |

**Ví dụ:**
- **Backtracking:** Tìm TẤT CẢ cách leo cầu thang
- **DP:** Tìm SỐ CÁCH leo cầu thang

```javascript
// Backtracking - Liệt kê tất cả cách
function climbStairsBacktrack(n) {
    const ways = [];
    
    function backtrack(current, sum) {
        if (sum === n) {
            ways.push([...current]);
            return;
        }
        if (sum > n) return;
        
        for (let step = 1; step <= 2; step++) {
            current.push(step);
            backtrack(current, sum + step);
            current.pop();
        }
    }
    
    backtrack([], 0);
    return ways;
}

// DP - Đếm số cách
function climbStairsDP(n) {
    if (n <= 2) return n;
    const dp = [0, 1, 2];
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
}
```

### 2. **Backtracking vs Greedy**

| Tiêu chí | Backtracking | Greedy |
|----------|--------------|--------|
| **Quyết định** | Có thể đảo ngược | Không đảo ngược |
| **Tối ưu** | Không đảm bảo | Đảm bảo (nếu có greedy choice) |
| **Thời gian** | Chậm (exponential) | Nhanh (polynomial) |
| **Lời giải** | Tất cả/một số | Một lời giải |
| **Ví dụ** | N-Queens | Dijkstra, Huffman |

**Ví dụ - Fractional Knapsack:**
```javascript
// Greedy - Nhanh, tối ưu
function knapsackGreedy(items, capacity) {
    items.sort((a, b) => b.value/b.weight - a.value/a.weight);
    let total = 0;
    
    for (let item of items) {
        if (capacity >= item.weight) {
            total += item.value;
            capacity -= item.weight;
        } else {
            total += item.value * (capacity / item.weight);
            break;
        }
    }
    return total;
}

// Backtracking - 0/1 Knapsack (không chia được)
function knapsackBacktrack(items, capacity) {
    let maxValue = 0;
    
    function backtrack(index, currentWeight, currentValue) {
        if (index === items.length) {
            maxValue = Math.max(maxValue, currentValue);
            return;
        }
        
        // Không lấy item
        backtrack(index + 1, currentWeight, currentValue);
        
        // Lấy item (nếu đủ chỗ)
        if (currentWeight + items[index].weight <= capacity) {
            backtrack(index + 1, 
                     currentWeight + items[index].weight,
                     currentValue + items[index].value);
        }
    }
    
    backtrack(0, 0, 0);
    return maxValue;
}
```

### 3. **Backtracking vs BFS/DFS**

| Tiêu chí | Backtracking | BFS | DFS |
|----------|--------------|-----|-----|
| **Cấu trúc** | Đệ quy + undo | Queue | Stack/Đệ quy |
| **Mục đích** | Tìm lời giải thỏa ràng buộc | Đường đi ngắn nhất | Duyệt đồ thị |
| **Pruning** | Có | Không | Không |
| **Bộ nhớ** | O(h) | O(w) | O(h) |

**Khi nào dùng:**
- **Backtracking:** Bài toán tổ hợp với ràng buộc (N-Queens, Sudoku)
- **BFS:** Tìm đường đi ngắn nhất (Shortest Path)
- **DFS:** Duyệt đồ thị, phát hiện chu trình

### 4. **Backtracking vs Branch and Bound**

| Tiêu chí | Backtracking | Branch and Bound |
|----------|--------------|------------------|
| **Mục tiêu** | Tìm lời giải khả thi | Tìm lời giải tối ưu |
| **Bounding** | Không | Có (upper/lower bound) |
| **Duyệt** | DFS | BFS hoặc Best-First |
| **Ứng dụng** | Permutation, Combination | Optimization |

**Ví dụ - TSP (Traveling Salesman):**
```javascript
// Backtracking - Tìm tất cả đường đi
function tspBacktrack(graph, n) {
    const visited = Array(n).fill(false);
    const path = [0];
    visited[0] = true;
    const allPaths = [];
    
    function backtrack(currentCity, count, cost) {
        if (count === n) {
            allPaths.push({ 
                path: [...path], 
                cost: cost + graph[currentCity][0] 
            });
            return;
        }
        
        for (let city = 0; city < n; city++) {
            if (!visited[city]) {
                visited[city] = true;
                path.push(city);
                backtrack(city, count + 1, cost + graph[currentCity][city]);
                path.pop();
                visited[city] = false;
            }
        }
    }
    
    backtrack(0, 1, 0);
    return allPaths;
}

// Branch and Bound - Tìm đường đi ngắn nhất
function tspBranchBound(graph, n) {
    let minCost = Infinity;
    let bestPath = [];
    
    function bound(path, cost) {
        // Tính lower bound cho nhánh này
        // ... (phức tạp hơn)
        return estimatedMinCost;
    }
    
    function backtrack(path, cost) {
        if (path.length === n) {
            const total = cost + graph[path[n-1]][0];
            if (total < minCost) {
                minCost = total;
                bestPath = [...path];
            }
            return;
        }
        
        for (let city = 0; city < n; city++) {
            if (!path.includes(city)) {
                const newCost = cost + graph[path[path.length-1]][city];
                
                // Pruning với bound
                if (bound(path, newCost) < minCost) {
                    backtrack([...path, city], newCost);
                }
            }
        }
    }
    
    backtrack([0], 0);
    return { path: bestPath, cost: minCost };
}
```

### 5. **BẢNG TỔNG HỢP**

| Thuật toán | Độ phức tạp | Lời giải | Khi nào dùng |
|------------|-------------|----------|--------------|
| **Backtracking** | O(b^n) | Tất cả/một số | Tổ hợp + ràng buộc |
| **DP** | O(n^2) - O(n^3) | Tối ưu | Overlap subproblems |
| **Greedy** | O(n log n) | Tối ưu local | Greedy choice property |
| **BFS** | O(V + E) | Ngắn nhất | Unweighted graph |
| **DFS** | O(V + E) | Duyệt | Explore paths |
| **Branch & Bound** | O(b^n) | Tối ưu global | Optimization với bound |
| **Divide & Conquer** | O(n log n) | Tối ưu | Chia nhỏ độc lập |

---

## 👑 BÀI TOÁN N-QUEENS CHI TIẾT

### 📝 MÔ TẢ BÀI TOÁN

**Đầu vào:** Số nguyên dương N

**Đầu ra:** Tất cả cách đặt N quân hậu trên bàn cờ N×N sao cho không quân nào ăn được quân nào

**Quy tắc quân hậu:**
- Di chuyển theo hàng ngang (toàn bộ hàng)
- Di chuyển theo hàng dọc (toàn bộ cột)  
- Di chuyển theo đường chéo (cả 2 hướng)

**Ví dụ:**
```
N = 4 có 2 lời giải
N = 8 có 92 lời giải
N = 1 có 1 lời giải
N = 2, N = 3 KHÔNG có lời giải
```

### 🎯 PHÂN TÍCH BÀI TOÁN

#### 1. **Nhận xét quan trọng:**

✅ **Mỗi hàng chỉ có đúng 1 quân hậu**
- Nếu 2 quân cùng hàng → ăn nhau
- Vậy: đặt đúng 1 quân/hàng

✅ **Mỗi cột chỉ có tối đa 1 quân hậu**
- Nếu 2 quân cùng cột → ăn nhau

✅ **Mỗi đường chéo chỉ có tối đa 1 quân hậu**
- 2 loại chéo: "/" và "\"

#### 2. **Biểu diễn trạng thái:**

**Cách 1: Mảng 2D** (không hiệu quả)
```javascript
board = [
    [0, 1, 0, 0],  // Hàng 0: quân hậu ở cột 1
    [0, 0, 0, 1],  // Hàng 1: quân hậu ở cột 3
    [1, 0, 0, 0],  // Hàng 2: quân hậu ở cột 0
    [0, 0, 1, 0]   // Hàng 3: quân hậu ở cột 2
]
```

**Cách 2: Mảng 1D** (tối ưu - DÙNG CÁCH NÀY)
```javascript
board = [1, 3, 0, 2]
// board[i] = j nghĩa là: hàng i có quân hậu ở cột j
```

#### 3. **Điều kiện kiểm tra an toàn:**

Để đặt quân hậu tại vị trí (row, col), cần kiểm tra:

**a) Cột:**
```javascript
for (let i = 0; i < row; i++) {
    if (board[i] === col) return false; // Cùng cột
}
```

**b) Đường chéo chính (↘):**
- 2 ô (r1, c1) và (r2, c2) cùng đường chéo nếu: `r1 - c1 === r2 - c2`
```javascript
for (let i = 0; i < row; i++) {
    if (i - board[i] === row - col) return false;
}
```

**c) Đường chéo phụ (↙):**
- 2 ô (r1, c1) và (r2, c2) cùng đường chéo nếu: `r1 + c1 === r2 + c2`
```javascript
for (let i = 0; i < row; i++) {
    if (i + board[i] === row + col) return false;
}
```

**Kết hợp tất cả:**
```javascript
function isSafe(board, row, col) {
    for (let i = 0; i < row; i++) {
        // Kiểm tra cột
        if (board[i] === col) return false;
        
        // Kiểm tra đường chéo
        if (Math.abs(board[i] - col) === Math.abs(i - row)) 
            return false;
    }
    return true;
}
```

### 🚀 HƯỚNG GIẢI QUYẾT TỪNG BƯỚC

#### **Bước 1: Định nghĩa trạng thái**
```javascript
const board = Array(n).fill(-1);
// board[i] = -1 nghĩa là hàng i chưa đặt quân hậu
// board[i] = j nghĩa là hàng i có quân hậu ở cột j
```

#### **Bước 2: Xác định điều kiện dừng**
```javascript
if (row === n) {
    // Đã đặt đủ n quân hậu
    recordSolution(board);
    return;
}
```

#### **Bước 3: Thử tất cả các cột cho hàng hiện tại**
```javascript
for (let col = 0; col < n; col++) {
    // Thử đặt quân hậu ở cột col
}
```

#### **Bước 4: Kiểm tra vị trí có an toàn không**
```javascript
if (isSafe(board, row, col)) {
    // An toàn → tiếp tục
}
```

#### **Bước 5: Đặt quân hậu (Make Choice)**
```javascript
board[row] = col;
```

#### **Bước 6: Đệ quy sang hàng tiếp theo**
```javascript
backtrack(row + 1);
```

#### **Bước 7: Quay lui (Undo Choice)**
```javascript
board[row] = -1;
```

### 💻 CODE HOÀN CHỈNH

```javascript
function solveNQueens(n) {
    const solutions = [];
    const board = Array(n).fill(-1);
    
    // Hàm kiểm tra vị trí (row, col) có an toàn không
    function isSafe(row, col) {
        for (let i = 0; i < row; i++) {
            // Kiểm tra cột và 2 đường chéo
            if (board[i] === col || 
                Math.abs(board[i] - col) === Math.abs(i - row)) {
                return false;
            }
        }
        return true;
    }
    
    // Hàm backtracking chính
    function backtrack(row) {
        // Điều kiện dừng: đã đặt đủ n quân hậu
        if (row === n) {
            solutions.push([...board]);
            return;
        }
        
        // Thử tất cả các cột
        for (let col = 0; col < n; col++) {
            if (isSafe(row, col)) {
                board[row] = col;        // Đặt quân hậu
                backtrack(row + 1);      // Đệ quy
                board[row] = -1;         // Quay lui
            }
        }
    }
    
    backtrack(0);
    return solutions;
}

// Hàm in bàn cờ đẹp
function printBoard(board) {
    const n = board.length;
    for (let row = 0; row < n; row++) {
        let line = '';
        for (let col = 0; col < n; col++) {
            line += board[row] === col ? 'Q ' : '. ';
        }
        console.log(line);
    }
    console.log('---');
}

// Test
const solutions = solveNQueens(4);
console.log(`Tìm được ${solutions.length} lời giải:`);
solutions.forEach((solution, index) => {
    console.log(`\nLời giải ${index + 1}:`);
    printBoard(solution);
});
```

---

## 🎮 MÔ PHỎNG N=4 TỪNG BƯỚC

### KHỞI TẠO:
```
n = 4
board = [-1, -1, -1, -1]
solutions = []
```

### BẮT ĐẦU: backtrack(row = 0)

---

### 📍 **HÀNG 0, CỘT 0**

**Trạng thái:** board = [-1, -1, -1, -1], đang xét hàng 0, cột 0

**Kiểm tra:** isSafe(0, 0)
```javascript
// Vòng lặp i từ 0 đến -1 (không chạy)
return true; // An toàn!
```

**✅ AN TOÀN → ĐẶT QUÂN HẬU**
```
board = [0, -1, -1, -1]

Bàn cờ:
Q . . .   (Hàng 0: quân hậu ở cột 0)
. . . .
. . . .
. . . .
```

**Đệ quy:** backtrack(1)

---

### 📍 **HÀNG 1, CỘT 0**

**Trạng thái:** board = [0, -1, -1, -1], đang xét hàng 1, cột 0

**Kiểm tra:** isSafe(1, 0)
```javascript
for (let i = 0; i < 1; i++) {  // i = 0
    if (board[0] === 0)  // 0 === 0 → TRUE
        return false;  // Cùng cột!
}
```

**❌ BỊ TẤN CÔNG → THỬ CỘT KHÁC**

---

### 📍 **HÀNG 1, CỘT 1**

**Trạng thái:** board = [0, -1, -1, -1], đang xét hàng 1, cột 1

**Kiểm tra:** isSafe(1, 1)
```javascript
for (let i = 0; i < 1; i++) {  // i = 0
    if (board[0] === 1)  // 0 === 1 → FALSE
    
    if (Math.abs(0 - 1) === Math.abs(0 - 1))  // 1 === 1 → TRUE
        return false;  // Cùng đường chéo!
}
```

**❌ BỊ TẤN CÔNG (đường chéo) → THỬ CỘT KHÁC**

---

### 📍 **HÀNG 1, CỘT 2**

**Trạng thái:** board = [0, -1, -1, -1], đang xét hàng 1, cột 2

**Kiểm tra:** isSafe(1, 2)
```javascript
for (let i = 0; i < 1; i++) {  // i = 0
    if (board[0] === 2)  // 0 === 2 → FALSE
    
    if (Math.abs(0 - 2) === Math.abs(0 - 1))  // 2 === 1 → FALSE
}
return true;  // An toàn!
```

**✅ AN TOÀN → ĐẶT QUÂN HẬU**
```
board = [0, 2, -1, -1]

Bàn cờ:
Q . . .   (Hàng 0: cột 0)
. . Q .   (Hàng 1: cột 2)
. . . .
. . . .
```

**Đệ quy:** backtrack(2)

---

### 📍 **HÀNG 2, CỘT 0**

**Trạng thái:** board = [0, 2, -1, -1], đang xét hàng 2, cột 0

**Kiểm tra:** isSafe(2, 0)
```javascript
for (let i = 0; i < 2; i++) {
    // i = 0:
    if (board[0] === 0)  // 0 === 0 → TRUE
        return false;  // Cùng cột!
}
```

**❌ BỊ TẤN CÔNG**

---

### 📍 **HÀNG 2, CỘT 1**

**Kiểm tra:** isSafe(2, 1)
```javascript
for (let i = 0; i < 2; i++) {
    // i = 0:
    if (board[0] === 1)  // 0 === 1 → FALSE
    if (Math.abs(0 - 1) === Math.abs(0 - 2))  // 1 === 2 → FALSE
    
    // i = 1:
    if (board[1] === 1)  // 2 === 1 → FALSE
    if (Math.abs(2 - 1) === Math.abs(1 - 2))  // 1 === 1 → TRUE
        return false;  // Cùng đường chéo!
}
```

**❌ BỊ TẤN CÔNG (đường chéo với hàng 1)**

---

### 📍 **HÀNG 2, CỘT 2**

**Kiểm tra:** isSafe(2, 2)
```javascript
// i = 1:
if (board[1] === 2)  // 2 === 2 → TRUE
    return false;  // Cùng cột!
```

**❌ BỊ TẤN CÔNG**

---

### 📍 **HÀNG 2, CỘT 3**

**Kiểm tra:** isSafe(2, 3)
```javascript
for (let i = 0; i < 2; i++) {
    // i = 0:
    if (board[0] === 3)  // 0 === 3 → FALSE
    if (Math.abs(0 - 3) === Math.abs(0 - 2))  // 3 === 2 → FALSE
    
    // i = 1:
    if (board[1] === 3)  // 2 === 3 → FALSE
    if (Math.abs(2 - 3) === Math.abs(1 - 2))  // 1 === 1 → TRUE
        return false;  // Cùng đường chéo!
}
```

**❌ BỊ TẤN CÔNG**

---

### 🔙 **QUAY LUI TỪ HÀNG 2**

**Lý do:** Đã thử hết 4 cột ở hàng 2, không có vị trí nào an toàn

**Quay về:** backtrack(1) - hàng 1, sau cột 2

**Hành động:**
```javascript
board[1] = -1;  // Bỏ quân hậu ở hàng 1
board = [0, -1, -1, -1]
```

---

### 📍 **HÀNG 1, CỘT 3**

**Trạng thái:** board = [0, -1, -1, -1], đang xét hàng 1, cột 3

**Kiểm tra:** isSafe(1, 3)
```javascript
for (let i = 0; i < 1; i++) {  // i = 0
    if (board[0] === 3)  // 0 === 3 → FALSE
    if (Math.abs(0 - 3) === Math.abs(0 - 1))  // 3 === 1 → FALSE
}
return true;  // An toàn!
```

**✅ AN TOÀN → ĐẶT QUÂN HẬU**
```
board = [0, 3, -1, -1]

Bàn cờ:
Q . . .   (Hàng 0: cột 0)
. . . Q   (Hàng 1: cột 3)
. . . .
. . . .
```

**Đệ quy:** backtrack(2)

---

### 📍 **HÀNG 2: THỬ TẤT CẢ CÁC CỘT**

**Kiểm tra từng cột:**

- **Cột 0:** Cùng cột với hàng 0 → ❌
- **Cột 1:** An toàn!
```javascript
isSafe(2, 1) = true
```

**✅ ĐẶT QUÂN HẬU**
```
board = [0, 3, 1, -1]

Bàn cờ:
Q . . .   (Hàng 0: cột 0)
. . . Q   (Hàng 1: cột 3)
. Q . .   (Hàng 2: cột 1)
. . . .
```

**Đệ quy:** backtrack(3)

---

### 📍 **HÀNG 3: THỬ TẤT CẢ CÁC CỘT**

**Kiểm tra từng cột:**

- **Cột 0:** Cùng cột hàng 0 → ❌
- **Cột 1:** Cùng cột hàng 2 → ❌
- **Cột 2:**
```javascript
isSafe(3, 2)
// i = 0: |0-2| === |0-3| → 2 === 3 → FALSE
// i = 1: |3-2| === |1-3| → 1 === 2 → FALSE
// i = 2: |1-2| === |2-3| → 1 === 1 → TRUE → return false
```
→ ❌ (chéo với hàng 2)

- **Cột 3:** Cùng cột hàng 1 → ❌

**🔙 QUAY LUI:** Không có vị trí nào → quay về hàng 2

---

### 🔙 **QUAY LUI TỪ HÀNG 3 → HÀNG 2**

```javascript
board[2] = -1;
board = [0, 3, -1, -1]
```

**Tiếp tục thử:** Hàng 2, cột 2, 3 → Tất cả bị tấn công

**🔙 QUAY LUI:** Về hàng 1

---

### 🔙 **QUAY LUI TỪ HÀNG 2 → HÀNG 1**

```javascript
board[1] = -1;
board = [0, -1, -1, -1]
```

**Đã thử hết các cột của hàng 1 (0, 1, 2, 3)**

**🔙 QUAY LUI:** Về hàng 0

---

### 🔙 **QUAY LUI TỪ HÀNG 1 → HÀNG 0**

```javascript
board[0] = -1;
board = [-1, -1, -1, -1]
```

**Tiếp tục:** backtrack(0), cột 1

---

### 📍 **HÀNG 0, CỘT 1**

**✅ AN TOÀN**
```
board = [1, -1, -1, -1]

Bàn cờ:
. Q . .
. . . .
. . . .
. . . .
```

**Đệ quy:** backtrack(1)

---

### 📍 **HÀNG 1: THỬ CÁC CỘT**

- Cột 0, 1, 2: Bị tấn công
- **Cột 3: AN TOÀN!**

```
board = [1, 3, -1, -1]

Bàn cờ:
. Q . .   (Hàng 0: cột 1)
. . . Q   (Hàng 1: cột 3)
. . . .
. . . .
```

---

### 📍 **HÀNG 2: THỬ CÁC CỘT**

- Cột 0: **AN TOÀN!**

```
board = [1, 3, 0, -1]

Bàn cờ:
. Q . .   (Hàng 0: cột 1)
. . . Q   (Hàng 1: cột 3)
Q . . .   (Hàng 2: cột 0)
. . . .
```

---

### 📍 **HÀNG 3: THỬ CÁC CỘT**

- Cột 0, 1, 3: Bị tấn công
- **Cột 2: AN TOÀN!**

```
board = [1, 3, 0, 2]

Bàn cờ:
. Q . .   (Hàng 0: cột 1)
. . . Q   (Hàng 1: cột 3)
Q . . .   (Hàng 2: cột 0)
. . Q .   (Hàng 3: cột 2)
```

---

### 🎉 **TÌM ĐƯỢC LỜI GIẢI THỨ 1!**

```javascript
if (row === 4) {  // row === n
    solutions.push([1, 3, 0, 2]);
    return;
}
```

**Lời giải 1:** [1, 3, 0, 2]
```
. Q . .
. . . Q
Q . . .
. . Q .
```

**Tiếp tục quay lui để tìm lời giải khác...**

---

### 🔄 **TIẾP TỤC TÌM KIẾM...**

Thuật toán quay lui và thử các khả năng khác...

---

### 🎉 **TÌM ĐƯỢC LỜI GIẢI THỨ 2!**

**Lời giải 2:** [2, 0, 3, 1]
```
. . Q .
Q . . .
. . . Q
. Q . .
```

---

### ✅ **KẾT QUẢ CUỐI CÙNG**

```javascript
solutions = [
    [1, 3, 0, 2],  // Lời giải 1
    [2, 0, 3, 1]   // Lời giải 2
]
```

**Tổng số bước:** ~40-50 lần gọi backtrack (bao gồm cả quay lui)

**Hiệu quả:** Với pruning (isSafe), giảm từ 4^4 = 256 xuống ~40 bước

---

## 📊 PHÂN TÍCH CHI TIẾT CODE

### DÒNG 1-3: Khởi tạo
```javascript
function solveNQueens(n) {
    const solutions = [];      // Lưu tất cả lời giải
    const board = Array(n).fill(-1);  // Bàn cờ ban đầu
```
- `solutions`: Mảng chứa tất cả các cấu hình thỏa mãn
- `board[i] = j`: Hàng i có quân hậu ở cột j
- `board[i] = -1`: Hàng i chưa đặt quân hậu

### DÒNG 5-14: Hàm isSafe
```javascript
function isSafe(row, col) {
    for (let i = 0; i < row; i++) {
        if (board[i] === col || 
            Math.abs(board[i] - col) === Math.abs(i - row)) {
            return false;
        }
    }
    return true;
}
```
**Giải thích:**
- Chỉ kiểm tra các hàng TRƯỚC (i < row) vì các hàng sau chưa đặt quân
- `board[i] === col`: Kiểm tra cùng cột
- `Math.abs(board[i] - col) === Math.abs(i - row)`: Kiểm tra đường chéo
  - Nếu hiệu row và hiệu col bằng nhau → cùng đường chéo

### DÒNG 16-18: Điều kiện dừng
```javascript
function backtrack(row) {
    if (row === n) {
        solutions.push([...board]);
        return;
    }
```
- Khi `row === n`: Đã đặt đủ n quân hậu
- `[...board]`: Tạo bản sao của board (không dùng tham chiếu)
- `return`: Quay lui để tìm lời giải khác

### DÒNG 20-27: Vòng lặp thử
```javascript
for (let col = 0; col < n; col++) {
    if (isSafe(row, col)) {
        board[row] = col;        // ← MAKE CHOICE
        backtrack(row + 1);      // ← EXPLORE
        board[row] = -1;         // ← UNDO CHOICE
    }
}
```
**3 bước quan trọng của Backtracking:**
1. **MAKE CHOICE:** Đặt quân hậu vào board
2. **EXPLORE:** Đệ quy sang hàng tiếp theo
3. **UNDO CHOICE:** Quay lui - bỏ quân hậu để thử vị trí khác

### Tại sao phải UNDO?
```javascript
// Ví dụ không UNDO:
board[0] = 1;
backtrack(1);  // Tìm được lời giải [1, 3, 0, 2]
// board vẫn = [1, 3, 0, 2]
// Khi quay lui, board[0] vẫn = 1
// → Không thể thử board[0] = 2

// Với UNDO:
board[0] = 1;
backtrack(1);
board[0] = -1;  // ← Reset
// Bây giờ có thể thử board[0] = 2
```

---

## 🎓 TÓM TẮT & KẾT LUẬN

### Backtracking phù hợp khi:
✅ Bài toán tổ hợp (permutation, combination, subset)  
✅ Có ràng buộc phức tạp  
✅ Cần tìm TẤT CẢ lời giải  
✅ N nhỏ (≤ 20-25)  
✅ Có thể cắt tỉa hiệu quả

### Backtracking KHÔNG phù hợp khi:
❌ Dữ liệu lớn (N > 30)  
❌ Cần tối ưu hóa (dùng DP, Greedy)  
❌ Yêu cầu thời gian thực  
❌ Có thuật toán đặc biệt tốt hơn

### Core Pattern:
```javascript
function backtrack(state) {
    if (isGoal(state)) {
        recordSolution(state);
        return;
    }
    
    for (choice of choices) {
        if (isValid(state, choice)) {
            makeChoice(state, choice);    // Choose
            backtrack(newState);          // Explore
            undoChoice(state, choice);    // Unchoose
        }
    }
}
```

### Độ phức tạp N-Queens:
- **Thời gian:** O(n!)
- **Không gian:** O(n)
- **Số lời giải:**
  - n=4: 2 lời giải
  - n=8: 92 lời giải
  - n=12: 14,200 lời giải

---

## 🔗 TÀI LIỆU THAM KHẢO

1. **Sách:**
   - "Introduction to Algorithms" - CLRS
   - "Algorithm Design Manual" - Steven Skiena

2. **Online:**
   - LeetCode N-Queens (Problem 51)
   - GeeksforGeeks Backtracking
   - Visualgo.net

3. **Video:**
   - Abdul Bari - Backtracking
   - MIT OpenCourseWare - Algorithms

---

**🎯 Lời khuyên:** Hãy tự code lại từng bước, debug và xem cách thuật toán hoạt động. Hiểu được cách backtracking "quay lui" là chìa khóa để master kỹ thuật này!
