import React from 'react';

const styles ={
    backgroundColor: 'lightGray',
    height: '30px',
    width: '100%',
    position: 'fixed',
    bottom: '0'
};

class Footer extends React.Component{
    
    render(){
        return(
            <div className = "footer" style={styles}>
                footer works
            </div>
        );
    }
}

export default Footer;