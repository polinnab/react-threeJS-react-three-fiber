import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
    return(
        <div className="container">
            <div className="d-grid gap-2 col-6 mx-auto">
            <Link to="/sphere"><button className="btn btn-primary" type="button">Explore the Sphere</button></Link>
            <Link to="/3d-model"><button className="btn btn-primary" type="button">See 3D model</button></Link>
            </div>
        </div>
    )
}

export default HomePage