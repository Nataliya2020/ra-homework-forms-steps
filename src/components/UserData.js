import edit from './edit.png';
import del from './del.png';
import PropTypes from 'prop-types';

function UserData(item) {
  const {date, distant} = item.item;

  const handleClick = (evt) => {
    let valueDate = evt.target.closest('tr').querySelector('#date').textContent;

    item.handleRemove(valueDate);
  }

  const handleCLickEdit = (evt) => {
    let valueDate = evt.target.closest('tr').querySelector('#date').textContent;
    let valueDist = evt.target.closest('tr').querySelector('#distant').textContent;

    item.handleGetData(valueDate, valueDist);
  }

  return (
    <tr>
      <td className={"dataTD"} id={"date"}>{date}</td>
      <td className={"dataTD"} id={"distant"}>{distant}</td>
      <td className={"dataTD"}>
        <div className={"control"}>
          <div className={"control-elem"}>
            <img className={"icon-control"} src={edit} alt={"control-icon"} onClick={handleCLickEdit}/>
          </div>
          <div className={"control-elem"}>
            <img className={"icon-control"} src={del} alt={"control-icon"} onClick={handleClick}/>
          </div>
        </div>
      </td>
    </tr>
  )
}

UserData.propTypes = {
  date: PropTypes.string,
  distant: PropTypes.string
}

UserData.defaultProps = {
  date: '',
  distant: ''
}

export default UserData;
