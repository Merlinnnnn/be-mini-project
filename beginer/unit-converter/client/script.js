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