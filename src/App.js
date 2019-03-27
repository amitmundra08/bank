import React, { Component } from "react";
import logo from "./logo.svg";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

class App extends Component {
    state = {
        selectedPrincipal: null,

        selectedMonths: null,
        principalArray: [
            { value: 500 },
            { value: 1000 },
            { value: 1500 },
            { value: 2000 },
            { value: 2500 },
            { value: 3000 },
            { value: 3500 },
            { value: 4000 },
            { value: 4500 },
            { value: 5000 }
        ],
        monthsArray: [
            { value: 6 },
            { value: 7 },
            { value: 8 },
            { value: 9 },
            { value: 10 },
            { value: 11 },
            { value: 12 },
            { value: 13 },
            { value: 14 },
            { value: 15 },
            { value: 16 },
            { value: 17 },
            { value: 18 },
            { value: 19 },
            { value: 20 },
            { value: 21 },
            { value: 22 },
            { value: 23 },
            { value: 24 }
        ],
        interestRate: null,
        numPayments: null,
        principal: null,
        monthlyPayment: null,
        error: null
    };

    calculateStuffs = (selectedMonths, selectedPrincipal) => {
        this.setState({
            interestRate: null,
            numPayments: null,
            principal: null,
            monthlyPayment: null,
            error: null
        });
        console.log(selectedMonths, selectedPrincipal);
        console.log(
            "https://ftl-frontend-test.herokuapp.com/interest?amount=" +
                selectedPrincipal +
                "&numMonths=" +
                selectedMonths
        );
        axios
            .get(
                "https://ftl-frontend-test.herokuapp.com/interest?amount=" +
                    selectedPrincipal +
                    "&numMonths=" +
                    selectedMonths
            )
            .then(response => {
                console.log(response.data);
                this.setState({
                    numPayments: response.data.numPayments,
                    interestRate: response.data.interestRate,
                    monthlyPayment: response.data.monthlyPayment.amount,
                    principal: response.data.principal.amount
                });
            })
            .catch(error => {
                console.log(error.message);
                this.setState({
                    error: "Some error occur. Please send correct data."
                });
            });
    };

    onChangeMonths = e => {
        console.log(e.target.value);
        let selectedMonths = e.target.value;
        this.setState({ selectedMonths });

        let { selectedPrincipal } = this.state;
        if (selectedMonths !== null && selectedPrincipal !== null) {
            this.calculateStuffs(selectedMonths, selectedPrincipal);
        }
    };

    onChangePrincipal = e => {
        console.log(e.target.value);
        let selectedPrincipal = e.target.value;
        this.setState({ selectedPrincipal });

        let { selectedMonths } = this.state;

        if (selectedMonths !== null && selectedPrincipal !== null) {
            this.calculateStuffs(selectedMonths, selectedPrincipal);
        }
    };

    render() {
        let {
            principalArray,
            monthsArray,
            interestRate,
            numPayments,
            principal,
            monthlyPayment,
            error
        } = this.state;
        return (
            <div className="col-12">
                <div className="row">
                    <h5 className="text-title text-center mx-auto my-5 text-center">
                        Welcome to THE BANK
                    </h5>
                </div>
                <div className="row mt-5">
                    <div className="col-6">
                        <div className="row col-lg-12">
                            <div className="col-12 col-sm-6">
                                <div>Select Principal</div>
                                <select
                                    className="custom-select mt-2"
                                    id="inputGroupSelect01"
                                    onChange={e => this.onChangePrincipal(e)}
                                >
                                    <option value={0}>select principal</option>
                                    {principalArray.map(principal => {
                                        return (
                                            <option
                                                value={principal.value}
                                                key={principal.value}
                                            >
                                                {principal.value}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div>Select Duration (in Months)</div>
                                <select
                                    className="custom-select mt-2"
                                    id="inputGroupSelect01"
                                    onChange={e => this.onChangeMonths(e)}
                                >
                                    <option value={0}>select duration</option>
                                    {monthsArray.map(month => {
                                        return (
                                            <option
                                                value={month.value}
                                                key={month.value}
                                            >
                                                {month.value}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        {interestRate !== null &&
                        numPayments !== null &&
                        monthlyPayment !== null &&
                        principal !== null ? (
                            <div className="row col-lg-12 mt-4">
                                <div className="col-12 bg-theme py-4 px-2">
                                    <div className="text-center text-white">
                                        Interest Rate : {interestRate} %
                                    </div>
                                    <div className="text-center text-white">
                                        Number of payments : {numPayments}
                                    </div>
                                    <div className="text-center text-white">
                                        Principal : $ {principal}
                                    </div>
                                    <div className="text-center text-white">
                                        Monthly Payment : $ {monthlyPayment}
                                    </div>
                                </div>
                            </div>
                        ) : null}
                        {error !== null ? (
                            <div className="row col-lg-12 mt-4">
                                <div className="col-12 bg-redt py-4 px-2">
                                    <div className="text-white mx-auto text-center">
                                        {error}
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                    <div className="col-6 p-5">
                        <div className="row">
                            <img src={logo} width="100%" height="100%" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;

//  <div className="col-lg-12">
//     <div className="row">
//         <div className="row col-lg-6 p-5">
//             <div className="col-6">
//                 <select
//                     className="custom-select"
//                     id="inputGroupSelect01"
//                     onChange={e => this.onChangePrincipal(e)}
//                 >
//                     <option>Select Principal</option>
//                     {principalArray.map(planet => {
//                         return (
//                             <option
//                                 value={planet.value}
//                                 key={planet.value}
//                             >
//                                 {planet.value}
//                             </option>
//                         );
//                     })}
//                 </select>
//             </div>
//             <div className="col-6">
//                 <select
//                     className="custom-select"
//                     id="inputGroupSelect01"
//                     onChange={e => this.onChangeMonths(e)}
//                 >
//                     <option>Select Duration</option>
//                     {monthsArray.map(planet => {
//                         return (
//                             <option
//                                 value={planet.value}
//                                 key={planet.value}
//                             >
//                                 {planet.value}
//                             </option>
//                         );
//                     })}
//                 </select>
//             </div>
//         </div>
//         <div className="row col-lg-6 p-5">
//             <div>
//                 <img src={logo} width="100%" height="100%" />
//             </div>
//         </div>
//     </div>
// </div>
