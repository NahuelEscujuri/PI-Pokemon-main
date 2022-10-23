import { Link } from "react-router-dom";
import './styles/nav-style.css'


export default function Nav(){

    return(
        <div>
            <header>
		{/* <!-- Nav --> */}
		<div className="nav container">
			{/* <!-- Logo --> */}
            <Link className="logo" to={"/pokemons"}>
				Henry<span className='span1'>Pokemons</span>
				</Link>
			{/* <!-- Nav Icons -->			 */}
			<div className="nav-icons">
				<Link to={"/pokemons/create"} className="btn bx-ball" id="bell-icon">Create</Link>
			</div>
		</div>
        	</header>
        </div>
    )

}