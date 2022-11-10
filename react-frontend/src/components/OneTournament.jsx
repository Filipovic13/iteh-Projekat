import React from 'react'
import TournamentsPage from './TournamentsPage'

function OneTournament({tournament}) {
  return (
    <div className="card">
        <div className="row g-0">
            <div className="col-5 col-sm-4">
                <img src="assets/images/bs-images/img-3x4.png" className="img-fluid w-100" alt="card-horizontal-image"/>
            </div>
            <div className="col-7 col-sm-8">
                <div className="card-body">
                    <h5 className="card-title">{tournament.event_name}</h5>
                    <p className="card-text">{tournament.country}</p>
                    <p className="card-text">{tournament.city}</p>
                    <p className="card-text">{tournament.ruleset}</p>
                    <p className="card-text">{tournament.date}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OneTournament