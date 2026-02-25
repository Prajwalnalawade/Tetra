import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore,setDoc, deleteDoc,doc, getDocs,getDoc, updateDoc, addDoc, onSnapshot, collection ,query, where, orderBy, serverTimestamp} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

const firebaseConfig = {
   
  };

 

  const app = initializeApp(firebaseConfig);
  const db=getFirestore();
  const colRef = collection(db,'news')

  const q= query(colRef,orderBy("time","asc"))
   getDocs(q)
    .then((snapshot)=>{
      let news =[] 
      snapshot.docs.forEach((doc)=>{
       if(doc.data().visible=="true")
       {
        news.push({...doc.data() ,id:doc.id})
       }  
    })
   
      const docRef=doc(db,"user",news[news.length-1].uid)
       getDoc(docRef)
       .then((doc)=>{
        const user=doc.data()
         document.getElementById("topimg").src = user.profileimg;
         const link= document.getElementById("achtop");
         link.href="./detail-page.html#"+news[news.length-1].id,"_blank";
       })
         
        document.getElementById("topheading").innerHTML=news[(news.length)-1].news
        if(news[(news.length)-1].news.length>110)
        {
         document.getElementById("topheading").innerHTML=news[(news.length)-1].news.substring(0,110)+"....";
        }
      let j=1
      for(let i=news.length-2;i>=news.length-10;i--)
      {
       document.getElementById("news"+j).innerHTML=news[i].news;
       if(news[i].news.length>75)
       {
        document.getElementById("news"+j).innerHTML=news[i].news.substring(0, 65)+"...."; 
       }
       document.getElementById("news_img"+j).src=news[i].img
       document.getElementById("clock"+j).innerHTML=" 0"+(news[i].read)+" minutes read"
       document.getElementById("calender"+j).innerHTML="  "+(news[i].date)
       document.getElementById("news"+j).href="./detail-page.html#"+news[i].id,"_blank";
       j=j+1
      }
    })
    .catch(err=>{
      console.log(err.message)
    })

    const x= query(colRef,orderBy("time","desc"))
 getDocs(x)
   .then((snapshot)=>{
    let news =[]
    snapshot.docs.forEach((doc)=>{
    if(doc.data().visible=="true")
    {
     news.push({...doc.data()}) 
    const div0 = document.createElement("div");
    const main_div=document.getElementById("latest_news");
    div0.classList.add("latest-news-item")
    main_div.append(div0)
    const div1=document.createElement("div");
    div1.classList.add("bg-light");
    div1.classList.add("rounded");
    div0.append(div1);
    const div2=document.createElement("div");
    div2.classList.add("rounded-top");
    div2.classList.add("overflow-hidden");
    div1.append(div2);
    const img=document.createElement("img");
    img.classList.add("img-zoomin");
    img.classList.add("img-fluid");
    img.classList.add("rounded-top");
    img.style.height="171.89px"
    img.style.width="305.35px"
    img.src=doc.data().img;
    div2.append(img);
    const div3=document.createElement("div");
    div3.classList.add("d-flex");
    div3.classList.add("flex-column");
    div3.classList.add("p-4");
    div1.append(div3);
    const a=document.createElement("a");
    a.classList.add("h4")
    a.innerHTML=doc.data().news
    if(doc.data().news.length>75)
    {
     a.innerHTML=doc.data().news.substring(0, 75)+"...."
    }
     a.href="./detail-page.html#"+doc.id
    div3.append(a);
    const div4=document.createElement("div");
    div4.classList.add("d-flex");
    div4.classList.add("justify-content-between");
    div3.append(div4);
    const a1=document.createElement("a");
    a1.classList.add("small");
    a1.classList.add("text-body");
    a1.classList.add("link-hover");
    auther_name(doc.data().uid,a1)
    a1.href="../index.html"
    div4.append(a1);
    const small=document.createElement("small");
    small.classList.add("text-body");
    small.classList.add("d-block");    
    div4.append(small);
    const i=document.createElement("i");
    i.classList.add("fas");
    i.classList.add("fa-calendar-alt");
    i.classList.add("me-1");
    small.append(i)
    small.innerHTML=doc.data().date 
   }
})

     function auther_name(uid,a1){
     const docRef=doc(db,"user",news[news.length-1].uid)
     getDoc(docRef)
     .then((doc)=>{
      //const user=doc.data().fname
      a1.innerHTML="by "+doc.data().fname+" "+doc.data().lname

     })
    }

     $(".latest-news-carousel").owlCarousel({
      autoplay: true,
      smartSpeed: 2000,
      center: false,
      dots: true,
      loop: true,
      margin: 25,
      nav : true,
      navText : [
          '<i class="bi bi-arrow-left"></i>',
          '<i class="bi bi-arrow-right"></i>'
      ],
      responsiveClass: true,
      responsive: {
          0:{
              items:1
          },
          576:{
              items:1
          },
          768:{
              items:2
          },
          992:{
              items:3
          },
          1200:{
              items:4
          }
      }
  });
   })
   .catch(err=>{
     console.log(err.message)
   })
   

   

    


  // What's New carousel
  $(".whats-carousel").owlCarousel({
      autoplay: true,
      smartSpeed: 2000,
      center: false,
      dots: true,
      loop: true,
      margin: 25,
      nav : true,
      navText : [
          '<i class="bi bi-arrow-left"></i>',
          '<i class="bi bi-arrow-right"></i>'
      ],
      responsiveClass: true,
      responsive: {
          0:{
              items:1
          },
          576:{
              items:1
          },
          768:{
              items:2
          },
          992:{
              items:2
          },
          1200:{
              items:2
          }
      }
  });

 
  
  
  // const div=document.getElementById("main_div").addEventListener(onload,function foo()
  // {
  //   const p = document.getElementById("sub_div");
  //   const clone = p.cloneNode(true);
  //   div.append(clone);
  //   clone.querySelector(".img").src="./img/news-8.jpg"
  // })
  
 

  
 document.getElementById("signout").addEventListener("click",signoutUser);
 function signoutUser()
  {
    localStorage.clear()
    window.location.href="./index.html"
  }
 

