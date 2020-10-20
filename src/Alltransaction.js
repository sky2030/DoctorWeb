import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
import { Link, Redirect } from "react-router-dom";
//import Transationcard from "./Transationcard";
import Navigation from "./Nav";
import moment from "moment-timezone";
import axios from "axios";
import Spinner from "./img/Spinnergrey.gif";

class Alltransation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount = () => {
    this.GetTransactions();
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
        const data = response.data.data;
        this.setState({ posts: data });
        console.log("Data has been received!!" + data);
      })
      .catch(() => {
        alert("Error retrieving data!!");
      });
  };
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     setLoading(true);
  //     GetTransactiondata();

  //   });

  //   return unsubscribe;
  // }, [route.params]);
  render() {
    if (localStorage.getItem("token") == null) {
      return <Redirect to="/" />;
    }
    const { posts } = this.state;

    const TransactionsList = posts.length ? (
      posts.map((post) => {
        return (
          <div className="maintrans" key={post.invoice}>
            <div className="alltransation">
              <div
                style={{
                  marginLeft: "1em",
                }}
              >
                <p>{post.invoice}</p>
              </div>
              <div
                style={{
                  marginLeft: "1em",
                }}
              >
                <p>{moment(post.date).format("ll")}</p>
              </div>
              <div>
                <p> {post.patient_name}</p>
              </div>
              <div>
                <p>
                  {" "}
                  {post.amount} {post.currency}
                </p>
              </div>
              <div>
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
    return (
      <div className="Appcontainer">
        <Navigation />

        <div className="transactioncard pb15">
          <div className="backarrow">
            {" "}
            <Link to="/Dashboard">
              <i className="fas fa-arrow-left"></i>
            </Link>
          </div>
          <h2>All Transactions</h2>

          <div className="maintrans">
            <div className="alltransation">
              <div
                style={{
                  marginLeft: "1em",
                }}
              >
                <p>
                  <b>Invoice No</b>
                </p>
              </div>

              <div
                style={{
                  marginLeft: "1em",
                }}
              >
                <p>
                  <b>Date</b>
                </p>
              </div>
              {/* <div>
                                <p><b>Patient</b></p>
                                <p>Avneet Dixit</p>
                            </div> */}

              <div>
                <p>
                  <b>Patient Name</b>
                </p>
              </div>
              <div>
                <p>
                  <b>Amount</b>
                </p>
              </div>
              <div>
                <p>
                  <b>Status</b>
                </p>
              </div>
            </div>
          </div>
          {TransactionsList}
        </div>
      </div>
    );
  }
}
export default Alltransation;
