// server.js
const http = require('http');
const { handleConvertUnit } = require('./router/unit-convert-router');

const PORT = 5000;

const server = http.createServer((req, res) => {
  // set CORS cho dev: cho phép front-end gọi từ localhost khác
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  // Gọi router; nếu router trả false nghĩa chưa xử lý
  const handled = handleConvertUnit(req, res);
  if (handled === false) {
    // Trả 404 rõ ràng để client không chờ vô hạn
    res.writeHead(404, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Endpoint not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server chạy trên port ${PORT}`);
});
