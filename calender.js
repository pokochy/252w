// ...existing code...
document.addEventListener("DOMContentLoaded", () => {
  const prevBtn = document.getElementById("prevMonthBtn");
  const nextBtn = document.getElementById("nextMonthBtn");
  const monthLabel = document.getElementById("monthLabel");
  const daysGrid = document.getElementById("daysGrid");
  const selectedDateLabel = document.getElementById("selectedDateLabel");
  const eventsList = document.getElementById("eventsList");
  if (!prevBtn || !nextBtn || !monthLabel || !daysGrid || !selectedDateLabel || !eventsList) return;

  const events = {
    "2024-07-15": [
      { title: "팀 미팅", time: "오전 10:00" },
      { title: "클라이언트와 점심", time: "오후 1:00" },
      { title: "프로젝트 검토", time: "오후 3:00" },
    ],
  };

  function isoDate(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;
  }

  let viewDate = new Date(); // 현재 보고 있는 달 (year/month)
  let selected = new Date(); // 선택된 날짜

  function formatMonthLabel(d) {
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월`;
  }

  function renderMonth() {
    monthLabel.textContent = formatMonthLabel(viewDate);
    daysGrid.innerHTML = "";
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0).getDate();
    const startWeekday = firstDay.getDay();

    // 앞 빈칸
    for (let i = 0; i < startWeekday; i++) {
      const empty = document.createElement("div");
      daysGrid.appendChild(empty);
    }

    for (let d = 1; d <= lastDay; d++) {
      const cur = new Date(year, month, d);
      const btn = document.createElement("button");
      btn.className =
        "w-full h-10 flex items-center justify-center text-sm text-slate-700 dark:text-slate-300 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700";
      btn.textContent = d;
      btn.dataset.date = isoDate(cur);

      // 오늘 표시
      if (isoDate(cur) === isoDate(new Date())) {
        btn.classList.add("ring-2", "ring-primary");
      }

      btn.addEventListener("click", () => {
        selected = new Date(cur.getFullYear(), cur.getMonth(), cur.getDate());
        applySelection();
        renderEvents();
      });

      daysGrid.appendChild(btn);
    }

    applySelection();
  }

  function applySelection() {
    // 선택된 날짜 레이블 업데이트
    selectedDateLabel.textContent = `${selected.getFullYear()}년 ${selected.getMonth() + 1}월 ${selected.getDate()}일`;
    // 버튼 상태 업데이트
    Array.from(daysGrid.querySelectorAll("button")).forEach((b) => {
      if (b.dataset.date === isoDate(selected)) {
        b.classList.add("bg-primary", "text-white");
      } else {
        b.classList.remove("bg-primary", "text-white");
      }
    });
  }

  function renderEvents() {
    eventsList.innerHTML = "";
    const list = events[isoDate(selected)] || [];
    if (list.length === 0) {
      const li = document.createElement("li");
      li.className = "px-4 text-sm text-slate-500 dark:text-slate-400";
      li.textContent = "일정이 없습니다.";
      eventsList.appendChild(li);
      return;
    }
    list.forEach((ev) => {
      const li = document.createElement("li");
      li.className = "flex items-center gap-4 px-4 py-3 bg-white dark:bg-slate-800 rounded-lg";
      li.innerHTML = `<button class="text-slate-400 dark:text-slate-500 hover:text-primary">
        <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"></path>
        </svg>
        </button>
        <div>
          <p class="font-medium text-slate-800 dark:text-white">${ev.title}</p>
          <p class="text-sm text-slate-500 dark:text-slate-400">${ev.time}</p>
        </div>`;
      eventsList.appendChild(li);
    });
  }

  prevBtn.addEventListener("click", () => {
    viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
    renderMonth();
  });
  nextBtn.addEventListener("click", () => {
    viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
    renderMonth();
  });

  // 초기 렌더
  renderMonth();
  // 기본 선택은 오늘
  selected = new Date();
  applySelection();
  renderEvents();
});
// ...existing code...