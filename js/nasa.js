let apiKey = "dUI7WyYnR8KeyIdfjSnfDqXWjEgZ5epaGnMbEy0t";

const getAPOD = async () => {
  let date = $("#date-picker").datepicker("getDate");
  let year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate();
  
  // format mm and dd
  month = month >= 10 ? month : `0${month}`;
  day = day >= 10 ? day : `0${date.getDate()}`;

  // API to nasa
  date = `${year}-${month}-${day}`;
  let res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`);
  let json = await res.json();
  console.log(json);
}