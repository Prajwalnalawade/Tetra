import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore,setDoc, deleteDoc,doc, getDoc, updateDoc, addDoc, onSnapshot, collection ,query, where, orderBy, serverTimestamp} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { getStorage,getDownloadURL,uploadBytesResumable, ref as sRef} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-storage.js";


const firebaseConfig = {
   
  };

  const app = initializeApp(firebaseConfig);
  const db=getFirestore();
  const auth=getAuth();
  const colRef = collection(db,'contact')

  const form=document.getElementById("upload")
  form.addEventListener('submit',(e)=>{
    e.preventDefault()
      addDoc(colRef,{
        email: form.email.value || null,
        message: form.message.value || null,
        phone: form.phone.value || null,
        subject: form.subject.value || null,
        name:form.name.value || null
      })
    .then(()=>{
        window.alert("Request added successfully")
        window.location.href="./index.html"
        form.reset()
    })
  })