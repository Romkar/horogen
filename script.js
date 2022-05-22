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

document.querySelectorAll("input, textarea").forEach((item) => {
  item.addEventListener("change", (event) => {
    //-----------------------
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
    }
    //-----------------------
    for (var i = 1; i < 13; i++) {
      if (event.target.id == "horo-in-" + i) {
        document.getElementById("horo-out-" + i).innerText = event.target.value;
      }
    }
    //-----------------------
  }); // end addEventListener
}); // end querySelectorAll forEach

//------------------------------------------------------------------
document.querySelectorAll("div, input").forEach((item) => {
  item.addEventListener("input", (event) => {
    for (var i = 1; i < 13; i++) {
      if (event.target.id == "horo-out-" + i) {
        horo_input = document.getElementById("horo-in-" + i);
        horo_input.value = event.target.innerText;
        horo_input.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }
    //-----------------------
    for (var i = 1; i < 13; i++) {
      if (event.target.id == "font-size-" + i) {
        document.getElementById("horo-out-" + i).style.fontSize =
          event.target.value + "pt";
        document.getElementById("font-size-val-" + i).innerText =
          event.target.value;
      }
    }
  }); // end addEventListener
}); // end querySelectorAll forEach
//------------------------------------------------------------------
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
  i = 0;
  file_date = moment(document.getElementById("get_date").value).format("L");

  document.querySelectorAll(".box").forEach((item) => {
    domtoimage.toJpeg(item, { quality: 0.95 }).then(function (dataUrl) {
      var link = document.createElement("a");
      link.download = signs[i] + "_" + file_date + ".jpeg";
      link.href = dataUrl;
      link.click();
      i++;
    });
  });
});