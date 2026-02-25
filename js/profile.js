document.getElementById('date').innerHTML=(String(new Date())).slice(0,15);

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore,setDoc, deleteDoc,doc, getDoc, updateDoc, addDoc, onSnapshot, collection ,query, where, orderBy, serverTimestamp} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { getStorage,getDownloadURL,uploadBytesResumable, ref as sRef} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-storage.js";


const firebaseConfig = {

  };


  const app = initializeApp(firebaseConfig);
  const db=getFirestore();
  const auth=getAuth();
  const colRef = collection(db,'user')
 
  //Getting user profile
  const docRef=doc(db,"user",localStorage.getItem("uid"))
  onSnapshot(docRef,(doc)=>{
   const user=(doc.data())
   const form=document.getElementById("profile_form")
   form.fname.value=user.fname;
   form.lname.value=user.lname;
   form.email.value=user.email; 
   if(user.publish=="true")
  {
   form.birthday.value=user.dob;
   form.location.value=user.location;
   form.phone.value=user.phone;
   form.organization.value=user.organization;
   form.aboutyou.value=user.about_user;
  }
  document.getElementById("profile1").src =user.profileimg
   
   form.uid.value=localStorage.getItem("uid");
  })

  //updating user profile
  const form= document.getElementById("profile_form")
  form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const docRef = doc(db,'user',form.uid.value)
    updateDoc(docRef,{
        
        fname:form.fname.value,
        lname:form.lname.value,
        dob:form.birthday.value,
        location:form.location.value,
        phone:form.phone.value,
        organization:form.organization.value,
        about_user:form.aboutyou.value,
        publish:"true"
    })
    .then(() => {
      window.alert("Profile updated successfully")
      window.location.href="./index.html"
      form.reset()
    })
  })
 
  //uploading profile img
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
     console.log(ext[0])
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
     const storageRef=sRef(storage,"profile/"+ImgName);
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
        localStorage.setItem("profile_img",downloadURL);
        const docRef=doc(db,"user",localStorage.getItem("uid"))
        updateDoc(docRef,{
         profileimg:downloadURL
       })
      });
     }
     );
   }