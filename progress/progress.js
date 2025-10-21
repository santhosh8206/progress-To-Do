document.addEventListener("DOMContentLoaded", () => {
  const mydate = document.getElementById("calender");
  const fp = flatpickr(mydate, {
    dateFormat: "d-m-Y",
    altInput: true,
    altFormat: "F j, Y",
    allowInput: true
  });

  let count = 1;
  const submit = document.getElementById("submit");
  const taskname = document.querySelector("#taskname");
  const tbody1 = document.getElementById("tbody1"); // future tasks
  const tbody2 = document.getElementById("tbody2"); // past tasks
  const tbody3=document.getElementById("tbody3");


  submit.addEventListener("click", () => {
    const task_name = taskname.value.trim();
    const calender_name = mydate.value.trim();

    if (task_name === "" || calender_name === "") {
      alert("Please enter both task name and date");
      return;
    }

    // Parse the selected date from d-m-Y to a Date object
    const [day, month, year] = calender_name.split('-');
    const selectedDate = new Date(`${year}-${month}-${day}T00:00:00`);
    const now = new Date();
    now.setHours(0, 0, 0, 0); // ignore time for comparison

    // Decide which tbody to append to
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${count++}</td>
      <td>${task_name}</td>
      <td>${calender_name}</td>
      <button class="edit btn btn-primary">completed</button>
    `;

    
    var editbtn=row.querySelector(".edit")
    
    editbtn.addEventListener("click",()=>{
        row.remove();
        tbody3.appendChild(row);
        editbtn.remove();
    });
    
    if (selectedDate < now) {

      tbody2.appendChild(row);
      editbtn.remove();
    } else{
        tbody1.appendChild(row);

    }

    taskname.value = "";
    fp.clear(); // properly clears Flatpickr date
  });
});
