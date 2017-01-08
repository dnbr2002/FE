import React from 'react';
import { Link } from 'react-router';
import { Grid } from 'react-bootstrap';


export default class Footer extends React.Component {
    render() {
        return (
            <Grid>
                <hr />
                <footer>
                    <p>Fantasy Equestrian © Company 2017</p>
                </footer>
            </Grid>

        )
    }
}