// add_user.js
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

const makeUser = async (email, name) => {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            email: email,
            name: name,
            postIds: [],
            postLikes: [],
            commentIds: [],
        });

        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

const updateUser = async (username, updates) => {
    try {
        const userRef = doc(db, "users", username);
        await updateDoc(userRef, updates);

        console.log("Document updated successfully");
    } catch (e) {
        console.error("Error updating document: ", e);
    }
}

export { makeUser, updateUser };


// Example usage in another file
//import { updateUser.makeUser } from "./add_user.js";

//Example make new user 
function register() {
    // retrieve username email
    const username = document.getElementById("username").value;

    const nameUser = window.prompt("Please enter your name:");  
    makeUser(username,nameUser);
};

//Example update user
const username = "testID"; // Replace with the key: email
const updates = {
    postIds: ["0", "1"],
    postLikes: ["2", "3"],
    commentIds: ["4", "5"],
};

updateUser(username, updates);
