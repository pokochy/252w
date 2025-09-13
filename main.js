// main.html - task 추가 기능
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("addBtn");
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  if (addBtn && taskInput && taskList) {
    addBtn.addEventListener("click", () => {
      if (taskInput.value.trim() === "") return;

      const div = document.createElement("div");
      div.className = "flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className =
        "h-5 w-5 rounded border-slate-300 text-blue-500 focus:ring-blue-500";

      const p = document.createElement("p");
      p.className = "flex-1 text-base text-slate-800";
      p.textContent = taskInput.value;

      checkbox.addEventListener("change", () => {
        p.classList.toggle("line-through");
        p.classList.toggle("text-slate-400");
      });

      div.appendChild(checkbox);
      div.appendChild(p);
      taskList.appendChild(div);

      taskInput.value = "";
    });
  }
});
