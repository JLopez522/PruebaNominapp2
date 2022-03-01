import { useState } from 'react';
import { Loading } from '../components/loading';
import { Message } from '../components/message';
import { useUser } from '../screen/home';
import Utils from '../utils/utils';

export default function Profile(props) {

    const [viewSelected, setViewSelected] = useState('Body');
    const [textMessage, setTextMessage] = useState('');
    const [typeMessage, setTypeMessage] = useState('');

    let documento = '';
    let password = '';

    if (props.user) {
        documento = props.user.documento;
        password = props.user.password;
    }

    function getView() {

        var module;

        switch (viewSelected) {
            case 'Body':
                module = getViewBody()
                break;
            case 'Loading':
                module = <Loading />
                break;
            case 'Message':
                module = <Message
                    setViewSelected={setViewSelected}
                    textMessage={textMessage}
                    typeMessage={typeMessage}
                />
                break;
        }

        return module;
    }

    function getViewBody() {
        return (
            <div className="margin-medium margin-large margin-extra-large margin-grande">
                <div className="content-title-body">
                    <div className="col-12 col-s-12">
                        <div className="content-title-text">
                            <div>
                                <span>Información del usuario</span>
                                <div className="content-separator"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-body">
                    <div className="col-3 col-s-3">
                        <div className="content-option-form">
                            <input id="Text_Documento" type="text" value={documento} className="input-text" maxLength={4} spellCheck="false" placeholder="Documento" autoComplete="off" disabled />
                        </div>
                    </div>
                    <div className="col-9 col-s-9">
                        <div className="content-option-form">
                            <input id="Text_Password" type="password" value={password} className="input-text" maxLength={50} spellCheck="false" placeholder="Password" autoComplete="off" disabled />
                        </div>
                    </div>
                    <div className="col-12 col-s-12">
                        <div className="content-body-information">
                            <span>Si tienes alguna duda sobre todos los campos que aparecen en la parte superior, comunícalo al administrador del sistema</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return getView();
}