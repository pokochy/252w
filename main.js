// .js
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("addBtn");
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  if (!addBtn || !taskInput || !taskList) return;

  function addTask() {
    const value = taskInput.value.trim();
    if (value === "") return;

    const div = document.createElement("div");
    div.className = "flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "h-5 w-5 rounded border-slate-300 text-blue-500 focus:ring-blue-500";

    const p = document.createElement("p");
    p.className = "flex-1 text-base text-slate-800 break-words";
    p.textContent = value;

    checkbox.addEventListener("change", () => {
      p.classList.toggle("line-through");
      p.classList.toggle("text-slate-400");
    });

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "ml-2 text-sm text-slate-400 hover:text-red-500";
    delBtn.textContent = "삭제";
    delBtn.addEventListener("click", () => div.remove());

    div.appendChild(checkbox);
    div.appendChild(p);
    div.appendChild(delBtn);

    taskList.appendChild(div);
    taskInput.value = "";
    taskInput.focus();
  }

  addBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTask();
    }
  });
});

