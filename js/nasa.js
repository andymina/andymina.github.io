let apiKey = "dUI7WyYnR8KeyIdfjSnfDqXWjEgZ5epaGnMbEy0t";

const getAPOD = async (date) => {
  let year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate();
  
  // format mm and dd
  month = month >= 10 ? month : `0${month}`;
  day = day >= 10 ? day : `0${date.getDate()}`;

  // API to nasa
  formatted = `${year}-${month}-${day}`;
  let res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${formatted}`);
  let json = await res.json();

  // set data
  $("#apod-img").attr("src", json.url);

  $("#apod-title").html(json.title);
  $("#apod-caption").html(json.explanation);

  if (json.copyright !== undefined)
    $("#apod-cr").html(json.copyright);
}

const getRover = async () => {

}