﻿import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Collapse, Card, CardBody, FormGroup, Label, Input, Button } from 'reactstrap';

function DishForm(props) {
    const cardStyle = {
        width: "100%"
    };

    const buttonStyle = {
        width: "200px",
    };

    const toggleStyle = {
        width: "200px",
        marginBottom: "1rem"
    };

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [name, setName] = useState(null);
    const changeName = (event) => setName(event.target.value);

    const [description, setDescription] = useState(null);
    const changeDescription = (event) => setDescription(event.target.value);

    const [cost, setCost] = useState(null);
    const changeCost = (event) => setCost(parseInt(event.target.value));

    const [weight, setWeight] = useState(null);
    const changeWeight = (event) => setWeight(parseInt(event.target.value));

    const [calories, setCalories] = useState(null);
    const changeCalories = (event) => setCalories(parseInt(event.target.value));

    const [coockingTime, setCoockingTime] = useState(null);
    const changeCoockingTime = (event) => setCoockingTime(parseInt(event.target.value));

    const createDish = () => {
        if (name || description || cost || weight ||
            calories || coockingTime) {

            let dish = {
                Name: name,
                Description: description,
                Cost: cost,
                Weight: weight,
                Calories: calories,
                CoockingTime: coockingTime
            }

            props.createDish(dish);
        }
    };

    return (
        <Card style={cardStyle} >
            <CardBody>
                <Button color="primary" onClick={toggle} style={toggleStyle}>Create dish</Button>
                <Collapse isOpen={isOpen} >
                    <FormGroup>
                        <Label for="nameForm">Name</Label>
                        <Input type="text" id="nameForm" placeholder="Name" onChange={changeName} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="descriptionForm">Description</Label>
                        <Input type="textarea" id="descriptionForm" placeholder="Description" onChange={changeDescription} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="costForm">Cost</Label>
                        <Input type="text" id="costForm" placeholder="Cost" onChange={changeCost} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="weightForm">Weight</Label>
                        <Input type="text" id="weightForm" placeholder="Weight" onChange={changeWeight} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="caloriesForm">Calories</Label>
                        <Input type="text" id="caloriesForm" placeholder="Calories" onChange={changeCalories} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="coockingTimeForm">Coocking time</Label>
                        <Input type="text" id="coockingTimeForm" placeholder="Coocking time" onChange={changeCoockingTime} />
                    </FormGroup>
                    <FormGroup>
                        <Button color="success" style={buttonStyle} onClick={createDish} >Create</Button>
                    </FormGroup>
                </Collapse>
            </CardBody>
        </Card>
    )
}

export default DishForm;