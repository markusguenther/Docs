import React from 'react';
import { Link } from 'gatsby';
import { Button } from '@appbaseio/designkit';
import { LeftOutlined } from '@ant-design/icons'

const Tutorial = () => {
    return (
        <div>
            <div style={{ position: 'absolute', right: 30, top: 30,textDecoration: 'none' }}>
                <Link to="/">                    
                    <Button style={{ backgroundColor: '#e4faff' }}> 
                        <LeftOutlined style={{ marginRight: 10 }} /> Back to docs
                    </Button>
                </Link> 
            </div>                       
            <iframe
                title="Interactive Tutorial"
                src="https://dashboard-tutorial.netlify.app/"
                frameBorder="0"
                width="100%"
                height="100vh"
                style={{
                    height: "100vh"
                }}
            />
        </div>
    );
}

export default Tutorial;