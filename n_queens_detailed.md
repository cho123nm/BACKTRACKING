# Bài toán N Con Hậu (N-Queens Problem) - Phân tích chi tiết

## 1. Mô tả bài toán

Bài toán N con hậu là một bài toán kinh điển trong khoa học máy tính:

**Đề bài**: Đặt N quân hậu trên bàn cờ vua kích thước N×N sao cho không có hai quân hậu nào có thể ăn được nhau.

### Quy tắc di chuyển của quân hậu:
- Di chuyển theo hàng ngang (trái-phải)
- Di chuyển theo hàng dọc (lên-xuống)  
- Di chuyển theo đường chéo (cả hai hướng chéo)

### Ràng buộc:
- Mỗi hàng chỉ có đúng 1 quân hậu
- Mỗi cột chỉ có đúng 1 quân hậu
- Mỗi đường chéo chỉ có đúng 1 quân hậu

## 2. Phân tích bài toán

### 2.1. Không gian tìm kiếm
- Có N! cách đặt N quân hậu vào N hàng (mỗi hàng 1 quân)
- Nhưng chỉ có một số ít cách thỏa mãn ràng buộc

### 2.2. Biểu diễn trạng thái
Có nhiều cách biểu diễn:

**Cách 1: Ma trận 2D**
```
board[i][j] = 1 nếu có quân hậu tại (i,j)
board[i][j] = 0 nếu không có quân hậu
```

**Cách 2: Mảng 1D (tối ưu hơn)**
```
queens[i] = j có nghĩa là quân hậu ở hàng i đặt tại cột j
```

### 2.3. Kiểm tra xung đột
Hai quân hậu tại (r1, c1) và (r2, c2) xung đột nếu:
- Cùng hàng: r1 == r2
- Cùng cột: c1 == c2  
- Cùng đường chéo chính: r1 - c1 == r2 - c2
- Cùng đường chéo phụ: r1 + c1 == r2 + c2

## 3. Thuật toán Backtracking cho N-Queens

### 3.1. Ý tưởng chính
1. Đặt quân hậu từng hàng một (từ hàng 0 đến hàng N-1)
2. Với mỗi hàng, thử đặt quân hậu vào từng cột
3. Kiểm tra xem vị trí đó có an toàn không (không bị ăn bởi các quân hậu đã đặt)
4. Nếu an toàn, đặt quân hậu và chuyển sang hàng tiếp theo
5. Nếu không an toàn hoặc không tìm được vị trí nào cho hàng hiện tại, quay lui

### 3.2. Pseudocode
```
function solveNQueens(n):
    queens = array of size n, initialized to -1
    solutions = empty list
    
    function backtrack(row):
        if row == n:
            solutions.add(copy of queens)
            return
        
        for col from 0 to n-1:
            if isSafe(queens, row, col):
                queens[row] = col
                backtrack(row + 1)
                queens[row] = -1  // backtrack
    
    backtrack(0)
    return solutions

function isSafe(queens, row, col):
    for i from 0 to row-1:
        if queens[i] == col:  // same column
            return false
        if abs(queens[i] - col) == abs(i - row):  // same diagonal
            return false
    return true
```

## 4. Tối ưu hóa

### 4.1. Sử dụng bit manipulation
Thay vì kiểm tra từng quân hậu đã đặt, ta có thể sử dụng 3 bitmask:
- `cols`: các cột đã bị chiếm
- `diag1`: các đường chéo chính đã bị chiếm  
- `diag2`: các đường chéo phụ đã bị chiếm

### 4.2. Symmetry breaking
- Chỉ đặt quân hậu đầu tiên ở nửa đầu của hàng đầu
- Sau đó nhân đôi kết quả (trừ trường hợp đặc biệt)

## 5. Độ phức tạp

### Độ phức tạp thời gian:
- **Trường hợp xấu nhất**: O(N!)
- **Trường hợp trung bình**: Tốt hơn nhiều do pruning

### Độ phức tạp không gian:
- **O(N)**: Chỉ cần lưu trữ vị trí của N quân hậu

## 6. Số lượng lời giải cho các giá trị N

| N | Số lời giải |
|---|-------------|
| 1 | 1           |
| 2 | 0           |
| 3 | 0           |
| 4 | 2           |
| 5 | 10          |
| 6 | 4           |
| 7 | 40          |
| 8 | 92          |
| 9 | 352         |
| 10| 724         |

## 7. Ứng dụng thực tế

- **Scheduling**: Sắp xếp lịch trình không xung đột
- **Resource allocation**: Phân bổ tài nguyên
- **Graph coloring**: Tô màu đồ thị
- **Cryptography**: Một số ứng dụng trong mật mã học
- **Game AI**: Phát triển AI cho các trò chơi chiến thuật