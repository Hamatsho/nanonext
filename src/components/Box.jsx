import { NavLink } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
 export function Box(props) {
  return (
    <div className='box1'
    style={{width:props.width? props.width :"350px"}}
    >
        <div className="imgParent" >
          <img src={props.img} alt='img'/>
        </div>
        <h3>{props.title}</h3>
   <p>{props.desc} </p>
    <NavLink
    to="web"
    >
      More...
    </NavLink>
    </div>
  )
}
const bg = 'linear-gradient(to right, var(--sec-color) , var(--bg-opacity),var(--sec-color) )'

export function SkBox() {
  return (
    <div className='skBox'>
       <Skeleton  
          containerClassName='skBox'
          customHighlightBackground={bg}
          height={100} width={"100%"}
      />
       <Skeleton containerClassName='skBox'
          customHighlightBackground={bg}
          height={30} width={200} 
       />
       <Skeleton containerClassName='skBox'
           customHighlightBackground={bg}
           height={100} width={"100%"}
        />
       <Skeleton containerClassName='skBox'
            customHighlightBackground={bg}
            height={30} width={100} 
       />
    </div>
  )
}