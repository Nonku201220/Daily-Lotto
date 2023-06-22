import React, { useState, useEffect } from 'react';
import './DailyLotto.css'
import './Ticket.css'
import { useBarcode } from 'react-barcode';
import PDF417 from 'pdf417-generator';
import JsBarcode from 'jsbarcode';
import './styles.css';

  
function GenerateBarcode () {
  const { inputRef } = useBarcode({
    value: 'createnextapp',
    options: {
      displayValue: false,
      background: '#ccffff',
    }
  });

 
  return <canvas ref={inputRef} />;
};


function DailyLotto() {
  const [numRows, setNumRows] = useState(1);
  const [quickPick, setQuickpick] = useState(true);
  const [ticketNotification, setTicketNotification] = useState(true);
  const [tickets, setTickets] = useState([]);



  function handleNumRowsChange(e) {
    setNumRows(parseInt(e.target.value));
  }

  function handleQuickPickChange(e) {
    setQuickpick(e.target.checked);
  }

  function handleTicketNotificationChange(e) {
    setTicketNotification(e.target.checked);
  }

  function generateNumbers() {
    const numbers = [];
    while (numbers.length < 6) {
      const num = Math.floor(Math.random() * 35) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    return numbers.sort((a, b) => a - b);
  }

  function generateTicket() {
    const ticketRows = [];
    for (let i = 0; i < numRows; i++) {
      const row = quickPick ? generateNumbers() : [];
      ticketRows.push(row);
    }

 


    return ticketRows;
  }

  function handleGenerateTicketClick() {
    setTickets(generateTicket());
  }
  
  class Img {
    constructor(src, alt, width, height) {
      this.src = src;
      this.alt = alt;
      this.width = width;
      this.height = height;
    }
  
    render() {
      return `<img src="${this.src}" alt="${this.alt}" width="${this.width}" height="${this.height}">`;
    }
  }

  
  function handlePrintTicketClick() {
    const selectedDraws = tickets.filter(ticket => ticket.length > 0);
    const totalPrice = selectedDraws.length * 3; 
    const printWindow = window.open('', 'Print', 'height=100,width=100');
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    const currentTime = new Date();
const hours = currentTime.getHours();
const minutes = currentTime.getMinutes() + 1;
const seconds = currentTime.getSeconds();
const formattedTime = `${hours}:${minutes}:${seconds}`;

const ticketData = selectedDraws.map(ticket => ({
  numbers: ticket.join(', '),
  price: 'R3.00',
  
}));

    const nationalLotteryImg = new Img("https://th.bing.com/th?id=OIP.mp6VjpS2rc_WIwG4586mowAAAA&w=266&h=84&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2");
  
    printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        ${nationalLotteryImg.render()}
        <title>Ticket</title>
        <style>
        h1 {
          font-size: 16px;
          font-weight: normal;
          text-align: center;
          font-family: sans-serif;
        }

        img {
          display: block;
          margin: 0 auto;
          max-width: 100%;
          height: auto;
        }

        .ticket {
          width: 100%;
          max-width: 300px;
          height: auto;
        }

        .selected {
          display: inline-block;
          width: 30px;
          height: 20px;
          margin: 0px;
          font-family: sans-serif;
          font-size: 16px;
          border-radius: 50%;
          background-color: white;
          color: black;
          font-size: 16;
          text-align: center;
          line-height: 40px;
        }

        .footer {
          padding: 5px;
          display: flex;
          justify-content: center;
          flex-direction: row-reverse;
          align-content: center;
          align-items: center;
        }
        </style>
        <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.3/dist/jsbarcode.min.js"></script>
        <style>
      #barcode-canvas {
        display: block;
        margin: 20px auto;
        width: 100px;
        height: 100px;
        background-color: #fff;
        border: 1px solid #ccc;
      }

      #barcode-canvas svg {
        width: 100%;
        height: 100%;
      }
    </style>
        </head>
      <body>
        <h1>
          <p>
            THE NEW DAILY LOTTO GAME IS HERE !!! FORM JUST R3 WITH DAILY DRAWS AND A NEW JACKPOT EVERY DAY.
            EVERY DAY KE PAYDAY ..
            DAILY LOTTO MINIMUM JACKPOT : R350,000,00 est
          </p>
          <p>
            BUY YOUR TICKETS NOW !!! Buy any NATIONAL LOTTERY ticket then SMS: ID, #PLAY, TICKET CODE TO 34909. Cash Prizes to be won weekly !!! T'S and C's apply Visit National Lottery website PLEASE RETAIN YOUR ENTRY TICKET ! First Draw: Wednesday 03/05/23 VALID RECEIPT FOR 4 DRAW(S) FROM DRAW 1128 TO 1132
          </p>
          <hr>
        </h1>
        ${selectedDraws
          .map(
            (ticket, index) =>
              `<div key=${index} class="ticket">
                ${ticket
                  .map((num) => `<span key=${num} class="selected">${num}</span>`)
                  .join('')}
              </div>`
          )
          .join('')}
          <hr>
          <div>
            <span>Total amount:</span> R${totalPrice.toFixed(2)}
          </div>
          <div>
            <span>Date:</span> ${formattedDate}
          </div>
          <div>
            <span>Time:</span> ${formattedTime}
          </div>
          
          <div>
          <canvas id="barcode-canvas"></canvas>
        </div>
        
        <script>
          JsBarcode("#barcode-canvas", "your-unique-value", {
            format: "CODE128",
            displayValue: false,
            height: 50,
            width: 10
          });
        </script>

        

          <footer class="footer">
            Thank you for playing National Lottery
          </footer>
        </body>
      </html>
    `);
      
  
    printWindow.document.close();
  }
  
  



  return (
    
    <div className="dailyLotto">
      <div className="header">
        <div className="buttons">
          <i className="fas fa-chevron-circle-left back-button"></i>
          <i className="fas fa-times exit-button"></i>
        </div>
        <div className="DailyLotto">
          <h1> National Lottery - Daily Lotto</h1>
        </div>
      </div>
      <div className="header__logo">
        <button className="lotto-btn1">
          <img src="https://th.bing.com/th/id/OIP.5LNR4_rby0Grldo1gxAHUgHaHa?w=144&h=180&c=7&r=0&o=5&pid=1.7" alt="National Lottery" width="100" height="100" />
          <h1 className="daily-Lotto"> Daily Lotto</h1>
        </button>
      </div>
      <h2>LOTTO</h2>
      <div className="selections">
        <h3> select number of draws:</h3>
        <input type="range" min="1" max="10" value={numRows} onChange={handleNumRowsChange} />
        <span>{numRows}</span>
      </div>
      <div className="selections">
        <h3>Selections:</h3>
        <label>
          QuickPick:
          <input type="checkbox" checked={quickPick} onChange={handleQuickPickChange} />
        </label>
        <div className="numbers">
          {quickPick &&
            generateNumbers().map((num) => (
              <span key={num} className="selected">
                {num}
              </span>
            ))}
        </div>
      </div>
      <div className="selections">
        <h3>Ticket(s):</h3>
        <input type="checkbox" checked={ticketNotification} onChange={handleTicketNotificationChange} />
        <span>{ticketNotification ? 'Yes' : 'No'}</span>
      </div>
      {tickets.map((ticket, index) => (
        <div key={index} className="ticket">
            
          {ticket.map((num) => (
            <span key={num} className="selected">
              {num}
            </span>
          ))}
        </div>
      ))}

<div>
    </div>
      <button onClick={handleGenerateTicketClick}>Generate ticket(s)</button>
      <button onClick={handlePrintTicketClick}>Print Ticket</button>
    </div>
    
  );
  
}

export default DailyLotto;
