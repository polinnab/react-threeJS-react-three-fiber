import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
    return(
        <div className="container">
            <div className="d-grid gap-2 col-6 mx-auto">
            <Link to="/sphere"><button className="btn btn-primary" type="button">Explore the Sphere</button></Link>
            <Link to="/3d-model"><button className="btn btn-primary" type="button">See 3D model</button></Link>
            <Link to="/heart"><button className="btn btn-primary" type="button">Feel the heart</button></Link>
            <Link to="/donut"><button className="btn btn-primary" type="button">Donut</button></Link>
            <Link to="/earth"><button className="btn btn-primary" type="button">Our Earth</button></Link>
            </div>
        </div>
    )
}

export default HomePage