

class App extends React.Component {
    state = {name: 'johnson',
            age: 30
    }
    handleChange = (e) => {
        this.setState({
            name: e.target.value
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log('form submited '+this.state.name);
    }

    render(){
        return (
            <div className="app-content" >
                <h1>myReact Home</h1>
                <p>My and is {this.state.name} and i am {this.state.age} years old</p>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" onChange={this.handleChange}/>
                    <button>submit</button>
                </form>
            </div>
        )
    }
}
ReactDOM.render(<App /> , document.getElementById('app'));