import { useContext } from "react";
import { UserContext } from "../../context";


const HomeComponent = () => {
    const { userData } = useContext(UserContext);
    return(
        <div>
            <div> Email : {userData?.email}</div>
            <div> Time to sigIn : {userData?.createdAt}</div>
        </div>
    )
}

export default HomeComponent