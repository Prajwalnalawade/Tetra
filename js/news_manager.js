import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore,setDoc, deleteDoc,doc, getDocs,getDoc, updateDoc, addDoc, onSnapshot, collection ,query, where, orderBy, serverTimestamp} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

const firebaseConfig = {
   
  };

 

  const app = initializeApp(firebaseConfig);
  const db=getFirestore();
  const colRef = collection(db,'news')
  const q= query(colRef,where("visible","==","false"))

  if(localStorage.getItem("uid")==null||localStorage.getItem("uid")==undefined)
  {
    window.alert("Please login first ...!")
    window.location.href="./login.html"
  }
 
  if(localStorage.getItem("super_user")!="true")
  {
    window.location.href="./404.html"
  }
    const uid=localStorage.getItem("uid")
    const docRef=doc(db,"user",uid)
    onSnapshot(docRef,(doc)=>{
      if(doc.data().publish!="true")
      {
        window.alert("Please Complete Your Profile First ...!")
        window.location.href="./profile.html"
      }
    })

  getDocs(q)
    .then((snapshot)=>{
      let news =[]
      let temp=0
      snapshot.docs.forEach((doc)=>{
        news.push({...doc.data() ,id:doc.id})
        const maindiv=document.createElement("div")
        maindiv.classList.add("news")
        const img =document.createElement("img")
        img.src=doc.data().img;
        img.classList.add("news_img");
        maindiv.append(img)
        const div0 = document.createElement("div");
        const body1=document.getElementById("body")
        div0.classList.add("news_info")
        body1.append(maindiv)
        maindiv.append(div0)
        const h2=document.createElement("h2");
        h2.innerHTML=doc.data().news
        div0.append(h2)
        const h3=document.createElement("h3");
        h3.classList.add("author")
        auther_name(doc.data().uid,h3)
        div0.append(h3)
        const i=document.createElement("i")
        i.classList.add("fa")
        i.classList.add("fa-clock-o")
        i.classList.add("clock")
        i.setAttribute('id','clock');
        let ih3=document.createElement("h3");
        ih3.innerHTML=doc.data().date
        i.append(ih3)
        div0.append(i)
        const div1=document.createElement("div")
        div1.classList.add("dropdown1")
        maindiv.append(div1)
        const ul=document.createElement("ul")
        ul.classList.add("dropbtn")
        ul.classList.add("icons")
        ul.classList.add("btn-right")
        ul.classList.add("showLeft")
        ul.setAttribute('onclick','showDropdown('+temp+')');
        div1.append(ul);
        const li1=document.createElement("li")
        const li2=document.createElement("li")
        const li3=document.createElement("li")
        ul.append(li1)
        ul.append(li2)
        ul.append(li3)
        const div2=document.createElement("div")
        div2.classList.add("dropdown-content")
        div2.setAttribute('id','myDropdown'+(temp));
        maindiv.append(div2)
        const a1=document.createElement("a")
        a1.href="./detail-page.html#"+doc.id
        a1.innerText="Open"
        const a2=document.createElement("a")
        a2.innerText="Delete"
        let temp0=doc.id
        a2.addEventListener('click',(e)=>{
           
          if (confirm('Are you sure?')) {
            delNews(doc.id)
          } else {
            
          } 
        })
        div2.append(a1)
        div2.append(a2)
        const a3=document.createElement("a")
        a3.innerText="Approve"
        const a4=document.createElement("a")
        a3.addEventListener('click',(e)=>{
            approveNews(doc.id)
            window.setTimeoutsetTimeout(function() {
              window.location.reload()            
            }, 2000);
        })
        a4.innerText="Reject"
        temp=temp+1
        a4.addEventListener('click',(e)=>{
          rejectNews(doc.id)
      })
        div2.append(a3)
        div2.append(a4)
      })
     if(news.length<=0)
     {
      document.getElementById("no_news").style.visibility="visible"
     }
     if(news.length>0)
     {
       
       document.getElementById("no_news").remove()
     }
    })

    function delNews(id)
    {
     const docRef = doc(db,'news',id)
     deleteDoc(docRef) 
     .then(()=>{
     alert("News Deleted Successfully ...!")
     window.location.reload()
    })
    }

    function approveNews(id)
    {
      const docRef = doc(db,'news',id)
      updateDoc(docRef,{
        visible:"true"
      })
      window.alert("News approved ...!")
    }

    function rejectNews(id)
    {
      const docRef=doc(db,"news",id)
      let reason=window.prompt("Enter the reason :");
      const tempRef = doc(db,'news',id)
      updateDoc(tempRef,{
        visible:"rejected",
        rejected:reason
      })
      window.alert("News rejected ...!")
    }

    function auther_name(uid,a1){
      
      const docRef=doc(db,"user",uid)
      getDoc(docRef)
      .then((doc)=>{
       a1.innerHTML="by "+doc.data().fname+" "+doc.data().lname
 
      })
     }
 