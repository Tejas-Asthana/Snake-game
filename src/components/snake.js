import React from 'react'

export default class App extends React.Component {

    render(props) {
        const style={
            position: "absolute",
            top: `${this.props.coorY}%`,
            left: `${this.props.coorX}%`,
            width: "4%",
            height: "4%",
            border: "1px solid #17a2b8",
            backgroundColor: "#00ccff",
            zIndex: 2
        }

        return (
            <div style={style} />
        )
    } 
}