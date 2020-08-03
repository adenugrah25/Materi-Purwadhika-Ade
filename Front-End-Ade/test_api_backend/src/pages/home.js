import React from 'react';
// import Axios from 'axios';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
            <Link to='/products'>
                    <Button>Go to Products</Button>
            </Link>
            </div>
         );
    }
}
 
export default Home