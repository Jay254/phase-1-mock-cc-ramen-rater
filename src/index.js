// write your code here
let ramen_images = document.getElementById('ramen-menu');
let ramen_details = document.getElementById('ramen-detail');
let name_h2 = document.getElementsByClassName('name');
let restaurant_h3 = document.getElementsByClassName('restaurant');
let rating_display = document.getElementById('rating-display');
let comment_display = document.getElementById('comment-display');
let my_form = document.getElementById('new-ramen');
let input_name = document.getElementById('new-name');
let input_restaurant = document.getElementById('new-restaurant');
let input_image = document.getElementById('new-image');
let input_rating = document.getElementById('new-rating');
let input_comment = document.getElementById('new-comment');

fetch('http://localhost:3000/ramens')
.then( res => res.json())
.then( (ramens) => {
    ramens.forEach( (ramen) => {

        let img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;
        ramen_images.appendChild(img);

        img.addEventListener('click', () => {

            fetch(`http://localhost:3000/ramens/${ramen.id}`)
            .then( (res) => res.json())
            .then( (details) => {

                ramen_details.innerHTML = `
                <h4>${details.name}</h4>
                <p>Restaurant: ${details.restaurant}</p>
                <img src = '${details.image}' alt = '${details.name}' >
                <p>Rating: ${details.rating}</p>
                <p>Comment: ${details.comment}</p>
                `
                
            })
            .catch( (error) => console.log(error))
        })

        my_form.addEventListener('submit', (event) => {
            event.preventDefault();

           let newRamenName = document.createElement('h2');
           let newRamenImage = document.createElement('img');
           let newRamenRestaurant = document.createElement('p');
           let newRamenRating = document.createElement('p');
           let newRamenComment = document.createElement('p')
           
           newRamenName = input_name.value;
           newRamenImage.src = input_image.value;
           newRamenRestaurant = input_restaurant.value;
           newRamenRating = `Rating: ${input_rating.value}`;
           newRamenComment = `Comment: ${input_comment.value}`;
           
           ramen_images.appendChild(newRamenImage);
           my_form.reset();

           newRamenImage.addEventListener('click', () =>{
               ramen_details.innerHTML = `
               <h4>${newRamenName.textContent}</h4>
               <p>Restaurant: ${newRamenRestaurant.textContent}</p>
               <img src = '${newRamenImage.src} alt= '${newRamenName.textContent}'>
               <p>Rating: '${newRamenRating.textContent}</p>
               <p>Comment: '${newRamenComment.textContent}'</p>
               
               `
           })
        })
    })
})