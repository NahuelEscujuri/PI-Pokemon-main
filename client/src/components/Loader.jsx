import imgLoader from './imgs/loader.png';
import "./styles/loader-style.css"

export default function Loader(){
    return(
        <div className={`container-loading`}>
              <img src = {imgLoader} className={`loading `}/>
        </div>
    )
}