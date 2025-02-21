import React, { useState, useEffect } from "react";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState();
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((res) => res.json())
      .then((data) => setExchangeRates(data.rates));
  }, []);

  const convertCurrency = () => {
    if (exchangeRates[fromCurrency] && exchangeRates[toCurrency]) {
      const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
      setConvertedAmount((amount * rate).toFixed(2));
    }
  };

  return (
    <div className="Items">
        <div className="allFour">
      <h1>Currency Converter</h1>
      <p id="enter">Enter amount</p>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        id="holder"
      />

      <div className="sec2">
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="selector"
        >
          {Object.keys(exchangeRates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <span id="conver"><i>⇄</i></span>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="selector1"
        >
          {Object.keys(exchangeRates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={convertCurrency}
        id="convertB"
      >
        Convert
      </button>

      {convertedAmount && (
        <p id="outP">
          {convertedAmount} {toCurrency}
        </p>
      )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
