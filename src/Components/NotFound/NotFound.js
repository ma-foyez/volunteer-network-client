import React from 'react';

const NotFound = () => {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="alert-danger text-center p-4">
                        <div className="display-3">404</div>
                        <h2>Page Not Found</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;