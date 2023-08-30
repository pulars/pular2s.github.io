const header = document.querySelector(".header"), // тут добавляем класса "open" в header при клике 
  navControlsButton = document.querySelector(".nav-toggle");
navControlsButton.addEventListener("click", () => {
  header.classList.toggle("open");
}),
  document.querySelectorAll(".navigation .link").forEach((e) => { //закрытие меню новигации 
    e.addEventListener("click", () => {
      header.classList.remove("open");
    });
  });
const currencies = [
  "1inch",
  "bitcoin",
  "ethereum",
  "binancecoin",
  "binance-usd",
  "matic-network",
];
$.get({
  url: `https://api.coingecko.com/api/v3/simple/price?ids=${currencies.toString()}&vs_currencies=usd&include_24hr_ vol=true&include_24hr_change=true`, //тут получаем данные о крипте та что чуть выше и данные о ценх за 24 часа с выполнение ajax запроса к api coingecko
  success: (e) => {
    currencies.forEach((n) => {
      const r = document.querySelector(`[data-name="${n}"]`);
      (r.querySelector(".price").innerText = `$ ${
        Math.round(1e3 * e[n].usd) / 1e3
      }`),
        (r.querySelector(".change").innerText = `${
          Math.round(100 * e[n].usd_24h_change) / 100
        } %`),
        r
          .querySelector(".change")
          .classList.add(e[n].usd_24h_change >= 0 ? "green" : "red"), //тут добавляем класс green or red для отображения цен
        (r.querySelector(".volume").innerText = `${
          Math.round((100 * e[n].usd_24h_vol) / 1e6) / 100
        }M`);
    });
  },
});
