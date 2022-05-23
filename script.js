// чтение из локального хранилища сразк после загрузки страницы
document.addEventListener("DOMContentLoaded", function(event) { 
  for (var i = 1; i < 13; i++) {
	document.getElementById("horo-out-" + i).innerText = localStorage.getItem("horo-out-" + i);
	document.getElementById("horo-in-" + i).value = localStorage.getItem("horo-out-" + i);
	
	font_size = document.getElementById("font-size-" + i);
	font_size.value = localStorage.getItem("font-size-" + i);
	font_size.dispatchEvent(new Event("input", { bubbles: true }));
  }
  
	getdate = document.getElementById("get_date");
	getdate.value = localStorage.getItem("get_date");
	getdate.dispatchEvent(new Event("change", { bubbles: true }));
});

//===============================================
// растягивание textarea по размеру текста при вводе
const tx = document.getElementsByTagName("textarea");
for (let i = 0; i < tx.length; i++) {
  tx[i].setAttribute(
    "style",
    "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
  );
  tx[i].addEventListener("input", OnInput, false);
}

function OnInput() {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
}
//===============================================
// обработчик событий на изменения в элементах ввода
document.querySelectorAll("input, textarea").forEach((item) => {
  item.addEventListener("change", (event) => {
  //-----------------------
  // ввод общей даты
    if (event.target.id == "get_date") {
      hor_date = (() => {
        get_date = document.getElementById("get_date").value;
        moment.updateLocale("ru", {
          weekdays: [
            "Воскресенье",
            "Понедельник",
            "Вторник",
            "Среда",
            "Четверг",
            "Пятница",
            "Суббота"
          ]
        });
        return moment(get_date).lang("ru").format("dddd, LL");
      })();

      document.getElementById("date").innerHTML = hor_date;

      document.querySelectorAll("[id=ht2-date]").forEach((item) => {
        item.innerHTML = hor_date;
      });
	  
	  localStorage.setItem("get_date", get_date);
    }
    //-----------------------
	// ввод текстов гороскопов на вкладке "содержимое"
    for (var i = 1; i < 13; i++) {
      if (event.target.id == "horo-in-" + i) {
        document.getElementById("horo-out-" + i).innerText = event.target.value;
		
		    localStorage.setItem("horo-out-" + i, event.target.value);
      }
    }
    //-----------------------
  }); // end addEventListener
}); // end querySelectorAll forEach

//------------------------------------------------------------------
// обработчик событий на ввод
document.querySelectorAll("div, input").forEach((item) => {
  item.addEventListener("input", (event) => {
	// ввод текста в карточках на вкладке "результат"
    for (var i = 1; i < 13; i++) {
      if (event.target.id == "horo-out-" + i) {
        horo_input = document.getElementById("horo-in-" + i);
        horo_input.value = event.target.innerText;
        horo_input.dispatchEvent(new Event("input", { bubbles: true })); //для увеличения области textarea
		
		localStorage.setItem("horo-out-" + i, event.target.innerText);
      }
    }
    //-----------------------
	// изменение размера шрифта для карточек
    for (var i = 1; i < 13; i++) {
      if (event.target.id == "font-size-" + i) {
        document.getElementById("horo-out-" + i).style.fontSize = event.target.value + "pt";
        document.getElementById("font-size-val-" + i).innerText = event.target.value;
		
		localStorage.setItem("font-size-" + i, event.target.value);
      }
    }
  }); // end addEventListener
}); // end querySelectorAll forEach
//------------------------------------------------------------------
// выгрузка всех карточек в файлы
document.getElementById("download").addEventListener("click", (event) => {
  const signs = [
    "Овны",
    "Тельцы",
    "Близнецы",
    "Раки",
    "Львы",
    "Девы",
    "Весы",
    "Скорпионы",
    "Стрельцы",
    "Козероги",
    "Водолеи",
    "Рыбы"
  ];
  
  file_date = moment(document.getElementById("get_date").value).format("L");

  async function download_images() {
    for (var i = 1; i < 13; i++) {
      item = document.getElementById("box"+i);
      await domtoimage.toJpeg(item, { quality: 0.95 }).then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = i + "_" + signs[i-1] + "_" + file_date + ".jpeg";
        link.href = dataUrl;
        link.click();
      });
    }
  }

  download_images();
  
  
});// end addEventListener click
//------------------------------------------------------------------
// очистка всех полей
document.getElementById("delete").addEventListener("click", (event) => {
	let isDel = confirm("Точно все удалить?");
	if(isDel){
	  for (var i = 1; i < 13; i++) {
      document.getElementById("horo-out-" + i).innerText = "";
      localStorage.setItem("horo-out-" + i, "");
      document.getElementById("horo-in-" + i).value = "";
      localStorage.setItem("horo-out-" + i, "");
      
      font_size = document.getElementById("font-size-" + i);
	  font_size.value = 30;
      localStorage.setItem("font-size-" + i, 30);
      font_size.dispatchEvent(new Event("input", { bubbles: true }));
	  }
	  
		getdate = document.getElementById("get_date");
		getdate.value = "";
		localStorage.setItem("get_date", "");
		getdate.dispatchEvent(new Event("change", { bubbles: true }));
	}
});// end addEventListener click