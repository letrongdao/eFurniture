import { React} from "react";
import Nav from "../../components/nav/Nav";
import Home from "../../components/home/Home";
import Detail from "../../components/detail/Detail";
import "./detailPage.css"

const DetailPage = () => {
    return (
      <div className="p">
        <Nav/>
        <div className="homecomponent">
        <Home/>
        </div>
        <div className="detailcomponent">
        <Detail/>
        </div>
      </div>
    )  
}

export default DetailPage