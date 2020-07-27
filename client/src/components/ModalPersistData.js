import React, { Component } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default class ModalPersistData extends Component {
  constructor(props) {
    const { selectData, type } = props;
    super();
    this.state = {
      id: selectData._id,
      description: selectData.description,
      category: selectData.category,
      balance: selectData.value,
      entryType: type,
      selectedDate: selectData.yearMonthDay,
    };
  }

  componentDidMount() {
    const { onClose } = this.props;

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        onClose(null);
      }
    });
  }

  componentWillUnmount() {
    const { onClose } = this.props;

    document.removeEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        onClose(null);
      }
    });
  }

  handleCloseModal = () => {
    const { onClose } = this.props;
    onClose(null);
  };
  handleFormSubmit = (event) => {
    const { onSave, httpMethod } = this.props;
    const {
      id,
      description,
      category,
      entryType,
      selectedDate,
      balance,
    } = this.state;
    console.log(selectedDate);
    const newDateObj = new Date(`${selectedDate}T00:00:00-03:00`);

    const newData = {
      _id: id,
      description,
      category,
      type: entryType,
      day: newDateObj.getDate(),
      yearMonth: selectedDate.split('-', 2).join('-'),
      yearMonthDay: selectedDate,

      value: +balance,
    };

    event.preventDefault();

    onSave(newData, httpMethod);
  };

  handleInputChange = (event) => {
    const target = event.target.name;
    let inputValue = null;

    if (target === 'entryType') {
      inputValue = event.target.value === 'receita' ? '+' : '-';
    } else {
      inputValue = event.target.value;
    }

    console.log(target, inputValue);

    this.setState({
      [target]: inputValue,
    });
  };

  render() {
    const {
      description,
      balance,
      category,
      entryType,
      selectedDate,
    } = this.state;

    return (
      <div>
        <Modal isOpen={true} style={styleModalComponent}>
          <div style={styles.modalContainer}>
            <h2 style={styles.modalTitle}>Lançamento</h2>
            <button
              className="waves-effect waves-light btn red"
              onClick={this.handleCloseModal}
            >
              X
            </button>
          </div>

          <form onSubmit={this.handleFormSubmit}>
            <p>
              <label>
                <input
                  className="with-gap"
                  name="entryType"
                  type="radio"
                  value="receita"
                  disabled={this.props.isDisabled}
                  checked={entryType === '+' ? true : false}
                  onChange={this.handleInputChange}
                />
                <span>Receita</span>
              </label>
            </p>
            <p>
              <label>
                <input
                  className="with-gap"
                  name="entryType"
                  type="radio"
                  value="despesa"
                  disabled={this.props.isDisabled}
                  checked={entryType === '-' ? true : false}
                  onChange={this.handleInputChange}
                />
                <span>Despesa</span>
              </label>
            </p>
            <div className="input-field">
              <label className="active" htmlFor="descriptionInput">
                Descrição
              </label>
              <input
                name="description"
                type="text"
                id="descriptionInput"
                value={description}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="input-field">
              <label className="active" htmlFor="categoryInput">
                Categoria
              </label>
              <input
                name="category"
                type="text"
                id="categoryInput"
                value={category}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="input-field">
              <label className="active" htmlFor="valueInput">
                Valor
              </label>
              <input
                name="balance"
                type="number"
                id="valueInput"
                value={balance}
                min="0"
                step="1"
                onChange={this.handleInputChange}
              />
            </div>
            <input
              name="selectedDate"
              type="date"
              id="dateInput"
              value={selectedDate}
              onChange={this.handleInputChange}
            />
            <button
              className={`${
                description ? (category ? '' : 'disabled') : 'disabled'
              } waves-effect waves-light btn`}
            >
              Salvar
            </button>
          </form>
        </Modal>
      </div>
    );
  }
}

const styles = {
  modalContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  modalTitle: {
    fontSize: '2rem',
    margin: 0,
  },
};

const styleModalComponent = {
  content: {
    top: '50%',
    left: '50%',
    height: '75%',
    width: '50%',
    transform: 'translate(-50%, -50%)',
  },
};
