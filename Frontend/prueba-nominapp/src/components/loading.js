
import '../style/components/loading.style.css';
import GifLoading from '../assets/Imagen/Cargador.gif';

export function Loading() {

    return (
        <div className="content-loading">
            <div>
                <img src={GifLoading} />
            </div>
        </div>
    );
}