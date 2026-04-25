import { useState, useEffect } from "react";
import { AppShell, HeroSection, StatsRow } from "@/components/applaa";
import { APP_CONFIG } from "@/app-config";

type Shape = "square" | "circle" | "triangle" | "star" | "diamond";
type GameState = "idle" | "dropping" | "landed";

const SHAPES: { type: Shape; emoji: string; color: string }[] = [
  { type: "square", emoji: "⬛", color: "#FF6B6B" },
  { type: "circle", emoji: "⚫", color: "#4ECDC4" },
  { type: "triangle", emoji: "🔺", color: "#FFE66D" },
  { type: "star", emoji: "⭐", color: "#95E1D3" },
  { type: "diamond", emoji: "🔷", color: "#A8D8EA" },
];

export function Index() {
  const [gameActive, setGameActive] = useState(false);
  const [stack, setStack] = useState<Shape[]>([]);
  const [currentShape, setCurrentShape] = useState<Shape>("square");
  const [gameState, setGameState] = useState<GameState>("idle");
  const [score, setScore] = useState(0);
  const [towerHeight, setTowerHeight] = useState(0);
  const [towersBuilt, setTowersBuilt] = useState(0);
  const [shapesPlayed, setShapesPlayed] = useState(0);
  const [bestHeight, setBestHeight] = useState(0);

  const shapeData = SHAPES.find((s) => s.type === currentShape);

  const pickRandomShape = () => {
    const randomIndex = Math.floor(Math.random() * SHAPES.length);
    setCurrentShape(SHAPES[randomIndex].type);
  };

  const dropShape = () => {
    if (gameState !== "idle") return;
    setGameState("dropping");

    setTimeout(() => {
      const newStack = [...stack, currentShape];
      setStack(newStack);
      setGameState("landed");
      setScore((prev) => prev + 10);
      setShapesPlayed((prev) => prev + 1);

      const height = newStack.length;
      setTowerHeight(height);
      if (height > bestHeight) setBestHeight(height);

      setTimeout(() => {
        setGameState("idle");
        pickRandomShape();

        // Check if tower is complete (8 shapes)
        if (newStack.length >= 8) {
          setTowersBuilt((prev) => prev + 1);
          setScore((prev) => prev + 50);
          setStack([]);
          setTowerHeight(0);
        }
      }, 300);
    }, 500);
  };

  const resetGame = () => {
    setStack([]);
    setScore(0);
    setTowerHeight(0);
    setGameState("idle");
    pickRandomShape();
  };

  const startGame = () => {
    setGameActive(true);
    resetGame();
  };

  useEffect(() => {
    pickRandomShape();
  }, []);

  return (
    <AppShell>
      <HeroSection onCtaClick={startGame} />
      <StatsRow />

      {gameActive && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 p-6"
          onClick={() => setGameActive(false)}
        >
          <div
            className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-md w-full cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="text-2xl font-bold text-purple-600">
                🏆 {score}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setGameActive(false);
                }}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="relative h-80 bg-gradient-to-b from-blue-50 to-green-50 rounded-2xl mb-6 overflow-hidden border-4 border-purple-200">
              {stack.map((shapeType, index) => {
                const shape = SHAPES.find((s) => s.type === shapeType);
                return (
                  <div
                    key={index}
                    className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center transition-all duration-300"
                    style={{
                      bottom: `${index * 40}px`,
                      width: "80px",
                      height: "35px",
                      backgroundColor: shape?.color,
                      borderRadius:
                        shapeType === "circle"
                          ? "50%"
                          : shapeType === "triangle"
                          ? "0"
                          : shapeType === "star"
                          ? "8px"
                          : "4px",
                      clipPath:
                        shapeType === "triangle"
                          ? "polygon(50% 0%, 0% 100%, 100% 100%)"
                          : shapeType === "diamond"
                          ? "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
                          : "none",
                    }}
                  >
                    <span className="text-2xl">{shape?.emoji}</span>
                  </div>
                );
              })}

              {gameState === "dropping" && shapeData && (
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center transition-all duration-500"
                  style={{
                    top: "20px",
                    width: "80px",
                    height: "35px",
                    backgroundColor: shapeData.color,
                    borderRadius:
                      currentShape === "circle"
                        ? "50%"
                        : currentShape === "triangle"
                        ? "0"
                        : currentShape === "star"
                        ? "8px"
                        : "4px",
                    clipPath:
                      currentShape === "triangle"
                        ? "polygon(50% 0%, 0% 100%, 100% 100%)"
                        : currentShape === "diamond"
                        ? "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
                        : "none",
                  }}
                >
                  <span className="text-2xl">{shapeData.emoji}</span>
                </div>
              )}

              {gameState === "idle" && shapeData && (
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center animate-bounce cursor-pointer"
                  style={{
                    top: "30px",
                    width: "80px",
                    height: "35px",
                    backgroundColor: shapeData.color,
                    borderRadius:
                      currentShape === "circle"
                        ? "50%"
                        : currentShape === "triangle"
                        ? "0"
                        : currentShape === "star"
                        ? "8px"
                        : "4px",
                    clipPath:
                      currentShape === "triangle"
                        ? "polygon(50% 0%, 0% 100%, 100% 100%)"
                        : currentShape === "diamond"
                        ? "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
                        : "none",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    dropShape();
                  }}
                >
                  <span className="text-2xl">{shapeData.emoji}</span>
                </div>
              )}

              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-3xl">
                🏗️
              </div>
            </div>

            <div className="flex gap-3 mb-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dropShape();
                }}
                disabled={gameState !== "idle"}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
              >
                Drop Shape
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  resetGame();
                }}
                className="bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-bold hover:bg-gray-300 transition-all"
              >
                🔄
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-purple-100 rounded-xl p-3">
                <div className="text-2xl mb-1">🔷</div>
                <div className="text-xs text-purple-700 font-medium">Shapes</div>
                <div className="text-lg font-bold text-purple-900">
                  {shapesPlayed}
                </div>
              </div>
              <div className="bg-pink-100 rounded-xl p-3">
                <div className="text-2xl mb-1">🏗️</div>
                <div className="text-xs text-pink-700 font-medium">Towers</div>
                <div className="text-lg font-bold text-pink-900">
                  {towersBuilt}
                </div>
              </div>
              <div className="bg-yellow-100 rounded-xl p-3">
                <div className="text-2xl mb-1">📏</div>
                <div className="text-xs text-yellow-700 font-medium">Height</div>
                <div className="text-lg font-bold text-yellow-900">
                  {towerHeight}
                </div>
              </div>
            </div>

            <div className="mt-4 text-center text-sm text-gray-500">
              {gameState === "idle"
                ? `Next: ${currentShape} - Tap "Drop Shape" or click it!`
                : gameState === "dropping"
                ? "Dropping..."
                : "Landed!"}
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 space-y-4">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 shadow-sm">
          <h2 className="text-lg font-bold mb-3">How to Play</h2>
          <div className="space-y-3">
            {[
              { emoji: "🎮", text: "Tap Start to begin stacking shapes" },
              { emoji: "👆", text: "Click Drop Shape to place each piece" },
              { emoji: "🏗️", text: "Stack 8 shapes to complete a tower" },
              { emoji: "🏆", text: "Beat your best height score!" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xl">{s.emoji}</span>
                <p className="text-sm text-gray-700">{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 shadow-sm">
          <h2 className="text-lg font-bold mb-3">Shape Types</h2>
          <div className="grid grid-cols-5 gap-2">
            {SHAPES.map((shape) => (
              <div
                key={shape.type}
                className="text-center p-2 rounded-xl"
                style={{ backgroundColor: shape.color }}
              >
                <div className="text-2xl">{shape.emoji}</div>
                <div className="text-xs font-medium text-gray-700 capitalize">
                  {shape.type}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 shadow-sm">
          <h2 className="text-lg font-bold mb-3">Pro Tips</h2>
          <ul className="space-y-2 text-sm text-gray-700 list-none">
            {[
              "✅ Shapes stack automatically - just drop them!",
              "✅ Each shape type has its own color and style",
              "✅ Complete towers earn bonus points",
              "✅ Try to beat your personal best height",
            ].map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
