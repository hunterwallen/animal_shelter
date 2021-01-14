class App extends React.Component {
  state = {
    name: "",
    type: "",
    breed: "",
    image: "",
    description: "",
    reservedForAdoption: false,
    animals: []
  }
  componentDidMount = () => {
    axios.get('/animals').then(response => {
      this.setState({
        animals: response.data
      })
    })
  }
  changeState = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }
  showNewForm = (event) => {
    let editForm = event.target.lastChild
    if(editForm.style.display === 'none') {
      event.target.lastChild.style.display = 'block'
    } else {
      event.target.lastChild.style.display = 'none'
      this.setState({
        name: "",
        type: "",
        breed: "",
        image: "",
        description: "",
        reservedForAdoption: false
      })
      event.target.lastChild.reset()
    }
  }
  showNewFormTitle = (event) => {
    let editForm = event.target.nextSibling
    if(editForm.style.display === 'none') {
      event.target.nextSibling.style.display = 'block'
    } else {
      event.target.nextSibling.style.display = 'none'
      this.setState({
        name: "",
        type: "",
        breed: "",
        image: "",
        description: "",
        reservedForAdoption: false
      })
      event.target.nextSibling.reset()
    }
  }
  addAnimal = (event) => {
    event.preventDefault()
    event.target.reset()
    if(this.state.name !== '' && this.state.image !== '' && this.state.type !== "" && this.state.breed !== "" && this.state.description !== ""){
      axios.post('/animals', this.state).then(response => {
        this.setState({
          name: "",
          type: "",
          breed: "",
          image: "",
          description: "",
          reservedForAdoption: false,
          animals: response.data
        })
      })
    } else {
      this.setState({
        name: "",
        type: "",
        breed: "",
        image: "",
        description: "",
        reservedForAdoption: false
      })
      }
    }
  reservedAnimal = (event) => {
    axios.put('/animals/reservation/' + event.target.id).then(response => {
      this.setState({
        name: "",
        type: "",
        breed: "",
        image: "",
        description: "",
        reservedForAdoption: false,
        animals: response.data
      })
    })
    event.target.parentElement.style.display = 'none'
  }
  adoptedAnimal = (event) => {
    axios.delete('/animals/' + event.target.id).then(response => {
      this.setState({
        name: "",
        type: "",
        breed: "",
        image: "",
        description: "",
        reservedForAdoption: false,
        animals: response.data
      })
    })
  }
  showEdit = (event) => {
    let editForm = event.target.nextSibling
    if(editForm.style.display === 'none') {
      event.target.nextSibling.style.display = 'flex'
      let form = event.target.nextSibling
      this.setState({
          name: form.querySelector('#name').value,
          type: form.querySelector('#type').value,
          breed: form.querySelector('#breed').value,
          image: form.querySelector('#image').value,
          description: form.querySelector('#description').value
        })
      } else {
      event.target.nextSibling.style.display = 'none'
      this.setState({
        name: "",
        type: "",
        breed: "",
        image: "",
        description: "",
        reservedForAdoption: false
      })
    }
  }
  updateAnimal = (event) => {
    event.preventDefault()
    let searchBy = event.target.id
    axios.put('/animals/' + event.target.id, this.state).then(response => {
      this.setState({
        name: "",
        type: "",
        breed: "",
        image: "",
        description: "",
        reservedForAdoption: false,
        animals: response.data
      })
    })
    event.target.parentElement.style.display = 'none'
    }
  render = () => {
    return(
      <div>
        <div className='addAnimalDiv' onClick={this.showNewForm}>
          <h2 onClick={this.showNewFormTitle}>Create Adoption Posting</h2>
          <form onSubmit={this.addAnimal} id='addAnimalForm' style={{display: 'none'}}>
            <label htmlFor='name'>Name</label><br />
            <input type='text' id='name' onChange={this.changeState}/>
            <br />
            <label htmlFor='type'>Type</label><br />
            <select id='type' onChange={this.changeState}>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Puppy">Puppy</option>
              <option value="Kitten">Kitten</option>
            </select>
            <br />
            <label htmlFor='breed'>Breed</label><br />
            <input type='text' id='breed' onChange={this.changeState}/>
            <br />
            <label htmlFor='image'>Image</label><br />
            <input type='text' id='image' onChange={this.changeState}/>
            <br />
            <label htmlFor='description'>About Me</label><br />
            <input type='text' id='description' onChange={this.changeState}/>
            <br />
            <input type='submit' value='Add To Page'/>
          </form>
        </div>
        <div className='animalsDiv'>
          <h2 className="title">Animals Currently Up For Adoption</h2>
          <ul>
            {this.state.animals.map((animal) => {
              return (
                <li key={animal._id}>
                  <h4>{animal.name}</h4>
                  <p>{animal.type} - {animal.breed}</p>
                  <img src={animal.image}/>
                  <p>{animal.description}</p>
                  {(animal.reservedForAdoption) ? <h5 className='red'>{animal.name} is reserved for adoption</h5> : <h5 className='green'>{animal.name} is available for adoption</h5>}
                  <div className="editAnimal">
                    <button onClick={this.showEdit}>Edit</button>
                    <div style={{display: 'none'}}>
                      <form onSubmit={this.updateAnimal} id={animal._id} className="updateAnimalForm">
                        <label htmlFor='name'>Name</label>
                        <input type='text' id='name' onClick={this.changeState} defaultValue={animal.name}/>
                        <br />
                        <label htmlFor='type'>Type</label>
                        <select id='type' onChange={this.changeState} defaultValue={animal.type}>
                          <option value="Dog">Dog</option>
                          <option value="Cat">Cat</option>
                          <option value="Puppy">Puppy</option>
                          <option value="Kitten">Kitten</option>
                        </select>
                        <br />
                        <label htmlFor='breed'>Breed</label>
                        <input type='text' id='breed' onChange={this.changeState} defaultValue={animal.breed}/>
                        <br />
                        <label htmlFor='image'>Image</label>
                        <input type='text' id='image' onChange={this.changeState} defaultValue={animal.image}/>
                        <br />
                        <label htmlFor='description'>About Me</label>
                        <input type='text' id='description' onChange={this.changeState} defaultValue={animal.description}/>
                        <br />
                        <input type='submit' value='Update Animal' id='submitButton'/>
                      </form>
                      {(animal.reservedForAdoption) ? <button onClick={this.reservedAnimal} id={animal._id}>Cancel Adoption Reservation</button> : <button onClick={this.reservedAnimal} id={animal._id}>Reserve for Adoption</button>}
                      <button onClick={this.adoptedAnimal} id={animal._id}>Found a new home!</button>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}


ReactDOM.render(<App></App>, document.querySelector('main'))
