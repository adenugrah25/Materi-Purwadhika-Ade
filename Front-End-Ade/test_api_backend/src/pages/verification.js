import React from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { URL } from '../actions'

class Verification extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            verified : false
         }
    }

    async componentWillMount () {
        const token = this.props.location.search.substring(1)
        try {
            const res = await Axios.post(URL + '/users/verification', { token })
            console.log(res.data)
            this.setState({ verified : true })

        } catch (err) {
            console.log(err)
        }
    }

    render() {
        console.log('location :', this.props.location)
        console.log('token : ', this.props.location.search.substring(1)) 
        return ( 
            <div>
                {
                    this.state.verified ?
                <Link to='/products'>
                    <Button>Go to Products</Button>
                </Link>
                : <h1>Loading...</h1>
                }
            </div>
         );
    }
}
 
export default Verification;