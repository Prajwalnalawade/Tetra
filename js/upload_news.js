import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore,setDoc, deleteDoc,doc, getDoc, updateDoc, addDoc, onSnapshot, collection ,query, where, orderBy, serverTimestamp} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { getStorage,getDownloadURL,uploadBytesResumable, ref as sRef} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-storage.js";


const firebaseConfig = {
    
  };

  const app = initializeApp(firebaseConfig);
  const db=getFirestore();
  const auth=getAuth();
  const colRef = collection(db,'news')

  const form= document.getElementById("add_news")
  form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const btn=document.getElementById("subbtn");
    btn.disabled=true;
      addDoc(colRef,{
        news: form.news.value || null,
        category: form.categories.value || null,
        time: serverTimestamp(),
        full_news: form.full_news.value || null,
        share: "0",
        view: "0",
        visible:"false",
        read: form.read.value || null,
        uid:localStorage.getItem("uid")  || null,
        img:localStorage.getItem("news_img") || null,
        date:(String(new Date())).slice(0,15)
      })
    .then(()=>{
        window.alert("News added successfully")
        window.location.href="./uploaded_news.html"
        localStorage.removeItem("news_img")
        form.reset()
    })
  })


  //images
  var files=[];
  var reader = new FileReader();

  var upload=document.getElementById("upload_img");
  var img=document.getElementById("profile1");
  var input =document.createElement("input");
  var imgname=document.createElement("span");
  imgname.style.visibility="False";
  
  input.type ="file";
  input.onchange = e =>{
    files=e.target.files;
    var extension =GetFileExt(files[0])
    var name =GetFileName(files[0])
    imgname.value=name+extension
    
    reader.readAsDataURL(files[0]);
  }
  reader.onload =function()
  {
   img.src=reader.result;
   var ImgToUpload =files[0];
   UploadProcess();
 

    }
  

  upload.onclick=function(){
    input.click();
  }
  
   function GetFileExt(file){
     var temp=file.name.split(".");
     var ext=temp.splice((temp.length-1),(temp.length));
     return '.'+ext[0];
   }

   function GetFileName(file){
     var temp=file.name.split(".");
     var fname=temp.slice(0,-1).join(".");
     return fname;
   }

    function UploadProcess(){
     var ImgToUpload=files[0];
     var ImgName=imgname.value;
     
     const metaData ={
        contentType: ImgToUpload.type
     }
     
     const storage=getStorage();
     const storageRef=sRef(storage,"news/"+ImgName);
     const UploadTask=uploadBytesResumable(storageRef,ImgToUpload,metaData);
     UploadTask.on('state-changed',(snapshot)=>{
       var progress =(snapshot.bytesTranferred/snapshot.totalBytes)*100;

       
     },
      (error)=>{
        alert("Error image not uploaded")
      },
     ()=>{
      getDownloadURL(UploadTask.snapshot.ref).then((downloadURL)=>
      { 
        localStorage.setItem("news_img",downloadURL);
      });
     }
     );
   }