import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore,setDoc,doc, onSnapshot, collection , serverTimestamp} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

const firebaseConfig = {
   
  };

 

  const app = initializeApp(firebaseConfig);
  const db=getFirestore();
  const auth=getAuth();
  const colRef = collection(db,'user')

  //sign up

  const signupForm = document.getElementById('MainForm')
  if(signupForm.password.value==signupForm.repassword.value)
  {
  signupForm.addEventListener('submit',(e)=>{e.preventDefault()
   

    const email=signupForm.email.value
    const password=signupForm.password.value
  
    createUserWithEmailAndPassword(auth,email,password)
    .then((cred)=>{
        
        localStorage.setItem("uid",cred.user.uid)
        localStorage.setItem("firstname",signupForm.fname.value)
        localStorage.setItem("lastname",signupForm.lname.value)
        localStorage.setItem("email",signupForm.email.value)
        localStorage.setItem("gender",signupForm.gender.value)
        if(signupForm.gender.value=="Male")
        {
           localStorage.setItem("profile_img","https://firebasestorage.googleapis.com/v0/b/authentication-c7dd2.appspot.com/o/profile_img%2Fboy.png?alt=media&token=b3ab214f-4e30-4b77-bb45-0ee5bd8ea8f9")
        }
        if(signupForm.gender.value=="Female")
        {
          localStorage.setItem("porfile_img","https://firebasestorage.googleapis.com/v0/b/authentication-c7dd2.appspot.com/o/profile_img%2Fgirl.jpg?alt=media&token=875d9758-1432-402a-ac1d-b3f52ed91a77")
        }
      signupForm.reset( );
       window.open("./login.html","_self");
    })
    .catch((err)=>{
      alert(err.message)
    })
  })
}
else{
  alert("Password and conform password are not same")
}



//sign in

const loginForm=document.getElementById('login');
loginForm.addEventListener("submit",(e)=>{e.preventDefault()
  const email=loginForm.email.value;
  const password=loginForm.password.value;
  signInWithEmailAndPassword(auth,email,password).then((cred)=>{
    localStorage.setItem("uid",cred.user.uid);
    const docRef=doc(db,"user",cred.user.uid);
    onSnapshot(docRef,(doc)=>{
    const user=doc.data()
    localStorage.setItem("firstname",user["fname"])
    localStorage.setItem("lastname",user["lname"])
    localStorage.setItem("profile_img",user["profileimg"])
    localStorage.setItem("super_user",user["super_user"])
    localStorage.setItem("super_user",user["super_user"])
    // localStorage.setItem("email",user["email"])
    window.location.href="./index.html"
    })
    loginForm.reset()
  })
  .catch((err)=>{
    alert(err.message)
  })
})


//adding data to local storage during sign up
await setDoc(doc(db, "user", localStorage.getItem("uid")), {
  email: localStorage.getItem("email"),
  fname: localStorage.getItem("firstname"),
  lname: localStorage.getItem("lastname"),
  gender: localStorage.getItem("gender"),
  profileimg:localStorage.getItem("profile_img"),
  date: serverTimestamp()
});
