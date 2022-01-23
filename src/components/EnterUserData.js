import {useState} from "react";
import PropTypes from 'prop-types';

function EnterUserData(props) {

  const [dateLink, setDateLink] = useState(false);
  const [distantLink, setDistantLink] = useState(false);
  const [dateError, setDateError] = useState("Введите дату");
  const [distantError, setDistantError] = useState("Введите количество километров");

  const changeDate = (evt) => {

    setDateError("");
    if (evt.target.value.length === 10 && /^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](19|20)\d\d$/.test(evt.target.value)) {
      setDateError("");
      setDateLink(false)
    }
    props.handleData(evt);
  }

  const changeDistant = (evt) => {
    if (!/^[0-9]*[.,]?[0-9]+$/.test(evt.target.value)) {
      setDistantLink(true)
      setDistantError('Вводите только цифры');

      if (evt.target.value === '') {
        setDistantError('Введите количество километров');
      }
    } else {
      setDistantLink(false);
      setDistantError("");
    }
    props.handleData(evt);
  }

  const blurHandler = (evt) => {
    switch (evt.target.name) {
      case 'date':
        setDateLink(true);
        break;
      case 'distant':
        setDistantLink(true);
        break;

      default:
        return;
    }
  }

  const handleSubmit = evt => {
    evt.preventDefault();

    setDateError("");
    if (props.item.date && /^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](19|20)\d\d$/.test(props.item.date)) {
      setDateError("");
      setDateLink(false)
    } else {
      setDateLink(true);
      setDateError("Введите корректную дату");
      return;
    }

    setDistantError("");
    if (props.item.distant === "") {
      setDistantLink(true);
      setDistantError("Введите количество километров");
      return;
    } else if (!/^[0-9]*[.,]?[0-9]+$/.test(props.item.distant)) {
      setDistantLink(true);
      setDistantError("Вводите только цифры");
      return;
    } else {
      setDistantError("");
      setDistantLink(false);
    }

    props.handleSwitch(true);

    if (props.item.edit) {
      props.handleEdit(props.item.date, props.item.distant);
      return;
    }
    props.handleElem();
  }

  return (
    <>
      <form className={"form-data"} onSubmit={handleSubmit} noValidate>
        <table className={"table"}>
          <thead>
          <tr>
            <th>Дата (ДД.ММ.ГГГГ)</th>
            <th>Пройдено км</th>
            <th/>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <label>
                <span className="visually-hidden">Поле ввода даты</span>
                {(dateLink && dateError) && <div className={"error"}>{dateError}</div>}
                <input className={"enter-data"}
                       name={"date"}
                       value={props.item.date}
                       onChange={changeDate}
                       required={"required"}
                       onBlur={evt => blurHandler(evt)}
                />
              </label></td>
            <td>
              <label>
                <span className="visually-hidden">Поле ввода расстояния</span>
                {(distantLink && distantError) && <div className={"error"}>{distantError}</div>}
                <input className={"enter-data"}
                       name={"distant"}
                       value={props.item.distant}
                       onChange={changeDistant}
                       required={"required"}
                       onBlur={evt => blurHandler(evt)}
                />
              </label></td>
            <td>
              <button className={"button"} type="submit">OK</button>
            </td>
          </tr>
          </tbody>
        </table>
      </form>
    </>
  );
}

EnterUserData.propTypes = {
  props: PropTypes.shape({
    date: PropTypes.string,
    distant: PropTypes.string,
    handleData: PropTypes.func,
    handleEdit: PropTypes.func,
    handleElem: PropTypes.func,
    handleSwitch: PropTypes.func
  })
}

EnterUserData.defaultProps = {
  date: '',
  distant: '',
  handleData: () => {},
  handleEdit: () => {},
  handleElem: () => {},
  handleSwitch: () => {}
}

export default EnterUserData;
