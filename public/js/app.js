const isBorrowed = () =>{
    let borrowedInput = document.getElementsByClassName('borrowed')
    borrowedInput.classList.remove('borrowed')
    console.log('clicked')
}

const mustLogIn = () =>{
    alert('You must be logged in to do that')
}