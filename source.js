
let food = {
    
    fetchFood: function(){

        const foods = document.getElementById('inp').value;

        fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${foods}&app_id=a53c5d9c&app_key=ebeb47acebab880b5144fc3fb9ff8133%09`
        ).then((response) => response.json()
    ).then((data) => this.displayFood(data))
    },
    displayFood: function (data){
        document.getElementById('inp').value = ''; // Clear input value
        document.getElementById('f-name').innerHTML = ''; // Clear container
        data.hits.forEach((hit, index) => {
            let name = hit.recipe.label;
            const image = hit.recipe.image;
            const ingredient = hit.recipe.ingredientLines;
            const healthL =  hit.recipe.healthLabels;
            const url = hit.recipe.url
            const modalId = `modal-${index}`;

            document.getElementById('f-name').innerHTML += `

            <div class = "col-lg-4  p-6 px-md-4 col-md-6" >
        <div class="card row-class shadow-lg my-3" style="width: 30rem; max-height: 60rem;">
    <img src=${image} class="card-img-top revealing-image" id="cards" alt="...">
    
    <div class="card-body card__content" >
        <h5 class="card-title">${name}</h5>
        <p class="card-text ">${ingredient}</p>
<!-- Button to trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${modalId}"  style="background-color:orange;">
  More Information
</button>

<!-- Modal -->
<div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}Label" aria-hidden="true" style="background-color: rgb(0, 0, 0, 0.4); backdrop-filter: blur(10px);">
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content" style="background-color: rgb(0, 0, 0, 0.4); backdrop-filter: blur(10px); color:white;">
      <div class="modal-header">
        <h5 class="modal-title" id="${modalId}Label" style="color:orange;">${name}</h5>
        <button type="button" class="btn-close bg-light" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!-- Scrollable content here -->
               <h2 style="color:orange;">Ingredients:</h2>
              <ul>
              ${ingredient.map((ingre) => `<li>${ingre}</li>`).join('')}
            </ul>
          <h2  style="color:orange;">Health Labels:</h2>
               <ul>
              ${healthL.map((label) => `<li>${label}</li>`).join('')}
            </ul>


   
          <h2  style="color:orange;">Cooking Instruction:</h2>
                    <a class="btn btn-sm"href="${url}" style="background-color: white;">Instructions</a>

          
        <!-- Add more content here -->
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

    </div>
    </div>
    </div>




    

    
            `;


          });



        }

          
  }
  

// https://api.spoonacular.com/recipes/complexSearch?apiKey=afc32239b4204423b43b83002f10620f&query=soup
document.getElementById('subut').addEventListener('click', () => food.fetchFood());

window.addEventListener('scroll', () => {
    document.body.style.setProperty('--scroll',window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
  }, false);




  var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};
  


const scrollContainer = document.querySelector('.scroll-container');
const scrollContent = document.querySelector('.scroll-content');
const images = scrollContent.querySelectorAll('img');
const nextPage = document.querySelector('.next-page');

scrollContainer.addEventListener('scroll', () => {
  const scrollPosition = scrollContainer.scrollLeft;
  const scrollWidth = scrollContainer.scrollWidth;
  const contentWidth = scrollContent.offsetWidth;

  // Animate images on scroll
  images.forEach((image, index) => {
    const imagePosition = image.offsetLeft;
    if (scrollPosition >= imagePosition - 100 && scrollPosition <= imagePosition + 100) {
      image.classList.add('animate');
    } else {
      image.classList.remove('animate');
    }
  });

  // Advance to next page when reaching end
  if (scrollPosition + scrollContainer.offsetWidth >= contentWidth) {
    nextPage.style.display = 'block';
    // Add smooth transition to next page
    setTimeout(() => {
      scrollContainer.style.display = 'none';
      nextPage.style.display = 'block';
    }, 500);
  }
});


var myModal = new bootstrap.Modal(document.getElementById('${modalId}'))





