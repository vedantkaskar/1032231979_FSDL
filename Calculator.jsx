import React, { useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num) => {
    if (newNumber) {
      setDisplay(String(num));
      setNewNumber(false);
    } else {
      setDisplay(display === "0" ? String(num) : display + num);
    }
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay("0.");
      setNewNumber(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOperation = (op) => {
    const currentValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (prev, current, op) => {
    switch (op) {
      case "+":
        return prev + current;
      case "-":
        return prev - current;
      case "*":
        return prev * current;
      case "/":
        return current === 0 ? "∞" : prev / current;
      case "%":
        return prev % current;
      case "^":
        return Math.pow(prev, current);
      default:
        return current;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const currentValue = parseFloat(display);
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleBackspace = () => {
    if (newNumber) return;
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
      setNewNumber(true);
    }
  };

  const handleToggleSign = () => {
    if (display === "0") return;
    setDisplay(String(parseFloat(display) * -1));
  };

  const handleSquareRoot = () => {
    setDisplay(String(Math.sqrt(parseFloat(display))));
    setNewNumber(true);
  };

  const handlePercentage = () => {
    setDisplay(String(parseFloat(display) / 100));
    setNewNumber(true);
  };

  const Button = ({ children, onClick, variant = "default", className = "" }) => {
    const baseStyles = "w-full py-4 rounded-lg font-semibold text-lg transition-all duration-200 active:scale-95";
    const variants = {
      default:
        "bg-gradient-to-b from-slate-700 to-slate-800 text-white hover:from-slate-600 hover:to-slate-700 shadow-lg",
      operation:
        "bg-gradient-to-b from-orange-500 to-orange-600 text-white hover:from-orange-400 hover:to-orange-500 shadow-lg",
      equals:
        "bg-gradient-to-b from-emerald-500 to-emerald-600 text-white hover:from-emerald-400 hover:to-emerald-500 shadow-lg text-xl",
      clear: "bg-gradient-to-b from-red-500 to-red-600 text-white hover:from-red-400 hover:to-red-500 shadow-lg",
    };

    return (
      <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black text-white mb-2 tracking-tight">CALCULUS</h1>
          <p className="text-slate-400 text-sm font-medium tracking-widest">PRECISION MATHEMATICS</p>
        </div>

        <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-6 border border-slate-700">
          <div className="bg-gradient-to-r from-slate-950 to-slate-900 rounded-2xl p-6 mb-6 border border-slate-700 shadow-inner">
            <div className="text-right">
              <p className="text-slate-400 text-sm h-5 mb-2">
                {operation && previousValue !== null ? `${previousValue} ${operation}` : ""}
              </p>
              <p className="text-white text-5xl font-black tracking-tight break-words">{display}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <Button onClick={handleClear} variant="clear" className="col-span-2">
              AC
            </Button>
            <Button onClick={handleBackspace} variant="clear">
              ⌫
            </Button>
            <Button onClick={() => handleOperation("/")} variant="operation">
              ÷
            </Button>

            <Button onClick={() => handleNumber(7)}>7</Button>
            <Button onClick={() => handleNumber(8)}>8</Button>
            <Button onClick={() => handleNumber(9)}>9</Button>
            <Button onClick={() => handleOperation("*")} variant="operation">
              ×
            </Button>

            <Button onClick={() => handleNumber(4)}>4</Button>
            <Button onClick={() => handleNumber(5)}>5</Button>
            <Button onClick={() => handleNumber(6)}>6</Button>
            <Button onClick={() => handleOperation("-")} variant="operation">
              −
            </Button>

            <Button onClick={() => handleNumber(1)}>1</Button>
            <Button onClick={() => handleNumber(2)}>2</Button>
            <Button onClick={() => handleNumber(3)}>3</Button>
            <Button onClick={() => handleOperation("+")} variant="operation">
              +
            </Button>

            <Button onClick={() => handleNumber(0)} className="col-span-2">
              0
            </Button>
            <Button onClick={handleDecimal}>.</Button>
            <Button onClick={handleEquals} variant="equals">
              =
            </Button>

            <Button onClick={handleToggleSign} className="text-sm">
              ±
            </Button>
            <Button onClick={handlePercentage} className="text-sm">
              %
            </Button>
            <Button onClick={handleSquareRoot} className="text-sm col-span-2">
              √
            </Button>
          </div>

          <div className="mt-6 text-center text-slate-500 text-xs">
            Supports decimal • Advanced operations • Real-time calculation
          </div>
        </div>
      </div>
    </div>
  );
}
