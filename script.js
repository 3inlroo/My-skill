

document.querySelectorAll(".skill-card").forEach(card => {
  const percent = Number(card.dataset.percent);
  const circle = card.querySelector(".circle-progress");
  const percentageText = card.querySelector(".percentage");

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const value = Math.max(0, Math.min(100, percent));

  // 円を最初は0％にする
  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = circumference;

  // 数字も0％からスタート
  percentageText.textContent = "0%";

  // 画面に表示されたらアニメーション開始
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        observer.unobserve(card);

        // 円を目標の％まで伸ばす
        requestAnimationFrame(() => {
          circle.style.strokeDashoffset =
            circumference * (1 - value / 100);
        });

        // 数字を0％からカウントアップ
        const duration = 1500;
        const startTime = performance.now();

        function countUp(currentTime) {
          const progress = Math.min(
            (currentTime - startTime) / duration,
            1
          );

          const eased = 1 - Math.pow(1 - progress, 3);
          const currentValue = Math.round(value * eased);

          percentageText.textContent = `${currentValue}%`;

          if (progress < 1) {
            requestAnimationFrame(countUp);
          }
        }

        requestAnimationFrame(countUp);
      }
    });
  }, {
    threshold: 0.3
  });

  observer.observe(card);
});
