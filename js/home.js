
let cross = document.querySelectorAll('.cross');
let popUp = document.querySelector('.popUp__Container');
let board = document.querySelectorAll('.board');


// buttons
let btn_inst = document.getElementById('btn_inst');
let btn_credit = document.getElementById('btn_credit');

cross[0].addEventListener('click',close);
cross[1].addEventListener('click',close);
btn_inst.addEventListener('click',show);
btn_credit.addEventListener('click',show);

function close(event)
{
  let class_name = event.target.parentNode;
  if(class_name.classList.contains('inst'))
  {
    board[0].classList.toggle('hide');
  }
  else {
    board[1].classList.toggle('hide');
  }
    popUp.classList.toggle('hide');
}
function show(event)
{
  if(event.target.id === 'btn_inst')
  {
    board[0].classList.toggle('hide');
  }
  else {
    board[1].classList.toggle('hide');
  }

  popUp.classList.toggle('hide');
}
