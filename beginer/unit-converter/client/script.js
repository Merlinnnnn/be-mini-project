const tabs = document.querySelectorAll('.tab-button');
const contents = document.querySelectorAll('.content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Xóa class active khỏi tất cả tab và content
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active-content'));

    // Gắn lại class active cho tab và content được chọn
    tab.classList.add('active');
    document.getElementById(tab.dataset.target).classList.add('active-content');
  });
});

//----------------Quy đổi length--------------------------//
document.addEventListener("DOMContentLoaded", () => {
  const lengthTab = document.getElementById("length");
  const input = lengthTab.querySelector("input");
  const selects = lengthTab.querySelectorAll("select");
  const button = lengthTab.querySelector("button");

  // Tạo phần hiển thị kết quả
  const resultBox = document.createElement("p");
  resultBox.style.marginTop = "15px";
  resultBox.style.fontWeight = "bold";
  resultBox.style.color = "#5e17eb";
  lengthTab.appendChild(resultBox);

  button.addEventListener("click", async () => {
    const value = input.value.trim();
    const from = selects[0].value;
    const to = selects[1].value;

    if (!value) {
      resultBox.textContent = "⚠️ Vui lòng nhập giá trị cần quy đổi!";
      resultBox.style.color = "red";
      return;
    }

    try {
      // Gọi API GET
      const response = await fetch(
        `http://localhost:5000/api/convert/length?value=${value}&from=${from}&to=${to}`
      );

      // Kiểm tra lỗi từ server
      if (!response.ok) {
        const err = await response.json();
        resultBox.textContent = `❌ Lỗi: ${err.error}`;
        resultBox.style.color = "red";
        return;
      }

      // Nhận kết quả
      const data = await response.json();
      resultBox.textContent = `✅ ${value} ${from} = ${data.value} ${to}`;
      resultBox.style.color = "#5e17eb";
    } catch (error) {
      console.error(error);
      resultBox.textContent = "❌ Không thể kết nối đến server!";
      resultBox.style.color = "red";
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const weightTab = document.getElementById("weight");
  const input = weightTab.querySelector('input');
  const selects = weightTab.querySelectorAll('select');
  const button = weightTab.querySelector('button');

  const result = document.createElement('p');
  result.style.marginTop = "15px";
  result.style.fontWeight = "bold";
  result.style.color = "#5e17eb";
  weightTab.appendChild(result);


  button.addEventListener('click', async () => {
    const value = input.value.trim();
    const unitFrom = selects[0].value;
    const unitTo = selects[1].value;
    if (!value) {
      result.textContent = "Bạn cần nhập giá trị quy đổi";
      result.style.color = 'red';
    }
    try {
      // Gọi API GET
      const response = await fetch(
        `http://localhost:5000/api/convert/weight?value=${value}&from=${unitFrom}&to=${unitTo}`
      );
      console.log(response);
      // Kiểm tra lỗi từ server
      if (!response.ok) {
        const err = await response.json();
        result.textContent = `❌ Lỗi: ${err.error}`;
        result.style.color = "red";
        return;
      }

      // Nhận kết quả
      const data = await response.json();
      result.textContent = `✅ ${value} ${from} = ${data.value} ${to}`;
      result.style.color = "#5e17eb";
    } catch (error) {
      console.error(error);
      result.textContent = "❌ Không thể kết nối đến server!";
      result.style.color = "red";
    }

  })

});

document.addEventListener("DOMContentLoaded", () => {
  const temp = document.getElementById("temperature");
  const input = temp.querySelector('input');
  const selects = temp.querySelectorAll('select');
  const button = temp.querySelector('button');

  const result = document.createElement('p');
  result.style.marginTop = "15px";
  result.style.fontWeight = "bold";
  result.style.color = "#5e17eb";
  weightTab.appendChild(result);
  button.addEventListener('click', async () => {
    const value = input.value.trim();
    const from = selects[0].value;
    const to = selects[1].value;

    try {
      // Gọi API GET
      const response = await fetch(
        `http://localhost:5000/api/convert/temperature?value=${value}&from=${from}&to=${to}`
      );
      console.log(response);

      // Kiểm tra lỗi từ server
      if (!response.ok) {
        const err = await response.json();
        result.textContent = `❌ Lỗi: ${err.error}`;
        result.style.color = "red";
        return;
      }

      // Nhận kết quả
      const data = await response.json();
      result.textContent = `✅ ${value} ${from} = ${data.value} ${to}`;
      result.style.color = "#5e17eb";
    } catch (error) {
      console.error(error);
      result.textContent = "❌ Không thể kết nối đến server!";
      result.style.color = "red";
    }
  })

})