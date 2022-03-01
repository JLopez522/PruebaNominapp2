
import '../style/components/message.style.css';
import IconMessage from '../assets/Imagen/svg/001-medal.svg';

export function Message(props) {

    return (
        <div className="content-message">
            <div id="Content_Meesage">
                <div className="card-message">
                    <div className="card-img-message">
                        <div>
                            <img src={IconMessage} />
                        </div>
                    </div>
                    <div className="card-body">
                        <span id="Text_Message_Title">¡Oopps!, ocurrió un problema</span>
                        <div className="content-separator-card"></div>
                        <div className="content-form">
                            <div className="col-12">
                                <p id="Text_Message_Body" >{props.textMessage}</p>
                            </div>
                            <div className="col-12">
                                <button id="Button_Message_Aceptar" className="button-general"
                                    onClick={() => {
                                        props.setViewSelected('Body')
                                    }}>
                                    <label>Aceptar</label>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}