export default function Imager(props) {
    return (
        <div className="project">
            <img src={props.imgUrl} alt="final" className="finalImg"/>
        </div>
    )
}