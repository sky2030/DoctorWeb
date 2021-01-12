import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
import { Link, Redirect } from "react-router-dom";
//import Transationcard from "./Transationcard";
import Navigation from "./Nav";
import moment from "moment-timezone";
import axios from "axios";
import Spinner from "./img/Spinnergrey.gif";

const BASE = "https://stage.mconnecthealth.com";
const BASE_URL = `${BASE}/v1/doctor/`

class Alltransation extends React.Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      loggedIn,
      posts: [],
      dup_post: [],
      hospital: [],

    };
  }

  componentDidMount = () => {
    this.setState({ hospital: [] })
    this.GetTransactions();
  };

  LoadMoreTransaction = () => {
    const { posts } = this.state
    // let offset = 0
    // if (posts && posts.length > 0) {
    //   offset = posts.length
    // }
    const URL = `${BASE_URL}orders?offset = ${posts.length}`
    console.log(URL);
    axios
      .get(`${BASE_URL}orders?offset=${posts.length}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data.code === 200) {
          let data = response.data.data;
          if (posts && posts.length > 0) {
            this.setState({
              posts: posts.concat(data),
              dup_post: posts.concat(data)
            })
          }

        } else {
          this.setState({
            posts: [],
            dup_post: [],
          });
        }
      })
      .catch((Error) => {
        if (Error.message === "Network Error") {
          alert("Please Check your Internet Connection")
          console.log(Error.message)
          return;
        }
        if (Error.response.data.code === 403) {
          alert(Error.response.data.message)
          console.log(JSON.stringify("Error 403: " + Error.response.data.message))
          this.setState({
            loggedIn: false
          })
        }
        else {
          alert("Something Went Wrong")
        }
      });
  };

  GetTransactions = () => {
    axios
      .get(`https://stage.mconnecthealth.com/v1/doctor/orders`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data.code === 200) {
          const data = response.data.data;
          let dup_hospitals = [
            JSON.stringify({
              _id: "allhospital",
              name: "All Hospital",
            })];


          response.data.data.map(item => {
            let jsonOBJ = {
              _id: item.hospital_id,
              name: item.hospital_name
            }
            let objString = JSON.stringify(jsonOBJ)
            let index = dup_hospitals.indexOf(objString)

            if (index === -1) {
              console.log("Push :", index)
              dup_hospitals.push(objString)
            }


          })
          this.setState({
            hospital: dup_hospitals,
            posts: data,
            dup_post: data
          })
          //   console.log("Data has been received!!" + data);
        } else {
          alert(response.data.message)
          this.setState({
            posts: [],
            dup_post: [],
            hospital: [],

          });
        }
      })
      .catch((Error) => {
        if (Error.message === "Network Error") {
          alert("Please Check your Internet Connection")
          console.log(Error.message)
          return;
        }
        if (Error.response.data.code === 403) {
          alert(Error.response.data.message)
          console.log(JSON.stringify("Error 403: " + Error.response.data.message))
          this.setState({
            loggedIn: false
          })

        }
        else {
          alert("Something Went Wrong")
        }
      });
  };

  handleStatus = (e) => {
    console.log("This is status: ", e.target.value);
    if (e.target.value === "status") {
      this.setState({
        posts: this.state.dup_post
      })
    } else {
      let filterList = this.state.dup_post.filter(item => {
        if (item.status === e.target.value) {
          return item
        }
      })
      this.setState({ posts: filterList })
    }

  }

  render() {
    if (localStorage.getItem("token") == null) {
      return <Redirect to="/" />;
    }

    const { posts, hospital } = this.state;
    const HospitalList = hospital.length ? (
      hospital.map((item) => {
        let item_copy = JSON.parse(item)
        return (
          <option key={item_copy._id} value={item_copy._id} >
            {item_copy.name}
          </option>
        );
      })
    ) : (
        <div className="center">No Doctor</div>
      );
    const TransactionsList = posts.length ? (
      posts.map((post) => {
        return (
          <div className="maintrans" key={post.invoice}>
            <div className="alltransation1">
              <div
                className='list'
              >
                <p>{post.invoice}</p>
              </div>
              <div
                className='list'
              >
                <p>{moment(post.date).format("ll")}</p>
              </div>
              <div className='list'>
                <p> {post.patient_name}</p>
              </div>
              <div className='list'>
                <p>
                  {" "}
                  {post.amount} {post.currency}
                </p>
              </div>
              <div className='list'>
                <p>{post.status.toUpperCase()} </p>
              </div>
            </div>
          </div>
        );
      })
    ) : (
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: "150px",
            marginBottom: "100px",
          }}
        >
          <img src={Spinner} alt="Loading" />
        </div>
      );
    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }
    return (
      <div className="Appcontainer">
        <Navigation />

        <div className="transactioncard">
          <div className="backarrow">
            {" "}
            <Link to="/Dashboard">
              <i className="fas fa-arrow-left"></i>
            </Link>
          </div>
          <h2>All Transactions</h2>

          <div className="maintrans">
            <div className="alltransation1">
              <div
                className="listhead"
              >
                <p>
                  <b>Invoice No</b>
                </p>
              </div>

              <div
                className="listhead"
              >
                <p>
                  <b>Date</b>
                </p>
              </div>
              {/* <div>
                                <p><b>Patient</b></p>
                                <p>Avneet Dixit</p>
                            </div> */}

              <div className="listhead">
                <p>
                  <b>Patient Name</b>
                </p>
              </div>
              <div className="listhead">
                <p>
                  <b>Amount</b>
                </p>
              </div>
              <div className="listhead">
                <p>
                  <select
                    id="doctors"
                    onChange={this.handleStatus}
                    className="transdoctor"
                  >
                    <option value="status">Status</option>
                    <option value="initiated">INITIATED</option>
                    <option value="paid">PAID</option>
                  </select>
                </p>
              </div>

            </div>
          </div>
          {TransactionsList}
          {posts.length >= 20 ? <div className="tranbottom">
            <button onClick={() => this.LoadMoreTransaction()}> <i className="fa fa-arrow-down"></i> Load More</button>
          </div> : null}
        </div>

      </div>

    );
  }
}
export default Alltransation;
