import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { CardGroup } from 'semantic-ui-react'
import AddTripModal from './AddTripModal'
import TripCard from './TripCard'

class TripsContainer extends React.Component{

    render(){

        let arrayOfComponents = this.props.trips.map(tripObj => {
            return <TripCard key={tripObj.id} trip={tripObj}/>
        })

        return(
            <div>
                <h1>Hi {this.props.full_name} 👋🏼</h1>
                {/* <Button onClick={this.handleClick}>Add a Trip</Button> */}
                <AddTripModal />
                <CardGroup>
                    {arrayOfComponents}
                </CardGroup>
            </div>
        )
    }
}

// mapStateToProps gets information
    // is a callback, 1st arg is globalStateObj, 2nd arg is ownProps
    // returns POJO to be merged into props of the component
let mapStateToProps = (globalState) => {
    return {
        full_name: globalState.user.full_name,
        trips: globalState.user.trips
    }
}

export default connect(mapStateToProps)(withRouter(TripsContainer))