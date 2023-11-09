import './Home.css'
// check out Utils.js to see the code for these shorthand HTTP requests (done via the fetch function)
import { post } from 'Utils.js'
import { collection, addDoc, doc, getDoc } from "firebase/firestore"; 
import { database } from 'firebase.js';

function Home() {


    async function dataAddTest() {
        const name = prompt('Enter a name')
        const number = +prompt('Enter any number')

        try {
            const docRef = await addDoc(collection(database, "test"), {
              name: name,
              number: number
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    async function dataGetTest() {
        const name = prompt('Enter a name')
        const docRef = doc(database, "test", "name");

    }
    // marking the function as async allows for "await" statements
    async function postTest() {
        const name = prompt(`Hey, what's your name?`)

        // creating a JavaScript object using the data I wanna pass to the server 
        const requestData = {
            name: name
        }

        // wrap the request in a try catch block to protect ourselves
        try {

            // using the await keyword (with a compatible function) causes the code to stop there until the awaited function is complete (until it resolves its Promise)
            // here, we are sending a POST request to the "/api/namefun" endpoint, with our requestData object in tow
            const response = await post('/api/namefun', requestData)

            // once the server has sent a response, the postTest function will continue
            alert(response.message)
        }
        catch (e) {
            alert(`Error ${e.status}: ${e.message}`)
        }
    }

    return (
        <div>
            This is the home page!!
            <br />
            <button onClick={postTest}>post request example</button>
            <button onClick={dataAddTest}>Add to database</button>
        </div>
    )
}

export default Home
