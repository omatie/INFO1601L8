function executeScripts(){
  let script = document.querySelector('script').innerText;
  try{
    eval(script);
  }catch(e){
    console.error(e);
  }   
}


async function navigate(title, url){
  document.title = title;
  let content = document.querySelector('#content');
  if(url === null){
    content.innerHTML = "";
  }else{
    let response = await fetch(url);//fetch the page eg battery.html
    content.innerHTML = await response.text();
    executeScripts();
  }
}

//event handler
function handleClick(event){
  event.preventDefault();
  event.stopPropagation();
  let a = event.target;//get the anchor tag element
  let text = a.text;//get text content of the anchor element
  let url = a.href;//get the url of the anchor element
  history.pushState({title:text, url: url}, null, a.href);//pass the url and text to the history
  navigate(a.text, a.href);//then navigate to page
}

const menu = document.querySelector('#menu');
menu.addEventListener('click', handleClick, false);

function handleBack(event){
  //if no links were clicked pushState() is never called
  //as pushState() is never called there will be no data in event.state
  if(event.state == null){
    navigate('Web APIs', null);
  }else{
    //links were clicked before so we can get the text and url passed from handleClick()
    navigate(event.state.title, event.state.url);  
  }
}

window.addEventListener('popstate', handleBack);//attach event handler to back navigation