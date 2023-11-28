import LOGIN from "../auth/login"
import ATTACK from "../page/attack"
import ONLY_VICTIM from "../page/eni_victim"
import HELP from "../page/help"
import HOME from "../page/home"
import PAYLOAD from "../page/payload"
const public_Router = [
    {path : "/" , component : LOGIN},
    {path : "/home" , component : HOME},
    {path : "/attack" , component : ATTACK},
    {path : "/payload" , component : PAYLOAD},
    {path : "/one-victim" , component : ONLY_VICTIM},
    {path : "/help" , component : HELP , not_Layout : true},
]

export default public_Router