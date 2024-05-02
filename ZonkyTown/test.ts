import bcrypt from "bcrypt";
import readline from "readline"

interface User {
    username : string;
    password : string;
}

const users : User[] = [
{
    username: "admin",
    password: "admin"
},
{
    username: "joske",
    password : "miaw"
}
]

const saltRounds : number = 10;
async function main() : Promise<void>{
    for(let user of users){
        user.password = await bcrypt.hash(user.password, saltRounds)
    }
    const username : string = readline.question("username: ")
    const password : string = readline.question("username: ")
    let user: User | undefined = users.find((user)=> user.username === username)
    if ( user){
        if (await bcrypt.compare(password, user.password))
            {
                console.log("logged in succesful")
            }
        else{
            console.error("invalid usernam")
        }
    }
    else {
        console.error("invalid usernam")
    }
    console.log(user)
}
main()