if(localStorage.getItem("profile_img")==undefined||localStorage.getItem("profile_img")==null)
{
if(localStorage["gender"]=="Male")
   {
    document.getElementById("profile").src = "./img/boy.png";
   }
if(localStorage["gender"]=="Female")
   {
    document.getElementById("profile").src = "./img/girl.jpg";
   }
}
else
{
    document.getElementById("profile").src=localStorage.getItem("profile_img");
}

if(localStorage.getItem("firstname")==null)
{
        document.getElementById("sibtn").style.visibility = "visible";
        document.getElementById("profile").style.visibility = "hidden";
        document.getElementById("profilelink").style.visibility = "hidden";
        document.getElementById("login_vb").style.visibility = "visible";
}
if(localStorage.getItem("firstname")!=null)
{
    document.getElementById("login_vb").style.visibility = "hidden";
    document.getElementById("sibtn").style.visibility = "hidden";
    document.getElementById("profile").style.visibility = "visible";
    document.getElementById("profilelink").innerHTML=localStorage.getItem("firstname");
    document.getElementById("profilelink").style.visibility = "visible";
}

const subRef = collection(db,'subscriber')
document.getElementById("subscribe").addEventListener("click", function() {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(document.getElementById("submail").value)) {
          setDoc(doc(db, "subscriber", document.getElementById("submail").value), {
            email:document.getElementById("submail").value
          });
        document.getElementById("submail").value=""
        localStorage.setItem("subscriber","true")
        alert("Subscirbed successfully ...!")
        window.location.reload()
    } else {
        alert("Invalid email address");
    }
});
document.getElementById("subscribe1").addEventListener("click", function() {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(document.getElementById("submail1").value)) {
          setDoc(doc(db, "subscriber", document.getElementById("submail1").value), {
            email:document.getElementById("submail1").value
          });
        document.getElementById("submail1").value=""
        localStorage.setItem("subscriber","true")
        alert("Subscirbed successfully ...!")
        window.location.reload()
    } else {
        alert("Invalid email address");
    }
});


if(document.getElementById("profiledrop")!=undefined||document.getElementById("profiledrop")!=null)
{
    if(localStorage.getItem("super_user")=="true")
    {
        const a=document.createElement("a")
        a.classList.add("dropdown-item")
        a.href="./news_manager.html"
        a.innerText="Unverified News"
        document.getElementById("profiledrop").append(a)
        const a1=document.createElement("a")
        a1.classList.add("dropdown-item")
        a1.innerText="Remove a news"
        document.getElementById("profiledrop").append(a1)
        a1.addEventListener('click',(e)=>{
            delNews()            
        })
    }
}

function delNews(){
    delNews=window.prompt("Enter the News Id:")
    const docRef = doc(db,'news',delNews)
     deleteDoc(docRef) 
     .then(()=>{
     alert("News Deleted Successfully ...!")
     window.location.reload()
    })
}