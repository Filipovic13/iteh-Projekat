import React,{Component} from 'react';
import { BsJournalArrowDown } from 'react-icons/bs';
import companyLogo from './judoo.jpg';

class Rating extends Component{
	constructor(props){
		super(props);
		this.state = {
			languages : [
				{name: "Brazilian Jiu-Jitsu", votes: 0},
				{name: "Judo", votes: 0},
				{name: "Sambo ", votes: 0},
				{name: "Muay Thai", votes: 0}
			]
		}
	}

	vote (i) {
		let newLanguages = [...this.state.languages];
		newLanguages[i].votes++;
		function swap(array, i, j) {
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		this.setState({languages: newLanguages});
		
	}

	render(){
		return(
			<>
<h2>Vote for your favorite grappling sport!</h2>
<div className="languages">
<img src={companyLogo} alt="BigCo Inc. logo"/>
			{
                        
			this.state.languages.map((lang, i) => 
            
		<div key={i} className="language">
		<div className="voteCount">
									{lang.votes}
								</div>
<div className="languageName">
								{lang.name}
								</div>
								<button onClick={this.vote.bind(this, i)}>Click Here</button>
	</div>
	)}
	</div>
        </>
	);
	}
}
export default Rating;


