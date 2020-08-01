import React from 'react'

export default class App extends React.Component {
    render(_props) {
        const styles = {
            position: "absolute",
            top: `${this.props.coorY}%`,
            left: `${this.props.coorX}%`,
            borderRadius: "20px",
            padding: "15px",
            backgroundColor: "#ff1f5a"
        }

        return(
            <div style={styles}/>
        )
    }
}