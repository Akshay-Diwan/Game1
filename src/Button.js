
export function Button({value, handleClick, Mode}){

   
    return(
    <button className = {"boxes " + Mode} onClick={handleClick}>{value}</button>
);
}