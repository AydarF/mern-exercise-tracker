import React, { Component } from 'react';
import axios from 'axios';

export default class ExercisesList extends Component {
    constructor(props){
        super(props);
        this.state = {
            exercises: [] 
        };

        this.deleteExercise = this.deleteExercise.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:8080/exercises/')
            .then(response => {
                this.setState({
                    exercises: response.data
                })
            }).catch(error => {
                console.log('Error: ', error);
            });
    }

    deleteExercise(id){
        axios.delete('http://localhost:8080/exercises/'+id)
            .then(res => console.log(res.data));

            this.setState({
                exercises: this.state.exercises.filter(el => el._id !==id)
            })
    }

    render() {
        return (
            <div>
                <p>You are on the Exercises List Component</p>
            </div>
        )
    }
}