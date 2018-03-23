import React,{Component} from 'react';
import {gql} from 'apollo-boost';
import {Query} from 'react-apollo';
import {Button, Modal} from 'antd';

const GET_BOOK = gql`
    query getBooks{
        books {
            title
            author
        }
    }
`;

export default class App extends Component{

    constructor(props){
        super(props);

        this.state = {
            showModal:false,
        }
    }

    addBook(){
        console.log('addBook click',this.state);
        let modal = !this.state.showModal;
        this.setState({
            showModal:modal,
        })
    }

    render(){
        return(
            <Query query={GET_BOOK}>
            {
                ({loading,error,data})=>{
                    if(loading){
                        return(<div>loading...</div>)
                    } 
                    if(error){
                        return(<div>error</div>)
                    }
    
                    return(
                        <div>
                            <Button type="primary" onClick={addBook.bind(this)}>add</Button>
                            {
                                data.books.map((book,index)=>{
                                    return (
                                        <ul key={index}>
                                            <li>书名：{book.title} 作者：{book.author}</li>
                                        </ul>)
                                })
                            }
                            <Modal
                                visible={true}
                            >
                                <p>hello</p>
                            </Modal>
                        </div>
                    )
                }
            }
        </Query>
        )
    }
}