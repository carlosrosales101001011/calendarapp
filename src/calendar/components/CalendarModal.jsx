import { addHours, differenceInSeconds } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import Modal from 'react-modal';
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import { useCalendarStore, useUiStore } from '../../hooks';
registerLocale("es", es)




const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#root');


export const CalendarModal = () => {

    const { isDateModalOpen, closeDateModal } = useUiStore()
    const [formSubmitted, setformSubmitted] = useState(false)
    const {activeEvent, startSavingEvent} = useCalendarStore()
    
    const [formValues, setformValues] = useState({
        title: 'Carlos',
        notes: 'Rosales',
        start: new Date(),
        end: addHours(new Date(), 2),
    })
    
        const titleClass = useMemo(() => 
            {
                if (!formSubmitted) return '';
    
                return (formValues.title.length>0)?'is-valid': 'is-invalid';
            }
        , [formValues.title, formSubmitted])

    useEffect(() => {
        if(activeEvent!==null){
            setformValues({...activeEvent})
        }
    }, [activeEvent])
    
    const onInputChange = ({target}) => {
        setformValues({
            ...formValues,
            [target.name]: target.value
        })
    }
    const onDateChanged=(event, changing)=>{
        setformValues({
            ...formValues,
            [changing]: event
        })
    }

    const onCloseModal = () => {
        console.log('cerrando');
        closeDateModal()
    }
    const onSubmit = async(e) => {
        e.preventDefault()
        setformSubmitted(true)
        const different = differenceInSeconds(formValues.end, formValues.start)
        if ( isNaN(different) || different<=0){
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas')
            return;
        }
        if (formValues.title.length<=0) {
            return;
        }
        console.log(formValues);
        
        

        await startSavingEvent(formValues)
        closeDateModal()
        setformSubmitted(false)
    
    }

  return (
    <Modal
        isOpen={isDateModalOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        className='modal'
        overlayClassName={"modal-fondo"}
        closeTimeoutMS={200}
        
    >
    <h1> Nuevo evento </h1>
<hr />
<form className="container" onSubmit={onSubmit}>

    <div className="form-group mb-2">
        <label>Fecha y hora inicio</label>
        <ReactDatePicker  
            minDate={new Date()}
            selected={formValues.start} 
            className="form-control" 
            onChange={(event)=>onDateChanged(event, 'start')}
            dateFormat="Pp"
            showTimeSelect
            locale={'es'}
            timeCaption='Hora'
            />
    </div>

    <div className="form-group mb-2">
        <label>Fecha y hora fin</label>
        <ReactDatePicker  
            minDate={formValues.start}
            selected={formValues.end} 
            className="form-control" 
            onChange={(event)=>onDateChanged(event, 'end')}
            dateFormat="Pp"
            showTimeSelect
            locale={'es'}
            timeCaption='Hora'
            />
    </div>

    <hr />
    <div className="form-group mb-2">
        <label>Titulo y notas</label>
        <input 
            type="text" 
            className={`form-control  ${titleClass}`}
            placeholder="T??tulo del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
        />
        <small id="emailHelp" className="form-text text-muted">Una descripci??n corta</small>
    </div>

    <div className="form-group mb-2">
        <textarea 
            type="text" 
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
        ></textarea>
        <small id="emailHelp" className="form-text text-muted">Informaci??n adicional</small>
    </div>

    <button
        type="submit"
        className="btn btn-outline-primary btn-block"
    >
        <i className="far fa-save"></i>
        <span> Guardar</span>
    </button>

</form>
    </Modal>
  )
}
