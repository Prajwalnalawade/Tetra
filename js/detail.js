import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore,setDoc, deleteDoc,doc, getDocs,getDoc, updateDoc, addDoc, onSnapshot, collection ,query, where, orderBy, serverTimestamp} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const firebaseConfig = {
  
  };

if(window.location=="http://127.0.0.1:5500/detail-page.html"||window.location=="http://127.0.0.1:5500/pro/detail-page.html#")
{
  window.location="./index.html"
}
  const app = initializeApp(firebaseConfig);
  const db=getFirestore();
  const colRef = collection(db,'news')
 
  const url=window.location.href.substring(window.location.href.indexOf("#") + 1);
  //views()
  const docRef=doc(db,"news",url)
       getDoc(docRef)
       .then((doc)=>{
        if(doc.data()==null||doc.data()==undefined)
        {
          window.location.href="./404.html"
        }
        if(localStorage.getItem("super_user")!="true")
        { 
         if(doc.data().visible=="false")
         {
           window.location.href="./404.html"
         }
        }
        document.getElementById("news_title").innerHTML=doc.data().news
        document.getElementById("category").innerHTML=doc.data().category
        document.getElementById("category1").innerHTML=doc.data().category
        document.getElementById("lowcategory").innerHTML=doc.data().category
        document.getElementById("category1").href="./news.html#category#"+doc.data().category
        document.getElementById("news_img").src=doc.data().img
        document.getElementById("full_news").innerHTML=doc.data().full_news
        document.getElementById("read").innerHTML=" 0"+doc.data().read+" minute read"
        document.getElementById("views").innerHTML=" "+doc.data().view+" Views"
        document.getElementById("share").innerHTML=" "+doc.data().share+" Share"  
        auther(doc.data().uid)      
        let tp=document.getElementById("full_news")
        let tp1=tp.innerText.replace(/endl#/g,"<br>")
        document.getElementById("full_news").innerHTML=tp1
       })

           
       let shareData = {
        title: 'Tetra News',
        text: 'Get the latest news',
        url: window.location.href,
      }

      const btn = document.getElementById("sharebtn");
      

      btn.addEventListener('click', () => {
        navigator.share(shareData)
          .then(() =>
             shareurl()
          )
          .catch((e) =>
            window.alert('Error: ' + e)
          )
      });



      function viewscounter(){
        if((localStorage.getItem("view "+url))==undefined)
        {
        localStorage.setItem("view "+url,"1")
        const doc_Ref = doc(db,'news',url)
        updateDoc(doc_Ref,{
          view:Number(document.getElementById("views").innerHTML.replace(" Views",""))+1
        })
      }
       }

       window.setTimeout(viewscounter, 3000);




function shareurl()
{
  const url=window.location.href.substring(window.location.href.indexOf("#") + 1);
  if(localStorage.getItem("share "+url)==undefined)
  {
    localStorage.setItem(("share "+url),"1")
    
    const doc_Ref = doc(db,'news',url)
        updateDoc(doc_Ref,{
          share:Number(document.getElementById("share").innerHTML.replace(" Share",""))+1
        })
  }
}

function auther(uid){
 const autherRef=doc(db,"user",uid)
        getDoc(autherRef)
        .then((doc)=>{
          document.getElementById("author_img").src=doc.data().profileimg
          document.getElementById("author_name").innerText=doc.data().fname+" "+doc.data().lname
          document.getElementById("author_info").innerText=doc.data().about_user
        })
      }

      // const subRef = collection(db,'subscriber')
      // document.getElementById("subscribe").addEventListener("click", function() {
      //     var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      //     if (emailRegex.test(document.getElementById("submail").value)) {
      //           setDoc(doc(db, "subscriber", document.getElementById("submail").value), {
      //             email:document.getElementById("submail").value
      //           });
      //         document.getElementById("submail").value=""
      //         localStorage.setItem("subscriber","true")
      //         alert("Subscirbed successfully ...!")
      //         window.location.reload()
      //     } else {
      //         alert("Invalid email address");
      //     }
      // });
      // document.getElementById("subscribe1").addEventListener("click", function() {
      //     var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      //     if (emailRegex.test(document.getElementById("submail1").value)) {
      //           setDoc(doc(db, "subscriber", document.getElementById("submail1").value), {
      //             email:document.getElementById("submail1").value
      //           });
      //         document.getElementById("submail1").value=""
      //         localStorage.setItem("subscriber","true")
      //         alert("Subscirbed successfully ...!")
      //         window.location.reload()
      //     } else {
      //         alert("Invalid email address");
      //     }
      // });