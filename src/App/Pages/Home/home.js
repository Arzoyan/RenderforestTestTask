import React, { useState } from 'react';
import List from '../../components/List/List';
import { PROS, CONS, HEADER_TEXT } from '../../consants/constants';

export const createNewItem = () => {
    return {
        id: `${new Date().getTime()}`,
        title: ""
    }
}

const Home = () => {

    const [pros, setPros] = useState([{ id: '1', title: "" }]);
    const [cons, setCons] = useState([{ id: '0', title: "" }]);

    const getListByName = (type = PROS) => {
        switch (type) {
            case CONS:
                return cons;
            default:
                return pros;
        }
    }

    const setListByName = (type = PROS, data) => {
        switch (type) {
            case CONS:
                return setCons(data)
            default:
                return setPros(data)
        }
    }


    const editItem = (item, listName) => {
        let data = [...getListByName(listName)];

        data = data.map(element => {
            if (element.id === item.id) {
                return item;
            }
            return element;
        });
        setListByName(listName, data);

        if (data[data.length - 2].id === item.id) {
            addNewItem(listName, data);
        } else if (data[data.length - 1].id === item.id) {
            data.push(createNewItem());
            setTimeout(() => {
                addNewItem(listName, data);
            }, 10);
        }
    }

    const addNewItem = (dataType, data) => {
        let newData = [...data]
        newData.push(createNewItem());
        setListByName(dataType, newData);
    }

    const removeItem = (id, dataType) => {
        let data = [...getListByName(dataType)]

        data = data.filter(item => {
            return item.id !== id
        })
        setListByName(dataType, data);
    }

    return (
        <div className={"pros-cons-list"}>
            <div className='pros-cons-list-header'>
                {HEADER_TEXT}
            </div>
            <div className='pros-cons-list-body'>
                <List
                    title={PROS}
                    list={pros}
                    addNewItem={addNewItem}
                    editItem={editItem}
                    removeItem={removeItem}
                />
                <List
                    title={CONS}
                    list={cons}
                    addNewItem={addNewItem}
                    editItem={editItem}
                    removeItem={removeItem}
                />
            </div>
        </div>
    )
}

export default Home;