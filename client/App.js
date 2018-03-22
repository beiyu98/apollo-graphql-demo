import React,{Component} from 'react';
import {gql} from 'apollo-boost';
import {Query} from 'react-apollo';

const GET_BOOK = gql`
    query getBooks{
        books {
            title
            author
        }
    }
`;

export default class App extends Component{
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
                            {
                                data.books.map((book,index)=>{
                                    return (
                                        <ul key={index}>
                                            <li>{book.title}</li>
                                            <li>{book.author}</li>
                                        </ul>)
                                })
                            }
                        </div>
                    )
                }
            }
        </Query>
        )
    }
}