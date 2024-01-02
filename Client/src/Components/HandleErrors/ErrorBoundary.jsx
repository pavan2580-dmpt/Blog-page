import ErrorPage from "../Error/ErrorPage"
import React from "react"

 class ErrorBoundary extends React.Component{

    constructor(props) {
        super(props);
        this.state = { hasError: false };
      }
    
      static getDerivedStateFromError(error) {        
        return { hasError: true };
      }
    
      componentDidCatch(error, errorInfo) {
        return { hasError: true };
      }

        render(){
            if(this.state.hasError){
                return(
                    <ErrorPage/>
                )
            }
            return(
                this.props.children
            )
        }





}

export default ErrorBoundary