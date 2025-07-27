

// const sheetId = '1qpC5ibaBdicT-huMOuIXWtBGDyRF3ovpKQZFMRYjGuk';
// const sheetName = 'Sheet1';
// const apiKey = 'AIzaSyBxf1ZWj3qE_P8yftTpRLaSQw7isBRQ2zA';
// const webAppUrl = 'https://script.google.com/macros/s/AKfycbyMecAIVJDAvQZDwGwW1nnFydIHyZ-11KPua_hTFC5JKEcW2rJ5YlhwKEu3zrFZD8t4/exec';

// let selectedCell = '';
// let lastFetchedValue = '';

// document.getElementById('cellInput').addEventListener('input', () => {
//   const cell = document.getElementById('cellInput').value.toUpperCase().trim();
//   if (!cell.match(/^[A-Z]+\d+$/)) {
//     document.getElementById('cellValue').value = '';
//     selectedCell = '';
//     return;
//   }
//   selectedCell = cell;
//   fetchCellValue(); // Fetch immediately
// });

// // Optional: Auto-refresh every 3 sec
// // setInterval(() => {
// //   if (selectedCell !== '') {
// //     fetchCellValue();
// //   }
// // }, 3000);

// function fetchCellValue() {
//   const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!${selectedCell}?key=${apiKey}`;

//   fetch(url)
//     .then(response => {
//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       let value = data.values?.[0]?.[0] || '';
//       document.getElementById('cellValue').value = value;
//       lastFetchedValue = value;
//     })
//     .catch(error => {
//       console.error('Fetch Error:', error);
//       document.getElementById('cellValue').value = 'Error';
//     });
// }

// document.getElementById('updateBtn').addEventListener('click', () => {
//   if (!selectedCell) {
//     alert("Enter a valid cell reference first.");
//     return;
//   }

//   const newValue = document.getElementById('cellValue').value;

//   fetch(webAppUrl, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ cell: selectedCell, value: newValue })
//   })
//     .then(res => res.text())
//     .then(result => {
//       console.log(result);
//       lastFetchedValue = newValue;
//       alert("✅ Cell updated successfully!");
//     })
//     .catch(err => {
//       console.error('Update Error:', err);
//       alert("❌ Failed to update cell.");
//     });
// });
const sheetId = '1qpC5ibaBdicT-huMOuIXWtBGDyRF3ovpKQZFMRYjGuk';
const sheetName = 'Sheet1';
const apiKey = 'AIzaSyBxf1ZWj3qE_P8yftTpRLaSQw7isBRQ2zA';
const webAppUrl = 'https://script.google.com/macros/s/AKfycbxbQXI8McUPYuceXBnRUmWi8dYq0fYpME9ZNu-HOGXaEcucG2Saqq-oS_gXi2pfQYNx/exec';

let selectedCell = '';
let lastFetchedValue = '';

document.getElementById('cellInput').addEventListener('input', () => {
  const cell = document.getElementById('cellInput').value.toUpperCase().trim();
  if (!cell.match(/^[A-Z]+\d+$/)) {
    document.getElementById('cellValue').value = '';
    selectedCell = '';
    return;
  }
  selectedCell = cell;
  fetchCellValue(); // Fetch immediately
});

function fetchCellValue() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!${selectedCell}?key=${apiKey}`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    })
    .then(data => {
      const value = data.values?.[0]?.[0] || '';
      document.getElementById('cellValue').value = value;
      lastFetchedValue = value;
    })
    .catch(error => {
      console.error('Fetch Error:', error);
      document.getElementById('cellValue').value = 'Error';
    });
}

document.getElementById('updateBtn').addEventListener('click', () => {
  if (!selectedCell) {
    alert("Enter a valid cell reference first.");
    return;
  }

  const newValue = document.getElementById('cellValue').value;

  fetch(webAppUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ cell: selectedCell, value: newValue })
  })
    .then(res => res.json())
    .then(result => {
      console.log(result);
      if (result.result === 'success') {
        lastFetchedValue = newValue;
        alert("✅ Cell updated successfully!");
      } else {
        throw new Error(result.message);
      }
    })
    .catch(err => {
      console.error('Update Error:', err);
      alert("❌ Failed to update cell.");
    });
});

// ✅ Auto refresh every 3 seconds if a cell is selected
setInterval(() => {
  if (selectedCell) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!${selectedCell}?key=${apiKey}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const currentValue = data.values?.[0]?.[0] || '';
        if (currentValue !== document.getElementById('cellValue').value) {
          document.getElementById('cellValue').value = currentValue;
        }
      })
      .catch(err => console.error("Auto-fetch error:", err));
  }
}, 3000); // Every 3 seconds

