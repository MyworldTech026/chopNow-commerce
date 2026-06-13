import { db } from "./config.js"
import { addDoc, collection, getDocs, doc, deleteDoc, onSnapshot } from 'https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js';


//let menuItems=[]
export function getproduct(callback){
onSnapshot(collection(db, 'projectDetails'), (snapshot) =>{
let snaps=snapshot.docs.map(doc=>({
  id:doc.id,
  ...doc.data()
}))

callback(snaps)
})
}
