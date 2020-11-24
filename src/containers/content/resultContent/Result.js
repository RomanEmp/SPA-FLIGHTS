import React, { Component } from 'react'
import { FLIGHTS } from '../../../Json/flightBase'
import classes from './Result.css'
class Result extends Component {


    state = {
        flights: FLIGHTS,
        oneDirection: 2,
        directions: 3
    }

    componentDidMount() {

    }
    componentDidUpdate() {



    }
    renderFlights() {

        let oneDirection = this.props.filterDirection()
        let carrier = this.props.filterCarrier()
        let sortPrice = this.props.sortByPrice()
        return this.state.flights.sort((prev, next) => {
            if (sortPrice === 1) { return prev.flight.price.total.amount - next.flight.price.total.amount }
            else if (sortPrice === 2) { return next.flight.price.total.amount - prev.flight.price.total.amount }
            else { return Math.random() - 0.5 }


        }).map(flight => {
            if (+ flight.flight.price.total.amount > this.props.updatePrice().upPrice &&
                +flight.flight.price.total.amount < this.props.updatePrice().toPrice &&
                ((oneDirection === 1) ?
                    flight.flight.legs[0].segments.length > 0 &&
                    flight.flight.legs[1].segments.length > 0 :
                    ((oneDirection === 2) ?
                        flight.flight.legs[0].segments.length > 1 &&
                        flight.flight.legs[1].segments.length > 1 :
                        flight.flight.legs[0].segments.length < 2 &&
                        flight.flight.legs[1].segments.length < 2)

                ) &&
                ((carrier === 1) ?
                    flight.flight.carrier.caption != null :
                    ((carrier === 2) ?
                        flight.flight.carrier.caption === 'LOT Polish Airlines' :
                        ((carrier === 3) ?
                            flight.flight.carrier.caption === 'Аэрофлот - российские авиалинии' :
                            flight.flight.carrier.caption === 'LOT Polish Airlines' || flight.flight.carrier.caption === 'Аэрофлот - российские авиалинии'
                        ))

                )
            ) {
                return (
                    <div>
                        <div className='heater'>
                            <h2>
                                {
                                    flight.flight.price.total.amount + ' '
                                    + flight.flight.price.total.currencyCode
                                }
                            </h2>
                            <p>Стоимость для одного взослого пассажира</p>

                        </div>
                        <div className='content'>
                            <div className='direction'>
                                {
                                    (flight.flight.legs[0].segments.length < 2) ?
                                        <h2>
                                            {
                                                flight.flight.legs[0].segments[0].departureAirport.caption +
                                                " (" + flight.flight.legs[0].segments[0].departureAirport.uid + ")" +
                                                " → " + flight.flight.legs[0].segments[0].arrivalAirport.caption +
                                                " (" + flight.flight.legs[0].segments[0].arrivalAirport.uid + ")"
                                            }
                                        </h2> :
                                        <h2>
                                            {
                                                flight.flight.legs[0].segments[0].departureAirport.caption +
                                                " (" + flight.flight.legs[0].segments[0].departureAirport.uid + ")" +
                                                " → " + flight.flight.legs[0].segments[1].arrivalAirport.caption +
                                                " (" + flight.flight.legs[0].segments[1].arrivalAirport.uid + ")"
                                            }
                                        </h2>
                                }

                            </div>
                            <div className='timeinfo'>
                                {
                                    (flight.flight.legs[0].segments.length < 2) ?
                                        <h2>
                                            {
                                                flight.flight.legs[0].segments[0].departureDate +
                                                "  Время пути " +
                                                flight.flight.legs[0].segments[0].arrivalDate
                                            }
                                        </h2> :
                                        <h2>
                                            {
                                                flight.flight.legs[0].segments[0].departureDate +
                                                "  Время пути " +
                                                flight.flight.legs[0].segments[1].arrivalDate
                                            }
                                        </h2>
                                }

                            </div>
                            {
                                (flight.flight.legs[0].segments.length > 1) ?
                                    <p>{"Количестово пересадок: " + (flight.flight.legs[0].segments.length - 1)}</p>
                                    : null
                            }

                            <hr />
                            <div className='airlineName'>
                                <p>Рейс выполняет : {flight.flight.legs[0].segments[0].airline.caption}</p>
                            </div>
                            <hr />

                            <div className='direction'>
                                {
                                    (flight.flight.legs[1].segments.length < 2) ?
                                        <h2>{flight.flight.legs[1].segments[0].departureAirport.caption +
                                            " (" + flight.flight.legs[1].segments[0].departureAirport.uid + ")" +
                                            " → " + flight.flight.legs[1].segments[0].arrivalAirport.caption +
                                            " (" + flight.flight.legs[1].segments[0].arrivalAirport.uid + ")"}</h2>
                                        :
                                        <h2>{flight.flight.legs[1].segments[0].departureAirport.caption +
                                            " (" + flight.flight.legs[1].segments[0].departureAirport.uid + ")" +
                                            " → " + flight.flight.legs[1].segments[1].arrivalAirport.caption +
                                            " (" + flight.flight.legs[1].segments[1].arrivalAirport.uid + ")"}</h2>
                                }

                            </div>
                            <div className='timeinfo'>
                                {
                                    (flight.flight.legs[1].segments.length < 2) ?
                                        <h2>
                                            {
                                                flight.flight.legs[1].segments[0].departureDate +
                                                "  Время пути " +
                                                flight.flight.legs[1].segments[0].arrivalDate
                                            }
                                        </h2>
                                        :
                                        <h2>
                                            {
                                                flight.flight.legs[1].segments[0].departureDate +
                                                "  Время пути " +
                                                flight.flight.legs[1].segments[1].arrivalDate
                                            }
                                        </h2>
                                }

                            </div>
                            {
                                (flight.flight.legs[0].segments.length > 1) ?
                                    <p>{"Количестово пересадок: " + (flight.flight.legs[1].segments.length - 1)}</p>
                                    : null
                            }
                            <hr />
                            <div className='airlineName'>
                                <p>Рейс выполняет : {flight.flight.legs[1].segments[0].airline.caption}</p>
                            </div>
                        </div>
                        <div className='footer'>
                            <button>ВЫБРАТЬ</button>
                        </div>
                        <hr />
                    </div>
                )
            } else {
                return null
            }

        })

    }
    render() {
        const cls = [classes.Result]
        return (
            <div className={cls.join(' ')}>
                {this.renderFlights() === null ?
                    <h1>По данному запросу ничего не найдено</h1>
                    : this.renderFlights()}
            </div>
        )
    }
}
export default Result