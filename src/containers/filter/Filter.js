import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import classes from './Filter.css'

class Filter extends Component {
    state = {
        formControls: {
            Up: {
                value: 0,
                type: 'number',
                label: 'От'
            },
            To: {
                value: 1000000,
                type: 'number',
                label: 'До'
            },
            oneDirections: {
                type: 'checkbox',
                label: '- Без пересадок',
                checked: false

            },
            twoDirections: {
                type: 'checkbox',
                label: '- 1 пересадка',
                checked: false

            },
            LOT: {
                type: 'checkbox',
                label: 'LOT Polish Airlines',
                checked: false
            },
            aeroflot: {
                type: 'checkbox',
                label: 'Аэрофлот - российские авиалинии',
                checked: false
            },
            sortPriceUp: {
                type: 'checkbox',
                label: '- по возрастанию цены',
                checked: false,
                name: 'sortPrice',
                value: 1
            },
            sortPriceDown: {
                type: 'checkbox',
                label: '- по убыванию цены',
                checked: false,
                name: 'sortPrice',
                value: 2
            }
        },

    }

    componentDidMount() {

    }
    submitHandler = event => {
        event.preventDefault()
    }

    onChangeHandler = (event, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }
        control.value = event.target.value
        control.checked = event.target.checked
        formControls[controlName] = control

        let upPrice = formControls.Up.value
        let toPrice = formControls.To.value
        let oneDirection = formControls.oneDirections.checked
        let twoDirections = formControls.twoDirections.checked
        let lot = formControls.LOT.checked
        let aeroflot = formControls.aeroflot.checked
        let sortPriceUp = formControls.sortPriceUp.checked
        let sortPriceDown = formControls.sortPriceDown.checked

        this.setState({
            formControls,
        })


        this.props.updateData(upPrice, toPrice, oneDirection, twoDirections, lot, aeroflot, sortPriceUp, sortPriceDown)

    }

    renderPriceInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            if (controlName === 'Up' || controlName === 'To') {
                return (
                    <Input
                        key={controlName + index}
                        type={control.type}
                        value={control.value}
                        label={control.label}
                        onChange={(event) => this.onChangeHandler(event, controlName)}
                    />
                )

            }
            else return null
        })
    }
    renderDirectionInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            if (controlName === 'oneDirections' || controlName === 'twoDirections') {
                return (
                    <Input
                        key={controlName + index}
                        name={control.name}
                        type={control.type}
                        value={control.value}
                        label={control.label}
                        checked={control.checked}
                        onChange={(event) => this.onChangeHandler(event, controlName)}
                    />
                )
            }
            else return null
        })
    }
    renderCarrierInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            if (controlName === 'LOT' || controlName === 'aeroflot') {
                return (
                    <Input
                        key={controlName + index}
                        name={control.name}
                        type={control.type}
                        value={control.value}
                        label={control.label}
                        checked={control.checked}
                        onChange={(event) => this.onChangeHandler(event, controlName)}
                    />
                )
            }
            else return null
        })
    }
    renderSortPriceInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]

            if (controlName === 'sortPriceUp' || controlName === 'sortPriceDown') {

                return (
                    <Input
                        key={controlName + index}
                        name={control.name}
                        type={control.type}
                        value={control.value}
                        label={control.label}
                        checked={control.checked}
                        onChange={(event) => this.onChangeHandler(event, controlName)}
                    />

                )
            }
            else return null
        })
    }
    render() {
        return (
            <div className={classes.Filter}>
                <div className='FilterWrapper'>
                    <div className='SortContainer'>
                        <form onSubmit={this.submitHandler}>
                            <p><b>Сортировать</b></p>
                            {this.renderSortPriceInputs()}

                        </form>
                    </div>
                    <div className='FLightTypeContainer'>
                        <form onSubmit={this.submitHandler}>
                            <p><b>Фильтровать</b></p>
                            {this.renderDirectionInputs()}
                        </form>

                    </div>
                    <div className='PriceContainer'>
                        <form onSubmit={this.submitHandler}>
                            <p><b>Цена</b></p>
                            <div>
                                {this.renderPriceInputs()}
                            </div>
                        </form>
                    </div>
                    <div className='CarrierContainer'>
                        <form onSubmit={this.submitHandler}>
                            <p><b>Авиакомпании</b></p>
                            {this.renderCarrierInputs()}
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Filter