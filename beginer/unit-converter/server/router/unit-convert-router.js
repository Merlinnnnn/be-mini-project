// router/unit-convert-router.js
const url = require('url');

function handleConvertUnit(req, res) {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;
  const query = parsed.query;

  console.log('[router] incoming:', req.method, pathname, query);

  if (pathname === '/api/convert/length' && req.method === 'GET') {
    console.log('Đang quy đổi length');

    if (!query.value || !query.from || !query.to) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Thiếu tham số value, from hoặc to' }));
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

  if (pathname === '/api/convert/weight' && req.method === 'GET') {
    console.log('Đang quy đổi weight');

    if (!query.value || !query.from || !query.to) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Thiếu tham số value, from hoặc to' }));
    }

    try {
      const result = handleConvertWeight(
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

  if (pathname === '/api/convert/temperature' && req.method === 'GET') {
    console.log('Đang quy đổi temperature');

    if (!query.value || !query.from || !query.to) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Thiếu tham số value, from hoặc to' }));
    }

    try {
      const result = handleConvertTemperature(
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

// --- HÀM QUY ĐỔI ĐỘ DÀI ---
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

// --- HÀM QUY ĐỔI KHỐI LƯỢNG ---
function handleConvertWeight(value, fromUnit, toUnit) {
  const unitToGram = {
    milligram: 0.001,
    gram: 1,
    kilogram: 1000,
    ounce: 28.3495,
    pound: 453.592,
  };

  if (!unitToGram[fromUnit] || !unitToGram[toUnit]) {
    throw new Error('Đơn vị không hợp lệ');
  }

  const valueToGram = value * unitToGram[fromUnit];
  return valueToGram / unitToGram[toUnit];
}

// --- HÀM QUY ĐỔI NHIỆT ĐỘ ---
function handleConvertTemperature(value, fromUnit, toUnit) {
  const validUnits = ['celsius', 'fahrenheit', 'kelvin'];
  if (!validUnits.includes(fromUnit) || !validUnits.includes(toUnit)) {
    throw new Error('Đơn vị không hợp lệ');
  }

  let celsiusValue;

  // B1: Chuyển tất cả về Celsius
  switch (fromUnit) {
    case 'celsius':
      celsiusValue = value;
      break;
    case 'fahrenheit':
      celsiusValue = (value - 32) * (5 / 9);
      break;
    case 'kelvin':
      celsiusValue = value - 273.15;
      break;
  }

  // B2: Chuyển từ Celsius sang đơn vị cần
  switch (toUnit) {
    case 'celsius':
      return celsiusValue;
    case 'fahrenheit':
      return (celsiusValue * 9) / 5 + 32;
    case 'kelvin':
      return celsiusValue + 273.15;
  }
}

module.exports = {
  handleConvertUnit,
  handleConvertLength,
  handleConvertWeight,
  handleConvertTemperature,
};
