import EnterUserData from "./EnterUserData";
import UserData from './UserData';
import {useState} from "react";
import {v4 as uuid} from "uuid";

function CreateContainer() {

  const [form, setForm] = useState({
    date: '',
    distant: '',
    switch: false
  });

  const [elems, setElems] = useState([]);
  const [lastDate, setLastDate] = useState('');

  const reverseDate = (date) => {
    let dateRevers = date.split('.');
     dateRevers = dateRevers.reverse().join('.');

    return dateRevers;
  }

  const handleElem = () => {
    if (form.date === '') {
      return;
    }

    if (form.distant === '') {
      return;
    }

    let update = 0;

    elems.forEach((item) => {

      if (item.date === reverseDate(form.date)) {
        item.distant = +item.distant + +form.distant;
        item.distant = item.distant.toFixed(1);

        const int = Math.floor(item.distant);
        const decimal = item.distant - int;

        if (decimal === 0.0) {
          item.distant = int;
        }
        update = 1;
      }
    })

    const steps = {
      date: form.date,
      distant: form.distant
    }

    if (update === 0) {

      steps.date = reverseDate(steps.date);
      setElems(elems.concat(steps));
    }

    setForm(prevForm => ({...prevForm, date: '', distant: ''}));
  }

  elems.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  })

  const handleData = evt => {
    evt.preventDefault();

    const {name, value} = evt.target;
    setForm(prevForm => ({...prevForm, [name]: value}));
  }

    const handleSwitch = switchFlag => {
      setForm(prevForm => ({...prevForm, switch: switchFlag}));
    }

    const handleGetData = (date, dist) => {
      setForm(prevForm => ({...prevForm, date: date, distant: dist, edit: true}));

      setLastDate(reverseDate(date));
    }

    const handleEdit = (date, dist) => {

      setElems(prevElems => prevElems.map(el => {
        if (el.date === lastDate) {
          el.date = reverseDate(date);
          el.distant = dist;
        }
        return el;
      }));
      setForm(prevForm => ({...prevForm, date: '', distant: '', edit: undefined, switch: true}));
    }

    const handleRemove = date => {

      setElems(prevElems => prevElems.filter(elem => elem.date !== reverseDate(date)));
    }

    return (
      <div className={"content-table"}>

        <EnterUserData
          item={form}
          handleData={handleData}
          handleSwitch={handleSwitch}
          handleElem={handleElem}
          handleEdit={handleEdit}
        />

        <table className={"table-data"}>
          <thead>
          <tr>
            <th>Дата (ДД.ММ.ГГГГ)</th>
            <th>Пройдено км</th>
            <th>Действия</th>
          </tr>
          </thead>
          <tbody className={"tbody"}>
          {form.switch === true && elems.map(elem => {
            return <UserData item={elem} key={uuid()} handleRemove={handleRemove} handleGetData={handleGetData}/>
          })}
          </tbody>
        </table>
      </div>
    );
  }

export default CreateContainer;
