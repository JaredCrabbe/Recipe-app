const apiKey = "1";
const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const apiUrl2 = "https://www.themealdb.com/api/json/v1/1/search.php?f="
const apiUrl3 = "https://www.themealdb.com/api/json/v1/1/random.php"

const searchBox = document.querySelector(".search-bar input");
const searchBtn = document.querySelector(".search-bar button");

let recipeName = document.getElementById("recipe-name")

// console.log(searchBox.value);

//main function to fetch and display recipes from the api
async function getFood(food) {
  let response;
  let data;
  if(food.length === 1){
    response = await fetch(apiUrl2 + food);
  }else{
    response = await fetch(apiUrl + food + `&appid=${apiKey}`)
  }
   data = await response.json();
    console.log(data)
  
    // Rest of the code...
  
    const container = document.getElementById("slider");
    const divs = container.querySelectorAll("div:not([data-carousel-button])"); // select all the divs that are not buttons
    divs.forEach(div => {
      div.remove(); // remove the div from the container
    });
  
    data["meals"].forEach((meal, index) => {
      const div = document.createElement("div");

      div.classList.add(  `recipe-box-${index + 1}`);
      div.setAttribute("id", "recipe")
      div.style.backgroundImage = `url(${meal.strMealThumb})`;
      if(index === 0) div.setAttribute("data-active", "")
      container.appendChild(div);
      div.addEventListener("click", () =>{
        div.classList.toggle("clicked")
      })

      div.addEventListener("click", () => {
        const infoDiv = document.querySelectorAll(".info-div")[index];
        infoDiv.style.display = (infoDiv.style.display === "none") ? "block" : "none"; // Toggle visibility
      });
    
   
      const div2 = document.createElement("section");
      const container2 = document.querySelectorAll("#recipe")[index]; 


      div2.classList.add(`info-div`);
      div2.innerHTML = 
      `<h1 id="recipe-name">${meal.strMeal}</h1>
        <h2 id="recipe-category">${meal.strCategory}</h2>

          <div class="recipe-ingredients">
              <ul id="ingredients"></ul>
              <ul id="measurements"></ul>
          </div> 
          <p class="recipe-instructions">${meal.strInstructions}</p>
           `

           
           div2.style.display = "none"
           div2.style.overflow = "auto"
           if(index === 0) div2.setAttribute("data-active", "")
           container2.appendChild(div2);
          

       

           const ul = div2.querySelector("#ingredients");
           for(let key in meal){
              if(key.startsWith("strIngredient") && meal[key]){
                const li = document.createElement("li")
                li.textContent = meal[key]
                ul.appendChild(li)
              }
           }

           const ul2 = div2.querySelector("#measurements")
           for(let key in meal){
            if(key.startsWith("strMeasure") && meal[key]){
              const li = document.createElement("li")
              li.textContent = meal[key]
              ul2.appendChild(li)
            }
           }
  
});
}

//function and code to make the buttons cycle between the images generated from the api

const buttons = document.querySelectorAll("[data-carousel-button]")

buttons.forEach(button =>{
  button.addEventListener("click", () =>{
    const offset = button.dataset.carouselButton === "next" ? 1 : -1
    const slides = button.closest("[data-carousel]").querySelector('[data-slides]')

    const activeSlide = slides.querySelector("[data-active]")
    let newIndex = [...slides.children].indexOf(activeSlide) + offset
    if (slides.children.length === 1) return;
    if(newIndex < 0) newIndex = slides.children.length - 1
    if(newIndex >= slides.children.length) newIndex = 0
    slides.children[newIndex].dataset.active = true
    delete activeSlide.dataset.active

    // add this block of code to change the data-active option of the info-div
    const infoDivs = document.querySelectorAll(".info-div"); // select all the divs that have the info-div class
    infoDivs.forEach((infoDiv, index) => {
      if (index === newIndex) { // check if the index matches the newIndex
        infoDiv.setAttribute("data-active", ""); // set the data-active attribute without a value
      } else {
        infoDiv.removeAttribute("data-active"); // remove the data-active attribute
      }
    });
  })
})

//clears the input text so that once you have searched for a dish it resets to a clear search box
function clr(){
  searchBox.value = ""
}


//Code for the random food button, generates a random recipe in image slider
async function getRandom(){
  const response =  await fetch(apiUrl3)

  const data = await response.json()


  const container = document.getElementById("slider");
  const divs = container.querySelectorAll("div:not([data-carousel-button])"); // select all the divs that are not buttons
  divs.forEach(div => {
    div.remove(); // remove the div from the container
  });

  data["meals"].forEach((meal, index) => {
    const div = document.createElement("div");

    div.classList.add(  `recipe-box-${index + 1}`);
    div.setAttribute("id", "recipe")
    div.style.backgroundImage = `url(${meal.strMealThumb})`;
    if(index === 0) div.setAttribute("data-active", "")
    container.appendChild(div);
    div.addEventListener("click", () =>{
      div.classList.toggle("clicked")
    })

    div.addEventListener("click", () => {
      const infoDiv = document.querySelectorAll(".info-div")[index];
      infoDiv.style.display = (infoDiv.style.display === "none") ? "block" : "none"; // Toggle visibility
    });
  
 
    const div2 = document.createElement("section");
    const container2 = document.querySelectorAll("#recipe")[index]; 


    div2.classList.add(`info-div`);
    div2.innerHTML = 
    `<h1 id="recipe-name">${meal.strMeal}</h1>
      <h2 id="recipe-category">${meal.strCategory}</h2>

        <div class="recipe-ingredients">
            <ul id="ingredients"></ul>
            <ul id="measurements"></ul>
        </div> 
        <p class="recipe-instructions">${meal.strInstructions}</p>
         `

         
         div2.style.display = "none"
         div2.style.overflow = "auto"
         if(index === 0) div2.setAttribute("data-active", "")
         container2.appendChild(div2);
        

     

         const ul = div2.querySelector("#ingredients");
         for(let key in meal){
            if(key.startsWith("strIngredient") && meal[key]){
              const li = document.createElement("li")
              li.textContent = meal[key]
              ul.appendChild(li)
            }
         }

         const ul2 = div2.querySelector("#measurements")
         for(let key in meal){
          if(key.startsWith("strMeasure") && meal[key]){
            const li = document.createElement("li")
            li.textContent = meal[key]
            ul2.appendChild(li)
          }
         }

});
}
