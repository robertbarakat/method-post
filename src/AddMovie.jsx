import React, { Component } from 'react';
import './AddMovie.css';


class AddMovie extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            poster: '',
            comment: ''
        }
        this.onChange = this.onChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    submitForm(event) {
        event.preventDefault();
        fetch("http://92.175.11.66:3001/api/quests/movies/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        }).then(res => res.json())
        .then(res => {
          if (res.error) {
            alert(res.error);
          } else {
            alert(`Film ajouté avec l'ID ${res}!`);
          }
        }).catch(e => {
          console.error(e);
          alert('Erreur lors de l\'ajout d\'un film');
        });
    }

    render() {
        return (
            <div className="formulaire">
                <h1>Saisie d'un film</h1>
                <form onSubmit={this.submitForm}>
                    <fieldset>
                        <legend>Informations</legend>
                        <div>
                            <label htmlFor="name">Nom</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                onChange={this.onChange}
                                value={this.state.name}
                            />
                        </div>
                        <div>
                            <label htmlFor="poster">Poster</label>
                            <input
                                type="text"
                                id="poster"
                                name="poster"
                                onChange={this.onChange}
                                value={this.state.poster}
                            /></div>
                        <div>
                            <label htmlFor="comment">Commentaire</label>
                            <textarea
                                rows="4" 
                                cols="50"
                                id="comment"
                                name="comment"
                                onChange={this.onChange}
                                value={this.state.comment}
                            /></div>
                        <hr />
                        <div>
                            <input type="submit" value="Envoyer" />
                        </div>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default AddMovie;