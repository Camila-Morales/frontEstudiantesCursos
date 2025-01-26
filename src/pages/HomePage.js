import React from "react";

function HomePage() {
    return(
        <div>
            <div className="container text-center my-5">
            <h1 className="display-4">Bienvenido al Sistema de Gestión Académica</h1>
            <p className="lead">Administra estudiantes, cursos y matrículas de manera eficiente.</p>
        </div>

        <div className="container">
                <div className="row d-flex align-items-stretch">
                <div className="col-md-4">
                    <div className="card text-center h-100">
                    <div className="card-body">
                        <i className="fa fa-users fa-3x mb-3" aria-hidden="true"></i> {/* Icono de Estudiantes */}
                        <h5 className="card-title">Estudiantes</h5>
                        <p className="card-text">Gestiona los datos de los estudiantes de forma fácil y rápida.</p>
                        <a href="/estudiantes" className="btn btn-primary">Ver Estudiantes</a>
                    </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center h-100">
                    <div className="card-body">
                        <i className="fa fa-book fa-3x mb-3" aria-hidden="true"></i> {/* Icono de Cursos */}
                        <h5 className="card-title">Cursos</h5>
                        <p className="card-text">Crea, actualiza y consulta la información de los cursos.</p>
                        <a href="/cursos" className="btn btn-success">Ver Cursos</a>
                    </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center h-100">
                    <div className="card-body">
                        <i className="fa fa-pencil fa-3x mb-3" aria-hidden="true"></i> {/* Icono de Matrículas */}
                        <h5 className="card-title">Matrículas</h5>
                        <p className="card-text">Administra el proceso de matriculación de manera eficiente.</p>
                        <a href="/matriculas" className="btn btn-warning">Ver Matrículas</a>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;