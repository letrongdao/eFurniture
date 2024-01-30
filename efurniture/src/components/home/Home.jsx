
import "./home.css"
import { React} from "react";



const Home = () => {
    return (
        <div className="row">
        <div className="col-12">
          <div className="input-group">
            <input
              className="form-control border-secondary py-2"
              type="search"
              defaultValue="search"
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button">
                <i className="fa fa-search" />
              </button>
            </div>
          </div>
        </div>
        
      </div>
  
    
    )  
}

export default Home