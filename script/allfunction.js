function navbar(){
    return `
    <img src="./images (1).jfif" alt="">

        <div id="sidenav">
            <a href="index.html">Home</a>
            <a href="recipe.html">Recipe_Of_Day</a>
            <a href="lateres.html">Latest_Recipe</a>
            <a href="login.html">Login_Up</a>
            <a href="signup.html">Sign_Up</a>
        </div>
    `;
}



let getData = async(url)=>{
    let res = await fetch(url);
    let data = await res.json();
    return data.meals;
}

let append1 = (data,container)=>{
    data.forEach((el)=>{
        
        let p = document.createElement('p');
        p.innerText = el.strInstructions;
        let p1 = document.createElement('p');
        p1.innerText = el.strMeal;
        let imgs = document.createElement('img');
        imgs.src = el.strMealThumb;
        let div = document.createElement('div');
        div.setAttribute('class','desr');
        div.append(p1,p);

        container.append(imgs,div);

        let video = document.getElementById("youplayer"); 
         video.href = el.strYoutube;

          for (let key in el) {
              let tr = document.createElement("div");
              tr.className = "tdata";
          
              let ingre = document.querySelector(".ingrediant");
              let measure = document.querySelector(".measure");
          
              if (key.includes("strIngredient")) {
                if (el[key].trim()) {
                  var td1 = document.createElement("p");
                  td1.innerText = el[key];
                  ingre.append(td1);
                }
              }
              if (key.includes("strMeasure")) {
                if (el[key].trim()) {
                  var td2 = document.createElement("p");
                  td2.innerText = el[key];
                  measure.append(td2);
                }
              }
            }
        
    })
}

let append2 = (data,container)=>{

    document.querySelector(".sideinfo").style.display="grid";
    document.querySelector("#imgstest").innerHTML=null;
         document.querySelector("#imgdteestp").innerHTML=null;
    
        data.forEach((el)=>{
            
            
            let imgs =  document.createElement("img");
            let p = document.createElement('p');
            let p1 = document.createElement('p');
            let p2 = document.createElement('p');

            imgs.src = el.strMealThumb;
            p.innerText =el.strMeal;
            p1.innerHTML ="<b>Instructions</b> <Br>"+ el.strInstructions;
         
              p2.innerHTML= "<b>Ingradients </b> <Br>" + el.strIngredient1 +", " +el.strIngredient2 +", " +el.strIngredient3 +", " +el.strIngredient4 +", " +el.strIngredient5
              +", "+el.strIngredient6+", "+el.strIngredient7+", "+el.strIngredient8+", "+el.strIngredient9+", "+el.strIngredient10+", "+el.strIngredient11+", "+el.strIngredient12+", "+el.strIngredient13
             +", "+ el.strIngredient14+", "+el.strIngredient15+", "+el.strIngredient16+", "+el.strIngredient17+", "+el.strIngredient18+", "+el.strIngredient19+", "+el.strIngredient20;

            
            let div = document.createElement('div');
            div.append(imgs,p);


            div.onclick = () =>{
                document.querySelector("#imgstest").append(imgs);
                document.querySelector("#imgdteestp").append(p,p2,p1);
                document.querySelector('.hide').style.display="none";
                
                
            }
            
            container.append(div);

            
            
        })
}

let contain = document.querySelector(".info");

let id;
const debounce =async () =>{

    if(id){
        clearTimeout(id);
    }

    id = setTimeout(function(){
        // getData();
        const query = document.getElementById("inputake").value;
let url =`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

        getData(url).then((res)=>{
        append2(res,contain)
      })
        document.querySelector('.hide').style.display="block";

    },1000)

}


let register = async (e) => {
    e.preventDefault();

    let form_data = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      username: document.getElementById("username").value,
      mobile: document.getElementById("mobile").value,
      description: document.getElementById("description").value,
    };

    form_data = JSON.stringify(form_data);

    let res = await fetch(
      "https://masai-api-mocker.herokuapp.com/auth/register",
      {
        method: "POST",
        body: form_data,
        // mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let data = await res.json();
    console.log(data);
    alert(data.message)
    if(!data.error){
      window.location.href="login.html";
    }
  };


  let getUserDetail = async (username, token) => {
    console.log("here");
  let res = await fetch(
    `https://masai-api-mocker.herokuapp.com/user/${username}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  let data = await res.json();
    localStorage.setItem("Login",JSON.stringify (data));

    alert("Log-In Successful..");
    window.location.href="index.html";

    console.log("user data: ", data);
};

   let login = async (e) => {
       e.preventDefault();

  let user_data = {
    username: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  user_data = JSON.stringify(user_data);
  console.log(user_data)

  try {
  let res = await fetch("https://masai-api-mocker.herokuapp.com/auth/login", {
    method: "POST",
    body: user_data,
  //   mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let data = await res.json();

  let username = document.getElementById('email').value;
  getUserDetail(username, data.token);

  console.log(data);      
  } catch (error) {
    console.log(error);
  }
};

let tokendata = async (username, token) => {
    console.log("here");
  let res = await fetch(
    `https://masai-api-mocker.herokuapp.com/user/${username}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  let data = await res.json();
  localStorage.setItem("Login",JSON.stringify (data))
  console.log("user data: ", data);

};

const tokenappend=()=>{
    let UserData = JSON.parse(localStorage.getItem("Login")) || [];
    console.log(UserData);
    if(UserData.name!==undefined){

      document.getElementById("Name").innerText=`Name: ${UserData.name}`
      document.getElementById("UserEmail").innerText=`Email: ${UserData.email}`
      document.getElementById("UserMobile").innerText=`Mobile: ${UserData.mobile}`
    }else{
      document.getElementById("User-Details").innerHTML=`<a href="./login.html" style="text-decoration: none;"><h1 id="not-login">Please Loged In</h1></a>`
    }
  }

  

export {navbar,getData,append1,append2,debounce,register,getUserDetail,login,tokendata,tokenappend};
