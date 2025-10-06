"""
N-Queens Problem Solver using Backtracking
Giải bài toán N con hậu bằng thuật toán Backtracking

Author: AI Assistant
Date: 2025-10-06
"""

class NQueensSolver:
    def __init__(self, n):
        """
        Khởi tạo bài toán N-Queens
        
        Args:
            n (int): Kích thước bàn cờ (N x N)
        """
        self.n = n
        self.solutions = []
        self.step_count = 0
        self.backtrack_count = 0
        
    def solve(self, find_all=True):
        """
        Giải bài toán N-Queens
        
        Args:
            find_all (bool): True nếu muốn tìm tất cả lời giải, False nếu chỉ cần 1 lời giải
            
        Returns:
            list: Danh sách các lời giải
        """
        self.solutions = []
        self.step_count = 0
        self.backtrack_count = 0
        
        queens = [-1] * self.n  # queens[i] = j nghĩa là quân hậu ở hàng i, cột j
        self._backtrack(queens, 0, find_all)
        
        return self.solutions
    
    def _backtrack(self, queens, row, find_all):
        """
        Hàm backtrack chính
        
        Args:
            queens (list): Mảng lưu vị trí các quân hậu
            row (int): Hàng hiện tại đang xét
            find_all (bool): Có tìm tất cả lời giải không
        """
        self.step_count += 1
        
        # Base case: Đã đặt được N quân hậu
        if row == self.n:
            self.solutions.append(queens[:])  # Copy solution
            print(f"✅ Tìm thấy lời giải #{len(self.solutions)}: {queens}")
            return not find_all  # Trả về True nếu chỉ cần 1 lời giải
        
        # Thử đặt quân hậu vào từng cột của hàng hiện tại
        for col in range(self.n):
            print(f"🔍 Bước {self.step_count}: Thử đặt quân hậu tại hàng {row}, cột {col}")
            
            if self._is_safe(queens, row, col):
                # Đặt quân hậu
                queens[row] = col
                print(f"✅ An toàn! Đặt quân hậu tại ({row}, {col})")
                print(f"   Trạng thái hiện tại: {queens[:row+1]}")
                
                # Đệ quy cho hàng tiếp theo
                if self._backtrack(queens, row + 1, find_all):
                    return True
                
                # Backtrack: Gỡ bỏ quân hậu
                queens[row] = -1
                self.backtrack_count += 1
                print(f"🔙 Backtrack! Gỡ bỏ quân hậu tại ({row}, {col})")
            else:
                print(f"❌ Không an toàn tại ({row}, {col})")
        
        return False
    
    def _is_safe(self, queens, row, col):
        """
        Kiểm tra xem có thể đặt quân hậu tại (row, col) không
        
        Args:
            queens (list): Mảng vị trí các quân hậu đã đặt
            row (int): Hàng muốn đặt
            col (int): Cột muốn đặt
            
        Returns:
            bool: True nếu an toàn, False nếu không
        """
        for i in range(row):
            # Kiểm tra cùng cột
            if queens[i] == col:
                print(f"   ⚠️  Xung đột cột với quân hậu tại ({i}, {queens[i]})")
                return False
            
            # Kiểm tra đường chéo
            if abs(queens[i] - col) == abs(i - row):
                print(f"   ⚠️  Xung đột chéo với quân hậu tại ({i}, {queens[i]})")
                return False
        
        return True
    
    def print_solution(self, solution_index=0):
        """
        In ra lời giải dưới dạng bàn cờ
        
        Args:
            solution_index (int): Chỉ số lời giải muốn in
        """
        if not self.solutions or solution_index >= len(self.solutions):
            print("Không có lời giải để hiển thị!")
            return
        
        solution = self.solutions[solution_index]
        print(f"\n🏆 Lời giải #{solution_index + 1}:")
        print(f"Vị trí các quân hậu: {solution}")
        print("\nBàn cờ:")
        
        # In header cột
        print("   ", end="")
        for j in range(self.n):
            print(f"{j:2}", end=" ")
        print()
        
        # In bàn cờ
        for i in range(self.n):
            print(f"{i:2} ", end="")
            for j in range(self.n):
                if solution[i] == j:
                    print("♛ ", end=" ")  # Quân hậu
                else:
                    print("· ", end=" ")  # Ô trống
            print()
        print()
    
    def print_all_solutions(self):
        """In tất cả lời giải"""
        if not self.solutions:
            print("Không tìm thấy lời giải nào!")
            return
        
        print(f"\n🎉 Tìm thấy {len(self.solutions)} lời giải:")
        for i in range(len(self.solutions)):
            self.print_solution(i)
    
    def get_statistics(self):
        """Lấy thống kê về quá trình giải"""
        return {
            'solutions_found': len(self.solutions),
            'total_steps': self.step_count,
            'backtrack_steps': self.backtrack_count,
            'efficiency': (len(self.solutions) / self.step_count * 100) if self.step_count > 0 else 0
        }


def demonstrate_n_queens(n=4):
    """
    Mô phỏng chi tiết bài toán N-Queens với n=4
    
    Args:
        n (int): Kích thước bàn cờ
    """
    print("=" * 80)
    print(f"🎯 MÔ PHỎNG BÀI TOÁN {n}-QUEENS")
    print("=" * 80)
    
    print(f"\n📋 Mục tiêu: Đặt {n} quân hậu trên bàn cờ {n}x{n} sao cho không quân nào ăn được quân nào")
    print("\n🎮 Bắt đầu giải bài toán...")
    print("-" * 50)
    
    solver = NQueensSolver(n)
    solutions = solver.solve(find_all=True)
    
    print("-" * 50)
    print("🏁 KẾT THÚC QUÁ TRÌNH TÌM KIẾM")
    print("-" * 50)
    
    # In thống kê
    stats = solver.get_statistics()
    print(f"\n📊 THỐNG KÊ:")
    print(f"   • Số lời giải tìm được: {stats['solutions_found']}")
    print(f"   • Tổng số bước thực hiện: {stats['total_steps']}")
    print(f"   • Số lần backtrack: {stats['backtrack_steps']}")
    print(f"   • Hiệu suất: {stats['efficiency']:.2f}%")
    
    # In tất cả lời giải
    solver.print_all_solutions()
    
    return solver


if __name__ == "__main__":
    # Mô phỏng với n=4
    solver = demonstrate_n_queens(4)
    
    print("\n" + "="*80)
    print("🔍 PHÂN TÍCH CHI TIẾT QUÁ TRÌNH GIẢI")
    print("="*80)
    
    print("""
    📝 GIẢI THÍCH TỪNG BƯỚC:
    
    1. 🎯 Mục tiêu: Đặt 4 quân hậu trên bàn cờ 4x4
    
    2. 🔄 Quy trình Backtracking:
       - Bắt đầu từ hàng 0, thử từng cột
       - Kiểm tra xem vị trí có an toàn không
       - Nếu an toàn: đặt quân hậu và chuyển sang hàng tiếp theo
       - Nếu không an toàn hoặc bế tắc: quay lui (backtrack)
    
    3. ✅ Điều kiện an toàn:
       - Không cùng cột với quân hậu đã đặt
       - Không cùng đường chéo với quân hậu đã đặt
    
    4. 🏆 Kết thúc khi đặt được 4 quân hậu thỏa mãn điều kiện
    """)