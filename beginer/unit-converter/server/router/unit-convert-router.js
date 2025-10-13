// router/unit-convert-router.js
const url = require('url');

function handleConvertUnit(req, res) {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;
  const query = parsed.query;

  console.log('[router] incoming:', req.method, pathname, query);

  if (pathname === '/api/convert/length' && req.method === 'GET') {
    console.log('Đang quy đổi length');

    if (!query.value) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Thiếu tham số value' }));
    }
    if (!query.from) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Thiếu tham số from' }));
    }
    if (!query.to) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Thiếu tham số to' }));
    }

    try {
      const result = handleConvertLength(
        parseFloat(query.value),
        query.from,
        query.to
      );
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ value: result }));
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: err.message }));
    }
  }

  // Router không xử lý: trả về false để server biết và có thể trả 404
  return false;
}

function handleConvertLength(value, fromUnit, toUnit) {
  const unitToMeter = {
    millimeter: 0.001,
    centimeter: 0.01,
    meter: 1,
    kilometer: 1000,
    inch: 0.0254,
    foot: 0.3048,
    yard: 0.9144,
    mile: 1609.344,
  };

  if (!unitToMeter[fromUnit] || !unitToMeter[toUnit]) {
    throw new Error('Đơn vị không hợp lệ');
  }

  const valueToMeter = value * unitToMeter[fromUnit];
  return valueToMeter / unitToMeter[toUnit];
}

module.exports = {
  handleConvertUnit,
  handleConvertLength,
};
