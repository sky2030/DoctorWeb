import React, { Component } from 'react'
import Nav from "./Nav";
import EnableX from './img/enablex_developer.png'


export default class EnxConferenceScreen extends Component {

    state = {
        A_id: ''
    }

    componentDidMount = async () => {
        console.log("This is Prop : " + JSON.stringify(this.props.location.Enx.item.id))
        await this.setState({
            A_id: this.props.location.Enx.item.id
        })


        this.joinConversationPressed();
    }

    joinConversationPressed = () => {
        console.log("Appointment ID : " + this.props.location.Enx.item.id)
        fetch(
            `https://stage.mconnecthealth.com/v1/doctor/appointment/join-now?appointment_id=${this.state.A_id}`,
            {
                method: "Get",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            }
        )
            .then((res) => res.json())
            .then((results) => {
                console.log(results);
                this.setState({
                    submitted: true
                })
                if (results.code === 200) {
                    this.setState({
                        Joindata: results.data
                    })
                    // Redirect("EnableX", {
                    //   streamId: results.data.enableX.room_id,
                    //   token: results.data.enableX.token,
                    // });
                } else {
                    alert(results.message);
                    // <Redirect to="/EnableX" />

                }
            })
            .catch((err) => {
                console.log(err);
                alert("SOMETHING_WENT_WRONG");
            });
    };
    render() {
        return (
            <div>
                <Nav />
                <img
                    src={EnableX}
                    alt="Enable X" />

            </div>
        )
    }
}
