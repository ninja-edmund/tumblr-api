const API_KEY = 'hSgwo4xfxMZuwyCPDNxBqgHnxnoEydyGaXta2g3aU2SI4xTqpU'
let button_div = document.getElementById('button')
let gallery_div = document.getElementById('gallery')
let score_span = document.getElementById('score')
let words = ['fish', 'house', 'boat', 'cat', 'dog', 'shark', 'sky', 'baby']
let correct_answer = ''

let score = 0

words.forEach(function(word) {
    let new_button = document.createElement('button')
    new_button.innerHTML = word
    console.log(new_button)
    new_button.classList.add('btn')
    new_button.classList.add('btn-primary')
    new_button.onclick = function() {
        if (word == correct_answer) {
            score++
            generate()
            score_span.innerHTML = score
        } else {
            alert('WRONG !')
        }
    
    }
    button_div.append(new_button)
}
)

function generate() {
    gallery_div.innerHTML = null
    let random_number = Math.floor(Math.random() * words.length)
    correct_answer = words[random_number]

    fetch(`https://api.tumblr.com/v2/tagged?api_key=${API_KEY}&tag=${correct_answer}`)
    .then(function(response) {
        return response.json()
    })
    .then (function(result) {
        console.log(result.response)
        result.response.forEach(function(post) {
            if (post.type == 'photo') {
                let imgSrc = post.photos[0].original_size.url
                const pic = document.createElement('img')
                pic.src = imgSrc
                pic.height = 200
                gallery_div.appendChild(pic)
            }
        })
    })
}

generate()
