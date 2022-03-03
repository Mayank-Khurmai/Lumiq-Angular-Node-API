function openCity(evt, cityName)
{
  let tabcontent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontent.length; i++)
  {
    tabcontent[i].style.display = "none";
  }

  let tablinks = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tablinks.length; i++)
  {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();


login = ()=>{
  let email = document.querySelector('input[name="login-field-1"]').value;
  let password = document.querySelector('input[name="login-field-2"]').value;
}

register = ()=>{
  let f_name = document.querySelector('input[name="register-field-1"]').value;
  let email = document.querySelector('input[name="register-field-2"]').value;
  let mobile = document.querySelector('input[name="register-field-3"]').value;
  let address = document.querySelector('input[name="register-field-4"]').value;
  let password = document.querySelector('input[name="register-field-5"]').value;
  let c_password = document.querySelector('input[name="register-field-6"]').value;
  let gender;
  if(document.querySelector('input[name="register-field-7"]').checked)
    gender = "Male";
  else
    gender = "Female";


  alert(gender);
}