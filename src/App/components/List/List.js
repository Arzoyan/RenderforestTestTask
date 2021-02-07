import React, { useState } from 'react';


let testRef = {};
const List = (props) => {
    const { list } = props;
    const [itemValue, setitemValue] = useState("")

    const onChangeItem = (e) => {
        setitemValue(e.target.value);
        if (e.target.value === "") {
            props.removeItem(e.target.name, props.title)
        }
    }
    return (
        <div className="list">
            <div className='list-title'>
                {props.title}
            </div>
            <div className='list-items'  >
                {
                    list.map((item, index) => {
                        testRef[`${props.title}_${index}`] = React.createRef(null);
                        return (
                            <div className="list-item" key={item.id}>
                                <div className='list-item-id'>{index + 1}.</div>
                                <div className='list-item-body'
                                    onClick={(e) => {
                                        if (list.length === 1) {
                                            //add new item 
                                            props.addNewItem(props.title, list);
                                        } else if ((index === (list.length - 1)) && list[list.length - 2].title) {
                                            //add new item 
                                            props.addNewItem(props.title, list);
                                        }
                                    }}
                                >
                                    <input
                                        ref={testRef[`${props.title}_${index}`]}
                                        name={item.id}
                                        defaultValue={item.title}
                                        onChange={(e) => { onChangeItem(e) }}
                                        onKeyPress={(key) => {
                                            if (key.code === "Enter" && itemValue) {
                                                props.editItem({
                                                    id: item.id,
                                                    title: itemValue
                                                }, props.title);
                                                setitemValue("")
                                                if (item.id === list[list.length - 1]) {
                                                    props.addNewItem(props.title, list)
                                                }
                                                setTimeout(() => {
                                                    testRef[`${props.title}_${index + 1}`] && testRef[`${props.title}_${index + 1}`].current.focus();
                                                }, 100);
                                            }
                                        }}

                                        onKeyDown={(e) => {
                                            if (e.code === "Backspace" && list.length > 1) {
                                                if (e.target.value === '' || e.target.value.length === 1) {
                                                    props.removeItem(e.target.name, props.title);
                                                    setTimeout(() => {
                                                        testRef[`${props.title}_${index - 1}`] && testRef[`${props.title}_${index - 1}`].current.focus();
                                                    }, 100);
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}

export default List;