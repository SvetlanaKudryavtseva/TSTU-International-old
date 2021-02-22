console.log('1test');
//-let inputIn = document.querySelector('.input-in'); //-input
//-let buttonGo = document.querySelector('.button-go'); //-button

//-buttonGo.onclick = function() {
//- кнопка будет нажата
//-    console.log('работает');
//-}
document.querySelector('.js-menuGlo-button').addEventListener('click', (e) => {
    if (e.target.getAttribute('class') === 'menuGlo__link')
        console.log('2test');
    alert('click ' + e.target.innerText)
}, console.log('false'))