import axios from "axios";
import { atom, selector } from "recoil";

export const notifications = atom({
    key: "networkAtom",
    default: selector({
        key:"networkAtomSelector",
        get: async () =>{
            
            const res = await axios.get("http://192.168.2.6:3000/userdata")
            return res.data
        }
    })

})

export const sumSelector = selector({
    key:"sumSelector",
    get: ({get}) =>{
        const allNotification = get(notifications)
        return (allNotification.network+
            allNotification.jobs+
            allNotification.notification+
            allNotification.message
        );
    }
})