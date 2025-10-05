import React, { useState, useRef } from "react";
import { Play, Pause, RotateCcw, AlertCircle } from "lucide-react";

const NQueensVisualizer = () => {
  const [n, setN] = useState(4);
  const [board, setBoard] = useState(Array(4).fill(-1));
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [step, setStep] = useState(0);
  const [log, setLog] = useState(["Nhấn 'Chạy' để bắt đầu..."]);
  const [currentRow, setCurrentRow] = useState(-1);
  const [currentCol, setCurrentCol] = useState(-1);
  const [solutions, setSolutions] = useState(0);
  const [attacks, setAttacks] = useState([]);
  const [explanation, setExplanation] = useState(
    "Sẵn sàng bắt đầu. Nhấn Play để xem thuật toán hoạt động!"
  );

  const runningRef = useRef(false);

  const resetBoard = () => {
    const newSize = n;
    setBoard(Array(newSize).fill(-1));
    setIsRunning(false);
    runningRef.current = false;
    setStep(0);
    setLog(["Nhấn 'Chạy' để bắt đầu..."]);
    setCurrentRow(-1);
    setCurrentCol(-1);
    setSolutions(0);
    setAttacks([]);
    setExplanation("Sẵn sàng bắt đầu. Nhấn Play để xem thuật toán hoạt động!");
  };

  const handleNChange = (newN) => {
    setN(newN);
    setBoard(Array(newN).fill(-1));
    setStep(0);
    setLog(["Nhấn 'Chạy' để bắt đầu..."]);
    setCurrentRow(-1);
    setCurrentCol(-1);
    setSolutions(0);
    setAttacks([]);
    setExplanation("Sẵn sàng bắt đầu. Nhấn Play để xem thuật toán hoạt động!");
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const isSafe = (boardArray, row, col) => {
    const attackCells = [];

    for (let i = 0; i < row; i++) {
      if (boardArray[i] === col) {
        attackCells.push([i, col]);
      }
    }

    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (boardArray[i] === j) {
        attackCells.push([i, j]);
      }
    }

    for (
      let i = row - 1, j = col + 1;
      i >= 0 && j < boardArray.length;
      i--, j++
    ) {
      if (boardArray[i] === j) {
        attackCells.push([i, j]);
      }
    }

    return { safe: attackCells.length === 0, attacks: attackCells };
  };

  const solveStep = async (
    boardArray,
    row,
    logArray,
    stepCounter,
    solutionCounter
  ) => {
    if (!runningRef.current)
      return { stopped: true, solutions: solutionCounter };

    const boardSize = boardArray.length;

    if (row === boardSize) {
      solutionCounter++;
      setSolutions(solutionCounter);
      setExplanation(`🎉 Tìm được lời giải thứ ${solutionCounter}!`);
      logArray.push(`✅ Tìm được lời giải thứ ${solutionCounter}!`);
      setLog([...logArray]);
      await sleep(speed * 2);
      return { stopped: false, solutions: solutionCounter };
    }

    for (let col = 0; col < boardSize; col++) {
      if (!runningRef.current)
        return { stopped: true, solutions: solutionCounter };

      setCurrentRow(row);
      setCurrentCol(col);
      setExplanation(
        `Đang thử đặt quân hậu tại hàng ${row + 1}, cột ${col + 1}...`
      );
      await sleep(speed / 2);

      const safetyCheck = isSafe(boardArray, row, col);

      if (safetyCheck.safe) {
        logArray.push(`✓ Hàng ${row + 1}, Cột ${col + 1}: AN TOÀN`);
        setAttacks([]);
        boardArray[row] = col;
        setBoard([...boardArray]);
        setLog([...logArray]);
        setStep(++stepCounter);
        await sleep(speed);

        const result = await solveStep(
          boardArray,
          row + 1,
          logArray,
          stepCounter,
          solutionCounter
        );
        if (result.stopped) return result;
        solutionCounter = result.solutions;

        setExplanation(`⬅️ Quay lui từ hàng ${row + 1}, thử vị trí khác...`);
        logArray.push(`⬅ Quay lui từ hàng ${row + 1}, cột ${col + 1}`);
        boardArray[row] = -1;
        setBoard([...boardArray]);
        setLog([...logArray]);
        setCurrentRow(row);
        setCurrentCol(col);
        await sleep(speed);
      } else {
        logArray.push(`✗ Hàng ${row + 1}, Cột ${col + 1}: BỊ TẤN CÔNG`);
        setAttacks(safetyCheck.attacks);
        setLog([...logArray]);
        setExplanation(`❌ Vị trí bị tấn công! Thử cột tiếp theo...`);
        await sleep(speed / 2);
        setAttacks([]);
      }
    }

    return { stopped: false, solutions: solutionCounter };
  };

  const startSolving = async () => {
    runningRef.current = true;
    setIsRunning(true);
    const boardArray = Array(n).fill(-1);
    const logArray = ["Bắt đầu giải thuật..."];
    setLog(logArray);
    setSolutions(0);
    setStep(0);

    const result = await solveStep(boardArray, 0, logArray, 0, 0);

    runningRef.current = false;
    setIsRunning(false);
    setCurrentRow(-1);
    setCurrentCol(-1);
    setExplanation(`Hoàn thành! Tìm được ${result.solutions} lời giải.`);
  };

  const stopSolving = () => {
    runningRef.current = false;
    setIsRunning(false);
    setExplanation("Đã dừng!");
  };

  const isAttacked = (row, col) => {
    return attacks.some(([r, c]) => r === row && c === col);
  };

  const isCurrent = (row, col) => {
    return row === currentRow && col === currentCol;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Mô phỏng N-Queens Backtracking
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Xem trực quan cách thuật toán backtracking giải bài toán xếp N quân
            hậu
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <label className="font-semibold text-gray-700">
                Số quân hậu:
              </label>
              <input
                type="number"
                min="4"
                max="8"
                value={n}
                onChange={(e) =>
                  handleNChange(
                    Math.max(4, Math.min(8, parseInt(e.target.value) || 4))
                  )
                }
                disabled={isRunning}
                className="w-16 px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="font-semibold text-gray-700">Tốc độ:</label>
              <input
                type="range"
                min="100"
                max="2000"
                step="100"
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value))}
                className="w-32"
              />
              <span className="text-sm text-gray-600">{speed}ms</span>
            </div>

            {!isRunning ? (
              <button
                onClick={startSolving}
                className="flex items-center gap-2 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition"
              >
                <Play size={20} /> Chạy
              </button>
            ) : (
              <button
                onClick={stopSolving}
                className="flex items-center gap-2 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition"
              >
                <Pause size={20} /> Dừng
              </button>
            )}

            <button
              onClick={resetBoard}
              disabled={isRunning}
              className="flex items-center gap-2 px-6 py-2 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white rounded-lg font-semibold transition"
            >
              <RotateCcw size={20} /> Reset
            </button>
          </div>

          <div className="flex justify-center gap-6 mb-6">
            <div className="bg-blue-100 px-6 py-3 rounded-lg">
              <div className="text-sm text-blue-600 font-semibold">Bước</div>
              <div className="text-2xl font-bold text-blue-700">{step}</div>
            </div>
            <div className="bg-green-100 px-6 py-3 rounded-lg">
              <div className="text-sm text-green-600 font-semibold">
                Lời giải
              </div>
              <div className="text-2xl font-bold text-green-700">
                {solutions}
              </div>
            </div>
            <div className="bg-purple-100 px-6 py-3 rounded-lg">
              <div className="text-sm text-purple-600 font-semibold">
                Hàng hiện tại
              </div>
              <div className="text-2xl font-bold text-purple-700">
                {currentRow >= 0 ? `${currentRow + 1}/${n}` : "-"}
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle
                className="text-yellow-600 mt-1 flex-shrink-0"
                size={24}
              />
              <div className="text-gray-700 font-medium">{explanation}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Bàn cờ {n}×{n}
              </h3>
              <div
                className="inline-grid gap-1 p-4 bg-gray-800 rounded-lg shadow-lg"
                style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
              >
                {Array.from({ length: n * n }).map((_, idx) => {
                  const row = Math.floor(idx / n);
                  const col = idx % n;
                  const hasQueen = board[row] === col;
                  const isWhite = (row + col) % 2 === 0;
                  const attacked = isAttacked(row, col);
                  const current = isCurrent(row, col);

                  return (
                    <div
                      key={idx}
                      className={`w-12 h-12 flex items-center justify-center text-2xl transition-all duration-200 ${
                        current
                          ? "bg-yellow-300 scale-110 shadow-lg"
                          : attacked
                          ? "bg-red-400"
                          : isWhite
                          ? "bg-amber-100"
                          : "bg-amber-700"
                      }`}
                    >
                      {hasQueen && <span className="text-3xl">♛</span>}
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-yellow-300 border border-gray-300"></div>
                  <span>Ô đang kiểm tra</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-red-400 border border-gray-300"></div>
                  <span>Ô bị tấn công</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-amber-100 border border-gray-300 flex items-center justify-center text-lg">
                    ♛
                  </div>
                  <span>Quân hậu</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Log thuật toán
              </h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg h-96 overflow-y-auto font-mono text-sm">
                {log.map((entry, idx) => (
                  <div key={idx} className="mb-1">
                    {entry}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              Thuật toán Backtracking hoạt động thế nào?
            </h3>
            <ol className="space-y-3 text-gray-700 leading-relaxed">
              <li>
                <strong>Bước 1:</strong> Bắt đầu từ hàng đầu tiên, thử đặt quân
                hậu vào từng cột từ trái sang phải.
              </li>
              <li>
                <strong>Bước 2:</strong> Kiểm tra xem vị trí đó có bị tấn công
                bởi quân hậu nào ở các hàng trước không (kiểm tra cùng cột,
                đường chéo trái và phải).
              </li>
              <li>
                <strong>Bước 3:</strong> Nếu an toàn, đặt quân hậu xuống và
                chuyển sang hàng tiếp theo, lặp lại bước 1.
              </li>
              <li>
                <strong>Bước 4:</strong> Nếu không an toàn, thử cột tiếp theo ở
                hàng hiện tại.
              </li>
              <li>
                <strong>Bước 5 (Backtrack):</strong> Nếu đã thử hết tất cả cột ở
                hàng hiện tại mà không có vị trí nào an toàn, QUAY LÙI về hàng
                trước, bỏ quân hậu ở đó và thử vị trí khác.
              </li>
              <li>
                <strong>Bước 6:</strong> Lặp lại cho đến khi đặt được {n} quân
                hậu hoặc đã thử hết tất cả khả năng.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NQueensVisualizer;
