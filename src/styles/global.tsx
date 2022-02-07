import { createGlobalStyle } from "styled-components";

import "react-activity/dist/library.css";

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Roboto:wght@400;500&display=swap');
     *{
        margin:0;
        padding:0;
        outline:0;
        border:0;
        box-sizing:border-box;
        -webkit-box-sizing:border-box;
    }
    *:focus{
        outline:0;    
    }
    html,body,#root {
        height: 100%;
    }
    body {
        -webkit-font-smoothing: antialiased;
        display:block;
        overflow:visible;
        background: #f8f8f8;
        color:#29292e;
    }
    a{
        text-decoration: none;
    }
    button {
        cursor: pointer;
    }
    ul{
        list-style:none;
    }
    body,input,button,textarea{
        font-weight: 400;
        font-size: 16px;
        font-family: 'Roboto', sans-serif;
    }
`;
