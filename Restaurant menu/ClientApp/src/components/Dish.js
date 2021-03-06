﻿import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Card, CardHeader, CardTitle, CardSubtitle, CardBody, CardFooter, FormGroup, Label, Input, Button, Alert, CardText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Open from '../img/open.svg';
import Edit from '../img/edit.svg';
import Delete from '../img/delete.svg';

const Dish = (props) => {
    //View
    const [viewModal, setViewModal] = useState(false);
    const toggleViewModal = () => setViewModal(!viewModal);

    //Edit
    const [editModal, setEditModal] = useState(false);
    const toggleEditModal = () => setEditModal(!editModal);

    const [globalAlertDisplay, setGlobalAlertDisplay] = useState("none");
    const [globalAlertText, setGlobalAlertText] = useState("");
    const [globalAlertColor, setGlobalAlertColor] = useState("success");

    const [editedName, setEditedName] = useState(props.dish.name);
    const changeEditedName = (event) => setEditedName(event.target.value);
    const [nameAlertText, setNameAlertText] = useState(null);
    const [nameAlertDisplay, setNameAlertDisplay] = useState("none");

    const [editedIngredients, setEditedIngredients] = useState(props.dish.ingredients);
    const changeEditedIngredients = (event) => setEditedIngredients(event.target.value);
    const [ingredientsAlertText, setIngredientsAlertText] = useState(null);
    const [ingredientsAlertDisplay, setIngredientsAlertDisplay] = useState("none");

    const [editedDescription, setEditedDescription] = useState(props.dish.ingredients);
    const changeEditedDescription = (event) => setEditedDescription(event.target.value);
    const [descriptionAlertText, setDescriptionAlertText] = useState(null);
    const [descriptionAlertDisplay, setDescriptionAlertDisplay] = useState("none");

    const [editedCost, setEditedCost] = useState(props.dish.cost);
    const changeEditedCost = (event) => setEditedCost(event.target.value);
    const [costAlertText, setCostAlertText] = useState(null);
    const [costAlertDisplay, setCostAlertDisplay] = useState("none");

    const [editedWeight, setEditedWeight] = useState(props.dish.weight);
    const changeEditedWeight = (event) => setEditedWeight(event.target.value);
    const [weightAlertText, setWeightAlertText] = useState(null);
    const [weightAlertDisplay, setWeightAlertDisplay] = useState("none");

    const [editedCalories, setEditedCalories] = useState(props.dish.calories);
    const changeEditedCalories = (event) => setEditedCalories(event.target.value);
    const [caloriesAlertText, setCaloriesAlertText] = useState(null);
    const [caloriesAlertDisplay, setCaloriesAlertDisplay] = useState("none");

    const [editedCoockingTime, setEditedCoockingTime] = useState(props.dish.coockingTime);
    const changeEditedCoockingTime = (event) => setEditedCoockingTime(event.target.value);
    const [coockingTimeAlertText, setCoockingTimeAlertText] = useState(null);
    const [coockingTimeAlertDisplay, setCoockingTimeAlertDisplay] = useState("none");

    const resetAlerts = () => {
        setGlobalAlertDisplay("none");
        setGlobalAlertText(null);

        setNameAlertDisplay("none");
        setNameAlertText(null);

        setIngredientsAlertDisplay("none");
        setIngredientsAlertText(null);

        setDescriptionAlertDisplay("none");
        setDescriptionAlertText(null);

        setCostAlertDisplay("none");
        setCostAlertText(null);

        setWeightAlertDisplay("none");
        setWeightAlertText(null);

        setCaloriesAlertDisplay("none");
        setCaloriesAlertText(null);

        setCoockingTimeAlertDisplay("none");
        setCoockingTimeAlertText(null);
    };

    const editDish = async () => {
        resetAlerts();

        let url = "https://localhost:44334/api/dish/";

        props.setLoadScreen(true);

        let resp = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                Id: props.dish.id,
                Name: editedName,
                Ingredients: editedIngredients,
                Description: editedDescription,
                Cost: parseInt(editedCost),
                Weight: parseInt(editedWeight),
                Calories: parseInt(editedCalories),
                CoockingTime: parseInt(editedCoockingTime)
            })
        });

        props.setLoadScreen(false);

        if (resp.ok) {
            setGlobalAlertColor("success");
            setGlobalAlertDisplay("block");
            setGlobalAlertText("Данные обновлены");
            props.update();
        } else if (resp.status === 500) {
            let text = await resp.text();
            setGlobalAlertColor("danger");
            setGlobalAlertDisplay("block");
            setGlobalAlertText(text);
        } else {
            let errData = await resp.json();

            if (errData["Name"]) {
                setNameAlertDisplay("block");
                setNameAlertText(errData["Name"]);
            }

            if (errData["Ingredients"]) {
                setIngredientsAlertDisplay("block");
                setIngredientsAlertText(errData["Ingredients"]);
            }

            if (errData["Description"]) {
                setDescriptionAlertDisplay("block");
                setDescriptionAlertText(errData["Description"]);
            }

            if (errData["Cost"]) {
                setCostAlertDisplay("block");
                setCostAlertText(errData["Cost"]);
            }

            if (errData["Weight"]) {
                setWeightAlertDisplay("block");
                setWeightAlertText(errData["Weight"]);
            }

            if (errData["Calories"]) {
                setCaloriesAlertDisplay("block");
                setCaloriesAlertText(errData["Calories"]);
            }

            if (errData["CoockingTime"]) {
                setCoockingTimeAlertDisplay("block");
                setCoockingTimeAlertText(errData["CoockingTime"]);
            }
        }
    }

    useEffect(() => {
        const resetEdit = () => {
            setGlobalAlertDisplay("none");
            setGlobalAlertText(null);

            setEditedName(props.dish.name);
            setNameAlertDisplay("none");
            setNameAlertText(null);

            setEditedIngredients(props.dish.ingredients);
            setIngredientsAlertDisplay("none");
            setIngredientsAlertText(null);

            setEditedDescription(props.dish.description);
            setDescriptionAlertDisplay("none");
            setDescriptionAlertText(null);

            setEditedCost(props.dish.cost);
            setCostAlertDisplay("none");
            setCostAlertText(null);

            setEditedWeight(props.dish.weight);
            setWeightAlertDisplay("none");
            setWeightAlertText(null);

            setEditedCalories(props.dish.calories);
            setCaloriesAlertDisplay("none");
            setCaloriesAlertText(null);

            setEditedCoockingTime(props.dish.coockingTime);
            setCoockingTimeAlertDisplay("none");
            setCoockingTimeAlertText(null);
        };

        resetEdit();
    }, [editModal])

    //Delete
    const [deleteModal, setDeleteModal] = useState(false);
    const toggleDeleteModal = () => setDeleteModal(!deleteModal);

    const deleteDish = async () => {
        let url = "https://localhost:44334/api/dish/"

        props.setLoadScreen(true);

        await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: props.dish.id
        });

        props.setLoadScreen(false);
        console.log("update");
        props.update();
    }

    const parseCoockingTime = () => {
        let hours = (props.dish.coockingTime / 60);
        let rhours = Math.floor(hours);
        let minutes = (hours - rhours) * 60;
        let rminutes = Math.round(minutes);
        return rhours + " час : " + rminutes + " мин";
    }

    const parseCalories = () => {
        return props.dish.calories / 100 * props.dish.weight;
    }

    const parseCreateDate = () => {
        let unixTime = Date.parse(props.dish.createDate);
        return new Date(unixTime).toLocaleString();
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{props.dish.name}</CardTitle>
            </CardHeader>
            <CardBody>
                <CardSubtitle>Дата создания</CardSubtitle>
                <CardText>{parseCreateDate()}</CardText>
                <CardSubtitle>Состав</CardSubtitle>
                <CardText>{props.dish.ingredients}</CardText>
                <CardSubtitle>Описание</CardSubtitle>
                <CardText>{props.dish.description}</CardText>
                <CardSubtitle>Цена</CardSubtitle>
                <CardText>{props.dish.cost}</CardText>
                <CardSubtitle>Вес</CardSubtitle>
                <CardText>{props.dish.weight}</CardText>
                <CardSubtitle>Калорийность</CardSubtitle>
                <CardText>{parseCalories()}</CardText>
                <CardSubtitle>Время приготовления</CardSubtitle>
                <CardText>{parseCoockingTime()}</CardText>
            </CardBody>
            <CardFooter className="d-flex justify-content-between">
                {/* View */}
                <Button color="white" onClick={toggleViewModal} >
                    <img className="p-1" src={Open} />
                </Button>
                <Modal isOpen={viewModal} >
                    <ModalHeader>
                        {props.dish.name}
                    </ModalHeader>
                    <ModalBody>
                        <p>Дата создания</p>
                        <p>{parseCreateDate()}</p>
                        <p>Состав</p>
                        <p>{props.dish.ingredients}</p>
                        <p>Описание</p>
                        <p>{props.dish.description}</p>
                        <p>Цена</p>
                        <p>{props.dish.cost}</p>
                        <p>Вес</p>
                        <p>{props.dish.weight}</p>
                        <p>Калории</p>
                        <p>{props.dish.calories}</p>
                        <p>Время приготовления</p>
                        <p>{props.dish.coockingTime}</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggleViewModal}>Закрыть</Button>
                    </ModalFooter>
                </Modal>
                {/* Edit */}
                <Button color="white" onClick={toggleEditModal} >
                    <img className="p-1" src={Edit} />
                </Button>
                <Modal isOpen={editModal} >
                    <ModalHeader><p>Изменение <span className="font-weight-bold">{props.dish.name}</span></p></ModalHeader>
                    <ModalBody>
                        <Alert className="mt-2" color={globalAlertColor} style={{ display: globalAlertDisplay }}>{globalAlertText}</Alert>
                        <FormGroup>
                            <Label>Имя</Label>
                            <Input type="text" defaultValue={props.dish.name} onChange={changeEditedName} />
                            <Alert className="mt-2" color="danger" style={{ display: nameAlertDisplay }}>{nameAlertText}</Alert>
                        </FormGroup>
                        <FormGroup>
                            <Label>Состав</Label>
                            <Input type="text" defaultValue={props.dish.ingredients} onChange={changeEditedIngredients} />
                            <Alert className="mt-2" color="danger" style={{ display: ingredientsAlertDisplay }}>{ingredientsAlertText}</Alert>
                        </FormGroup>
                        <FormGroup>
                            <Label>Описание</Label>
                            <Input type="textarea" defaultValue={props.dish.description} onChange={changeEditedDescription} />
                            <Alert className="mt-2" color="danger" style={{ display: descriptionAlertDisplay }}>{descriptionAlertText}</Alert>
                        </FormGroup>
                        <FormGroup>
                            <Label>Цена</Label>
                            <Input type="text" defaultValue={props.dish.cost} onChange={changeEditedCost} />
                            <Alert className="mt-2" color="danger" style={{ display: costAlertDisplay }}>{costAlertText}</Alert>
                        </FormGroup>
                        <FormGroup>
                            <Label>Вес</Label>
                            <Input type="text" defaultValue={props.dish.weight} onChange={changeEditedWeight} />
                            <Alert className="mt-2" color="danger" style={{ display: weightAlertDisplay }}>{weightAlertText}</Alert>
                        </FormGroup>
                        <FormGroup>
                            <Label>Калорийность</Label>
                            <Input type="text" defaultValue={props.dish.calories} onChange={changeEditedCalories} />
                            <Alert className="mt-2" color="danger" style={{ display: caloriesAlertDisplay }}>{caloriesAlertText}</Alert>
                        </FormGroup>
                        <FormGroup>
                            <Label>Время приготовления</Label>
                            <Input type="text" defaultValue={props.dish.coockingTime} onChange={changeEditedCoockingTime} />
                            <Alert className="mt-2" color="danger" style={{ display: coockingTimeAlertDisplay }}>{coockingTimeAlertText}</Alert>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={editDish}>Сохранить</Button>
                        <Button color="primary" onClick={toggleEditModal}>Закрыть</Button>
                    </ModalFooter>
                </Modal>
                {/* Delete */}
                <Button color="white" onClick={toggleDeleteModal} >
                    <img className="p-1" src={Delete} />
                </Button>
                <Modal isOpen={deleteModal} >
                    <ModalBody>
                        <p>Вы действительно хотите удалить блюдо <span className="font-weight-bold">{props.dish.name}</span>?</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={deleteDish} > Да</Button>
                        <Button color="primary" onClick={toggleDeleteModal}>Нет</Button>
                    </ModalFooter>
                </Modal>
            </CardFooter>
        </Card>
    );
}

export default Dish;