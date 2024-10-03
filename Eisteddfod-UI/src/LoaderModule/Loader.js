import React from "react";
import ReactLoading from "react-loading";

export default class Loader extends React.Component {

    state={
        type:"spinningBubbles",
        // typeArr:["balls", "bars", "bubbles", "cubes", "cyclon", "spin", "spokes", "spinningBubbles"]
    }

    // componentDidMount(){
    //     let i = 0;
    //     setInterval(() => {
    //         this.setState({type: this.state.typeArr[i]})
    //         if(i === 7){
    //             i=0;
    //         }
    //         else{
    //             i++;
    //         }
    //     }, 1000);
    // }

    render() {
        return (
            <div className="centerDiv" hidden={!this.props.show}>
                <ReactLoading type={this.state.type} color="rgba(0, 0, 0, 0.39)"
                    height={150} width={75} />
            </div>
        );
    }
}