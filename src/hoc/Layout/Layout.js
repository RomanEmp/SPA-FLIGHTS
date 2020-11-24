import React, { Component } from 'react'
import Result from '../../containers/content/resultContent/Result'
import Filter from '../../containers/filter/Filter'
import classes from './Layout.css'
class Layout extends Component {
    state = {
        upPrice: 0,
        toPrice: 1000000,
        oneDirection: false,
        twoDirections: false,
        lot: false,
        aeroflot: false,
        sortPriceUp: false,
        sortPriceDown: false

    }
    componentDidMount() {

    }
    componentDidUpdate() {

    }
    updateData = (upPriceValue, toPriceValue, oneDirectionValue, twoDirectionsValue, lot, aeroflot, sortPriceUp, sortPriceDown) => {
        this.setState({
            upPrice: upPriceValue,
            toPrice: toPriceValue,
            oneDirection: oneDirectionValue,
            twoDirections: twoDirectionsValue,
            lot,
            aeroflot,
            sortPriceUp,
            sortPriceDown

        })
    }
    updatePrice = () => {
        let upPrice = this.state.upPrice
        let toPrice = this.state.toPrice

        return {
            upPrice,
            toPrice
        }
    }
    filterDirection = () => {
        let oneDirection = this.state.oneDirection
        let twoDirections = this.state.twoDirections
        if (oneDirection === false && twoDirections === false) {
            return 1 //Без пересадок + с пересадками
        } else if (oneDirection === true && twoDirections === true) {
            return 1 //Без пересадок + с пересадками
        }
        else if (oneDirection === false && twoDirections === true) {
            return 2  // C одной пересадкой
        }
        else return 3 // Без пересадкок
    }
    filterCarrier = () => {
        let lot = this.state.lot
        let aeroflot = this.state.aeroflot
        if (lot === false && aeroflot === false) {
            return 1
        } else if (lot === true && aeroflot === true) {
            return 4
        }
        else if (lot === true && aeroflot === false) {
            return 2
        }
        else return 3

    }
    sortByPrice = () => {
        let sortPriceUp = this.state.sortPriceUp
        let sortPriceDown = this.state.sortPriceDown
        if (sortPriceUp === false && sortPriceDown === false) { return 3 }
        else if (sortPriceUp === true && sortPriceDown === false) { return 1 }
        else if (sortPriceUp === false && sortPriceDown === true) { return 2 }
        else { return 4 }
    }
    render() {
        return (
            <div className={classes.Layout}>

                <Filter
                    updateData={this.updateData}
                />


                <Result
                    updatePrice={this.updatePrice}
                    filterDirection={this.filterDirection}
                    filterCarrier={this.filterCarrier}
                    sortByPrice={this.sortByPrice}
                />
                <div className='center'>
                    <button >Показать еще</button>
                </div>

            </div>
        )
    }
}
export default Layout