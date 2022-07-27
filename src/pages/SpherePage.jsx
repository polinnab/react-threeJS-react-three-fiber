import React from "react";
import { Link } from "react-router-dom";
import Sphere from "../components/Sphere";

function SpherePage() {
    return(
        <div>
            <Link to="/"><button className="btn btn-primary" 
                    type="button"
                    style={{position: "absolute"}}>
                        Back Home</button></Link>
            <Sphere></Sphere>
        </div>
    )
}

export default SpherePage