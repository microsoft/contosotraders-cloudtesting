import React from "react";
import { Link } from "react-router-dom";
import './breadcrumb.scss'

const Breadcrumb = ({parentPath, parentUrl, currentPath}) => {
    return(
        <div className="breadcrump">
            <p>
                <b><Link to='/'>Home</Link> / </b>
                {parentPath ? <b><Link to={parentUrl}>{parentPath}</Link> / </b> : null}
                {currentPath ? <span>{currentPath}</span> : null}
            </p>
        </div>
    );
}
export default Breadcrumb;